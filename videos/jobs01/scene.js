// jobs01: Steve Eisman on The Diary Of A CEO — "no new technology has ever been a net destroyer of jobs": the AI job-loss
// prediction vs what happened, the radiologist example, and why it may be a great time to start a business.
import { listCard, wordCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 108.292, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [6.875],
  shots: [
    face(0, 6.875, { in: null, punch: [{ t: 1.24, s: 1.08 }, { t: 5.72, s: 1.1 }], overlay: bannerOverlay('WILL AI TAKE YOUR JOB?', 6.8) }),
    face(6.875, 13.4, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 13.4, t1: 22.4, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'EARLY THIS YEAR', y: .19, gap: 230, check: false, items: [
      { t: 14.44 - 13.4, text: 'PREDICTED', px: 76, sub: 'everybody loses their job' }, { t: 16.58 - 13.4, text: 'REALITY', px: 76, sub: 'nobody lost their job' },
      { t: 19.98 - 13.4, text: 'YOUNG PEOPLE', px: 76, sub: 'harder to get jobs ("that\'s fair")' }] }) },
    face(22.4, 31.3, { punch: [{ t: 25.1 - 22.4, s: 1.08 }, { t: 29.72 - 22.4, s: 1.1 }] }),
    face(31.3, 46.0),
    { kind: '2d', t0: 46.0, t1: 64.6, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'RADIOLOGISTS WERE TOLD', y: .19, gap: 230, check: false, tag: 'NOW: A SHORTAGE', tagBelow: true, items: [
      { t: 48.38 - 46.0, text: '"DON\'T BECOME ONE"', px: 68, sub: '"AI will read the whole thing"' }, { t: 55.62 - 46.0, text: 'TURNED OUT: FALSE', px: 68 },
      { t: 59.02 - 46.0, text: 'AI NEEDS THEM', px: 68, sub: 'to read what AI has to say', tagAt: 63.0 - 46.0 }] }) },
    face(64.6, 70.4, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 70.4, t1: 78.5, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'NEW COMPANIES', y: .19, gap: 230, items: [
      { t: 71.9 - 70.4, text: 'MORE OF THEM', px: 76 }, { t: 74.74 - 70.4, text: 'SMALLER TEAMS', px: 76 }] }) },
    face(78.5, 91.0, { punch: [{ t: 83.2 - 78.5, s: 1.08 }] }),
    { kind: '2d', t0: 91.0, t1: 100.4, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'COST TO CREATE', word: '1/100', at: 95.34 - 91.0, px: 190, sub: 'of what old media pays', subAt: 97.5 - 91.0 }) },
    face(100.4, 108.292, { punch: [{ t: 107.56 - 100.4, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 2.6, lines: [[{ w: "it's not", k: 's', at: .7 }], [{ w: 'wiping out jobs', k: 'bo', at: 1.38 }]] },
    { t0: 2.64, t1: 6.875, lines: [[{ w: 'no new technology', k: 's', at: 4.04 }], [{ w: 'has ever been a', k: 's', at: 4.86 }], [{ w: 'net destroyer of jobs', k: 'sc', at: 5.72 }]] },
    { t0: 6.95, t1: 13.4, lines: [[{ w: "one of the reasons I don't believe", k: 's', at: 11.3 }], [{ w: 'their predictions', k: 'sc', at: 12.38 }]] },
    { t0: 22.45, t1: 26.4, lines: [[{ w: "it's not", k: 's', at: 24.56 }], [{ w: 'wiping out jobs', k: 'bo', at: 25.26 }]] },
    { t0: 26.45, t1: 31.3, lines: [[{ w: 'in the history of technology', k: 's', at: 26.84 }], [{ w: 'never', k: 'bo', at: 27.78 }], [{ w: 'a net destroyer of jobs', k: 'sc', at: 29.38 }]] },
    { t0: 31.35, t1: 37.4, lines: [[{ w: 'these guys decided', k: 's', at: 32.98 }], [{ w: 'to get everybody', k: 's', at: 36.02 }], [{ w: 'really upset', k: 'bo', at: 36.76 }]] },
    { t0: 37.45, t1: 44.4, lines: [[{ w: 'which proved to be', k: 's', at: 37.52 }], [{ w: 'untrue', k: 'sc', at: 38.24 }]] },
    { t0: 44.45, t1: 46.0, lines: [[{ w: 'for example', k: 's', at: 44.94 }], [{ w: 'radiologists', k: 'bo', at: 45.2 }]] },
    { t0: 64.65, t1: 70.4, lines: [[{ w: 'a little bit of', k: 's', at: 65.64 }], [{ w: 'optimism', k: 'sc', at: 66.14 }]] },
    { t0: 78.55, t1: 81.2, lines: [[{ w: 'that does make', k: 's', at: 79.44 }], [{ w: 'a lot of sense', k: 's', at: 79.98 }]] },
    { t0: 81.25, t1: 86.9, lines: [[{ w: 'we could be entering', k: 's', at: 82.18 }], [{ w: 'a great age of', k: 's', at: 82.78 }], [{ w: 'entrepreneurship', k: 'sc', at: 83.64 }]] },
    { t0: 86.95, t1: 91.0, lines: [[{ w: 'I know from running', k: 's', at: 89.16 }], [{ w: 'my podcast business', k: 'bo', at: 90.18 }]] },
    { t0: 100.45, t1: 103.2, lines: [[{ w: 'true in a lot of', k: 's', at: 101.42 }], [{ w: 'different businesses', k: 'bo', at: 102.1 }]] },
    { t0: 103.25, t1: 112, keep: true, lines: [[{ w: 'a great time', k: 'sc', at: 105.62 }], [{ w: 'to create a new business', k: 'bo', at: 107.48 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 5.72, g: .22, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 95.34, g: .2, align: 'start', max: 1.1 },
  ],
});
