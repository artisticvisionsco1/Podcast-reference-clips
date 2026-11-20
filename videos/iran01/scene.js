// iran01: Senator Bernie Sanders on The Diary Of A CEO — "Israel pushed that war on Trump" (his view, stated as such)
import { listCard, nodesCard, peopleRowCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const B = 7.958;  // lies card base
const lies = listCard({ title: 'WARS', y: .16, gap: 170, tag: 'BASED ON A LIE', items: [
  { t: 8.2 - B, text: 'VIETNAM', sub: '59,000 Americans dead', tagAt: 14.3 - B },
  { t: 17.48 - B, text: 'IRAQ', tagAt: 19.3 - B },
  { t: 21.1 - B, text: 'IRAN', tagAt: 21.86 - B }] });
const P = 53.94, pres = o => peopleRowCard({ n: 5, y: .3, title: 'ONE PRESIDENT AFTER ANOTHER', times: [55.0 - P, 56.04 - P, 56.78 - P, 57.2 - P, 57.9 - P], ...o });
export default async () => ({
  duration: 71.333, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [7.958, 32.25, 53.875],
  shots: [
    face(0, 7.958, { in: null, punch: [{ t: 5.68, s: 1.1 }], overlay: bannerOverlay('WHO PUSHED THE IRAN WAR?', 7.958) }),
    { kind: '2d', t0: 7.958, t1: 11.0, draw: lies, in: { type: 'whip', dur: .4 } },
    face(11.0, 13.95, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 13.95, t1: 23.5, draw: (c, lt, e) => lies(c, lt + 13.95 - B, e), in: { type: 'whip', dur: .35 } },
    face(23.5, 32.25, { punch: [{ t: 7.38, s: 1.1 }] }),
    face(32.25, 40.4, { punch: [{ t: 4.98, s: 1.08 }] }),
    { kind: '2d', t0: 40.4, t1: 50.9, in: { type: 'whip', dur: .4 },
      draw: nodesCard({ a: 'ISRAEL', b: 'IRAN', bAt: 48.57 - 40.4, at: 49.25 - 40.4, link: 'MAJOR OPPONENT', years: 40, yearsAt: 41.2 - 40.4 }) },
    face(50.9, 53.94, { punch: [{ t: 1.51, s: 1.1 }] }),
    { kind: '2d', t0: 53.94, t1: 62.1, draw: pres(), in: { type: 'whip', dur: .4 } },
    face(62.1, 69.9, { punch: [{ t: 3.08, s: 1.08 }] }),
    { kind: '2d', t0: 69.9, t1: 71.333, draw: (c, lt, e) => pres({ hot: 4, hotAt: 70.62 - P, hotLabel: 'TRUMP' })(c, lt + 69.9 - P, e), in: { type: 'whip', dur: .3 } },
  ],
  lockups: [
    { t0: 0, t1: 4.3, lines: [[{ w: 'so I think the primary', k: 's', at: .06 }], [{ w: 'in my view', k: 'fw', at: 2.1 }]] },
    { t0: 4.3, t1: 7.958, lines: [[{ w: 'reason for the war is', k: 's', at: 4.34 }], [{ w: 'Israel pushed', k: 'bo', at: 5.68 }], [{ w: 'that war on Trump', k: 'b', at: 6.7 }]] },
    { t0: 9.9, t1: 11.0, y: .68, lines: [[{ w: '59,000', k: 'bo', at: 9.96 }, { w: 'dead', k: 's', at: 11.0 }]] },
    { t0: 11.05, t1: 13.95, lines: [[{ w: 'in this country alone', k: 's', at: 11.38 }], [{ w: 'millions in Asia', k: 'sc', at: 13.2 }]] },
    { t0: 14.0, t1: 16.8, y: .68, lines: [[{ w: 'based on a lie', k: 'sc', at: 14.22 }]] },
    { t0: 22.5, t1: 23.5, y: .68, lines: [[{ w: 'what was the lie in Iran?', k: 's', at: 22.6 }]] },
    { t0: 25.1, t1: 30.8, lines: [[{ w: 'that the Iranian government', k: 's', at: 25.66 }], [{ w: 'was prepared', k: 's', at: 28.52 }], [{ w: 'to attack us', k: 'bo', at: 29.1 }]] },
    { t0: 30.85, t1: 32.25, lines: [[{ w: "IT'S A LIE", k: 'hl', at: 30.88 }]] },
    { t0: 32.3, t1: 36.9, lines: [[{ w: 'so why did', k: 's', at: 32.35 }], [{ w: 'that happen?', k: 'bo', at: 33.11 }]] },
    { t0: 37.0, t1: 40.4, lines: [[{ w: 'giving you', k: 's', at: 37.23 }], [{ w: 'my own view', k: 'fw', at: 37.61 }], [{ w: 'may not be 100% right', k: 's', at: 38.45 }]] },
    { t0: 40.5, t1: 45.0, y: .68, lines: [[{ w: 'for 40 years', k: 's', at: 40.91 }], [{ w: 'Netanyahu', k: 'bo', at: 41.91 }]] },
    { t0: 45.0, t1: 48.5, y: .68, lines: [[{ w: 'has tried to get', k: 's', at: 43.07 }], [{ w: 'the United States', k: 'sc', at: 43.83 }]] },
    { t0: 48.5, t1: 50.9, y: .68, lines: [[{ w: 'Iran is his', k: 's', at: 48.57 }], [{ w: 'major opponent', k: 'sc', at: 49.25 }]] },
    { t0: 50.95, t1: 53.94, lines: [[{ w: 'he has tried to', k: 's', at: 51.81 }], [{ w: 'destabilize Iran', k: 'bo', at: 52.41 }]] },
    { t0: 54.0, t1: 59.7, y: .66, lines: [[{ w: 'to go to', k: 's', at: 57.52 }], [{ w: 'war against Iran', k: 'bo', at: 57.94 }]] },
    { t0: 59.75, t1: 62.1, y: .66, lines: [[{ w: 'to make Iran', k: 's', at: 59.82 }], [{ w: 'weaker', k: 'sc', at: 60.36 }]] },
    { t0: 62.15, t1: 65.1, lines: [[{ w: 'Iran is an', k: 's', at: 62.2 }], [{ w: 'authoritarian society', k: 'bo', at: 62.74 }]] },
    { t0: 65.15, t1: 67.0, lines: [[{ w: "they're not", k: 's', at: 65.18 }], [{ w: 'nice guys', k: 'sc', at: 65.4 }]] },
    { t0: 67.05, t1: 69.9, lines: [[{ w: 'but Netanyahu has', k: 's', at: 67.1 }], [{ w: 'his own reasons', k: 'sc', at: 68.64 }]] },
    { t0: 69.95, t1: 72, keep: true, y: .66, lines: [[{ w: 'and he got', k: 's', at: 70.36 }], [{ w: 'Trump to do it', k: 'bo', at: 70.66 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 5.68, g: .28, align: 'start', max: 1.4 },
    { n: 'pop_hard', t: 14.3, g: .22 }, { n: 'pop_hard', t: 19.3, g: .22 }, { n: 'pop_hard', t: 21.86, g: .22 },
    { n: 'impact_big', t: 30.88, g: .22, align: 'start', max: 1.2 },
    { n: 'tick_clock', t: 41.2, g: .25, align: 'start', max: 1.6 },
    { n: 'heartbeat', t: 70.6, g: .35, align: 'start', max: 1.2 },
  ],
});
