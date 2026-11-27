// Podcast-clip engine core (this account only). 1080x1920 canvas compositor.
// A video = list of shots + text lockups + transitions, defined in videos/<name>/scene.js.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { drawLockup } from '/web/lockup.js';

export const W = 1080, H = 1920, FPS = 30;
export const C = { bg0: '#0b0703', bg1: '#2e1c07', amber: '#ff9a1f', glow: '#ff6a00', white: '#fff6ea' };

// ---------- math ----------
export const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
export const lerp = (a, b, k) => a + (b - a) * k;
export const ease = {
  out: k => 1 - Math.pow(1 - clamp(k), 3),
  in: k => Math.pow(clamp(k), 3),
  inOut: k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; },
  back: k => { k = clamp(k); const c = 1.4; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); },
};
export const prog = (t, t0, dur) => clamp((t - t0) / dur);

// ---------- canvases ----------
const mk = () => { const c = document.createElement('canvas'); c.width = W; c.height = H; return c; };
const out = document.getElementById('out'), octx = out.getContext('2d');
const bufA = mk(), bufB = mk(), tmp = mk();

// ---------- three ----------
let renderer, composer, bloom, renderPass, pmrem, envTex;
function initThree() {
  const glc = document.createElement('canvas'); glc.width = W; glc.height = H;
  renderer = new THREE.WebGLRenderer({ canvas: glc, antialias: true, preserveDrawingBuffer: true });
  renderer.setSize(W, H, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.9;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  pmrem = new THREE.PMREMGenerator(renderer);
  envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  composer = new EffectComposer(renderer);
  renderPass = new RenderPass(new THREE.Scene(), new THREE.PerspectiveCamera());
  bloom = new UnrealBloomPass(new THREE.Vector2(W / 2, H / 2), 0.9, 0.55, 0.72);
  composer.addPass(renderPass); composer.addPass(bloom); composer.addPass(new OutputPass());
}
export function three() { return { THREE, env: envTex, renderer }; }

// A 3D shot: build(ctx) returns {scene, camera, update(localT), bloom?:{strength,radius,threshold}}
const built = new Map();
function render3d(shot, lt, ctx) {
  if (!built.has(shot)) built.set(shot, shot.build({ THREE, env: envTex }));
  const b = built.get(shot);
  const h = b.hero, u = h?.userData, o = u?.off;
  // undo last frame's entry offset first, so offsets never accumulate when update() leaves the pose alone
  if (o) { h.position.x -= o.x; h.position.y -= o.y; h.rotation.y -= o.ry; h.rotation.z -= o.rz; h.scale.setScalar(u.s0); }
  b.update(lt);
  const en = shot.enter ?? 'rise';
  if (h && en) {
    const k = clamp(lt / (shot.enterDur ?? .7)), kb = ease.back(k), ko = ease.out(k);
    const sc0 = u.s0 ?? (u.s0 = h.scale.x);
    const n = { x: en === 'side' ? (1 - ko) * 3.2 : 0, y: en === 'rise' ? (1 - ko) * -1.6 : 0,
                ry: en === 'rise' ? (1 - ko) * 2.4 : 0, rz: en === 'side' ? (1 - ko) * -.6 : 0 };
    h.position.x += n.x; h.position.y += n.y; h.rotation.y += n.ry; h.rotation.z += n.rz;
    h.scale.setScalar(sc0 * lerp(.3, 1, kb)); u.off = n;
  }
  renderPass.scene = b.scene; renderPass.camera = b.camera;
  const bl = b.bloom || {}; bloom.strength = bl.strength ?? .9; bloom.radius = bl.radius ?? .55; bloom.threshold = bl.threshold ?? .72;
  composer.render();
  ctx.drawImage(renderer.domElement, 0, 0, W, H);
}

// ---------- footage ----------
const imgCache = new Map();
function loadImg(src) {
  if (imgCache.has(src)) return imgCache.get(src);
  const p = new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; });
  imgCache.set(src, p);
  if (imgCache.size > 40) imgCache.delete(imgCache.keys().next().value);
  return p;
}
// shot.kind 'face': frames pre-extracted (graded, 1080x1920) by engine/prep.py into videos/<v>/frames/
// zoom: {from,to} slow push; punch: [{t, s}] instant scale steps
async function renderFace(V, shot, lt, ctx) {
  const srcT = (shot.src ?? 0) + lt;
  const ff = SC.faceFps; const n = Math.max(1, ff ? Math.floor(srcT * ff + 1e-4) + 1 : Math.round(srcT * FPS) + 1);
  const img = await loadImg(`/videos/${V}/frames/${String(n).padStart(5, '0')}.jpg`);
  let s = lerp(shot.zoom?.from ?? 1, shot.zoom?.to ?? 1.06, ease.inOut(lt / (shot.t1 - shot.t0)));
  for (const p of shot.punch || []) if (lt >= p.t) { const pk = ease.out(clamp((lt - p.t) / .12)); s *= lerp(1, p.s, pk); }
  const fx = shot.focus?.x ?? .5, fy = shot.focus?.y ?? .4;
  ctx.save(); ctx.translate(W * fx, H * fy); ctx.scale(s, s); ctx.translate(-W * fx, -H * fy);
  ctx.drawImage(img, 0, 0, W, H); ctx.restore();
  lightLeak(ctx, srcT, shot.leak ?? -1);
}

