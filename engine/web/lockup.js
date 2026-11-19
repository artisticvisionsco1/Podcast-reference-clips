// Kinetic caption lockups in the warm cinematic style (this account only).
// L = {t0, t1, y, lines:[[run,...],...], maxW?}
// run = {w, k, at, pos?}  k: s | b | bo | sc | fw | hl ;  pos: 'l' | 'r' pins a run to the left/right edge of the widest row
//   s  small Poppins 500 white          b  bold Poppins 800 white (pop)
//   bo bold Poppins 700 orange gradient sc brush script (Kaushan) orange gradient, write-on
//   fw fancy script (Pinyon) white, write-on   hl Poppins 800 white typed into an orange box
const KIND = {
  s:  { font: '600 {px}px Inter', px: 60, lh: 1.0, dur: .16 },
  b:  { font: '800 {px}px "Inter Display"', px: 132, lh: .92, dur: .26 },
  bo: { font: '800 {px}px "Inter Display"', px: 138, lh: .92, dur: .26 },
  sc: { font: '400 {px}px Brush', px: 176, lh: .8, dur: .34 },
  fw: { font: '400 {px}px Fancy', px: 160, lh: .8, dur: .34 },
  hl: { font: '800 {px}px "Inter Display"', px: 138, lh: 1.12, dur: .5 },
};
const font = (k, s) => KIND[k].font.replace('{px}', Math.round(KIND[k].px * s));
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const eOut = k => 1 - Math.pow(1 - clamp(k), 3);
const eBack = k => { k = clamp(k); const c = 1.7; return 1 + (c + 1) * Math.pow(k - 1, 3) + c * Math.pow(k - 1, 2); };

let layer, lctx, tmp, tctx;
function canvases(W, H) {
  if (!layer) { layer = document.createElement('canvas'); layer.width = W; layer.height = H; lctx = layer.getContext('2d');
    tmp = document.createElement('canvas'); tmp.width = 1400; tmp.height = 520; tctx = tmp.getContext('2d'); }
}
function orange(ctx, y0, y1) {
  const g = ctx.createLinearGradient(0, y0, 0, y1);
  g.addColorStop(0, '#ffe7a0'); g.addColorStop(.45, '#ffb238'); g.addColorStop(1, '#ff6a00'); return g;
}
// draw text with shadow + glow + fill into ctx at (x, base)
function paint(ctx, r, x, base, s, glowK = 1) {
  const K = KIND[r.k], px = K.px * s; ctx.font = font(r.k, s); ctx.textBaseline = 'alphabetic';
  const isOr = r.k === 'bo' || r.k === 'sc';
  // readability shadow
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,.65)'; ctx.shadowBlur = 26 * s; ctx.shadowOffsetY = 8 * s; ctx.fillStyle = 'rgba(0,0,0,.35)'; ctx.fillText(r.w, x, base); ctx.restore();
  if (isOr) {
    ctx.save(); ctx.shadowColor = `rgba(255,106,0,${.95 * glowK})`; ctx.shadowBlur = 46 * s; ctx.fillStyle = '#ff7a10'; ctx.fillText(r.w, x, base); ctx.restore();
    ctx.fillStyle = orange(ctx, base - px * .78, base + px * .08); ctx.fillText(r.w, x, base);
  } else if (r.k === 'fw') {
    ctx.save(); ctx.shadowColor = `rgba(255,210,160,${.7 * glowK})`; ctx.shadowBlur = 26 * s; ctx.fillStyle = '#fff'; ctx.fillText(r.w, x, base); ctx.restore();
  } else {
    ctx.save(); ctx.shadowColor = `rgba(255,190,120,${(r.k === 'b' ? .55 : .25) * glowK})`; ctx.shadowBlur = (r.k === 'b' ? 30 : 14) * s; ctx.fillStyle = '#fffaf2'; ctx.fillText(r.w, x, base); ctx.restore();
  }
}

