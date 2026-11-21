// tax01: Senator Bernie Sanders on The Diary Of A CEO — a 5% wealth tax on billionaires and what $400B a year could pay for
import { counterCard, listCard, barsCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const L = 38.9;
const buys = listCard({ title: 'WITH $400 BILLION A YEAR', y: .13, gap: 150, ghost: false, items: [
  { t: 42.37 - L, text: 'WIPE OUT CHILD POVERTY' }, { t: 45.47 - L, text: 'FREE CHILDCARE' }, { t: 48.99 - L, text: '$3,000 STIPEND', sub: 'every working-class person under $150K' },
  { t: 58.05 - L, text: 'TUITION-FREE COLLEGE' }, { t: 61.15 - L, text: '7 MILLION HOMES', sub: 'low-income & affordable' }] });
export default async () => ({
  duration: 78.042, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [5.958, 16.083],
  shots: [
    face(0, 3.3, { in: null, punch: [{ t: 1.5, s: 1.1 }], overlay: bannerOverlay('BILLIONAIRES PAY LESS?', 3.3) }),
    { kind: '2d', t0: 3.3, t1: 6.9, in: { type: 'whip', dur: .35 },
      draw: barsCard({ title: 'EFFECTIVE TAX RATE', y: .14, bars: [{ label: 'BILLIONAIRE', v: .22, hot: true, t: .1 }, { label: 'TRUCK DRIVER', v: .78, t: 4.82 - 3.3 }, { label: 'NURSE', v: .82, t: 5.66 - 3.3 }] }) },
    face(6.9, 16.083, { punch: [{ t: 7.72, s: 1.1 }] }),
    { kind: '2d', t0: 16.083, t1: 25.5, in: { type: 'whip', dur: .4 },
      draw: counterCard({ label: 'ANNUAL WEALTH TAX', to: 5, at: 18.8 - 16.083, dur: .6, suf: '%', y: .27, sub: 'JUST ON BILLIONAIRES', subAt: 21.0 - 16.083, dots: { at: 21.69 - 16.083, y: .4 } }) },
    { kind: '2d', t0: 25.5, t1: 30.4, in: { type: 'whip', dur: .4 },
      draw: counterCard({ label: 'WOULD RAISE ABOUT', to: 400, at: 27.2 - 25.5, dur: .8, pre: '$', suf: 'B', y: .3, sub: 'EVERY YEAR', subAt: 28.1 - 25.5, sub2: '$4 TRILLION IN 10 YEARS', sub2At: 28.69 - 25.5 }) },
    face(30.4, 38.9),
    { kind: '2d', t0: L, t1: 47.8, draw: buys, in: { type: 'whip', dur: .4 } },
    { kind: '2d', t0: 47.8, t1: 57.3, in: { type: 'whip', dur: .4 },
      draw: counterCard({ label: 'STIPEND IN THE FIRST YEAR', to: 3000, at: 48.99 - 47.8, dur: .9, pre: '$', y: .3, sub: 'EVERY WORKING-CLASS PERSON', subAt: 52.0 - 47.8, sub2: 'EARNING UNDER $150K', sub2At: 55.25 - 47.8 }) },
    { kind: '2d', t0: 57.3, t1: 64.8, draw: (c, lt, e) => buys(c, lt + 57.3 - L, e), in: { type: 'whip', dur: .4 } },
    face(64.8, 78.042, { punch: [{ t: 2.47, s: 1.08 }, { t: 9.13, s: 1.08 }] }),
  ],
  lockups: [
    { t0: 0, t1: 3.3, lines: [[{ w: 'many of these guys are paying', k: 's', at: .1 }], [{ w: 'an effective', k: 's', at: 1.12 }], [{ w: 'real tax rate', k: 'bo', at: 2.08 }]] },
    { t0: 3.35, t1: 6.9, y: .66, lines: [[{ w: 'lower than a', k: 's', at: 3.82 }], [{ w: 'truck driver', k: 'b', at: 4.82 }], [{ w: 'or a nurse', k: 'sc', at: 5.66 }]] },
    { t0: 6.95, t1: 11.0, lines: [[{ w: 'the billionaire class', k: 's', at: 8.1 }], [{ w: 'is doing', k: 's', at: 9.12 }], [{ w: 'phenomenally well', k: 'sc', at: 9.7 }]] },
    { t0: 11.05, t1: 16.083, lines: [[{ w: 'impose upon them', k: 's', at: 13.1 }], [{ w: 'a wealth tax', k: 'bo', at: 14.62 }]] },
    { t0: 21.6, t1: 25.5, y: .68, lines: [[{ w: 'about', k: 's', at: 21.69 }, { w: '2,000', k: 'bo', at: 21.75 }], [{ w: 'individuals', k: 's', at: 22.73 }]] },
    { t0: 30.45, t1: 33.5, lines: [[{ w: 'is that on', k: 's', at: 30.53 }], [{ w: 'income or assets?', k: 'bo', at: 30.77 }]] },
    { t0: 33.55, t1: 38.9, lines: [[{ w: 'their wealth', k: 'sc', at: 33.6 }], [{ w: 'what they are worth', k: 's', at: 35.51 }], [{ w: 'at a given moment', k: 's', at: 36.05 }]] },
    { t0: 39.0, t1: 42.2, y: .7, lines: [[{ w: 'this is what we could do', k: 's', at: 40.41 }]] },
    { t0: 47.85, t1: 52.0, y: .68, lines: [[{ w: 'we could provide a', k: 's', at: 48.25 }], [{ w: 'stipend', k: 'sc', at: 49.93 }]] },
    { t0: 52.05, t1: 57.3, y: .68, lines: [[{ w: 'to every working-class', k: 's', at: 51.71 }], [{ w: 'individual', k: 'sc', at: 54.09 }]] },
    { t0: 64.85, t1: 70.6, lines: [[{ w: "it's a", k: 's', at: 66.75 }], [{ w: 'transfer of wealth', k: 'bo', at: 67.27 }], [{ w: 'to working families', k: 'sc', at: 69.23 }]] },
    { t0: 70.65, t1: 75.2, lines: [[{ w: 'an economy that', k: 's', at: 72.65 }], [{ w: 'works for workers', k: 'bo', at: 73.93 }]] },
    { t0: 75.25, t1: 79, keep: true, lines: [[{ w: 'and not', k: 's', at: 75.33 }], [{ w: 'the people on top', k: 'sc', at: 75.51 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 2.08, g: .24, align: 'start', max: 1.2 },
    { n: 'tick_clock', t: 27.2, g: .2, align: 'start', max: .9 }, { n: 'coins_clink', t: 28.0, g: .3, align: 'start', max: 1.2 },
    { n: 'pop_hard', t: 42.37, g: .18 }, { n: 'pop_hard', t: 45.47, g: .18 }, { n: 'pop_hard', t: 58.05, g: .18 }, { n: 'pop_hard', t: 61.15, g: .18 },
  ],
});