function lightLeak(ctx, t, side = -1) {
  ctx.save(); ctx.globalCompositeOperation = 'screen';
  const x = W * (side < 0 ? .08 : .92) + Math.sin(t * .4) * 60, y = H * (.22 + .04 * Math.sin(t * .3));
  const g = ctx.createRadialGradient(x, y, 0, x, y, H * .42);
  const lk = SC?.leak ?? .5;  // v2: subtler leak (old one washed the blacks)
  g.addColorStop(0, `rgba(255,150,50,${.42 * lk})`); g.addColorStop(.45, `rgba(255,100,20,${.16 * lk})`); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  const x2 = W * (side < 0 ? .95 : .05), y2 = H * (.08 + .03 * Math.sin(t * .5 + 1));
  const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, H * .28);
  g2.addColorStop(0, `rgba(255,120,30,${.22 * lk})`); g2.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g2; ctx.fillRect(0, 0, W, H);
  ctx.restore();
}
// b-roll frames: videos/<v>/broll/<dir>/00001.jpg (30 fps)
async function brollImg(dir, lt, speed = 1, n0 = 1) {
  const list = brollCount[dir]; const n = Math.min(list ?? 9999, n0 + Math.floor(lt * FPS * speed));
  try { return await loadImg(`/videos/${V}/broll/${dir}/${String(Math.max(1, n)).padStart(5, '0')}.jpg`); }
  catch { brollCount[dir] = n - 1; return loadImg(`/videos/${V}/broll/${dir}/${String(Math.max(1, n - 1)).padStart(5, '0')}.jpg`); }
}
const brollCount = {};
function rrect(ctx, x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }
// stack of rounded b-roll cards sliding in from alternating sides (reference: Scrolling / Working / Learning)
async function renderStack(ctx, shot, lt) {
  warmBg(ctx, .5, .5, 1.1);
  const cw = shot.cw ?? 800, ch = shot.ch ?? 450, gap = 70, n = shot.cards.length, y0 = H * (shot.cy ?? .44) - (n * ch + (n - 1) * gap) / 2;
  for (let i = 0; i < n; i++) {
    const c = shot.cards[i]; const k = clamp((lt - c.at) / .42); if (k <= 0) continue;
    const side = i % 2 ? 1 : -1, e = ease.back(k);
    const x = W / 2 - cw / 2 + side * (1 - e) * (W * .9) + Math.sin(lt * .8 + i) * 6, y = y0 + i * (ch + gap) - lt * 10;
    const img = await brollImg(c.dir, Math.max(0, lt - c.at), c.speed ?? 1);
    ctx.save(); ctx.globalAlpha = clamp(k * 2.5);
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14; rrect(ctx, x, y, cw, ch, 34); ctx.fillStyle = '#000'; ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.save(); rrect(ctx, x, y, cw, ch, 34); ctx.clip(); ctx.drawImage(img, x - 20, y - 11, cw + 40, ch + 22);
    const g = ctx.createLinearGradient(0, y, 0, y + ch); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = g; ctx.fillRect(x, y, cw, ch); ctx.restore();
    rrect(ctx, x, y, cw, ch, 34); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,220,180,.55)'; ctx.stroke();
    if (c.label) { ctx.font = '700 92px Pop'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,.8)'; ctx.shadowBlur = 24; ctx.fillText(c.label, x + cw / 2, y + ch / 2 + 32); }
    ctx.restore();
  }
}
// full-screen b-roll clip with slow push
async function renderClip(ctx, shot, lt) {
  const img = await brollImg(shot.dir, lt, shot.speed ?? 1);
  const s = lerp(shot.zoom?.from ?? 1.04, shot.zoom?.to ?? 1.14, ease.inOut(lt / (shot.t1 - shot.t0)));
  ctx.save(); ctx.translate(W / 2, H * .45); ctx.scale(s, s); ctx.translate(-W / 2, -H * .45); ctx.drawImage(img, 0, 0, W, H); ctx.restore();
}
// rotating outline frames + $ style ornaments over 3D/2D cards (reference: "than your bank account")
function frames2d(ctx, lt, f) {
  ctx.save(); ctx.translate(W / 2, H * (f.cy ?? .42));
  for (let i = 0; i < 2; i++) {
    const k = ease.out(clamp((lt - .05 - i * .12) / .6)); const sz = (f.size ?? 620) * (i ? .92 : 1);
    ctx.save(); ctx.rotate((i ? .3 : -.16) + (1 - k) * (i ? .9 : -.9) + lt * (i ? -.06 : .05)); ctx.scale(.6 + .4 * k, .6 + .4 * k);
    ctx.globalAlpha = .6 * k; ctx.strokeStyle = '#f0c08a'; ctx.lineWidth = 3; ctx.shadowColor = 'rgba(255,140,40,.8)'; ctx.shadowBlur = 16;
    ctx.strokeRect(-sz / 2, -sz / 2, sz, sz); ctx.restore();
  }
  ctx.restore();
}

