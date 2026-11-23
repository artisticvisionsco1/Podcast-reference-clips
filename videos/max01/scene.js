// max01: Steve Eisman on The Diary Of A CEO — losing his son Max at 24 days old, and the anger that led him to Wall Street
// (kept calm: no impact hits, gentle cards; only men on screen)
import { counterCard, listCard, wordCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 89.333, faceFps: 24, vignette: .42, leak: .25, grain: 8,
  joins: [12.375, 45.4167],
  shots: [
    face(0, 12.375, { in: null, overlay: bannerOverlay('THE STORY BEHIND "THE BIG SHORT"', 9.9) }),
    face(12.375, 19.6, { in: { type: 'amber', dur: .45 } }),
    { kind: '2d', t0: 19.6, t1: 23.0, in: { type: 'amber', dur: .45 }, draw: counterCard({ label: 'AND', to: 24, at: 20.48 - 19.6, dur: .6, suf: ' DAYS', y: .3, sub: 'LATER', subAt: 21.36 - 19.6, px: 200 }) },
    face(23.0, 40.0, { in: { type: 'amber', dur: .45 } }),
    { kind: '2d', t0: 40.0, t1: 43.0, in: { type: 'amber', dur: .45 }, draw: wordCard({ title: 'SHE CAME INTO OUR BEDROOM AT', word: '7:00 AM', at: 41.96 - 40.0, px: 190 }) },
    face(43.0, 48.4, { in: { type: 'amber', dur: .45 } }),
    { kind: '2d', t0: 48.4, t1: 63.3, in: { type: 'amber', dur: .45 }, draw: listCard({ title: 'A CHARMED LIFE', y: .14, gap: 160, items: [
      { t: 52.76 - 48.4, text: 'GREAT SCHOOLS' }, { t: 54.48 - 48.4, text: 'WELL-TO-DO FAMILY' }, { t: 57.16 - 48.4, text: 'PERFECT MARRIAGE' }, { t: 61.68 - 48.4, text: 'REALLY HAPPY' }] }) },
    face(63.3, 89.333, { in: { type: 'amber', dur: .45 }, punch: [{ t: 65.0 - 63.3, s: 1.08 }] }),
  ],
  lockups: [
    { t0: 0, t1: 4.9, lines: [[{ w: 'I read it over and over again', k: 's', at: 0 }], [{ w: 'I thought I got it wrong', k: 'sc', at: 2.88 }]] },
    { t0: 4.95, t1: 9.9, lines: [[{ w: 'can you take me', k: 's', at: 5.38 }], [{ w: 'into that moment?', k: 'bo', at: 6.14 }]] },
    { t0: 9.95, t1: 12.375, lines: [[{ w: 'it changed', k: 's', at: 10.1 }], [{ w: 'my whole life', k: 'sc', at: 10.3 }]] },
    { t0: 12.45, t1: 16.9, lines: [[{ w: 'our son was born', k: 's', at: 12.14 }], [{ w: 'October 29th, 1996', k: 'bo', at: 13.42 }]] },
    { t0: 16.95, t1: 19.6, lines: [[{ w: 'totally healthy', k: 'sc', at: 18.0 }]] },
    { t0: 23.05, t1: 29.6, lines: [[{ w: 'the baby nurse', k: 's', at: 24.4 }], [{ w: 'got sick', k: 'sc', at: 27.16 }], [{ w: "didn't tell us", k: 's', at: 28.64 }]] },
    { t0: 29.65, t1: 35.5, lines: [[{ w: 'Max was grumpy', k: 's', at: 30.6 }], [{ w: 'she took him to bed with her', k: 's', at: 33.32 }]] },
    { t0: 35.55, t1: 40.0, lines: [[{ w: 'she fell asleep', k: 's', at: 36.36 }], [{ w: 'and smothered him', k: 'sc', at: 37.84 }]] },
    { t0: 43.05, t1: 45.3, lines: [[{ w: 'to say that', k: 's', at: 42.9 }], [{ w: 'Max was dead', k: 'sc', at: 43.34 }]] },
    { t0: 45.45, t1: 48.4, lines: [[{ w: 'up until that point', k: 's', at: 45.78 }]] },
    { t0: 49.0, t1: 52.3, y: .8, lines: [[{ w: 'I always felt like I had', k: 's', at: 48.56 }], [{ w: 'a charmed life', k: 'sc', at: 51.14 }]] },
    { t0: 63.35, t1: 67.6, lines: [[{ w: 'then basically', k: 's', at: 63.48 }], [{ w: 'we got run over by a truck', k: 'bo', at: 64.66 }]] },
    { t0: 67.65, t1: 72.2, lines: [[{ w: 'I never looked at the world', k: 's', at: 68.56 }], [{ w: 'as being safe', k: 'sc', at: 70.2 }], [{ w: 'ever again', k: 's', at: 70.68 }]] },
    { t0: 72.25, t1: 77.5, lines: [[{ w: 'and I got', k: 's', at: 72.56 }], [{ w: 'very angry', k: 'bo', at: 73.34 }]] },
    { t0: 77.55, t1: 83.2, lines: [[{ w: 'very prominent in', k: 's', at: 79.22 }], [{ w: 'the financial crisis', k: 'sc', at: 81.78 }]] },
    { t0: 83.25, t1: 87.0, lines: [[{ w: 'I was looking for', k: 's', at: 83.68 }], [{ w: 'people to hate', k: 'bo', at: 84.7 }]] },
    { t0: 87.05, t1: 91, keep: true, lines: [[{ w: 'and I found them', k: 's', at: 87.2 }], [{ w: 'on Wall Street', k: 'sc', at: 88.26 }]] },
  ],
  sfx: [],
});
