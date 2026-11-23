// crash01: Steve Eisman on The Diary Of A CEO — "if Anthropic and OpenAI went bankrupt, the US goes into recession the next day":
// Nvidia's growth, 70% of revenue from 5 customers, and the whole AI chain resting on two companies
import { counterCard, listCard, chainCard, wordCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const C = 66.0;
const chain = chainCard({ title: 'THE WHOLE AI CHAIN', y: .1, levels: [
  { t: 67.86 - C, text: 'ANTHROPIC + OPENAI' }, { t: 70.08 - C, text: 'MICROSOFT · AMAZON · GOOGLE' }, { t: 71.94 - C, text: 'CHIPS & EQUIPMENT', sub: 'NVIDIA' },
  { t: 75.18 - C, text: 'AI DATA CENTERS' }], breakAt: 83.02 - C, end: 'RECESSION', endAt: 86.94 - C });
export default async () => ({
  duration: 87.833, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [10.0, 63.0],
  shots: [
    face(0, 6.1, { in: null, punch: [{ t: 4.88, s: 1.1 }], overlay: bannerOverlay('IF OPENAI GOES BANKRUPT…', 6.1) }),
    { kind: '2d', t0: 6.1, t1: 10.0, in: { type: 'whip', dur: .35 }, draw: wordCard({ title: 'THE U.S. WOULD GO INTO', word: 'RECESSION', at: 7.42 - 6.1, sub: 'THE NEXT DAY', subAt: 7.76 - 6.1, px: 160 }) },
    face(10.0, 18.6, { punch: [{ t: 1.84, s: 1.1 }] }),
    { kind: '2d', t0: 18.6, t1: 24.4, in: { type: 'whip', dur: .4 },
      draw: counterCard({ label: 'NVIDIA REVENUE GROWTH', to: 100, at: 21.0 - 18.6, dur: .7, pre: '+', suf: '%', y: .3, sub: 'IN ONE QUARTER', subAt: 21.6 - 18.6, sub2: 'NOT A SMALL COMPANY', sub2At: 23.5 - 18.6 }) },
    face(24.4, 42.0, { punch: [{ t: 35.58 - 24.4, s: 1.1 }] }),
    { kind: '2d', t0: 42.0, t1: 52.8, in: { type: 'whip', dur: .4 },
      draw: counterCard({ label: "NVIDIA'S REVENUE", to: 70, at: 46.28 - 42.0, dur: .8, suf: '%', y: .3, sub: 'COMES FROM JUST 5 CUSTOMERS', subAt: 48.32 - 42.0, sub2: 'VERY CONCENTRATED', sub2At: 50.64 - 42.0 }) },
    { kind: '2d', t0: 52.8, t1: 63.0, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'THOSE 5 CUSTOMERS', y: .12, gap: 140, items: [
      { t: 58.28 - 52.8, text: 'MICROSOFT' }, { t: 58.78 - 52.8, text: 'AMAZON' }, { t: 59.72 - 52.8, text: 'GOOGLE' },
      { t: 60.96 - 52.8, text: 'ORACLE', sub: 'a little bit' }, { t: 62.22 - 52.8, text: 'META', sub: 'a little bit' }] }) },
    face(63.0, C, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: C, t1: 87.833, in: { type: 'amber', dur: .45 }, draw: chain },
  ],
  lockups: [
    { t0: 0, t1: 3.2, lines: [[{ w: "if, and it's a big if,", k: 's', at: .86 }], [{ w: "I'm not making that prediction", k: 's', at: 1.9 }]] },
    { t0: 3.25, t1: 6.1, lines: [[{ w: 'if Anthropic and OpenAI', k: 's', at: 3.34 }], [{ w: 'went bankrupt', k: 'bo', at: 4.64 }]] },
    { t0: 10.05, t1: 14.0, lines: [[{ w: 'at the top of the food chain', k: 's', at: 10.46 }], [{ w: 'is Nvidia', k: 'bo', at: 11.66 }]] },
    { t0: 14.05, t1: 18.6, lines: [[{ w: 'the largest', k: 's', at: 15.36 }], [{ w: 'market cap company', k: 'sc', at: 15.62 }], [{ w: 'in the world', k: 's', at: 16.94 }]] },
    { t0: 24.45, t1: 30.6, lines: [[{ w: 'a billion-dollar company', k: 's', at: 25.14 }], [{ w: 'grew 100%', k: 's', at: 26.82 }], [{ w: "that's nice", k: 'sc', at: 29.64 }]] },
    { t0: 30.65, t1: 36.1, lines: [[{ w: 'the largest company', k: 's', at: 31.9 }], [{ w: 'on planet earth', k: 's', at: 32.74 }], [{ w: 'unbelievable', k: 'bo', at: 35.36 }]] },
    { t0: 36.15, t1: 42.0, lines: [[{ w: 'whether it lasts', k: 's', at: 38.78 }], [{ w: 'is another story', k: 'sc', at: 40.58 }]] },
    { t0: 53.0, t1: 57.9, y: .78, lines: [[{ w: 'those customers are', k: 's', at: 54.44 }], [{ w: 'the hyperscalers', k: 'bo', at: 56.7 }]] },
    { t0: 63.05, t1: C, lines: [[{ w: 'the entire chain', k: 's', at: 63.34 }]] },
    { t0: C + .05, t1: 72.0, y: .76, lines: [[{ w: 'is dependent upon', k: 's', at: 65.84 }], [{ w: 'these two', k: 'bo', at: 67.86 }]] },
    { t0: 72.05, t1: 80.2, y: .76, lines: [[{ w: 'to build', k: 's', at: 74.66 }], [{ w: 'AI data centers', k: 'sc', at: 74.86 }], [{ w: 'commitments from these two', k: 's', at: 77.42 }]] },
    { t0: 80.25, t1: 85.6, y: .76, lines: [[{ w: 'if either one', k: 's', at: 80.4 }], [{ w: 'were to die', k: 'bo', at: 82.34 }], [{ w: 'the entire chain would stop', k: 's', at: 83.84 }]] },
    { t0: 85.65, t1: 89, keep: true, y: .76, lines: [[{ w: "we'd go into recession", k: 's', at: 85.72 }], [{ w: 'immediately', k: 'sc', at: 87.36 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 7.42, g: .24, align: 'start', max: 1.2 },
    { n: 'impact_big', t: 83.02, g: .26, align: 'start', max: 1.4 },
  ],
});