// ---------- 2D backgrounds ----------
const pushIn = (c, lt) => { const s = 1 + Math.min(.05, lt * .006); c.translate(W / 2, H * .36); c.scale(s, s); c.translate(-W / 2, -H * .36); };
// slow warm dust + two thin rotating outline squares (from the reference's card backgrounds)
function ambient(c, lt, seed) {
  let sd = 7 + Math.floor(seed * 13) % 97; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  c.save();
  for (let i = 0; i < 38; i++) {
    const x0 = rnd() * W, y0 = rnd() * H, sp = 14 + rnd() * 26, r = 1.5 + rnd() * 3.5, ph = rnd() * 6.28;
    const y = ((y0 - lt * sp) % H + H) % H, x = x0 + Math.sin(lt * .4 + ph) * 18;
    c.globalAlpha = (.18 + .22 * Math.sin(lt * .9 + ph) ** 2) * Math.min(1, lt / .5);
    c.fillStyle = '#ffc787'; c.beginPath(); c.arc(x, y, r, 0, 7); c.fill();
  }
  c.globalAlpha = .09 * Math.min(1, lt / .6); c.strokeStyle = '#ffb347'; c.lineWidth = 3;
  for (const [cx, cy, sz, dir] of [[W * .86, H * .8, 260, 1], [W * .12, H * .9, 180, -1]]) {
    c.save(); c.translate(cx, cy - lt * 6); c.rotate(dir * (lt * .18 + .5)); c.strokeRect(-sz / 2, -sz / 2, sz, sz);
    c.rotate(.4); c.strokeRect(-sz * .32, -sz * .32, sz * .64, sz * .64); c.restore();
  }
  c.restore();
}
export function warmBg(ctx, cx = .5, cy = .45, r = 1.0, a = 1) {
  const g = ctx.createRadialGradient(W * cx, H * cy, 0, W * cx, H * cy, H * .75 * r);
  g.addColorStop(0, `rgba(70,42,12,${a})`); g.addColorStop(.55, `rgba(30,18,6,${a})`); g.addColorStop(1, `rgba(8,5,2,${a})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
function vignette(ctx, k = .55) {
  const g = ctx.createRadialGradient(W / 2, H * .46, H * .25, W / 2, H * .5, H * .78);
  g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, `rgba(0,0,0,${k})`);
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
}
let grainC;
function grain(ctx, t) {
  if (!grainC) { grainC = []; for (let i = 0; i < 6; i++) { const c = document.createElement('canvas'); c.width = W; c.height = H; const x = c.getContext('2d'); const d = x.createImageData(W, H); const ga = SC?.grain ?? 9; for (let j = 0; j < d.data.length; j += 4) { const v = 128 + (Math.random() + Math.random() - 1) * 127; d.data[j] = d.data[j + 1] = d.data[j + 2] = v; d.data[j + 3] = ga; } x.putImageData(d, 0, 0); grainC.push(c); } }
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(grainC[Math.floor(t * FPS) % 6], 0, 0, W, H); ctx.restore();
}

// ---------- frame composition ----------
let V, SC;
async function drawShot(ctx, shot, t) {
  const lt = t - shot.t0;
  ctx.save(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  if (shot.kind === 'face') await renderFace(V, shot, lt, ctx);
  else if (shot.kind === '3d') render3d(shot, lt, ctx);
  else if (shot.kind === '2d') {
    // cardFx (opt-in per scene): ambient motion behind the card + a slow push-in, so a card never sits still
    if (SC.cardFx) {
      const bg = (c, ...a) => { warmBg(c, ...a); c.restore(); ambient(c, lt, shot.t0); c.save(); pushIn(c, lt); };
      ctx.save(); pushIn(ctx, lt);
      shot.draw(ctx, lt, { W, H, C, ease, prog, clamp, lerp, warmBg: bg });
      ctx.restore();
    } else shot.draw(ctx, lt, { W, H, C, ease, prog, clamp, lerp, warmBg });
  }
  else if (shot.kind === 'stack') await renderStack(ctx, shot, lt);
  else if (shot.kind === 'clip') await renderClip(ctx, shot, lt);
  if (shot.frames) frames2d(ctx, lt, shot.frames);
  if (shot.overlay) shot.overlay(ctx, lt, { W, H, C, ease, prog, clamp, lerp });
  ctx.restore();
}

// one composited image at time t into ctx (no motion blur)
async function compose(c, t) {
  const shots = SC.shots;
  const i = shots.findIndex(s => t >= s.t0 && t < s.t1);
  const cur = shots[i < 0 ? shots.length - 1 : i];
  const tr = cur.in, prev = shots[shots.indexOf(cur) - 1];
  const D = tr?.dur ?? .3;
  if (!(tr && prev && t < cur.t0 + D)) { await drawShot(c, cur, t); }
  else {
    const k = prog(t, cur.t0, D);
    await drawShot(bufA.getContext('2d'), cur, t);
    await drawShot(bufB.getContext('2d'), prev, Math.min(t, prev.t1 - 1e-3));
    const z = (img, s, a, cy = .45) => { c.save(); c.globalAlpha = a; c.translate(W / 2, H * cy); c.scale(s, s); c.translate(-W / 2, -H * cy); c.drawImage(img, 0, 0); c.restore(); };
    c.fillStyle = '#000'; c.fillRect(0, 0, W, H);
    if (tr.type === 'whip') {
      // outgoing rushes into the lens, short warm flash, incoming lands from a slight zoom
      const ko = ease.in(clamp(k / .55)), ki = ease.out(clamp((k - .38) / .62));
      if (k < .62) z(bufB, 1 + 1.5 * ko, 1 - clamp((k - .36) / .26));
      if (k > .34) z(bufA, lerp(1.4, 1, ki), clamp((k - .34) / .24));
      const fl = Math.exp(-Math.pow((k - .44) / .1, 2));
      c.save(); c.globalCompositeOperation = 'screen'; c.globalAlpha = .5 * fl; c.fillStyle = '#ffb36b'; c.fillRect(0, 0, W, H); c.restore();
    } else if (tr.type === 'zoomin' || tr.type === 'blur') {
      // smooth push into the next shot
      const ki = ease.out(k);
      z(bufB, lerp(1, 1.12, ease.in(k)), 1);
      z(bufA, lerp(1.22, 1, ki), clamp(k / .45));
    } else if (tr.type === 'amber') {
      const ko = ease.inOut(clamp(k / .5)), ki = ease.inOut(clamp((k - .5) / .5));
      if (k < .5) { z(bufB, 1 + .08 * ko, 1); c.globalAlpha = ko; warmBg(c, .5, .5, 1.2); c.globalAlpha = 1; }
      else { z(bufA, lerp(1.1, 1, ki), 1); c.globalAlpha = 1 - ki; warmBg(c, .5, .5, 1.2); c.globalAlpha = 1; }
    } else if (tr.type === 'slide') {
      const e = ease.inOut(k); c.drawImage(bufB, -W * e, 0); c.drawImage(bufA, W * (1 - e), 0);
    } else await drawShot(c, cur, t);
  }
  for (const L of SC.lockups || []) drawLockup(c, L, t, W, H);
  vignette(c, SC.vignette ?? .4);
}
// motion blur: average sub-frames (180-degree shutter) whenever something moves fast
const subBuf = mk();
function needsBlur(t) {
  for (const s of SC.shots) { if (s.in && t >= s.t0 - .02 && t < s.t0 + (s.in.dur ?? .3) + .03) return 8; if (t >= s.t0 && t < s.t0 + .55 && (s.kind === '3d' || s.kind === 'stack')) return 4; if (s.kind === 'stack' && s.cards?.some(cd => t >= s.t0 + cd.at && t < s.t0 + cd.at + .45)) return 5; }
  for (const L of SC.lockups || []) for (const r of L.lines.flat()) if ((r.k === 'b' || r.k === 'bo') && t >= r.at && t < r.at + .2) return 3;
  return 1;
}
export async function frame(t) {
  const K = needsBlur(t);
  if (K === 1) { await compose(octx, t); grain(octx, t); return; }
  const sc = subBuf.getContext('2d');
  for (let j = 0; j < K; j++) {
    const tj = t + (j / (K - 1) - .5) * (.5 / FPS);
    await compose(sc, tj);
    octx.globalAlpha = 1 / (j + 1); octx.drawImage(subBuf, 0, 0);
  }
  octx.globalAlpha = 1; grain(octx, t);
}

export async function boot(name) {
  V = name;
  await Promise.all(['400 60px Script','400 60px Brush','400 60px Brush2','400 60px Fancy','500 60px Pop','600 60px Pop','700 60px Pop','800 60px Pop'].map(f => document.fonts.load(f))); await document.fonts.load('800 60px Sans'); await document.fonts.load('400 40px Sans'); await document.fonts.load('600 40px Sans');
  initThree();
  const mod = await import(`/videos/${name}/scene.js`);
  SC = await mod.default({ THREE, W, H, C, ease, prog, clamp, lerp, warmBg });
  // captions never hang over a cut: end each lockup .2 s before its shot ends (unless keep)
  for (const L of SC.lockups || []) { if (L.keep) continue; const sh = SC.shots.find(x => L.t0 >= x.t0 - .05 && L.t0 < x.t1); if (sh && sh !== SC.shots[SC.shots.length - 1]) L.t1 = Math.min(L.t1, sh.t1 - .2); }
  window.SCENE_INFO = { duration: SC.duration };
  window.SCENE_EVENTS = { duration: SC.duration,
    transitions: SC.shots.filter(x => x.in).map(x => ({ t: x.t0, type: x.in.type })),
    shots: SC.shots.map(x => ({ t: x.t0, kind: x.kind, cards: (x.cards || []).map(c => x.t0 + c.at) })),
    sfxGain: SC.sfxGain ?? 1, joins: SC.joins || [], runs: (SC.lockups || []).flatMap(L => L.lines.flat().map(r => ({ t: r.at, k: r.k, w: r.w }))), sfx: SC.sfx || [] };
  window.renderFrame = async t => { await frame(t); };
  window.grab = () => out.toDataURL('image/jpeg', 0.93);
}