export function drawLockup(ctx, L, t, W, H) {
  if (t < L.t0 - .05 || t > L.t1 + .22) return;
  canvases(W, H);
  // measure at scale 1, then fit the widest row into maxW
  const m = document.createElement('canvas').getContext('2d');
  const meas = (r, s) => { m.font = font(r.k, s); return m.measureText(r.w).width; };
  const gap = k => (k === 's' ? 16 : 20);
  const rowW = (row, s) => row.filter(r => !r.pos).reduce((a, r, i, arr) => a + meas(r, s) + (i ? gap(r.k) * s : 0), 0);
  const posW = (row, s) => { const p = row.filter(r => r.pos); return p.length ? p.reduce((a, r) => a + meas(r, s), 0) + (p.length > 1 ? 70 * s : 0) : 0; };
  const w1 = Math.max(...L.lines.map(row => Math.max(rowW(row, 1), posW(row, 1))), 1);
  const s = clamp((L.maxW ?? .74) * W / w1, .5, L.maxScale ?? 1.0);
  const wMax = w1 * s;
  const rows = L.lines.map(row => ({ row, h: Math.max(...row.map(r => KIND[r.k].px * KIND[r.k].lh)) * s }));
  const total = rows.reduce((a, r) => a + r.h, 0);
  const cx = W / 2, cy = H * Math.min(L.y ?? .63, .68);  // TikTok safe zone: keep captions above the bottom UI
  lctx.setTransform(1, 0, 0, 1, 0, 0); lctx.clearRect(0, 0, W, H);
  let y = cy - total / 2;
  for (const { row, h } of rows) {
    const base = y + h * .82;
    const inline = row.filter(r => !r.pos); let x = cx - rowW(row, s) / 2;
    for (const r of row) {
      const wd = meas(r, s);
      let rx = r.pos === 'l' ? cx - wMax / 2 : r.pos === 'r' ? cx + wMax / 2 - wd : x;
      if (!r.pos) x += wd + gap(r.k) * s;
      run(r, rx, base, wd, t, s);
    }
    y += h;
  }
  // whole-lockup drift + exit (blur, fade, push)
  const life = clamp((t - L.t0) / Math.max(.5, L.t1 - L.t0));
  const ex = clamp((t - L.t1) / .2);
  const z = 1 + .04 * life + .06 * eOut(ex);
  ctx.save();
  ctx.globalAlpha = 1 - ex; if (ex > 0) ctx.filter = `blur(${ex * 10}px)`;
  ctx.translate(cx, cy); ctx.scale(z, z); ctx.translate(-cx, -cy);
  ctx.drawImage(layer, 0, 0); ctx.restore();
}

function run(r, x, base, wd, t, s) {
  const K = KIND[r.k]; const k = clamp((t - r.at) / K.dur); if (k <= 0) return;
  const c = lctx, px = K.px * s;
  if (r.k === 's') {
    c.save(); c.globalAlpha = eOut(k); paint(c, r, x, base + 18 * s * (1 - eOut(k)), s); c.restore();
  } else if (r.k === 'b' || r.k === 'bo') {
    const sc = 1.38 - .38 * eBack(k);
    c.save(); c.globalAlpha = clamp(k * 3); c.translate(x + wd / 2, base - px * .35); c.scale(sc, sc); c.translate(-(x + wd / 2), -(base - px * .35));
    paint(c, r, x, base, s, 1 + (1 - k) * 1.2); c.restore();
  } else if (r.k === 'sc' || r.k === 'fw') {
    // feathered write-on wipe, rendered via tmp canvas
    const mx = 120 * s, my = px * .75;
    tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, tmp.width, tmp.height);
    paint(tctx, r, mx, my + px * .2 + 40, s, 1 + (1 - k));
    const e = eOut(k), edge = (wd + mx * 2) * e, f = 90 * s;
    tctx.globalCompositeOperation = 'destination-in';
    const g = tctx.createLinearGradient(edge - f, 0, edge, 0); g.addColorStop(0, 'rgba(0,0,0,1)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    tctx.fillStyle = g; tctx.fillRect(0, 0, tmp.width, tmp.height); tctx.globalCompositeOperation = 'source-over';
    c.drawImage(tmp, x - mx, base - (my + px * .2 + 40));
  } else if (r.k === 'hl') {
    const pad = 26 * s, bh = px * 1.02, by = base - px * .84;
    const bk = eOut(k / .3);
    c.save(); c.shadowColor = 'rgba(255,106,0,.9)'; c.shadowBlur = 60 * s;
    c.fillStyle = orange(c, by, by + bh); c.fillRect(x - pad, by, (wd + pad * 2) * bk, bh); c.restore();
    const n = Math.ceil(r.w.length * clamp((k - .25) / .75));
    if (n > 0) { c.save(); c.font = font('hl', s); c.fillStyle = '#fff'; c.shadowColor = 'rgba(120,40,0,.6)'; c.shadowBlur = 12 * s; c.fillText(r.w.slice(0, n), x, base); c.restore(); }
  }
}
