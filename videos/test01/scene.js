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
  vignette: .5,
  shots: [
    { kind: 'face', t0: 0, t1: 2.6, src: 0, zoom: { from: 1.12, to: 1.18 }, focus: { x: .48, y: .2 } },
    { kind: '3d', t0: 2.6, t1: 4.85, build: brainScene, in: { type: 'whip', dur: .3 } },
    { kind: 'face', t0: 4.85, t1: 6.95, src: 4.85, zoom: { from: 1.25, to: 1.3 }, focus: { x: .48, y: .2 }, in: { type: 'blur', dur: .17 } },
    { kind: '3d', t0: 6.95, t1: 9.5, build: coinFlipScene, in: { type: 'whip', dur: .3 } },
    { kind: 'face', t0: 9.5, t1: 13.3, src: 9.5, zoom: { from: 1.12, to: 1.2 }, focus: { x: .48, y: .2 }, punch: [{ t: 2.95, s: 1.12 }], in: { type: 'blur', dur: .17 } },
    { kind: '2d', t0: 13.3, t1: 15.85, draw: thirdCard, in: { type: 'amber', dur: .4 } },
    { kind: 'face', t0: 15.85, t1: 17.6, src: 15.85, zoom: { from: 1.3, to: 1.36 }, focus: { x: .48, y: .2 }, in: { type: 'blur', dur: .17 } },
    { kind: '3d', t0: 17.6, t1: 19.35, build: brainScene, in: { type: 'whip', dur: .3 } },
    { kind: 'face', t0: 19.35, t1: 24.1, src: 19.35, zoom: { from: 1.12, to: 1.22 }, focus: { x: .48, y: .2 }, punch: [{ t: 2.73, s: 1.12 }], in: { type: 'blur', dur: .17 } },
    { kind: '3d', t0: 24.1, t1: 26.55, build: pedestalScene, in: { type: 'amber', dur: .4 } },
    { kind: 'face', t0: 26.55, t1: 27.875, src: 26.55, zoom: { from: 1.25, to: 1.3 }, focus: { x: .48, y: .2 }, in: { type: 'blur', dur: .17 } },
  ],
  lockups: [
    { t0: .1, t1: 2.55, y: .62, lines: [[{ w: 'if you live to be', k: 's', at: .1 }], [{ w: 'age', k: 's', at: 1.04 }, { w: '85', k: 'b', at: 1.3 }]] },
    { t0: 2.68, t1: 4.8, y: .8, lines: [[{ w: 'your risk of', k: 's', at: 2.68 }, { w: 'developing', k: 's', at: 3.44 }], [{ w: 'dementia', k: 'sc', at: 3.96 }]] },
    { t0: 4.88, t1: 6.9, y: .62, lines: [[{ w: 'and generally', k: 's', at: 4.88 }], [{ w: "Alzheimer's", k: 'b', at: 5.38 }], [{ w: 'is close to', k: 's', at: 6.04 }]] },
    { t0: 7.0, t1: 9.45, y: .8, lines: [[{ w: 'a', k: 's', at: 6.98 }, { w: 'flip', k: 'b', at: 7.04 }, { w: 'of a', k: 's', at: 7.24 }], [{ w: 'coin', k: 'sc', at: 7.54 }]] },
    { t0: 9.55, t1: 10.85, y: .62, lines: [[{ w: 'close to a', k: 's', at: 9.16 + .4 }, { w: 'high', k: 's', at: 9.92 }], [{ w: '40%', k: 'hl', at: 10.2 }]] },
    { t0: 10.96, t1: 13.25, y: .62, lines: [[{ w: 'in', k: 's', at: 10.96 }, { w: 'America', k: 'scw', at: 11.24 }], [{ w: "Alzheimer's", k: 'b', at: 12.46 }]] },
    { t0: 13.4, t1: 15.8, y: .76, lines: [[{ w: 'is the', k: 's', at: 13.4 }], [{ w: 'third', k: 'sc', at: 13.58 }], [{ w: 'leading cause of', k: 's', at: 14.1 }, { w: 'death', k: 'b', at: 15.04 }]] },
    { t0: 15.94, t1: 17.55, y: .62, lines: [[{ w: 'people', k: 's', at: 15.94 }, { w: "don't", k: 's', at: 16.12 }], [{ w: 'realize', k: 'b', at: 16.46 }, { w: 'that', k: 's', at: 16.74 }]] },
    { t0: 17.62, t1: 19.3, y: .8, lines: [[{ w: 'and it is', k: 's', at: 17.62 }, { w: 'largely', k: 's', at: 17.94 }], [{ w: 'preventable', k: 'sc', at: 18.4 }]] },
    { t0: 19.42, t1: 21.4, y: .62, lines: [[{ w: 'my', k: 's', at: 19.54 }, { w: 'mission', k: 'scw', at: 19.7 }], [{ w: 'is to message', k: 's', at: 19.96 }, { w: 'people', k: 'b', at: 20.84 }]] },
    { t0: 21.5, t1: 24.05, y: .62, lines: [[{ w: "what you're", k: 's', at: 21.5 }], [{ w: 'doing', k: 'sc', at: 22.08 }], [{ w: 'at your', k: 's', at: 22.3 }, { w: 'age', k: 'b', at: 22.82 }]] },
    { t0: 24.14, t1: 26.5, y: .8, lines: [[{ w: 'is', k: 's', at: 24.14 }, { w: 'hugely', k: 's', at: 24.44 }], [{ w: 'influential', k: 'sc', at: 25.2 }]] },
    { t0: 26.6, t1: 27.875, y: .62, lines: [[{ w: 'charting your', k: 's', at: 26.64 }], [{ w: "brain's", k: 'b', at: 27.16 }, { w: 'destiny', k: 'sc', at: 27.4 }]] },
  ],
});
