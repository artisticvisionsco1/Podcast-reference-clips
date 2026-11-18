// test01: Dr. David Perlmutter (source podcast, credited in caption) — 85 / flip of a coin / third leading cause / preventable / brain's destiny
import { brainScene, coinFlipScene, pedestalScene } from '/web/props3d.js';

// 2D card: rotating outline squares + big "#3" ranking (third leading cause of death)
function thirdCard(ctx, lt, { W, H, C, ease, prog, warmBg }) {
  warmBg(ctx, .5, .42, 1);
  ctx.save(); ctx.translate(W / 2, H * .42);
  for (let i = 0; i < 2; i++) {
    const k = ease.out(prog(lt, i * .12, .6)); ctx.save(); ctx.rotate((i ? .26 : -.12) + lt * (i ? -.05 : .04)); ctx.scale(.7 + .3 * k, .7 + .3 * k);
    ctx.globalAlpha = .55 * k; ctx.strokeStyle = '#e8b27a'; ctx.lineWidth = 3; ctx.strokeRect(-330, -330, 660, 660); ctx.restore();
  }
  // ranking bars: 1, 2, 3 (3 glowing)
  const bars = [[-220, 380, '1'], [0, 300, '2'], [220, 230, '3']];
  bars.forEach(([x, h, n], i) => {
    const k = ease.out(prog(lt, .2 + i * .15, .5)), hh = h * k;
    ctx.save(); ctx.globalAlpha = i === 2 ? 1 : .35;
    if (i === 2) { ctx.shadowColor = C.glow; ctx.shadowBlur = 50; }
    const g = ctx.createLinearGradient(0, 160 - hh, 0, 160); g.addColorStop(0, i === 2 ? '#ffb347' : '#7a5530'); g.addColorStop(1, i === 2 ? '#c14a00' : '#2a1a0c');
    ctx.fillStyle = g; ctx.fillRect(x - 70, 160 - hh, 140, hh);
    ctx.shadowBlur = 0; ctx.fillStyle = i === 2 ? '#fff' : '#d8c0a0'; ctx.font = '800 64px Sans'; ctx.textAlign = 'center'; ctx.globalAlpha *= k; ctx.fillText(n, x, 140 - hh + 10 + 60);
    ctx.restore();
  });
  ctx.restore();
}

