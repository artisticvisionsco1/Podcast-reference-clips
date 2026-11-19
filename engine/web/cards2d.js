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
