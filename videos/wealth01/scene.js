// wealth01: Steve Eisman on The Diary Of A CEO — "this is not the worst time in history": the global GDP per person chart
// (flat from year 0 until ~1830, then vertical). Our own chart card replaces DOAC's split-screen chart (0–6.7 s, 45.0–67.75 s).
import { hockeyCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const chart = { title: 'GLOBAL GDP PER PERSON', sub: 'year 0 → 2022', knee: .82, x0Label: 'YEAR 0', kneeLabel: '~1830', endLabel: '2022' };
const T = 45.0;
const main = hockeyCard({ ...chart, at: 45.88 - T, flatEnd: 49.02 - T, spikeAt: 50.56 - T, spikeDur: 1.1, pill: 'FLAT AS A PANCAKE', pillAt: 47.9 - T });
const late = hockeyCard({ ...chart, at: 45.88 - T, flatEnd: 49.02 - T, spikeAt: 50.56 - T, spikeDur: 1.1, pill: 'ALMOST ALL OF IT: AFTER 1830', pillAt: 61.22 - T });
export default async () => ({
  duration: 72.917, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [6.7083],
  shots: [
    { kind: '2d', t0: 0, t1: 6.7083, draw: hockeyCard({ ...chart, title: null, sub: null, at: 0, flatEnd: .9, spikeAt: 1.2, spikeDur: 1.0, pill: 'THE BEST TIME TO BE ALIVE', pillAt: 4.28 }), overlay: bannerOverlay('THE CHART THAT BLEW HIS MIND', 6.6) },
    face(6.7083, 18.8, { in: { type: 'whip', dur: .35 }, punch: [{ t: 9.8 - 6.7083, s: 1.08 }, { t: 15.5 - 6.7083, s: 1.1 }] }),
    face(18.8, 33.7, { punch: [{ t: 32.26 - 18.8, s: 1.08 }] }),
    face(33.7, T, { punch: [{ t: 36.62 - 33.7, s: 1.08 }, { t: 44.04 - 33.7, s: 1.1 }] }),
    { kind: '2d', t0: T, t1: 56.5, in: { type: 'whip', dur: .4 }, draw: main },
    { kind: '2d', t0: 56.5, t1: 67.75, draw: (c, lt, e) => late(c, lt + 56.5 - T, e) },
    face(67.75, 72.917, { in: { type: 'whip', dur: .35 } }),
  ],
  lockups: [
    { t0: 0, t1: 3.5, y: .78, lines: [[{ w: 'all human wealth', k: 's', at: .32 }], [{ w: 'the last 150 years', k: 'sc', at: 2.04 }]] },
    { t0: 6.8, t1: 12.0, lines: [[{ w: 'everybody likes to think', k: 's', at: 7.12 }], [{ w: 'this is', k: 's', at: 8.3 }], [{ w: 'the worst period', k: 'sc', at: 9.8 }]] },
    { t0: 12.05, t1: 15.45, lines: [[{ w: "I don't know why", k: 's', at: 12.4 }], [{ w: 'but they do think it', k: 'bo', at: 14.34 }]] },
    { t0: 15.5, t1: 18.8, lines: [[{ w: "it's not", k: 'bo', at: 15.5 }], [{ w: 'plenty of times were a lot worse', k: 's', at: 16.82 }]] },
    { t0: 18.85, t1: 25.3, lines: [[{ w: 'I interviewed', k: 's', at: 19.58 }], [{ w: 'John Cassidy', k: 'sc', at: 21.3 }], [{ w: '"Capitalism and Its Critics"', k: 's', at: 22.9 }]] },
    { t0: 28.6, t1: 33.7, lines: [[{ w: 'he had this chart', k: 's', at: 29.56 }], [{ w: 'that blew my mind', k: 'sc', at: 32.26 }]] },
    { t0: 33.75, t1: 42.4, lines: [[{ w: 'global GDP per capita', k: 'bo', at: 35.58 }], [{ w: 'from the year zero', k: 's', at: 38.8 }], [{ w: 'till 2022', k: 'sc', at: 39.84 }]] },
    { t0: 42.45, t1: T, lines: [[{ w: 'it looked', k: 's', at: 43.34 }], [{ w: 'like this', k: 'sc', at: 44.04 }]] },
    { t0: 52.85, t1: 60.9, y: .8, lines: [[{ w: 'from the time of Jesus until 1830', k: 's', at: 54.7 }], [{ w: 'no creation of human wealth', k: 'sc', at: 58.96 }]] },
    { t0: 64.6, t1: 67.75, y: .8, lines: [[{ w: 'we live in', k: 's', at: 64.64 }], [{ w: 'a much better time', k: 'sc', at: 65.2 }]] },
    { t0: 67.8, t1: 76, keep: true, lines: [[{ w: 'be nice for most people', k: 's', at: 69.36 }], [{ w: 'to acknowledge that', k: 'sc', at: 70.5 }], [{ w: 'once in a while', k: 's', at: 71.58 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 1.2, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 50.56, g: .22, align: 'start', max: 1.1 },
  ],
});
