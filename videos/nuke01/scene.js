// nuke01: Senator Bernie Sanders on The Diary Of A CEO — "AI more dangerous than nuclear weapons": a Reagan–Gorbachev style deal with China
import { nodesCard, banCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 77.5, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [10.875],
  shots: [
    face(0, 4.5, { in: null, punch: [{ t: 2.23, s: 1.1 }], overlay: bannerOverlay('AI vs NUCLEAR WEAPONS', 4.5) }),
    { kind: '2d', t0: 4.5, t1: 10.875, in: { type: 'whip', dur: .4 }, draw: banCard({ title: 'BAN THE DEVELOPMENT OF', word: 'SUPERINTELLIGENCE', at: 8.21 - 4.5, sub: 'PERMANENTLY?' }) },
    face(10.875, 17.9, { punch: [{ t: 4.0, s: 1.1 }] }),
    face(17.9, 24.4, { punch: [{ t: 2.53, s: 1.08 }] }),
    { kind: '2d', t0: 24.4, t1: 33.1, in: { type: 'whip', dur: .4 }, draw: nodesCard({ a: 'USA', b: 'CHINA', bAt: 29.99 - 24.4, at: 31.85 - 24.4, link: 'NEGOTIATE' }) },
    face(33.1, 37.2),
    { kind: '2d', t0: 37.2, t1: 51.9, in: { type: 'whip', dur: .4 }, draw: nodesCard({ a: 'GORBACHEV', b: 'REAGAN', bAt: 40.47 - 37.2, at: 48.29 - 37.2, link: 'NUCLEAR AGREEMENT' }) },
    face(51.9, 59.1, { punch: [{ t: 2.37, s: 1.08 }] }),
    { kind: '2d', t0: 59.1, t1: 67.6, in: { type: 'whip', dur: .4 }, draw: banCard({ title: 'SMARTER THAN HUMAN BEINGS', word: 'SUPERINTELLIGENCE', at: 66.83 - 59.1, sub: 'BAN IT' }) },
    face(67.6, 77.5, { punch: [{ t: 1.37, s: 1.08 }] }),
  ],
  lockups: [
    { t0: 0, t1: 2.4, lines: [[{ w: 'the potential danger of', k: 's', at: .53 }], [{ w: 'AI', k: 'bo', at: 2.23 }]] },
    { t0: 2.45, t1: 4.5, lines: [[{ w: 'is greater than', k: 's', at: 2.45 }], [{ w: 'nuclear weapons', k: 'sc', at: 2.99 }]] },
    { t0: 4.55, t1: 10.875, y: .74, lines: [[{ w: 'do you mean a', k: 's', at: 7.51 }], [{ w: 'permanent ban?', k: 'bo', at: 8.21 }]] },
    { t0: 10.95, t1: 14.0, lines: [[{ w: 'the argument against me', k: 's', at: 11.61 }], [{ w: 'by my colleagues', k: 'sc', at: 12.79 }]] },
    { t0: 14.05, t1: 17.9, lines: [[{ w: 'oh Bernie,', k: 's', at: 14.13 }], [{ w: 'you love China', k: 'bo', at: 14.87 }]] },
    { t0: 17.95, t1: 20.4, lines: [[{ w: "I've talked to", k: 's', at: 18.11 }], [{ w: 'Chinese scientists', k: 'sc', at: 18.75 }]] },
    { t0: 20.45, t1: 24.4, lines: [[{ w: 'some of them have', k: 's', at: 22.17 }], [{ w: 'the same fears', k: 'bo', at: 22.77 }]] },
    { t0: 24.45, t1: 28.6, y: .7, lines: [[{ w: 'if we had a', k: 's', at: 25.05 }], [{ w: 'rational government', k: 'sc', at: 25.81 }]] },
    { t0: 28.65, t1: 33.1, y: .7, lines: [[{ w: 'on the phone with President Xi', k: 's', at: 28.69 }], [{ w: "let's negotiate", k: 'bo', at: 31.85 }]] },
    { t0: 33.15, t1: 37.2, lines: [[{ w: "you don't remember", k: 's', at: 33.67 }], [{ w: "you're too young", k: 'sc', at: 34.35 }]] },
    { t0: 42.2, t1: 45.6, y: .7, lines: [[{ w: 'their ideologies were', k: 's', at: 42.23 }], [{ w: 'very different', k: 'sc', at: 43.19 }]] },
    { t0: 45.65, t1: 51.9, y: .7, lines: [[{ w: 'a nuclear war', k: 'bo', at: 45.71 }], [{ w: 'would not benefit either country', k: 's', at: 46.25 }]] },
    { t0: 51.95, t1: 55.9, lines: [[{ w: 'they both still develop', k: 's', at: 53.35 }], [{ w: 'nuclear weapons', k: 'sc', at: 54.27 }]] },
    { t0: 55.95, t1: 59.1, lines: [[{ w: 'but under', k: 's', at: 56.01 }], [{ w: 'strict guardrails', k: 'bo', at: 56.75 }]] },
    { t0: 59.15, t1: 65.6, y: .74, lines: [[{ w: 'I do not want to develop', k: 's', at: 60.79 }], [{ w: 'a technology', k: 's', at: 62.19 }], [{ w: 'smarter than human beings', k: 'sc', at: 63.73 }]] },
    { t0: 67.65, t1: 72.2, lines: [[{ w: 'a pause on', k: 's', at: 68.69 }], [{ w: 'advanced AI', k: 'bo', at: 69.75 }]] },
    { t0: 72.25, t1: 79, keep: true, lines: [[{ w: 'until we have guardrails', k: 's', at: 72.65 }], [{ w: 'to protect humanity', k: 'sc', at: 75.17 }], [{ w: 'and workers', k: 's', at: 76.31 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 2.99, g: .26, align: 'start', max: 1.3 },
    { n: 'impact_big', t: 8.21, g: .2, align: 'start', max: 1.0 },
    { n: 'impact_big', t: 66.83, g: .24, align: 'start', max: 1.2 },
  ],
});
