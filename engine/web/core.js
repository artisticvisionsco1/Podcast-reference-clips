// Podcast-clip engine core (this account only). 1080x1920 canvas compositor.
// A video = list of shots + text lockups + transitions, defined in videos/<name>/scene.js.
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

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
  for (const p of shot.punch || []) if (lt >= p.t) s *= p.s;
  const fx = shot.focus?.x ?? .5, fy = shot.focus?.y ?? .4;
  ctx.save(); ctx.translate(W * fx, H * fy); ctx.scale(s, s); ctx.translate(-W * fx, -H * fy);
  ctx.drawImage(img, 0, 0, W, H); ctx.restore();
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

// ---------- text lockups ----------
// lockup: {t0, t1, y, lines:[[{w, k:'s'|'sc'|'b'|'hl', at, c?}]], scale?}
// k: s = small sans, sc = orange script with glow, scw = white script, b = bold white, hl = bold in orange box (typed)
const FONT = { s: [600, 54, 'Sans'], sc: [400, 170, 'Script'], scw: [400, 130, 'Script'], b: [800, 96, 'Sans'], hl: [800, 120, 'Sans'] };
function fontOf(k, sc) { const [w, px, f] = FONT[k]; return `${w} ${Math.round(px * sc)}px ${f}`; }
function drawLockup(ctx, L, t) {
  if (t < L.t0 || t > L.t1 + .25) return;
  const sc = L.scale ?? 1, outA = 1 - ease.in(prog(t, L.t1, .22));
  const gap = 18 * sc; let y = H * (L.y ?? .6);
  const rows = L.lines.map(line => {
    const items = line.map(r => { ctx.font = fontOf(r.k, sc); const m = ctx.measureText(r.w); return { ...r, wd: m.width, h: FONT[r.k][1] * sc }; });
    const wd = items.reduce((a, r) => a + r.wd, 0) + gap * (items.length - 1);
    return { items, wd, h: Math.max(...items.map(r => r.h)) };
  });
  const total = rows.reduce((a, r) => a + r.h * 1.0 + 8 * sc, 0); y -= total / 2;
  for (const row of rows) {
    let x = W / 2 - row.wd / 2; const base = y + row.h * .78;
    for (const r of row.items) {
      const k = prog(t, r.at, r.k === 'hl' ? .5 : (r.k === 'sc' || r.k === 'scw') ? .3 : .13);
      if (k > 0) drawRun(ctx, r, x, base, k, t, sc, outA);
      x += r.wd + gap;
    }
    y += row.h * 1.0 + 8 * sc;
  }
}
function drawRun(ctx, r, x, base, k, t, sc, outA) {
  ctx.save(); ctx.font = fontOf(r.k, sc); ctx.textBaseline = 'alphabetic';
  if (r.k === 's') {
    ctx.globalAlpha = ease.out(k) * outA; ctx.fillStyle = C.white;
    ctx.shadowColor = 'rgba(0,0,0,.85)'; ctx.shadowBlur = 16;
    ctx.fillText(r.w, x, base + 10 * (1 - ease.out(k)));
  } else if (r.k === 'b') {
    const s = lerp(1.12, 1, ease.out(k)); ctx.globalAlpha = ease.out(k) * outA;
    ctx.translate(x + r.wd / 2, base); ctx.scale(s, s);
    ctx.fillStyle = C.white; ctx.shadowColor = 'rgba(0,0,0,.55)'; ctx.shadowBlur = 18; ctx.fillText(r.w, -r.wd / 2, 0);
    ctx.shadowColor = 'rgba(255,200,140,.45)'; ctx.shadowBlur = 30; ctx.fillText(r.w, -r.wd / 2, 0);
  } else if (r.k === 'sc' || r.k === 'scw') {
    // write-on: soft-edged wipe left->right
    const e = ease.out(k), h = r.h * 1.4;
    ctx.beginPath(); ctx.rect(x - 40, base - h, (r.wd + 80) * e, h * 1.6); ctx.clip();
    ctx.globalAlpha = outA * (.3 + .7 * e);
    const col = r.k === 'sc' ? C.amber : C.white;
    if (r.k === 'sc') { ctx.shadowColor = 'rgba(0,0,0,.7)'; ctx.shadowBlur = 24; ctx.fillStyle = 'rgba(0,0,0,.5)'; ctx.fillText(r.w, x + 3, base + 5); ctx.shadowColor = C.glow; ctx.shadowBlur = 34; }
    else { ctx.shadowColor = 'rgba(255,220,180,.55)'; ctx.shadowBlur = 24; }
    ctx.fillStyle = col; ctx.fillText(r.w, x, base);
    ctx.shadowBlur = 0; ctx.fillStyle = r.k === 'sc' ? '#ffd9a0' : '#fff'; ctx.globalAlpha *= .55; ctx.fillText(r.w, x, base);
  } else if (r.k === 'hl') {
    const pad = 22 * sc, bh = r.h * 1.0, bx = x - pad, by = base - bh * .82;
    const boxK = ease.out(prog(k, 0, .25));
    ctx.globalAlpha = outA; ctx.shadowColor = C.glow; ctx.shadowBlur = 70;
    ctx.fillStyle = C.amber; ctx.fillRect(bx, by, (r.wd + pad * 2) * boxK, bh * 1.08);
    ctx.shadowBlur = 0;
    const n = Math.floor(r.w.length * clamp((k - .15) / .85));
    ctx.fillStyle = '#fff'; ctx.shadowColor = 'rgba(120,40,0,.5)'; ctx.shadowBlur = 10; ctx.fillText(r.w.slice(0, n), x, base);
  }
  ctx.restore();
}

// ---------- frame composition ----------
let V, SC;
async function drawShot(ctx, shot, t) {
  const lt = t - shot.t0;
  ctx.save(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  if (shot.kind === 'face') await renderFace(V, shot, lt, ctx);
  else if (shot.kind === '3d') render3d(shot, lt, ctx);
  else if (shot.kind === '2d') shot.draw(ctx, lt, { W, H, C, ease, prog, clamp, lerp, warmBg });
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
  for (const L of SC.lockups || []) drawLockup(octx, L, t);
  vignette(octx, SC.vignette ?? .5); grain(octx, t);
}

export async function boot(name) {
  V = name;
  await document.fonts.load('400 60px Script'); await document.fonts.load('800 60px Sans'); await document.fonts.load('400 40px Sans'); await document.fonts.load('600 40px Sans');
  initThree();
  const mod = await import(`/videos/${name}/scene.js`);
  SC = await mod.default({ THREE, W, H, C, ease, prog, clamp, lerp, warmBg });
  window.SCENE_INFO = { duration: SC.duration };
  window.renderFrame = async t => { await frame(t); };
  window.grab = () => out.toDataURL('image/jpeg', 0.93);
}
