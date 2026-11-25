// founders01: Steve Eisman on The Diary Of A CEO — his investing rule "if management is dishonest, run", and his example:
// CoreWeave's founders selling stock. All claims framed as his view.
import { wordCard, counterCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 82.708, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [8.75],
  shots: [
    face(0, 8.75, { in: null, punch: [{ t: 3.14, s: 1.08 }, { t: 6.82, s: 1.1 }], overlay: bannerOverlay("HIS #1 RED FLAG", 8.65) }),
    face(8.75, 18.4, { in: { type: 'whip', dur: .35 } }),
    face(18.4, 27.6, { punch: [{ t: 20.84 - 18.4, s: 1.08 }] }),
    { kind: '2d', t0: 27.6, t1: 34.0, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'IF MANAGEMENT IS DISHONEST', word: 'RUN.', at: 27.84 - 27.6, px: 220, sub: 'his example: CoreWeave', subAt: 33.46 - 27.6 }) },
    face(34.0, 50.5, { in: { type: 'whip', dur: .35 }, punch: [{ t: 45.14 - 34.0, s: 1.08 }] }),
    { kind: '2d', t0: 50.5, t1: 61.6, in: { type: 'whip', dur: .4 }, draw: counterCard({ label: 'HE SAYS THE 3 FOUNDERS SOLD OVER', to: 3, at: 54.32 - 50.5, dur: .8, pre: '$', suf: 'B', y: .3, px: 220, sub: 'OF STOCK SINCE SPRING 2025', subAt: 55.76 - 50.5, sub2: 'WHOLE COMPANY: $24B', sub2At: 59.42 - 50.5 }) },
    face(61.6, 71.6, { punch: [{ t: 62.76 - 61.6, s: 1.08 }, { t: 67.28 - 61.6, s: 1.1 }] }),
    { kind: '2d', t0: 71.6, t1: 76.5, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'BUT…', word: '$1B EACH?', at: 73.38 - 71.6, px: 180, sub: "it's insane", subAt: 74.46 - 71.6, pill: 'OUTRAGEOUS', pillAt: 75.64 - 71.6 }) },
    face(76.5, 82.708, { punch: [{ t: 81.5 - 76.5, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 3.1, lines: [[{ w: 'since spring 2025', k: 's', at: .68 }], [{ w: 'the three founders', k: 'bo', at: 3.14 }]] },
    { t0: 3.15, t1: 8.75, lines: [[{ w: 'have sold over', k: 's', at: 6.08 }], [{ w: '$3 billion', k: 'sc', at: 6.82 }], [{ w: 'worth of stock', k: 's', at: 7.66 }]] },
    { t0: 8.8, t1: 15.1, lines: [[{ w: 'your personal', k: 's', at: 11.98 }], [{ w: 'investing rules', k: 'sc', at: 12.52 }]] },
    { t0: 15.15, t1: 18.4, lines: [[{ w: 'management', k: 'bo', at: 15.2 }], [{ w: 'is really important', k: 's', at: 15.5 }]] },
    { t0: 18.45, t1: 23.5, lines: [[{ w: 'if you think management', k: 's', at: 18.42 }], [{ w: 'is dishonest', k: 'sc', at: 20.84 }], [{ w: 'in any way', k: 's', at: 22.24 }]] },
    { t0: 23.55, t1: 27.6, lines: [[{ w: 'of the stock', k: 's', at: 25.84 }], [{ w: "you're going to invest in", k: 's', at: 26.38 }]] },
    { t0: 34.05, t1: 39.9, lines: [[{ w: 'one of these neo clouds', k: 's', at: 36.3 }], [{ w: 'that creates', k: 's', at: 37.4 }], [{ w: 'data centers', k: 'bo', at: 38.58 }]] },
    { t0: 39.95, t1: 44.5, lines: [[{ w: 'it went public', k: 's', at: 40.3 }], [{ w: 'spring of 2025', k: 'sc', at: 42.94 }]] },
    { t0: 44.55, t1: 50.5, lines: [[{ w: 'it has', k: 's', at: 44.6 }], [{ w: 'three founders', k: 'bo', at: 45.14 }]] },
    { t0: 61.65, t1: 66.2, lines: [[{ w: "I think that's", k: 's', at: 61.8 }], [{ w: 'outrageous', k: 'sc', at: 62.76 }]] },
    { t0: 66.25, t1: 68.7, lines: [[{ w: 'founders would sell', k: 's', at: 65.94 }], [{ w: 'so much stock', k: 'bo', at: 67.28 }]] },
    { t0: 68.75, t1: 71.6, lines: [[{ w: 'sell a little to pay taxes?', k: 's', at: 69.04 }], [{ w: 'God bless', k: 'sc', at: 71.66 }]] },
    { t0: 76.55, t1: 79.8, lines: [[{ w: "I wouldn't invest in that company", k: 's', at: 76.62 }], [{ w: 'ever', k: 'bo', at: 78.3 }]] },
    { t0: 79.85, t1: 86, keep: true, lines: [[{ w: "it shows they don't", k: 's', at: 80.24 }], [{ w: 'believe it', k: 'sc', at: 80.92 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 6.82, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 27.84, g: .22, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 54.32, g: .2, align: 'start', max: 1.1 },
  ],
});
