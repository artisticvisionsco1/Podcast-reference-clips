// Animated 2D info cards for the warm cinematic style (this account only).
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const eOut = k => 1 - Math.pow(1 - clamp(k), 3), eIO = k => { k = clamp(k); return k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2; };
function glowLine(ctx, pts, k, w = 8, col = '#ffb347') {
  const n = Math.max(2, Math.floor(pts.length * k)); ctx.save(); ctx.lineJoin = ctx.lineCap = 'round';
  ctx.beginPath(); pts.slice(0, n).forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 40; ctx.strokeStyle = col; ctx.lineWidth = w; ctx.stroke();
  ctx.shadowBlur = 0; ctx.strokeStyle = '#fff3d6'; ctx.lineWidth = w * .35; ctx.stroke(); ctx.restore();
  return pts[n - 1];
}
function dot(ctx, x, y, r = 16) { ctx.save(); ctx.shadowColor = '#ff7a10'; ctx.shadowBlur = 50; ctx.fillStyle = '#fff1d0'; ctx.beginPath(); ctx.arc(x, y, r, 0, 7); ctx.fill(); ctx.restore(); }
function grid(ctx, x0, y0, w, h, a) { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(255,200,150,.12)'; ctx.lineWidth = 2; for (let i = 0; i <= 6; i++) { const y = y0 + h * i / 6; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x0 + w, y); ctx.stroke(); } ctx.restore(); }
const label = (ctx, t, x, y, px = 40, a = 1, al = 'center', w = 600) => { ctx.save(); ctx.globalAlpha = a; ctx.font = `${w} ${px}px Inter`; ctx.textAlign = al; ctx.fillStyle = '#f6e6d2'; ctx.fillText(t, x, y); ctx.restore(); };

// blood-sugar curve that draws on, then spikes after "poor sleep"
export function glucoseCard(ctx, lt, { W, H, warmBg }) {
  warmBg(ctx, .5, .4, 1.1);
  const x0 = 120, w = W - 240, y0 = H * .2, h = H * .32, a = eOut(lt / .4);
  grid(ctx, x0, y0, w, h, a);
  label(ctx, 'BLOOD SUGAR', x0, y0 - 30, 34, a, 'left', 700);
  const pts = []; for (let i = 0; i <= 120; i++) { const u = i / 120; let y = .62 + .05 * Math.sin(u * 14); if (u > .55) y -= .5 * eOut((u - .55) / .3) - .04 * Math.sin(u * 40); pts.push([x0 + u * w, y0 + h * y]); }
  const end = glowLine(ctx, pts, eIO(lt / 2.6)); dot(ctx, ...end);
  const sp = clamp((lt - 1.9) / .3); if (sp > 0) { ctx.save(); ctx.globalAlpha = sp; ctx.font = '800 64px "Inter Display"'; ctx.fillStyle = '#ffb347'; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 30; ctx.textAlign = 'right'; ctx.fillText('↑ SPIKE', x0 + w, y0 + h * .05); ctx.restore(); }
}
// one path splits into two: clear choice vs foggy choice
export function forkCard(ctx, lt, { W, H, warmBg }) {
  warmBg(ctx, .5, .45, 1.1);
  const cx = W / 2, yb = H * .62, yt = H * .16, k = eIO(lt / 1.6);
  const stem = []; for (let i = 0; i <= 40; i++) stem.push([cx, yb - (yb - H * .42) * i / 40]);
  glowLine(ctx, stem, clamp(k * 2.2), 10);
  if (k > .45) {
    const kk = (k - .45) / .55;
    const L = [], R = []; for (let i = 0; i <= 60; i++) { const u = i / 60; L.push([cx - 320 * Math.sin(u * 1.4) , H * .42 - (H * .42 - yt) * u]); R.push([cx + 320 * Math.sin(u * 1.4), H * .42 - (H * .42 - yt) * u]); }
    const e1 = glowLine(ctx, L, kk, 10); ctx.save(); ctx.globalAlpha = .45; const e2 = glowLine(ctx, R, kk, 10, '#b07a50'); ctx.restore();
    dot(ctx, ...e1); dot(ctx, ...e2, 10);
    label(ctx, 'clear', e1[0], e1[1] - 40, 46, kk, 'center', 700); label(ctx, 'foggy', e2[0], e2[1] - 40, 46, kk * .6, 'center', 700);
  }
  dot(ctx, cx, yb, 18);
}
// 8-hour hypnogram; a marker sweeps to 5.5 h; later deep-sleep blocks glow
export function hypnoCard(ctx, lt, { W, H, warmBg }, opt = {}) {
  warmBg(ctx, .5, .4, 1.1);
  const x0 = 110, w = W - 220, y0 = H * .2, h = H * .26, a = eOut(lt / .35);
  grid(ctx, x0, y0, w, h, a);
  const stages = ['AWAKE', 'REM', 'LIGHT', 'DEEP'];
  stages.forEach((s, i) => label(ctx, s, x0 - 8, y0 + h * (i / 3) + 12, 26, a * .7, 'left', 600));
  const seq = [0, 2, 3, 2, 1, 2, 2, 3, 2, 1, 2, 3, 3, 2, 1, 2, 3, 3, 3, 1, 0];
  const pts = []; seq.forEach((s, i) => { const xa = x0 + 110 + (w - 110) * i / seq.length, xb = x0 + 110 + (w - 110) * (i + 1) / seq.length, y = y0 + h * s / 3; pts.push([xa, y], [xb, y]); });
  glowLine(ctx, pts, eIO(lt / 1.4), 7);
  for (let i = 0; i <= 8; i++) label(ctx, String(i), x0 + 110 + (w - 110) * i / 8, y0 + h + 60, 32, a * .8, 'center', 600);
  label(ctx, 'HOURS ASLEEP', x0 + 110 + (w - 110) / 2, y0 + h + 110, 30, a * .6, 'center', 700);
  const target = opt.target ?? 5.5, mk = eIO((lt - .3) / 1.6), hrs = target * mk, mx = x0 + 110 + (w - 110) * hrs / 8;
  if (lt > .3) { ctx.save(); ctx.strokeStyle = 'rgba(255,190,120,.9)'; ctx.lineWidth = 4; ctx.setLineDash([14, 12]); ctx.beginPath(); ctx.moveTo(mx, y0 - 30); ctx.lineTo(mx, y0 + h + 20); ctx.stroke(); ctx.restore(); dot(ctx, mx, y0 - 30, 14);
    ctx.save(); ctx.font = '800 120px "Inter Display"'; ctx.textAlign = 'center'; const g = ctx.createLinearGradient(0, y0 - 220, 0, y0 - 110); g.addColorStop(0, '#ffe7a0'); g.addColorStop(1, '#ff7a00'); ctx.fillStyle = g; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 40;
    ctx.fillText(hrs.toFixed(1) + ' h', W / 2, y0 - 110); ctx.restore(); }
  if (opt.deep) { const k = clamp((lt - .2) / .6); seq.forEach((s, i) => { if (s === 3 && i > 10) { const xa = x0 + 110 + (w - 110) * i / seq.length, xb = x0 + 110 + (w - 110) * (i + 1) / seq.length; ctx.save(); ctx.globalAlpha = .35 * k * (.8 + .2 * Math.sin(lt * 6)); ctx.fillStyle = '#ff8a1a'; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 40; ctx.fillRect(xa, y0 + h * .78, xb - xa, h * .3); ctx.restore(); } }); }
}

// ---------- sugar01 cards ----------
const orangeGrad = (ctx, y0, y1) => { const g = ctx.createLinearGradient(0, y0, 0, y1); g.addColorStop(0, '#ffe7a0'); g.addColorStop(.5, '#ffb238'); g.addColorStop(1, '#ff6a00'); return g; };
function bigNum(ctx, txt, x, y, px, a = 1, al = 'center') {
  ctx.save(); ctx.globalAlpha = a; ctx.font = `800 ${px}px "Inter Display"`; ctx.textAlign = al;
  ctx.shadowColor = 'rgba(255,106,0,.9)'; ctx.shadowBlur = 50; ctx.fillStyle = '#ff7a10'; ctx.fillText(txt, x, y);
  ctx.shadowBlur = 0; ctx.fillStyle = orangeGrad(ctx, y - px * .8, y); ctx.fillText(txt, x, y); ctx.restore();
}
function pill(ctx, txt, x, y, k, hot = false) {
  if (k <= 0) return; const s = .6 + .4 * (1 + 2.7 * Math.pow(clamp(k) - 1, 3) + 1.7 * Math.pow(clamp(k) - 1, 2));
  ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = clamp(k * 3);
  ctx.font = '700 44px Inter'; const w = ctx.measureText(txt).width + 64, h = 84;
  ctx.shadowColor = hot ? 'rgba(255,106,0,.9)' : 'rgba(255,190,120,.35)'; ctx.shadowBlur = hot ? 50 : 24;
  ctx.fillStyle = hot ? orangeGrad(ctx, -h / 2, h / 2) : 'rgba(40,26,16,.9)'; ctx.beginPath(); ctx.roundRect(-w / 2, -h / 2, w, h, 42); ctx.fill();
  ctx.shadowBlur = 0; ctx.lineWidth = 3; ctx.strokeStyle = hot ? 'rgba(255,240,210,.8)' : 'rgba(255,190,120,.5)'; ctx.stroke();
  ctx.fillStyle = hot ? '#2a1204' : '#f6e6d2'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 2); ctx.restore();
}
// one teaspoon of sugar: a glowing spoon head with a white heap; k = pop-in progress
export function spoon(ctx, x, y, r, k, dim = false) {
  ctx.save(); ctx.translate(x, y);
  ctx.globalAlpha = dim ? .28 : 1;
  const s = dim ? 1 : .55 + .45 * (1 + 2.7 * Math.pow(clamp(k) - 1, 3) + 1.7 * Math.pow(clamp(k) - 1, 2));
  ctx.scale(s, s);
  ctx.strokeStyle = dim ? 'rgba(255,190,120,.6)' : '#ffd08a'; ctx.lineWidth = r * .14; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(r * .55, r * .55); ctx.lineTo(r * 1.5, r * 1.5); ctx.stroke();       // handle
  ctx.beginPath(); ctx.ellipse(0, 0, r * .78, r * .62, -Math.PI / 4, 0, 7);
  if (!dim) { ctx.shadowColor = 'rgba(255,120,20,.9)'; ctx.shadowBlur = r * 1.1; ctx.fillStyle = orangeGrad(ctx, -r, r); ctx.fill(); ctx.shadowBlur = 0;
    ctx.fillStyle = '#fff8ee'; ctx.beginPath(); ctx.ellipse(0, -r * .08, r * .56, r * .38, -Math.PI / 4, 0, 7); ctx.fill(); }
  else ctx.stroke();
  ctx.restore();
}
export function spoonRow(ctx, n, x0, y, gap, r, filled, at = []) {
  for (let i = 0; i < n; i++) spoon(ctx, x0 + i * gap, y, r, at[i] ?? 1, i >= filled);
}
// balance: vitamin C + fiber on the left can't offset 8 tsp of sugar on the right
export function scaleCard(ctx, lt, { W, H, warmBg }, o = {}) {
  warmBg(ctx, .5, .4, 1.1);
  const a = eOut(lt / .35), cx = W / 2, py = H * .2;
  const tilt = .28 * eOut((lt - (o.tip ?? 2.6)) / .9) + .04 * Math.sin(lt * 2) * (1 - eOut((lt - (o.tip ?? 2.6)) / .9));
  ctx.save(); ctx.globalAlpha = a;
  // post
  ctx.fillStyle = 'rgba(255,190,120,.25)'; ctx.fillRect(cx - 6, py, 12, H * .3);
  ctx.beginPath(); ctx.moveTo(cx - 120, py + H * .3); ctx.lineTo(cx + 120, py + H * .3); ctx.lineWidth = 10; ctx.strokeStyle = 'rgba(255,190,120,.35)'; ctx.stroke();
  dot(ctx, cx, py, 16);
  const L = 290, ends = [-1, 1].map(s => [cx + s * L * Math.cos(tilt), py + s * L * Math.sin(tilt)]);
  glowLine(ctx, [ends[0], [cx, py], ends[1]], 1, 9);
  ctx.restore();
  // pans hang from the ends
  const [lx, ly] = ends[0], [rx, ry] = ends[1];
  const pan = (x, y) => { ctx.save(); ctx.globalAlpha = a; ctx.strokeStyle = 'rgba(255,200,150,.45)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - 125, y + 230); ctx.moveTo(x, y); ctx.lineTo(x + 125, y + 230); ctx.stroke();
    glowLine(ctx, [[x - 150, y + 230], [x + 150, y + 230]], 1, 8); ctx.restore(); };
  pan(lx, ly); pan(rx, ry);
  pill(ctx, 'VITAMIN C', lx, ly + 180, (lt - (o.vc ?? .1)) / .3);
  pill(ctx, 'FIBER', lx, ly + 90, (lt - (o.fb ?? 1.2)) / .3);
  const sk = clamp((lt - .25) / .5);
  for (let i = 0; i < 8; i++) spoon(ctx, rx - 100 + (i % 4) * 64, ry + 200 - Math.floor(i / 4) * 60, 24, sk * 8 - i);
  label(ctx, '8 TSP SUGAR', rx, ry + 290, 38, sk, 'center', 800);
}
// counting teaspoons on top of footage (overlay); times: when spoon n is filled
export function countOverlay(times) {
  return (ctx, lt, { W, H }) => {
    const n = times.filter(t => lt >= t).length; if (!n) return;
    const y = H * .14, r = 30, gap = 104, x0 = W / 2 - gap * 3.5;
    ctx.save(); const g = ctx.createLinearGradient(0, 0, 0, H * .3); g.addColorStop(0, 'rgba(0,0,0,.55)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * .3); ctx.restore();
    spoonRow(ctx, 8, x0, y, gap, r, n, times.map(t => (lt - t) / .3));
    const last = times[n - 1]; const pk = clamp((lt - last) / .35);
    ctx.save(); ctx.translate(W / 2, y + 190); const s = 1.25 - .25 * eOut(pk); ctx.scale(s, s); bigNum(ctx, String(n), 0, 0, 150); ctx.restore();
    label(ctx, 'TEASPOONS', W / 2, y + 250, 34, 1, 'center', 800);
  };
}
// OJ (8 tsp) vs a can of soda (10 tsp); o.oj / o.soda: per-spoon pop times (local s)
export function sodaCard(ctx, lt, { W, H, warmBg }, o = {}) {
  warmBg(ctx, .5, .4, 1.1);
  const a = eOut(lt / .3), gap = 92, r = 26, x0 = W / 2 - gap * 4.5;
  const row = (name, y, times, ra) => {
    ctx.save(); ctx.globalAlpha = ra;
    label(ctx, name, x0 - r, y - 70, 40, 1, 'left', 800);
    let n = 0;
    for (let i = 0; i < 10; i++) { const t = times[i]; const on = t != null && lt >= t; if (on) n++; spoon(ctx, x0 + i * gap, y, r, on ? (lt - t) / .28 : 0, !on); }
    const last = times[n - 1] ?? 0, pk = clamp((lt - last) / .3);
    ctx.save(); ctx.translate(x0 + gap * 9 + r, y - 50); const s = 1.2 - .2 * eOut(pk); ctx.scale(s, s); bigNum(ctx, String(n), 0, 0, 96, 1, 'right'); ctx.restore();
    ctx.restore();
  };
  row('ORANGE JUICE', H * .2, o.oj, a);
  const st = o.soda[0] - .2; if (lt > st) row('CAN OF SODA', H * .36, o.soda, eOut((lt - st) / .3));
}
// sauce label: a bottle whose sugar gauge fills to pct; big % counter; optional "FAT-FREE" badge
export function labelCard(name, lo, hi, o = {}) {
  return (ctx, lt, { W, H, warmBg }) => {
    warmBg(ctx, .5, .38, 1.1);
    const a = eOut(lt / .3), cx = W / 2, top = H * .1, bw = 300, bh = 520, by = top + 150;
    ctx.save(); ctx.globalAlpha = a;
    // bottle outline
    const path = () => { ctx.beginPath(); ctx.moveTo(cx - 50, top + 20); ctx.lineTo(cx + 50, top + 20); ctx.lineTo(cx + 50, top + 110); ctx.quadraticCurveTo(cx + bw / 2, top + 140, cx + bw / 2, by + 40); ctx.lineTo(cx + bw / 2, by + bh); ctx.quadraticCurveTo(cx + bw / 2, by + bh + 20, cx + bw / 2 - 30, by + bh + 20); ctx.lineTo(cx - bw / 2 + 30, by + bh + 20); ctx.quadraticCurveTo(cx - bw / 2, by + bh + 20, cx - bw / 2, by + bh); ctx.lineTo(cx - bw / 2, by + 40); ctx.quadraticCurveTo(cx - bw / 2, top + 140, cx - 50, top + 110); ctx.closePath(); };
    const fk = eIO((lt - .25) / 1.4), pct = lo + (hi - lo) * .5, fillTop = by + bh + 20 - (bh + 20) * (pct / 100) * fk;
    ctx.save(); path(); ctx.clip(); ctx.fillStyle = 'rgba(60,30,14,.9)'; ctx.fillRect(0, 0, W, H);
    const g = ctx.createLinearGradient(0, fillTop, 0, by + bh + 20); g.addColorStop(0, '#fff6e6'); g.addColorStop(.15, '#ffd9a0'); g.addColorStop(1, '#ff9a30'); ctx.fillStyle = g;
    ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 40; ctx.fillRect(0, fillTop + Math.sin(lt * 5) * 3, W, H); ctx.restore();
    path(); ctx.lineWidth = 6; ctx.strokeStyle = '#ffd08a'; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 30; ctx.stroke(); ctx.shadowBlur = 0;
    // label band
    ctx.fillStyle = 'rgba(20,12,8,.82)'; ctx.fillRect(cx - bw / 2 + 14, by + 120, bw - 28, 150);
    ctx.font = '800 34px Inter'; ctx.fillStyle = '#f6e6d2'; ctx.textAlign = 'center';
    name.split('\n').forEach((s, i, arr) => ctx.fillText(s, cx, by + 195 - (arr.length - 1) * 20 + i * 42));
    // dashed level line + pct
    ctx.setLineDash([12, 10]); ctx.strokeStyle = 'rgba(255,220,170,.8)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(cx + bw / 2 + 10, fillTop); ctx.lineTo(cx + bw / 2 + 90, fillTop); ctx.stroke(); ctx.setLineDash([]);
    ctx.restore();
    const v = fk; const txt = lo === hi ? `${Math.round(lo * v)}%` : `${Math.round(lo * v)}–${Math.round(hi * v)}%`;
    bigNum(ctx, txt, cx, by + bh + 190, 150, a);
    label(ctx, 'SUGAR', cx, by + bh + 250, 40, a * clamp((lt - .6) / .3), 'center', 800);
    if (o.badge) { const bk = (lt - (o.badgeAt ?? .5)) / .3; if (bk > 0) { ctx.save(); ctx.translate(cx - bw / 2 - 20, by + 60); ctx.rotate(-.18); pill(ctx, o.badge, 0, 0, bk, true); ctx.restore(); }
      if (o.cross != null && lt > o.cross) { const ck = eOut((lt - o.cross) / .25); ctx.save(); ctx.translate(cx - bw / 2 - 20, by + 60); ctx.rotate(-.18); ctx.strokeStyle = '#fff'; ctx.lineWidth = 9; ctx.shadowColor = '#000'; ctx.shadowBlur = 12; ctx.beginPath(); ctx.moveTo(-150, 0); ctx.lineTo(-150 + 300 * ck, 0); ctx.stroke(); ctx.restore(); } }
  };
}
// A1C gauge: normal < 5.7 %, prediabetes 5.7–6.4 %, diabetes >= 6.5 % (American Diabetes Association)
export function a1cCard(ctx, lt, { W, H, warmBg }) {
  warmBg(ctx, .5, .4, 1.1);
  const a = eOut(lt / .3), x0 = 110, w = W - 220, y = H * .3, lo = 4, hi = 9;
  const X = v => x0 + w * (v - lo) / (hi - lo);
  label(ctx, 'A1C BLOOD TEST', W / 2, H * .1, 46, a, 'center', 800);
  label(ctx, 'your average blood sugar · last 3 months', W / 2, H * .1 + 56, 32, a * .75, 'center', 500);
  const zones = [[lo, 5.7, 'rgba(255,220,170,.25)', 'NORMAL'], [5.7, 6.5, 'rgba(255,160,60,.55)', 'PRE-'], [6.5, hi, 'rgba(255,90,10,.85)', 'DIABETES']];
  zones.forEach(([s, e, c, n], i) => { const k = clamp((lt - .15 - i * .2) / .35); ctx.save(); ctx.globalAlpha = k; ctx.fillStyle = c; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = i ? 30 : 0; ctx.beginPath(); ctx.roundRect(X(s) + 3, y, X(e) - X(s) - 6, 46, 23); ctx.fill(); ctx.restore();
    label(ctx, n, (X(s) + X(e)) / 2, y + 110, 30, k, 'center', 800); });
  label(ctx, 'DIABETES', (X(5.7) + X(6.5)) / 2, y + 146, 24, clamp((lt - .55) / .35) * .9, 'center', 700);
  [5.7, 6.5].forEach((v, i) => label(ctx, v + '%', X(v), y - 22, 34, clamp((lt - .5 - i * .2) / .3), 'center', 800));
  const mk = eIO((lt - .9) / 1.6), v = 5.0 + 1.8 * mk, mx = X(v);
  if (lt > .9) { ctx.save(); ctx.strokeStyle = '#fff3d6'; ctx.lineWidth = 5; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 30; ctx.beginPath(); ctx.moveTo(mx, y - 70); ctx.lineTo(mx, y + 70); ctx.stroke(); ctx.restore(); dot(ctx, mx, y - 70, 16);
    bigNum(ctx, v.toFixed(1) + '%', W / 2, y + 330, 150); }
}

// ---------- podcast02 (Bernie Sanders) generic cards ----------
const eBk = k => { k = clamp(k); return 1 + 2.7 * Math.pow(k - 1, 3) + 1.7 * Math.pow(k - 1, 2); };
// pictogram person (male silhouette: round head + shoulders), lit = glowing orange, else dim outline
export function person2d(ctx, x, y, s, lit, k = 1) {
  ctx.save(); ctx.translate(x, y); const sc = lit ? .7 + .3 * eBk(k) : 1; ctx.scale(s * sc, s * sc);
  ctx.beginPath(); ctx.arc(0, -46, 22, 0, 7); ctx.moveTo(-40, 30); ctx.quadraticCurveTo(-40, -16, 0, -16); ctx.quadraticCurveTo(40, -16, 40, 30); ctx.closePath();
  if (lit) { ctx.shadowColor = 'rgba(255,106,0,.9)'; ctx.shadowBlur = 40; ctx.fillStyle = orangeGrad(ctx, -70, 30); ctx.fill(); }
  else { ctx.lineWidth = 3.5; ctx.strokeStyle = 'rgba(255,200,150,.35)'; ctx.stroke(); }
  ctx.restore();
}
// counter: number counts up with ease-out; o = {to, at, dur, pre, suf, dec, label, sub, y}
export function counterCard(o) {
  return (ctx, lt, { W, H, warmBg }) => {
    warmBg(ctx, .5, .36, 1.1);
    const a = eOut(lt / .3), k = eOut((lt - (o.at ?? .1)) / (o.dur ?? 1.2)), y = H * (o.y ?? .3);
    if (o.label) label(ctx, o.label, W / 2, y - 230, 50, a, 'center', 800);
    const v = (o.from ?? 0) + (o.to - (o.from ?? 0)) * k;
    const txt = (o.pre ?? '') + (o.dec ? v.toFixed(o.dec) : Math.round(v).toLocaleString('en-US')) + (o.suf ?? '');
    const pk = clamp((lt - (o.at ?? .1) - (o.dur ?? 1.2)) / .3);
    ctx.save(); ctx.translate(W / 2, y); const s = 1 + .08 * Math.sin(pk * Math.PI); ctx.scale(s, s); bigNum(ctx, txt, 0, 0, o.px ?? 240, a); ctx.restore();
    if (o.sub) label(ctx, o.sub, W / 2, y + 90, 50, clamp((lt - (o.subAt ?? 1)) / .3), 'center', 700);
    if (o.sub2) { const k2 = clamp((lt - o.sub2At) / .35); ctx.save(); ctx.globalAlpha = k2; pill(ctx, o.sub2, W / 2, y + 190, k2 * 1.2, true); ctx.restore(); }
    if (o.dots) dotsField(ctx, lt, W, H, o.dots);
  };
}
// a field of dots with a few lit ones (e.g. 2,000 billionaires among everyone)
function dotsField(ctx, lt, W, H, o) {
  const cols = 26, rows = o.rows ?? 9, gx = (W - 160) / (cols - 1), y0 = H * (o.y ?? .44), a = clamp((lt - (o.at ?? .4)) / .5);
  let sd = 11; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) { const lit = rnd() < .012; ctx.save(); ctx.globalAlpha = a * (lit ? 1 : .35);
    ctx.fillStyle = lit ? '#ffb238' : 'rgba(255,220,190,.5)'; if (lit) { ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 24; }
    ctx.beginPath(); ctx.arc(80 + c * gx, y0 + r * gx, lit ? 11 : 6, 0, 7); ctx.fill(); ctx.restore(); }
}
// list: rows appear at their time; o.tag = stamp text per row (e.g. 'BASED ON A LIE'); o.check = tick icons
export function listCard(o) {
  return (ctx, lt, { W, H, warmBg }) => {
    warmBg(ctx, .5, .38, 1.1);
    const a = eOut(lt / .3), x0 = 130, gap = o.gap ?? 150, y0 = H * (o.y ?? .17);
    if (o.title) label(ctx, o.title, W / 2, y0 - 40, 50, a, 'center', 800);
    o.items.forEach((it, i) => {
      const k = (lt - it.t) / .35; if (k <= 0) { if (o.ghost) { ctx.save(); ctx.globalAlpha = .18 * a; ctx.font = '800 54px "Inter Display"'; ctx.fillStyle = '#f6e6d2'; ctx.fillText(it.text, x0 + 90, y0 + 60 + i * gap); ctx.restore(); } return; }
      const y = y0 + 60 + i * gap, ke = eOut(k);
      ctx.save(); ctx.globalAlpha = ke; ctx.translate((1 - ke) * 60, 0);
      if (o.check !== false) { ctx.save(); ctx.translate(x0 + 30, y - 18); ctx.scale(eBk(k), eBk(k)); ctx.beginPath(); ctx.arc(0, 0, 30, 0, 7); ctx.fillStyle = orangeGrad(ctx, -30, 30); ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 30; ctx.fill();
        ctx.shadowBlur = 0; ctx.strokeStyle = '#2a1204'; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-13, 0); ctx.lineTo(-3, 10); ctx.lineTo(14, -10); ctx.stroke(); ctx.restore(); }
      ctx.font = `800 ${it.px ?? 64}px "Inter Display"`; ctx.fillStyle = '#fffaf2'; ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 16; ctx.fillText(it.text, x0 + 90, y);
      if (it.sub) { ctx.font = '600 34px Inter'; ctx.fillStyle = 'rgba(255,220,180,.8)'; ctx.fillText(it.sub, x0 + 90, y + 46); }
      ctx.restore();
      if (o.tag && it.tagAt != null) { const tk = (lt - it.tagAt) / .3; if (tk > 0) { ctx.save(); ctx.translate(W - 210, y - 18); ctx.rotate(-.12); pill(ctx, o.tag, 0, 0, tk, true); ctx.restore(); } }
    });
  };
}
// horizontal bars (relative, no numbers unless given)
export function barsCard(o) {
  return (ctx, lt, { W, H, warmBg }) => {
    warmBg(ctx, .5, .38, 1.1);
    const a = eOut(lt / .3), x0 = 110, w = W - 220, y0 = H * (o.y ?? .16);
    if (o.title) label(ctx, o.title, W / 2, y0, 40, a, 'center', 800);
    o.bars.forEach((b, i) => {
      const k = eIO((lt - (b.t ?? 0)) / .6), y = y0 + 80 + i * 150;
      label(ctx, b.label, x0, y, 38, clamp((lt - (b.t ?? 0)) / .25), 'left', 800);
      ctx.save(); ctx.fillStyle = 'rgba(255,200,150,.1)'; ctx.beginPath(); ctx.roundRect(x0, y + 24, w, 46, 23); ctx.fill();
      ctx.fillStyle = b.hot ? orangeGrad(ctx, y + 24, y + 70) : 'rgba(255,230,200,.75)'; if (b.hot) { ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 36; }
      ctx.beginPath(); ctx.roundRect(x0, y + 24, Math.max(46, w * b.v * k), 46, 23); ctx.fill(); ctx.restore();
      if (b.note) label(ctx, b.note, x0 + w, y, 34, clamp((lt - (b.t ?? 0) - .5) / .3), 'right', 700);
    });
  };
}
// row of person pictograms that light up one by one; o = {n, times:[...], labels?, hot?:index, title}
export function peopleRowCard(o) {
  return (ctx, lt, { W, H, warmBg }) => {
    warmBg(ctx, .5, .36, 1.1);
    const a = eOut(lt / .3), n = o.n, gap = (W - 200) / (n - 1), y = H * (o.y ?? .3);
    if (o.title) label(ctx, o.title, W / 2, y - 150, 42, a, 'center', 800);
    for (let i = 0; i < n; i++) { const t = o.times[i]; const lit = t != null && lt >= t && !(o.off && o.off[i] != null && lt >= o.off[i]); ctx.save(); ctx.globalAlpha = a; person2d(ctx, 100 + i * gap, y, o.s ?? 1.1, lit, lit ? (lt - t) / .3 : 0); ctx.restore();
      if (o.labels && o.labels[i] && lit) label(ctx, o.labels[i], 100 + i * gap, y + 80, 30, clamp((lt - t) / .3), 'center', 800); }
    if (o.hot != null && lt > o.hotAt) { const k = clamp((lt - o.hotAt) / .3); const x = 100 + o.hot * gap; ctx.save(); ctx.globalAlpha = k; ctx.strokeStyle = '#ffd08a'; ctx.lineWidth = 5; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 40; ctx.beginPath(); ctx.arc(x, y - 16, 90 * (1.3 - .3 * eOut(k)), 0, 7); ctx.stroke(); ctx.restore();
      if (o.hotLabel) pill(ctx, o.hotLabel, x, y + 150, k * 1.3, true); }
  };
}
// two nodes linked by a pulsing line (A vs B); o = {a, b, link, at, years?}
export function nodesCard(o) {
  return (ctx, lt, { W, H, warmBg }) => {
    warmBg(ctx, .5, .34, 1.1);
    const al = eOut(lt / .3), y = H * .28, xa = W * .24, xb = W * .76;
    const node = (x, txt, k) => { if (k <= 0) return; ctx.save(); ctx.globalAlpha = clamp(k * 2); ctx.translate(x, y); ctx.scale(eBk(k), eBk(k));
      ctx.beginPath(); ctx.arc(0, 0, 120, 0, 7); ctx.fillStyle = 'rgba(40,24,14,.9)'; ctx.fill(); ctx.lineWidth = 6; ctx.strokeStyle = '#ffb347'; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 40; ctx.stroke();
      ctx.shadowBlur = 0; ctx.font = '800 50px "Inter Display"'; ctx.fillStyle = '#fffaf2'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(txt, 0, 2); ctx.restore(); };
    node(xa, o.a, (lt - .1) / .35); node(xb, o.b, (lt - (o.bAt ?? .5)) / .35);
    const lk = eIO((lt - (o.at ?? .9)) / .6);
    if (lk > 0) { const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40; pts.push([xa + 125 + (xb - xa - 250) * u, y + Math.sin(u * Math.PI * 6 + lt * 8) * 10 * lk]); } glowLine(ctx, pts, lk, 7);
      if (o.link) label(ctx, o.link, W / 2, y - 60, 36, lk, 'center', 800); }
    if (o.years != null) { const yk = eOut((lt - o.yearsAt) / 1.0); if (lt > o.yearsAt) { bigNum(ctx, Math.round(o.years * yk) + ' YEARS', W / 2, y + 330, 150, clamp((lt - o.yearsAt) / .3)); } }
  };
}
// highway: a truck rolls down a glowing road; empty cab with 'NO DRIVER'
export function truckCard(ctx, lt, { W, H, warmBg }) {
  warmBg(ctx, .5, .4, 1.1);
  const a = eOut(lt / .3), hz = H * .2, by = H * .5;
  ctx.save(); ctx.globalAlpha = a;
  for (const s of [-1, 1]) glowLine(ctx, [[W / 2 + s * 40, hz], [W / 2 + s * 470, by]], 1, 5, '#b07a50');
  for (let i = 0; i < 8; i++) { const u = ((i / 8 + lt * .35) % 1), y = hz + (by - hz) * u * u, h = 8 + 50 * u * u; ctx.fillStyle = `rgba(255,190,110,${.25 + .6 * u})`; ctx.fillRect(W / 2 - 3 - u * 4, y, 6 + u * 8, h); }
  ctx.restore();
  // truck (front view) grows as it approaches
  const u = clamp(.25 + lt * .12, 0, .75), s = .35 + u * 1.1, ty = hz + (by - hz) * u * u + 10;
  ctx.save(); ctx.globalAlpha = a; ctx.translate(W / 2, ty); ctx.scale(s, s);
  ctx.fillStyle = 'rgba(30,18,10,.95)'; ctx.strokeStyle = '#ffd08a'; ctx.lineWidth = 5; ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 30;
  ctx.beginPath(); ctx.roundRect(-150, -260, 300, 250, 24); ctx.fill(); ctx.stroke();                 // cab
  ctx.fillStyle = 'rgba(255,200,140,.12)'; ctx.beginPath(); ctx.roundRect(-120, -235, 240, 100, 12); ctx.fill(); ctx.stroke(); // windshield (empty)
  ctx.shadowBlur = 50; ctx.fillStyle = '#fff1d0'; for (const s2 of [-1, 1]) { ctx.beginPath(); ctx.arc(s2 * 95, -60, 22, 0, 7); ctx.fill(); }
  ctx.restore();
  const k = (lt - .8) / .3; if (k > 0) pill(ctx, 'NO DRIVER', W / 2, H * .1, k, true);
}

