// musk01: Senator Bernie Sanders on The Diary Of A CEO — Musk: respect and too much power; "AI will do it all. Is that the world you want?"
import { robotArmScene } from '/web/props3d.js';
import { listCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const R = 10.5, P = 33.5;
export default async () => ({
  duration: 64.75, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [5.75, 25.667, 41.125],
  shots: [
    face(0, 5.75, { in: null, punch: [{ t: 2.4, s: 1.1 }], overlay: bannerOverlay("MUSK'S AI FUTURE?", 5.75) }),
    face(5.75, R, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: R, t1: 21.6, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'WHAT BERNIE RESPECTS', y: .13, gap: 180, items: [
      { t: 10.62 - R, text: 'HARD WORKER', px: 80, sub: '"fanatically"' }, { t: 13.36 - R, text: 'VERY SMART', px: 80 }, { t: 16.38 - R, text: 'GETS THINGS DONE', px: 80 }, { t: 18.6 - R, text: 'NO BS', px: 80 }] }) },
    face(21.6, P, { punch: [{ t: 6.66, s: 1.1 }] }),
    { kind: '2d', t0: P, t1: 41.125, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'FAR TOO MUCH POWER', y: .14, gap: 200, check: true, items: [
      { t: 35.34 - P, text: 'OWNS X', px: 90 }, { t: 37.8 - P, text: 'ROBOTICS', px: 90 }, { t: 40.32 - P, text: 'AI', px: 90 }] }) },
    face(41.125, 48.4, { punch: [{ t: 4.99, s: 1.1 }] }),
    face(48.4, 56.85),
    { kind: '3d', t0: 56.85, t1: 62.6, build: robotArmScene, in: { type: 'amber', dur: .45 } },
    face(62.6, 64.75),
  ],
  lockups: [
    { t0: 0, t1: 1.4, lines: [[{ w: "they're", k: 's', at: .1 }], [{ w: 'smarter than you', k: 'bo', at: .2 }]] },
    { t0: 1.45, t1: 4.4, lines: [[{ w: 'you can literally', k: 's', at: 1.42 }], [{ w: 'tend to your garden', k: 'sc', at: 2.4 }]] },
    { t0: 4.45, t1: 5.75, lines: [[{ w: 'is that the world', k: 's', at: 4.48 }], [{ w: 'you want?', k: 'bo', at: 5.12 }]] },
    { t0: 5.8, t1: R, lines: [[{ w: 'do you', k: 's', at: 5.86 }, { w: 'respect', k: 'b', at: 6.94 }, { w: 'him?', k: 's', at: 7.28 }], [{ w: 'in one way I do', k: 'sc', at: 8.38 }]] },
    { t0: 21.65, t1: 25.667, lines: [[{ w: 'on the other hand', k: 's', at: 22.74 }], [{ w: "I don't know what happened", k: 'sc', at: 23.52 }], [{ w: 'to Musk', k: 'bo', at: 24.42 }]] },
    { t0: 25.7, t1: 30.9, lines: [[{ w: 'right now he has', k: 's', at: 26.22 }], [{ w: 'extraordinary power', k: 'bo', at: 28.26 }]] },
    { t0: 30.95, t1: P, lines: [[{ w: 'in my view', k: 's', at: 31.64 }], [{ w: 'far, far too much', k: 'sc', at: 32.38 }]] },
    { t0: 41.2, t1: 44.9, lines: [[{ w: 'what he talks about is', k: 's', at: 42.19 }]] },
    { t0: 44.95, t1: 48.4, lines: [[{ w: "you're not going to have to", k: 's', at: 45.61 }], [{ w: 'work anymore', k: 'bo', at: 46.11 }], [{ w: 'AI will do it all', k: 'sc', at: 47.37 }]] },
    { t0: 48.45, t1: 52.7, lines: [[{ w: "if you didn't have to work", k: 's', at: 49.21 }], [{ w: 'what would your life be like?', k: 'b', at: 50.11 }]] },
    { t0: 52.75, t1: 56.85, lines: [[{ w: 'somebody else,', k: 's', at: 54.87 }], [{ w: 'a robot will do this', k: 'sc', at: 55.23 }]] },
    { t0: 56.9, t1: 58.2, lines: [[{ w: "they're", k: 's', at: 56.93 }], [{ w: 'smarter than you', k: 'bo', at: 57.03 }]] },
    { t0: 58.25, t1: 61.2, lines: [[{ w: 'you can literally', k: 's', at: 58.25 }], [{ w: 'tend to your garden', k: 'sc', at: 59.23 }]] },
    { t0: 61.25, t1: 62.6, lines: [[{ w: 'is that the world', k: 's', at: 61.31 }], [{ w: 'you want?', k: 'bo', at: 61.95 }]] },
    { t0: 62.65, t1: 66, keep: true, lines: [[{ w: "I don't think so", k: 's', at: 62.83 }], [{ w: "we've got to be careful", k: 'sc', at: 63.89 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: .2, g: .22, align: 'start', max: 1.2 },
    { n: 'pop_hard', t: 35.34, g: .18 }, { n: 'pop_hard', t: 37.8, g: .18 }, { n: 'pop_hard', t: 40.32, g: .18 },
  ],
});
