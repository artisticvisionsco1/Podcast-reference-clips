// advice01: Senator Bernie Sanders on The Diary Of A CEO — advice to a 34-year-old: don't spend your life trying to become a billionaire
import { listCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const G = 13.3, M = 34.5;
export default async () => ({
  duration: 67.4, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [2.0],
  shots: [
    face(0, 2.0, { in: null, punch: [{ t: .77, s: 1.1 }], overlay: bannerOverlay("BERNIE'S LIFE ADVICE", 2.0) }),
    face(2.0, G, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: G, t1: 23.5, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'WHAT IS A GOOD LIFE?', y: .14, gap: 260, items: [
      { t: 14.89 - G, text: 'FREEDOM', px: 96, sub: 'to do whatever I want' }, { t: 18.99 - G, text: 'RESPONSIBILITY', px: 96, sub: 'collective' }] }) },
    face(23.5, 31.5, { punch: [{ t: 2.37, s: 1.08 }] }),
    face(31.5, M, { punch: [{ t: 1.17, s: 1.1 }] }),
    { kind: '2d', t0: M, t1: 49.0, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'IF YOU MAKE MONEY', y: .13, gap: 210, items: [
      { t: 38.03 - M, text: 'CARE FOR YOUR TEAM', px: 64, sub: 'they feel part of it' }, { t: 41.91 - M, text: "DON'T BE ANTI-WORKER", px: 64, sub: "they're making you money" }, { t: 46.51 - M, text: 'SHARE RESPONSIBILITY', px: 64 }] }) },
    face(49.0, 59.2, { punch: [{ t: .23, s: 1.08 }] }),
    face(59.2, 67.4, { punch: [{ t: 1.53, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 2.0, lines: [[{ w: "don't spend your life", k: 's', at: .09 }], [{ w: 'trying to become', k: 's', at: .77 }], [{ w: 'a billionaire', k: 'bo', at: 1.43 }]] },
    { t0: 2.05, t1: 6.6, lines: [[{ w: "I'm 33,", k: 's', at: 2.13 }], [{ w: '34 years old', k: 'bo', at: 3.79 }]] },
    { t0: 6.65, t1: G, lines: [[{ w: 'what people think', k: 's', at: 9.75 }], [{ w: 'a good life', k: 'sc', at: 10.29 }], [{ w: 'looks like', k: 's', at: 10.95 }]] },
    { t0: 23.55, t1: 26.5, lines: [[{ w: 'if you were giving a', k: 's', at: 24.93 }], [{ w: '34-year-old', k: 'bo', at: 25.87 }]] },
    { t0: 26.55, t1: 31.5, lines: [[{ w: 'advice on how to', k: 's', at: 26.61 }], [{ w: 'live a good life', k: 'sc', at: 27.39 }]] },
    { t0: 31.55, t1: M, lines: [[{ w: "don't spend your life", k: 's', at: 31.59 }], [{ w: 'trying to become', k: 's', at: 32.27 }], [{ w: 'a billionaire', k: 'bo', at: 32.93 }]] },
    { t0: M + .05, t1: 37.9, y: .74, lines: [[{ w: "if you're good at business", k: 's', at: 34.61 }]] },
    { t0: 49.05, t1: 54.1, lines: [[{ w: 'be', k: 's', at: 49.13 }, { w: 'generous', k: 'bo', at: 49.23 }], [{ w: 'use your money', k: 's', at: 51.39 }]] },
    { t0: 54.15, t1: 59.2, lines: [[{ w: 'reach out to other people', k: 's', at: 55.11 }], [{ w: 'improve life', k: 'sc', at: 57.15 }]] },
    { t0: 59.25, t1: 62.9, lines: [[{ w: "but don't become a", k: 's', at: 59.23 }], [{ w: 'Trumpian', k: 'bo', at: 60.73 }]] },
    { t0: 62.95, t1: 66.6, lines: [[{ w: "who thinks you'll be judged by", k: 's', at: 61.37 }], [{ w: 'how many dollars you have', k: 'sc', at: 64.61 }]] },
    { t0: 66.65, t1: 69, keep: true, lines: [[{ w: 'that would be', k: 's', at: 66.79 }], [{ w: 'my advice', k: 'bo', at: 67.05 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 1.43, g: .22, align: 'start', max: 1.2 },
    { n: 'pop_hard', t: 38.03, g: .18 }, { n: 'pop_hard', t: 41.91, g: .18 }, { n: 'pop_hard', t: 46.51, g: .18 },
  ],
});
