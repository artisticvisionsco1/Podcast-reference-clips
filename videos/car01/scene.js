// car01: Ryan Montgomery ("0day") on The Diary Of A CEO — the KARR dealer-installed car alarm: a master key left in an old
// app put ~2.2M US cars at risk (UC San Diego research, 2026). How to check your car and patch it.
import { listCard, counterCard, iconed, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 113.5, faceFps: 24, vignette: .38, leak: .3, grain: 8, cardFx: true,
  joins: [6.9167, 81.1667],
  shots: [
    face(0, 6.9167, { in: null, punch: [{ t: 3.04, s: 1.08 }, { t: 5.62, s: 1.1 }], overlay: bannerOverlay('A HIDDEN ALARM IN 2.2M CARS', 6.85) }),
    face(6.9167, 18.7, { in: { type: 'whip', dur: .35 }, punch: [{ t: 11.06 - 6.9167, s: 1.08 }, { t: 16.6 - 6.9167, s: 1.08 }] }),
    { kind: '2d', t0: 18.7, t1: 39.4, in: { type: 'whip', dur: .4 }, draw: iconed(listCard({ title: 'HOW IT GOT INTO YOUR CAR', y: .19, gap: 200, check: false, tag: 'ALREADY INSTALLED', tagBelow: true, items: [
      { t: 21.12 - 18.7, text: 'A DEALER-INSTALLED ALARM', px: 54 }, { t: 26.4 - 18.7, text: "YOU'RE OFFERED THE PACKAGE", px: 50 },
      { t: 31.26 - 18.7, text: 'YOU SAY "NO THANKS"', px: 56, tagAt: 34.8 - 18.7 }] }), { n: 'car', at: .6, y: .72, s: 2.2 }) },
    face(39.4, 50.3, { in: { type: 'whip', dur: .35 }, punch: [{ t: 42.74 - 39.4, s: 1.08 }, { t: 47.58 - 39.4, s: 1.08 }] }),
    { kind: '2d', t0: 50.3, t1: 63.8, in: { type: 'whip', dur: .4 }, draw: iconed(listCard({ title: 'WHAT AN ATTACKER COULD DO', y: .19, gap: 200, check: false, tag: 'FULL CONTROL', tagBelow: true, items: [
      { t: 54.42 - 50.3, text: 'UNLOCK YOUR CAR', px: 64 }, { t: 55.8 - 50.3, text: 'IMMOBILIZE IT', px: 64 },
      { t: 60.1 - 50.3, text: 'HONK, OPEN THE TRUNK', px: 58, tagAt: 62.62 - 50.3 }] }), { n: 'key', at: .6, y: .72, s: 2.0 }) },
    face(63.8, 76.8, { in: { type: 'whip', dur: .35 }, punch: [{ t: 65.6 - 63.8, s: 1.08 }, { t: 69.0 - 63.8, s: 1.1 }] }),
    { kind: '2d', t0: 76.8, t1: 81.1667, in: { type: 'whip', dur: .4 }, draw: counterCard({ label: 'CARS AFFECTED IN THE US', to: 2.2, dec: 1, suf: 'M', at: 78.04 - 76.8, dur: .9, y: .3, sub: 'FOUND BY UC SAN DIEGO RESEARCHERS', subAt: 79.0 - 76.8, sub2: 'MOSTLY SOCAL DEALERS, SINCE 2017', sub2At: 79.8 - 76.8 }) },
    face(81.1667, 91.0, { in: { type: 'whip', dur: .35 }, punch: [{ t: 82.2 - 81.1667, s: 1.08 }, { t: 87.46 - 81.1667, s: 1.08 }] }),
    { kind: '2d', t0: 91.0, t1: 108.0, in: { type: 'whip', dur: .4 }, draw: iconed(listCard({ title: 'HOW TO CHECK YOUR CAR', y: .19, gap: 210, items: [
      { t: 92.34 - 91.0, text: 'GET THEIR APP', px: 64, sub: 'from the App Store, see if your car has it' },
      { t: 96.22 - 91.0, text: 'OR: LOGO ON THE WINDSHIELD', px: 50 },
      { t: 99.6 - 91.0, text: 'UPDATE THE FIRMWARE', px: 60, sub: 'the patch has been out since July 2026' }] }), { n: 'shield', at: 99.6 - 91.0, y: .72, s: 1.9 }) },
    face(108.0, 113.5, { in: { type: 'whip', dur: .3 }, punch: [{ t: 111.02 - 108.0, s: 1.08 }, { t: 112.72 - 108.0, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 2.6, lines: [[{ w: 'the fact that it exists', k: 's', at: 0 }], [{ w: 'in your car', k: 'bo', at: 1.0 }]] },
    { t0: 2.62, t1: 6.9167, lines: [[{ w: 'gives an attacker', k: 's', at: 2.62 }], [{ w: 'full control', k: 'hl', at: 3.04 }], [{ w: 'of your car', k: 's', at: 4.7 }]] },
    { t0: 6.98, t1: 10.9, lines: [[{ w: 'this is a good one', k: 's', at: 7.48 }], [{ w: 'for you to know', k: 'bo', at: 8.2 }]] },
    { t0: 10.95, t1: 15.6, lines: [[{ w: 'K-A-R-R', k: 'hl', at: 11.06 }], [{ w: 'the car alarm system', k: 's', at: 13.1 }]] },
    { t0: 15.65, t1: 18.7, lines: [[{ w: 'this is a', k: 's', at: 15.96 }], [{ w: 'crazy situation', k: 'sc', at: 16.6 }]] },
    { t0: 39.45, t1: 46.7, lines: [[{ w: 'years go by', k: 's', at: 39.46 }], [{ w: 'researchers find', k: 'bo', at: 41.38 }], [{ w: 'an attack', k: 'sc', at: 42.74 }]] },
    { t0: 46.75, t1: 50.3, lines: [[{ w: "even if you've never", k: 's', at: 46.76 }], [{ w: 'installed it', k: 'bo', at: 47.58 }]] },
    { t0: 63.85, t1: 68.0, lines: [[{ w: 'this company made', k: 's', at: 64.86 }], [{ w: 'a big mistake', k: 'sc', at: 65.6 }]] },
    { t0: 68.05, t1: 76.8, lines: [[{ w: 'they left a', k: 's', at: 68.1 }], [{ w: 'master key', k: 'hl', at: 69.0 }], [{ w: 'in plain text', k: 's', at: 72.6 }]] },
    { t0: 81.2, t1: 86.0, lines: [[{ w: 'the only', k: 's', at: 81.74 }], [{ w: 'patch for this', k: 'bo', at: 82.2 }]] },
    { t0: 86.05, t1: 91.0, lines: [[{ w: 'knowing your car', k: 's', at: 86.36 }], [{ w: 'has that alarm', k: 'sc', at: 87.46 }]] },
    { t0: 108.05, t1: 112.3, lines: [[{ w: 'an important one', k: 's', at: 110.12 }], [{ w: 'affects millions', k: 'bo', at: 111.02 }]] },
    { t0: 112.35, t1: 118, keep: true, lines: [[{ w: 'most people', k: 's', at: 112.44 }], [{ w: "don't even know", k: 'sc', at: 112.72 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 3.04, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 34.8, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 78.04, g: .22, align: 'start', max: 1.1 },
  ],
});