// hook headline banner pinned at the top (overlay on any shot)
export function bannerOverlay(text, t1, t0 = 0) {
  return (ctx, lt, { W, H }) => {
    const k = (lt - t0) / .35, out = clamp((lt - t1 + .3) / .3); if (k <= 0 || out >= 1) return;
    ctx.save(); ctx.globalAlpha = 1 - out;
    const g = ctx.createLinearGradient(0, 0, 0, H * .22); g.addColorStop(0, 'rgba(0,0,0,.6)'); g.addColorStop(1, 'rgba(0,0,0,0)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H * .22);
    ctx.font = '800 58px "Inter Display"'; const w = Math.min(W - 80, ctx.measureText(text).width + 80);
    ctx.translate(W / 2, H * .1); const s = .7 + .3 * eBk(k); ctx.scale(s, s);
    ctx.shadowColor = 'rgba(255,106,0,.85)'; ctx.shadowBlur = 50; ctx.fillStyle = orangeGrad(ctx, -50, 50); ctx.beginPath(); ctx.roundRect(-w / 2, -52, w, 104, 22); ctx.fill();
    ctx.shadowBlur = 0; ctx.fillStyle = '#1e0d03'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
    const fit = Math.min(1, (w - 60) / ctx.measureText(text).width); ctx.font = `800 ${Math.floor(58 * fit)}px "Inter Display"`; ctx.fillText(text, 0, 3);
    ctx.restore();
  };
}
