// token01: Steve Eisman on The Diary Of A CEO — "token maxing": CEOs telling engineers to use AI day and night, costs
// going insane (Uber's AI budget, a $500M bill), and then it stopped. Cards cover DOAC's own context box (~83.3 s → end).
import { listCard, wordCard, counterCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 100.667, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [8.0],
  shots: [
    face(0, 8.0, { in: null, punch: [{ t: .76, s: 1.08 }, { t: 6.6, s: 1.1 }], overlay: bannerOverlay('THE AI BILL NOBODY SAW COMING', 7.9) }),
    face(8.0, 14.4, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 14.4, t1: 19.9, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'ONE AI "TOKEN" IS ABOUT', word: '¾ OF A WORD', at: 18.26 - 14.4, px: 150, sub: 'and you pay for every one', subAt: 18.9 - 14.4 }) },
    face(19.9, 40.3, { punch: [{ t: 26.98 - 19.9, s: 1.08 }, { t: 36.0 - 19.9, s: 1.1 }] }),
    { kind: '2d', t0: 40.3, t1: 50.8, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'WHAT PEOPLE PAID', y: .19, gap: 230, check: false, items: [
      { t: .2, text: 'LAST YEAR', px: 76, sub: 'a flat subscription' }, { t: 46.1 - 40.3, text: 'THEN', px: 76, sub: 'pay for every token' }] }) },
    face(50.8, 56.3, { in: { type: 'whip', dur: .35 } }),
    face(56.3, 68.8, { punch: [{ t: 61.12 - 56.3, s: 1.08 }, { t: 66.9 - 56.3, s: 1.1 }] }),
    face(68.8, 79.6, { punch: [{ t: 77.76 - 68.8, s: 1.1 }] }),
    { kind: '2d', t0: 79.6, t1: 89.4, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'A REPORT SAID', y: .19, gap: 230, check: false, items: [
      { t: 80.96 - 79.6, text: 'UBER', px: 76, sub: 'ran through its entire AI budget' }, { t: 83.94 - 79.6, text: '→ IN ~3 MONTHS', px: 76, sub: "DOAC's note: about four months" }] }) },
    { kind: '2d', t0: 89.4, t1: 95.6, in: { type: 'whip', dur: .4 }, draw: counterCard({ label: "ONE COMPANY'S AI BILL", to: 500, at: 90.02 - 89.4, dur: .8, pre: '$', suf: 'M', y: .3, sub: 'BEFORE THEY EVEN KNEW', subAt: 90.84 - 89.4, sub2: 'STUNNED', sub2At: 94.42 - 89.4 }) },
    { kind: '2d', t0: 95.6, t1: 100.667, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'THIS SUMMER, TOKEN MAXING', word: 'STOPPED', at: 99.42 - 95.6, px: 170 }) },
  ],
  lockups: [
    { t0: 0, t1: 2.85, lines: [[{ w: 'dude,', k: 'bo', at: .76 }], [{ w: 'I want you to use AI', k: 's', at: 1.2 }]] },
    { t0: 2.9, t1: 4.85, lines: [[{ w: 'all day', k: 'sc', at: 2.9 }], [{ w: 'and all night', k: 's', at: 3.92 }]] },
    { t0: 4.88, t1: 6.28, lines: [[{ w: "I don't care what the costs are", k: 's', at: 4.88 }]] },
    { t0: 6.3, t1: 8.0, lines: [[{ w: 'use it, use it, use it', k: 'bo', at: 6.6 }]] },
    { t0: 8.05, t1: 14.4, lines: [[{ w: 'they benefited enormously from', k: 's', at: 8.16 }], [{ w: 'token maxing', k: 'sc', at: 12.88 }]] },
    { t0: 19.95, t1: 25.9, lines: [[{ w: 'a simple search', k: 's', at: 20.92 }], [{ w: 'on AI', k: 'bo', at: 23.18 }]] },
    { t0: 25.95, t1: 28.8, lines: [[{ w: 'why did the', k: 's', at: 26.04 }], [{ w: 'Roman Empire', k: 'sc', at: 26.98 }], [{ w: 'fail?', k: 's', at: 27.46 }]] },
    { t0: 31.5, t1: 37.0, lines: [[{ w: 'that search is done in', k: 's', at: 34.38 }], [{ w: 'tokens', k: 'bo', at: 36.0 }]] },
    { t0: 37.05, t1: 40.3, lines: [[{ w: 'that has', k: 's', at: 37.02 }], [{ w: 'cost', k: 'sc', at: 37.82 }]] },
    { t0: 50.85, t1: 56.3, lines: [[{ w: 'token maxing was basically', k: 's', at: 51.0 }], [{ w: 'a software engineer', k: 'bo', at: 52.78 }]] },
    { t0: 56.35, t1: 61.0, lines: [[{ w: 'your CEO literally', k: 's', at: 56.8 }], [{ w: 'calls you', k: 'sc', at: 58.38 }]] },
    { t0: 61.05, t1: 65.1, lines: [[{ w: 'dude,', k: 'bo', at: 61.12 }], [{ w: 'use AI all day', k: 's', at: 62.4 }], [{ w: 'and all night', k: 'sc', at: 64.22 }]] },
    { t0: 65.15, t1: 68.8, lines: [[{ w: "I don't care what the costs are", k: 's', at: 65.22 }], [{ w: 'use it, use it, use it', k: 'bo', at: 66.9 }]] },
    { t0: 68.85, t1: 74.5, lines: [[{ w: 'if your CEO tells you', k: 's', at: 69.56 }], [{ w: 'day and night', k: 'sc', at: 71.24 }]] },
    { t0: 74.55, t1: 79.6, lines: [[{ w: 'the costs', k: 's', at: 77.1 }], [{ w: 'went insane', k: 'bo', at: 77.76 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: .76, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 90.02, g: .22, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 99.42, g: .2, align: 'start', max: 1.1 },
  ],
});
