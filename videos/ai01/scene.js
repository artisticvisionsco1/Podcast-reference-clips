// ai01: Senator Bernie Sanders on The Diary Of A CEO — AI and robots: "how many of those jobs will be left in 10 years?"
import { robotArmScene } from '/web/props3d.js';
import { counterCard, listCard, peopleRowCard, truckCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const J = 48.2;
export default async () => ({
  duration: 63.042, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [2.75],
  shots: [
    face(0, 2.75, { in: null, punch: [{ t: 1.21, s: 1.1 }], overlay: bannerOverlay('AI vs YOUR JOB', 2.75) }),
    face(2.75, 10.7, { in: { type: 'whip', dur: .35 }, punch: [{ t: 3.1, s: 1.08 }] }),
    { kind: '2d', t0: 10.7, t1: 19.9, in: { type: 'whip', dur: .4 },
      draw: peopleRowCard({ n: 7, y: .3, s: 1.35, title: 'MILLIONS OF JOBS', times: [0, .1, .2, .3, .4, .5, .6].map(x => x + .15), off: [4.3, 3.9, 4.6, 3.8, 4.1, 4.45, 4.0] }) },
    face(19.9, 22.5),
    { kind: '2d', t0: 22.5, t1: 31.9, in: { type: 'whip', dur: .4 },
      draw: counterCard({ label: 'JEFF BEZOS FUND', to: 100, at: 27.6 - 22.5, dur: .9, pre: '$', suf: 'B', y: .3, sub: 'TO AUTOMATE FACTORIES', subAt: 30.25 - 22.5 }) },
    { kind: '3d', t0: 31.9, t1: 39.7, build: robotArmScene, in: { type: 'amber', dur: .45 } },
    { kind: '2d', t0: 39.7, t1: J, draw: truckCard, in: { type: 'whip', dur: .4 } },
    { kind: '2d', t0: J, t1: 51.0, in: { type: 'whip', dur: .4 },
      draw: counterCard({ label: 'TRANSPORTATION JOBS', from: 7, to: 7, at: 48.67 - J, dur: .1, pre: '6–', suf: ' MILLION', px: 170, y: .32, sub: 'IN THE U.S.', subAt: 50.1 - J }) },
    { kind: '2d', t0: 51.0, t1: 57.6, in: { type: 'slide', dur: .4 },
      draw: (c, lt, e) => listCard({ title: '6–7 MILLION TRANSPORT JOBS', y: .14, gap: 250, tag: '10 YEARS?', tagBelow: true, items: [
        { t: 51.25 - J, text: 'UBER DRIVERS', px: 86, tagAt: 56.6 - J }, { t: 52.03 - J, text: 'CAB DRIVERS', px: 86, tagAt: 56.75 - J }, { t: 53.07 - J, text: 'BUS DRIVERS', px: 86, tagAt: 56.9 - J }] })(c, lt + 51.0 - J, e) },
    face(57.6, 63.042, { punch: [{ t: 4.97, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 2.75, lines: [[{ w: 'how many of those jobs', k: 's', at: .07 }], [{ w: 'will be left', k: 'bo', at: .95 }], [{ w: 'in 10 years?', k: 'sc', at: 1.55 }]] },
    { t0: 2.8, t1: 7.6, lines: [[{ w: 'some of the', k: 's', at: 3.67 }, { w: 'CEOs', k: 'b', at: 4.79 }], [{ w: 'of large AI companies', k: 'bo', at: 5.57 }]] },
    { t0: 7.65, t1: 10.7, lines: [[{ w: 'like', k: 's', at: 7.67 }], [{ w: 'Anthropic', k: 'sc', at: 9.27 }]] },
    { t0: 11.0, t1: 16.8, y: .66, lines: [[{ w: 'many, many, many', k: 's', at: 12.23 }], [{ w: 'millions of jobs', k: 'bo', at: 13.57 }], [{ w: 'disappearing', k: 'sc', at: 14.49 }]] },
    { t0: 16.85, t1: 19.9, y: .66, lines: [[{ w: 'how many?', k: 's', at: 16.93 }, { w: 'when?', k: 's', at: 17.93 }], [{ w: 'nobody knows', k: 'sc', at: 18.53 }]] },
    { t0: 19.95, t1: 22.5, lines: [[{ w: 'you mentioned', k: 's', at: 20.0 }], [{ w: 'robotics', k: 'bo', at: 20.37 }]] },
    { t0: 22.55, t1: 26.3, y: .66, lines: [[{ w: 'one of the', k: 's', at: 23.33 }], [{ w: 'wealthiest guys', k: 'sc', at: 23.63 }], [{ w: 'in the world', k: 's', at: 24.23 }]] },
    { t0: 26.35, t1: 30.2, y: .66, lines: [[{ w: 'is putting together', k: 's', at: 25.93 }], [{ w: 'a fund of', k: 's', at: 26.41 }]] },
    { t0: 31.95, t1: 34.55, lines: [[{ w: 'what does that mean?', k: 's', at: 31.97 }]] },
    { t0: 34.95, t1: 39.7, lines: [[{ w: 'there will be', k: 's', at: 34.97 }], [{ w: 'robots', k: 'bo', at: 35.59 }], [{ w: 'doing the work that', k: 's', at: 35.99 }], [{ w: 'human beings did', k: 'sc', at: 38.11 }]] },
    { t0: 39.75, t1: 42.7, y: .68, lines: [[{ w: 'driverless vehicles', k: 'sc', at: 41.35 }]] },
    { t0: 42.75, t1: J, y: .68, lines: [[{ w: 'in Texas right now', k: 's', at: 42.79 }], [{ w: '18-wheeler trucks', k: 'bo', at: 44.07 }], [{ w: 'without a driver', k: 's', at: 46.71 }]] },
    { t0: 54.5, t1: 57.6, y: .68, lines: [[{ w: 'how many will be left in', k: 's', at: 54.61 }], [{ w: '10 years?', k: 'bo', at: 56.61 }]] },
    { t0: 57.65, t1: 59.4, lines: [[{ w: 'who knows?', k: 'sc', at: 57.67 }]] },
    { t0: 59.45, t1: 64, keep: true, lines: [[{ w: 'entry-level jobs', k: 'bo', at: 59.51 }], [{ w: 'for young college graduates', k: 's', at: 61.15 }], [{ w: 'in serious trouble', k: 'sc', at: 62.29 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 1.55, g: .26, align: 'start', max: 1.3 },
    { n: 'tick_clock', t: 27.6, g: .22, align: 'start', max: 1.0 },
    { n: 'impact_big', t: 28.5, g: .2, align: 'start', max: 1.0 },
    { n: 'pop_hard', t: 56.6, g: .2 }, { n: 'pop_hard', t: 56.75, g: .2 }, { n: 'pop_hard', t: 56.9, g: .2 },
  ],
});
