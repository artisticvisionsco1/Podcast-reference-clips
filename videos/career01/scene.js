// career01: Steve Eisman on The Diary Of A CEO — a miserable corporate lawyer, an aptitude test, and the advice: find what
// you're naturally good at. Cards cover DOAC's own lower-third (~38.5–52.5 s).
import { listCard, wordCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 94.583, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [4.0417],
  shots: [
    face(0, 4.0417, { in: null, punch: [{ t: 3.38, s: 1.1 }], overlay: bannerOverlay('HE HATED HIS JOB', 4.0) }),
    face(4.0417, 14.3, { in: { type: 'whip', dur: .35 } }),
    face(14.3, 37.5, { punch: [{ t: 25.24 - 14.3, s: 1.08 }, { t: 27.96 - 14.3, s: 1.1 }] }),
    { kind: '2d', t0: 37.5, t1: 46.4, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'THEY TEST YOUR', word: 'APTITUDES', at: 38.68 - 37.5, px: 160, sub: 'what are you naturally good at?', subAt: 43.32 - 37.5, pill: 'NOT INTELLIGENCE', pillAt: 45.32 - 37.5 }) },
    { kind: '2d', t0: 46.4, t1: 53.0, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'TWO PEOPLE', y: .19, gap: 210, check: false, items: [
      { t: 47.86 - 46.4, text: 'PERSON A → MATH', px: 76 }, { t: 48.9 - 46.4, text: 'PERSON B → WRITING', px: 76 }] }) },
    face(53.0, 61.2),
    { kind: '2d', t0: 61.2, t1: 76.4, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'HIS RESULTS', y: .19, gap: 210, tag: 'WORST JOB: CORPORATE LAWYER', tagBelow: true, items: [
      { t: 61.96 - 61.2, text: 'LOTS OF IDEAS', px: 76 }, { t: 66.74 - 61.2, text: 'NOT DETAIL-ORIENTED', px: 68, tagAt: 71.24 - 61.2 }] }) },
    face(76.4, 94.583, { punch: [{ t: 89.98 - 76.4, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 1.8, lines: [[{ w: 'I was', k: 's', at: .08 }], [{ w: 'utterly miserable', k: 'sc', at: .32 }]] },
    { t0: 1.85, t1: 4.0, lines: [[{ w: 'and not only was I miserable', k: 's', at: 1.86 }], [{ w: 'I was terrible at it', k: 'bo', at: 3.14 }]] },
    { t0: 4.1, t1: 9.8, lines: [[{ w: 'another Steve Eisman', k: 's', at: 4.88 }], [{ w: 'was 18', k: 'bo', at: 6.68 }]] },
    { t0: 9.85, t1: 14.3, lines: [[{ w: 'what life advice', k: 's', at: 9.94 }], [{ w: 'successful and happy?', k: 'sc', at: 12.42 }]] },
    { t0: 14.35, t1: 19.4, lines: [[{ w: "I'll tell you a little story", k: 's', at: 14.84 }], [{ w: 'about me', k: 's', at: 15.9 }]] },
    { t0: 19.45, t1: 24.3, lines: [[{ w: 'I went to law school', k: 's', at: 19.58 }], [{ w: 'corporate lawyer', k: 'bo', at: 23.66 }]] },
    { t0: 24.35, t1: 29.0, lines: [[{ w: 'utterly miserable', k: 'sc', at: 24.88 }], [{ w: 'terrible at it', k: 's', at: 27.72 }]] },
    { t0: 29.05, t1: 37.5, lines: [[{ w: 'a full day examination', k: 's', at: 32.46 }], [{ w: 'Johnson O\'Connor', k: 'sc', at: 35.24 }], [{ w: 'Institute', k: 's', at: 35.9 }]] },
    { t0: 53.05, t1: 57.0, lines: [[{ w: 'a whole battery of tests', k: 's', at: 53.48 }]] },
    { t0: 57.05, t1: 61.2, lines: [[{ w: 'at the end of it', k: 's', at: 57.24 }], [{ w: 'they said…', k: 'sc', at: 58.04 }]] },
    { t0: 72.0, t1: 76.4, y: .76, lines: [[{ w: 'now I understood', k: 's', at: 73.84 }], [{ w: 'why I was miserable', k: 'sc', at: 74.6 }]] },
    { t0: 76.45, t1: 82.2, lines: [[{ w: 'eventually I ended up on', k: 's', at: 76.78 }], [{ w: 'Wall Street', k: 'bo', at: 78.24 }]] },
    { t0: 82.25, t1: 87.4, lines: [[{ w: 'figure out', k: 's', at: 82.52 }], [{ w: 'what you\'re naturally good at', k: 'sc', at: 85.14 }]] },
    { t0: 87.45, t1: 91.7, lines: [[{ w: "don't be", k: 's', at: 87.52 }], [{ w: 'a square peg', k: 'bo', at: 89.76 }], [{ w: 'in a round hole', k: 's', at: 90.52 }]] },
    { t0: 91.75, t1: 97, keep: true, lines: [[{ w: "you'll be fighting", k: 's', at: 91.88 }], [{ w: 'your own inclinations', k: 'sc', at: 93.18 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 71.24, g: .2, align: 'start', max: 1.1 },
  ],
});
