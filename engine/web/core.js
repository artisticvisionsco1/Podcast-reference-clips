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
  b.update(lt);
  const en = shot.enter ?? 'rise';
  if (b.hero && en) {
    const k = clamp(lt / (shot.enterDur ?? .7)), kb = ease.back(k), ko = ease.out(k);
    const sc0 = b.hero.userData.s0 ?? (b.hero.userData.s0 = b.hero.scale.x);
    b.hero.scale.setScalar(sc0 * lerp(.3, 1, kb));
    if (en === 'rise') { b.hero.position.y += (1 - ko) * -1.6; b.hero.rotation.y += (1 - ko) * 2.4; }
    if (en === 'side') { b.hero.position.x += (1 - ko) * 3.2; b.hero.rotation.z += (1 - ko) * -.6; }
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
  const n = Math.max(1, Math.round(srcT * FPS) + 1);
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
  g.addColorStop(0, 'rgba(255,140,40,.34)'); g.addColorStop(.5, 'rgba(255,90,10,.12)'); g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = 'rgba(255,240,225,1)'; ctx.fillRect(0, 0, W, H);
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
  const cw = 800, ch = 450, gap = 70, n = shot.cards.length, y0 = H * (shot.cy ?? .44) - (n * ch + (n - 1) * gap) / 2;
  for (let i = 0; i < n; i++) {
    const c = shot.cards[i]; const k = clamp((lt - c.at) / .42); if (k <= 0) continue;
    const side = i % 2 ? 1 : -1, e = ease.back(k);
    const x = W / 2 - cw / 2 + side * (1 - e) * (W * .9) + Math.sin(lt * .8 + i) * 6, y = y0 + i * (ch + gap);
    const img = await brollImg(c.dir, Math.max(0, lt - c.at), c.speed ?? 1);
    ctx.save(); ctx.globalAlpha = clamp(k * 2.5);
    ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14; rrect(ctx, x, y, cw, ch, 34); ctx.fillStyle = '#000'; ctx.fill();
    ctx.shadowColor = 'transparent'; ctx.save(); rrect(ctx, x, y, cw, ch, 34); ctx.clip(); ctx.drawImage(img, x - 20, y - 11, cw + 40, ch + 22);
    const g = ctx.createLinearGradient(0, y, 0, y + ch); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = g; ctx.fillRect(x, y, cw, ch); ctx.restore();
    rrect(ctx, x, y, cw, ch, 34); ctx.lineWidth = 3; ctx.strokeStyle = 'rgba(255,220,180,.55)'; ctx.stroke();
    ctx.font = '700 92px Pop'; ctx.textAlign = 'center'; ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(0,0,0,.8)'; ctx.shadowBlur = 24; ctx.fillText(c.label, x + cw / 2, y + ch / 2 + 32);
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
  if (!grainC) { grainC = []; for (let i = 0; i < 6; i++) { const c = document.createElement('canvas'); c.width = 540; c.height = 960; const x = c.getContext('2d'); const d = x.createImageData(540, 960); for (let j = 0; j < d.data.length; j += 4) { const v = Math.random() * 255; d.data[j] = d.data[j + 1] = d.data[j + 2] = v; d.data[j + 3] = 14; } x.putImageData(d, 0, 0); grainC.push(c); } }
  ctx.save(); ctx.globalCompositeOperation = 'overlay'; ctx.drawImage(grainC[Math.floor(t * FPS) % 6], 0, 0, W, H); ctx.restore();
}

// ---------- frame composition ----------
let V, SC;
async function drawShot(ctx, shot, t) {
  const lt = t - shot.t0;
  ctx.save(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  if (shot.kind === 'face') await renderFace(V, shot, lt, ctx);
  else if (shot.kind === '3d') render3d(shot, lt, ctx);
  else if (shot.kind === '2d') shot.draw(ctx, lt, { W, H, C, ease, prog, clamp, lerp, warmBg });
  else if (shot.kind === 'stack') await renderStack(ctx, shot, lt);
  else if (shot.kind === 'clip') await renderClip(ctx, shot, lt);
  if (shot.frames) frames2d(ctx, lt, shot.frames);
  if (shot.overlay) shot.overlay(ctx, lt, { W, H, C, ease, prog, clamp, lerp });
  ctx.restore();
}

export async function frame(t) {
  const shots = SC.shots;
  const i = shots.findIndex(s => t >= s.t0 && t < s.t1);
  const cur = shots[i < 0 ? shots.length - 1 : i];
  await drawShot(bufA.getContext('2d'), cur, t);
  let img = bufA;
  // transition INTO cur (defined on cur.in)
  const tr = cur.in, prev = shots[shots.indexOf(cur) - 1];
  if (tr && prev && t < cur.t0 + (tr.dur ?? .25)) {
    const k = prog(t, cur.t0, tr.dur ?? .25);
    await drawShot(bufB.getContext('2d'), prev, Math.min(t, prev.t1 - 1e-3) );
    const tc = tmp.getContext('2d'); tc.globalAlpha = 1; tc.filter = 'none';
    if (tr.type === 'whip') {
      // outgoing rushes toward camera with zoom blur, incoming settles from 1.15 -> 1
      tc.fillStyle = '#000'; tc.fillRect(0, 0, W, H);
      const ko = ease.in(clamp(k / .55)), ki = ease.out(clamp((k - .35) / .65));
      if (k < .65) for (let j = 0; j < 8; j++) { const s = 1 + ko * (.25 + j * .09); tc.globalAlpha = (1 - clamp((k - .3) / .35)) / (1 + j * .5); tc.setTransform(s, 0, 0, s, W / 2 * (1 - s), H * .45 * (1 - s)); tc.drawImage(bufB, 0, 0); }
      tc.setTransform(1, 0, 0, 1, 0, 0);
      if (ki > 0) { const s = lerp(1.18, 1, ki); tc.globalAlpha = ki; tc.filter = `blur(${(1 - ki) * 18}px)`; tc.setTransform(s, 0, 0, s, W / 2 * (1 - s), H * .45 * (1 - s)); tc.drawImage(bufA, 0, 0); tc.setTransform(1, 0, 0, 1, 0, 0); tc.filter = 'none'; }
      img = tmp;
    } else if (tr.type === 'amber') {
      // dip through warm amber
      const dk = k < .5 ? ease.inOut(k / .5) : 1 - ease.inOut((k - .5) / .5);
      tc.globalAlpha = 1; tc.drawImage(k < .5 ? bufB : bufA, 0, 0);
      tc.globalAlpha = dk; warmBg(tc, .5, .5, 1.2); tc.globalAlpha = 1;
      img = tmp;
    } else if (tr.type === 'blur') {
      tc.globalAlpha = 1; tc.filter = `blur(${(1 - ease.out(k)) * 26}px)`; tc.drawImage(bufA, 0, 0); tc.filter = 'none';
      img = tmp;
    } else if (tr.type === 'slide') {
      const e = ease.inOut(k); tc.fillStyle = '#000'; tc.fillRect(0, 0, W, H);
      tc.drawImage(bufB, -W * e, 0); tc.drawImage(bufA, W * (1 - e), 0); img = tmp;
    }
  }
  octx.globalAlpha = 1; octx.filter = 'none'; octx.drawImage(img, 0, 0);
  for (const L of SC.lockups || []) drawLockup(octx, L, t, W, H);
  vignette(octx, SC.vignette ?? .5); grain(octx, t);
}

export async function boot(name) {
  V = name;
  await Promise.all(['400 60px Script','400 60px Brush','400 60px Brush2','400 60px Fancy','500 60px Pop','600 60px Pop','700 60px Pop','800 60px Pop'].map(f => document.fonts.load(f))); await document.fonts.load('800 60px Sans'); await document.fonts.load('400 40px Sans'); await document.fonts.load('600 40px Sans');
  initThree();
  const mod = await import(`/videos/${name}/scene.js`);
  SC = await mod.default({ THREE, W, H, C, ease, prog, clamp, lerp, warmBg });
  window.SCENE_INFO = { duration: SC.duration };
  window.SCENE_EVENTS = { duration: SC.duration,
    transitions: SC.shots.filter(x => x.in).map(x => ({ t: x.t0, type: x.in.type })),
    shots: SC.shots.map(x => ({ t: x.t0, kind: x.kind, cards: (x.cards || []).map(c => x.t0 + c.at) })),
    runs: (SC.lockups || []).flatMap(L => L.lines.flat().map(r => ({ t: r.at, k: r.k, w: r.w }))), sfx: SC.sfx || [] };
  window.renderFrame = async t => { await frame(t); };
  window.grab = () => out.toDataURL('image/jpeg', 0.93);
}
