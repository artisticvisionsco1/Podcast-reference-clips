// doom01: Steve Eisman on The Diary Of A CEO — "AI doom is a strategy, in my view": cheap Chinese models, hysteria → regulation
// → keep competitors out; "if you really believed it would end the world, you wouldn't be selling your IPO"
import { barsCard, listCard, chainCard, wordCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const P = 46.2;
const plan = chainCard({ title: 'THE PLAN (IN HIS VIEW)', y: .1, levels: [
  { t: 48.9 - P, text: 'CREATE HYSTERIA', sub: '"the world is going to end"' }, { t: 52.84 - P, text: 'REGULATION' },
  { t: 58.86 - P, text: 'GOVERNMENT STEPS IN' }, { t: 68.48 - P, text: 'CHINESE MODELS OUT' }] });
export default async () => ({
  duration: 96.333, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [12.0417, 23.5833, 70.2083],
  shots: [
    face(0, 12.0417, { in: null, punch: [{ t: 8.0, s: 1.08 }, { t: 9.42, s: 1.1 }], overlay: bannerOverlay('IS AI DOOM A SALES PITCH?', 12.0) }),
    face(12.0417, 18.0, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 18.0, t1: 20.9, in: { type: 'whip', dur: .35 }, draw: wordCard({ title: 'A CONSPIRACY THAT', word: 'THE WORLD ENDS', at: 18.16 - 18.0, px: 130, pill: 'IN HIS VIEW', pillAt: .9 }) },
    face(20.9, 26.2),
    // covers DOAC's own lower-third (Dario caption) in the source
    { kind: '2d', t0: 26.2, t1: 36.3, in: { type: 'whip', dur: .4 },
      draw: barsCard({ title: 'COST TO USE', y: .14, bars: [{ label: 'US AI MODEL', v: .92, t: .3 }, { label: 'CHINESE MODEL', v: .092, hot: true, t: 28.66 - 26.2, note: '"pretty good"' }] }) },
    { kind: '2d', t0: 36.3, t1: P, in: { type: 'whip', dur: .4 }, draw: listCard({ title: "I'M SAM ALTMAN OR DARIO…", y: .13, gap: 170, check: false, items: [
      { t: 36.88 - 36.3, text: 'I LOSE MONEY' }, { t: 39.14 - 36.3, text: "CAN'T AFFORD A PRICE WAR", px: 56 }, { t: 43.44 - 36.3, text: 'KEEP THEM OUT' }] }) },
    { kind: '2d', t0: P, t1: 53.6, in: { type: 'amber', dur: .45 }, draw: plan },
    face(53.6, 64.4, { punch: [{ t: 61.14 - 53.6, s: 1.08 }] }),
    { kind: '2d', t0: 64.4, t1: 70.2083, in: { type: 'whip', dur: .4 }, draw: (c, lt, e) => plan(c, lt + 64.4 - P, e) },
    face(70.2083, 83.4, { in: { type: 'whip', dur: .35 }, punch: [{ t: 81.56 - 70.2083, s: 1.1 }] }),
    { kind: '2d', t0: 83.4, t1: 90.6, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'IF YOU REALLY BELIEVED IT…', y: .13, gap: 190, check: false, tag: 'WATCH WHAT THEY DO', tagBelow: true, items: [
      { t: .1, text: '"THIS COULD END EARTH"' }, { t: 87.42 - 83.4, text: '"…WANT SOME IPO?"', tagAt: 89.0 - 83.4 }] }) },
    face(90.6, 96.333, { punch: [{ t: 93.22 - 90.6, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 2.3, lines: [[{ w: 'Sam Altman said', k: 's', at: .0 }], [{ w: 'in 2015', k: 'bo', at: .88 }]] },
    { t0: 2.35, t1: 7.9, lines: [[{ w: 'superintelligence is probably', k: 's', at: 2.92 }], [{ w: 'the greatest threat', k: 'sc', at: 4.74 }], [{ w: 'to humanity', k: 's', at: 6.1 }]] },
    { t0: 7.95, t1: 12.0, lines: [[{ w: "I don't believe a word", k: 's', at: 8.82 }], [{ w: 'Sam Altman says', k: 'bo', at: 9.56 }], [{ w: 'literally', k: 'sc', at: 11.52 }]] },
    { t0: 12.1, t1: 18.0, lines: [[{ w: 'Anthropic and OpenAI', k: 's', at: 12.56 }], [{ w: 'in my view', k: 's', at: 15.42 }], [{ w: 'create a conspiracy', k: 'bo', at: 16.24 }]] },
    { t0: 20.95, t1: 23.55, lines: [[{ w: 'not a single doubt', k: 'sc', at: 21.8 }], [{ w: 'in my mind', k: 's', at: 22.98 }]] },
    { t0: 23.6, t1: 26.2, lines: [[{ w: "I'm Sam Altman", k: 's', at: 24.86 }], [{ w: 'or Dario', k: 'bo', at: 26.04 }]] },
    { t0: 26.25, t1: 31.0, y: .68, lines: [[{ w: 'these Chinese models', k: 's', at: 28.41 }], [{ w: 'pretty good', k: 'sc', at: 30.34 }]] },
    { t0: 31.05, t1: 36.3, y: .68, lines: [[{ w: "they're", k: 's', at: 34.28 }], [{ w: 'one-tenth the cost', k: 'bo', at: 34.68 }]] },
    { t0: P + .05, t1: 53.6, y: .78, lines: [[{ w: 'what do I do?', k: 's', at: 47.38 }], [{ w: 'I create hysteria', k: 'sc', at: 48.8 }]] },
    { t0: 53.65, t1: 59.0, lines: [[{ w: 'the federal government', k: 's', at: 56.84 }], [{ w: 'regulates', k: 'bo', at: 58.86 }]] },
    { t0: 59.05, t1: 64.4, lines: [[{ w: "if planet earth's going to end", k: 's', at: 61.04 }], [{ w: 'regulate this business', k: 'sc', at: 62.98 }]] },
    { t0: 64.45, t1: 70.2, y: .78, lines: [[{ w: 'throw the Chinese models', k: 's', at: 68.48 }], [{ w: 'out of the country', k: 'bo', at: 69.4 }]] },
    { t0: 70.25, t1: 76.9, lines: [[{ w: 'if I was Dario', k: 's', at: 70.56 }], [{ w: 'and I seriously thought', k: 'sc', at: 73.74 }]] },
    { t0: 76.95, t1: 83.4, lines: [[{ w: 'what I\'m doing', k: 's', at: 77.88 }], [{ w: 'is going to end', k: 's', at: 79.0 }], [{ w: 'planet earth', k: 'bo', at: 81.86 }]] },
    { t0: 90.65, t1: 94.5, lines: [[{ w: "I'm going", k: 's', at: 92.86 }], [{ w: 'public', k: 'bo', at: 93.22 }]] },
    { t0: 94.55, t1: 98, keep: true, lines: [[{ w: 'and raise', k: 's', at: 94.94 }], [{ w: 'a lot of capital', k: 'sc', at: 95.62 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 9.42, g: .22, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 48.9, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 68.48, g: .22, align: 'start', max: 1.1 },
  ],
});
