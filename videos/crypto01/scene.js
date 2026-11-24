// crypto01: Steve Eisman on The Diary Of A CEO — "A little bit of crypto?" "Never.": the hedge thesis, and why crypto moves
// with Nvidia instead of against it. Cards cover DOAC's own lower-third (~38–43 s) and Bitcoin-vs-Nvidia chart (~79–91 s).
import { listCard, wordCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const T = 21.4;
const thesis = listCard({ title: 'THE CRYPTO THESIS', y: .13, gap: 170, check: false, items: [
  { t: 23.96 - T, text: 'MONEY LOSES VALUE', sub: '"debasement of fiat currency"' }, { t: 29.64 - T, text: 'TOO MUCH DEBT' },
  { t: 35.38 - T, text: 'THE SYSTEM CRASHES' }, { t: 41.66 - T, text: '→ OWN CRYPTO AS A HEDGE', px: 54 }] });
export default async () => ({
  duration: 98.792, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [8.5, 43.0],
  shots: [
    face(0, 8.5, { in: null, punch: [{ t: 2.58, s: 1.1 }, { t: 6.5, s: 1.08 }], overlay: bannerOverlay('CRYPTO? "NEVER."', 8.4) }),
    face(8.5, T, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: T, t1: 32.2, in: { type: 'whip', dur: .4 }, draw: thesis },
    face(32.2, 36.2),
    { kind: '2d', t0: 36.2, t1: 43.0, in: { type: 'whip', dur: .4 }, draw: (c, lt, e) => thesis(c, lt + 36.2 - T, e) },
    face(43.0, 48.6, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 48.6, t1: 69.0, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'IF CRYPTO WERE A HEDGE', y: .19, gap: 200, check: false, items: [
      { t: 50.3 - 48.6, text: 'BAD DAY', px: 76, sub: 'inflation up, NASDAQ down' }, { t: 57.3 - 48.6, text: '→ CRYPTO UP', px: 76 },
      { t: 59.6 - 48.6, text: 'GOOD DAY', px: 76, sub: 'Nvidia up 6%, NASDAQ up 2%' }, { t: 67.1 - 48.6, text: '→ CRYPTO DOWN', px: 76 }] }) },
    { kind: '2d', t0: 69.0, t1: 81.8, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'WHAT ACTUALLY HAPPENS', y: .19, gap: 200, check: false, tag: 'THE OPPOSITE', tagBelow: true, items: [
      { t: 73.2 - 69.0, text: 'NVIDIA UP', px: 76 }, { t: 74.4 - 69.0, text: '→ CRYPTO UP', px: 76 },
      { t: 76.8 - 69.0, text: 'NVIDIA DOWN', px: 76 }, { t: 80.3 - 69.0, text: '→ CRYPTO DOWN', px: 76, tagAt: 80.8 - 69.0 }] }) },
    { kind: '2d', t0: 81.8, t1: 91.6, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'SO YOUR THESIS IS', word: 'NONSENSE', at: 89.48 - 81.8, px: 170, sub: 'the asset does the opposite of the thesis', subAt: 83.3 - 81.8, y: .3 }) },
    face(91.6, 98.792, { punch: [{ t: 98.2 - 91.6, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 2.5, lines: [[{ w: 'a little bit of', k: 's', at: .72 }], [{ w: 'crypto?', k: 'bo', at: 1.38 }]] },
    { t0: 2.55, t1: 6.4, lines: [[{ w: 'never', k: 'bo', at: 2.58 }]] },
    { t0: 6.45, t1: 8.5, lines: [[{ w: 'absolutely', k: 's', at: 6.5 }], [{ w: 'never', k: 'sc', at: 7.06 }]] },
    { t0: 8.55, t1: 15.8, lines: [[{ w: 'the question always came up', k: 's', at: 9.16 }], [{ w: 'why should I invest', k: 's', at: 14.26 }], [{ w: 'in crypto?', k: 'bo', at: 15.0 }]] },
    { t0: 15.85, t1: T, lines: [[{ w: 'the answer was always', k: 's', at: 16.42 }], [{ w: 'the same', k: 'sc', at: 17.38 }]] },
    { t0: 32.25, t1: 36.2, lines: [[{ w: 'one day', k: 's', at: 32.9 }], [{ w: 'this whole system', k: 's', at: 34.46 }], [{ w: 'will crash', k: 'bo', at: 35.16 }]] },
    { t0: 43.05, t1: 48.6, lines: [[{ w: 'the problem', k: 's', at: 43.08 }], [{ w: 'with the thesis', k: 'sc', at: 43.52 }]] },
    { t0: 91.65, t1: 94.8, lines: [[{ w: 'speculating', k: 's', at: 92.8 }], [{ w: 'about speculating', k: 'sc', at: 93.54 }]] },
    { t0: 94.85, t1: 97.6, lines: [[{ w: 'what do you think crypto is', k: 's', at: 94.92 }], [{ w: 'over the long term?', k: 's', at: 96.12 }]] },
    { t0: 97.65, t1: 101, keep: true, lines: [[{ w: 'I think', k: 's', at: 97.72 }], [{ w: "it's nothing", k: 'bo', at: 98.04 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 2.58, g: .24, align: 'start', max: 1.2 },
    { n: 'impact_big', t: 89.48, g: .2, align: 'start', max: 1.1 },
  ],
});