export default async () => ({
  duration: 27.875,
  vignette: .55,
  shots: [
    { kind: 'face', t0: 0, t1: 2.6, src: 0, zoom: { from: 1.2, to: 1.28 }, focus: { x: .48, y: .2 } },
    { kind: '3d', t0: 2.6, t1: 4.85, build: brainScene, in: { type: 'whip', dur: .3 }, frames: { cy: .4, size: 700 } },
    { kind: 'face', t0: 4.85, t1: 6.95, src: 4.85, zoom: { from: 1.3, to: 1.36 }, focus: { x: .48, y: .2 }, in: { type: 'blur', dur: .17 }, leak: 1 },
    { kind: '3d', t0: 6.95, t1: 9.5, build: coinFlipScene, in: { type: 'whip', dur: .3 } },
    { kind: 'face', t0: 9.5, t1: 13.3, src: 9.5, zoom: { from: 1.2, to: 1.28 }, focus: { x: .48, y: .2 }, punch: [{ t: .65, s: 1.14 }], in: { type: 'blur', dur: .17 } },
    { kind: '2d', t0: 13.3, t1: 15.85, draw: thirdCard, in: { type: 'amber', dur: .4 } },
    { kind: 'face', t0: 15.85, t1: 17.6, src: 15.85, zoom: { from: 1.34, to: 1.4 }, focus: { x: .48, y: .2 }, in: { type: 'blur', dur: .17 }, leak: 1 },
    { kind: '3d', t0: 17.6, t1: 19.35, build: brainScene, in: { type: 'whip', dur: .3 }, frames: { cy: .4, size: 700 } },
    { kind: 'face', t0: 19.35, t1: 21.45, src: 19.35, zoom: { from: 1.2, to: 1.27 }, focus: { x: .48, y: .2 }, punch: [{ t: 1.42, s: 1.12 }], in: { type: 'blur', dur: .17 } },
    { kind: 'stack', t0: 21.45, t1: 24.1, cy: .4, in: { type: 'whip', dur: .3 }, cards: [{ dir: 'move', label: 'Movement', at: .05 }, { dir: 'sleep', label: 'Sleep', at: .55 }, { dir: 'food', label: 'Food', at: 1.05 }] },
    { kind: '3d', t0: 24.1, t1: 26.55, build: pedestalScene, in: { type: 'amber', dur: .4 } },
    { kind: 'clip', t0: 26.55, t1: 27.875, dir: 'destiny', speed: .7, zoom: { from: 1.02, to: 1.12 }, in: { type: 'whip', dur: .3 } },
  ],
  lockups: [
    { t0: .1, t1: 2.55, y: .64, lines: [[{ w: 'if you', k: 's', at: .1, pos: 'l' }, { w: 'live to be', k: 's', at: .45, pos: 'r' }], [{ w: 'age', k: 'fw', at: .95 }, { w: '85', k: 'bo', at: 1.25 }]] },
    { t0: 2.62, t1: 4.8, y: .79, lines: [[{ w: 'your risk of', k: 's', at: 2.62, pos: 'l' }, { w: 'developing', k: 's', at: 3.4, pos: 'r' }], [{ w: 'dementia', k: 'sc', at: 3.9 }]] },
    { t0: 4.86, t1: 6.9, y: .64, lines: [[{ w: 'and generally', k: 's', at: 4.86 }], [{ w: "Alzheimer's", k: 'bo', at: 5.32 }], [{ w: 'is close to', k: 's', at: 6.0 }]] },
    { t0: 6.97, t1: 9.45, y: .79, lines: [[{ w: 'a flip', k: 'fw', at: 7.0 }, { w: 'of a', k: 's', at: 7.24 }], [{ w: 'coin', k: 'sc', at: 7.5 }]] },
    { t0: 9.52, t1: 10.9, y: .64, lines: [[{ w: 'close to a', k: 's', at: 9.52, pos: 'l' }, { w: 'high', k: 's', at: 9.9, pos: 'r' }], [{ w: '40%', k: 'hl', at: 10.12 }]] },
    { t0: 10.96, t1: 13.25, y: .64, lines: [[{ w: 'in', k: 's', at: 10.96, pos: 'l' }], [{ w: 'America', k: 'fw', at: 11.2 }], [{ w: "Alzheimer's", k: 'bo', at: 12.42 }]] },
    { t0: 13.32, t1: 15.8, y: .8, lines: [[{ w: 'is the', k: 's', at: 13.32, pos: 'l' }, { w: 'leading', k: 's', at: 14.08, pos: 'r' }], [{ w: 'third', k: 'sc', at: 13.55 }], [{ w: 'cause of', k: 's', at: 14.36 }, { w: 'death', k: 'b', at: 15.0 }]] },
    { t0: 15.9, t1: 17.55, y: .64, lines: [[{ w: 'people', k: 's', at: 15.9, pos: 'l' }, { w: "don't", k: 's', at: 16.1, pos: 'r' }], [{ w: 'realize', k: 'bo', at: 16.42 }], [{ w: 'that', k: 's', at: 16.72 }]] },
    { t0: 17.62, t1: 19.3, y: .79, lines: [[{ w: 'and it is', k: 's', at: 17.62, pos: 'l' }, { w: 'largely', k: 's', at: 17.92, pos: 'r' }], [{ w: 'preventable', k: 'sc', at: 18.36 }]] },
    { t0: 19.45, t1: 21.4, y: .64, lines: [[{ w: 'my', k: 's', at: 19.5, pos: 'l' }], [{ w: 'mission', k: 'fw', at: 19.68 }], [{ w: 'is to message', k: 's', at: 19.96 }, { w: 'people', k: 'b', at: 20.8 }]] },
    { t0: 21.5, t1: 24.05, y: .91, maxW: .86, lines: [[{ w: "what you're", k: 's', at: 21.5 }, { w: 'doing', k: 'bo', at: 22.05 }, { w: 'at your age', k: 's', at: 22.3 }]] },
    { t0: 24.12, t1: 26.5, y: .8, lines: [[{ w: 'is', k: 's', at: 24.12, pos: 'l' }, { w: 'hugely', k: 's', at: 24.42, pos: 'r' }], [{ w: 'influential', k: 'sc', at: 25.15 }]] },
    { t0: 26.6, t1: 28.5, y: .74, lines: [[{ w: 'charting your', k: 's', at: 26.6 }], [{ w: "brain's", k: 'bo', at: 27.1 }], [{ w: 'destiny', k: 'sc', at: 27.42 }]] },
  ],
});
