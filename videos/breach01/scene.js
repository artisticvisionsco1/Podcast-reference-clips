// breach01: Ryan Montgomery ("0day") on The Diary Of A CEO — the National Public Data breach (2.8B records), what someone
// can do with it, how to check for free, and why to freeze your credit.
import { listCard, wordCard, counterCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 82.0, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [6.8333],
  shots: [
    face(0, 6.8333, { in: null, punch: [{ t: 4.3, s: 1.08 }, { t: 5.92, s: 1.1 }], overlay: bannerOverlay('YOUR DATA IS ALREADY OUT THERE', 6.75) }),
    face(6.8333, 11.6, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 11.6, t1: 21.0, in: { type: 'whip', dur: .4 }, draw: counterCard({ label: 'RECORDS EXPOSED', to: 2.8, dec: 1, suf: 'B', at: 12.96 - 11.6, dur: .9, y: .3, sub: 'IN ONE DATA BREACH', subAt: 14.66 - 11.6, sub2: 'THERE ARE ~300M AMERICANS', sub2At: 19.98 - 11.6 }) },
    face(21.0, 29.6, { punch: [{ t: 23.86 - 21.0, s: 1.08 }] }),
    { kind: '2d', t0: 29.6, t1: 38.9, in: { type: 'whip', dur: .4 }, draw: listCard({ title: "IF YOU'RE OVER 30, IT'S OUT THERE", y: .19, gap: 200, check: false, tag: 'IN FULL', tagBelow: true, items: [
      { t: 31.46 - 29.6, text: 'EVERY ADDRESS', px: 72 }, { t: 33.1 - 29.6, text: 'PHONE NUMBER', px: 72 },
      { t: 33.94 - 29.6, text: 'SOCIAL SECURITY NO.', px: 64, tagAt: 35.16 - 29.6 }] }) },
    { kind: '2d', t0: 38.9, t1: 45.9, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'WHAT SOMEONE CAN DO WITH IT', y: .19, gap: 200, check: false, items: [
      { t: 39.58 - 38.9, text: 'OPEN CARDS IN YOUR NAME', px: 58 }, { t: 42.54 - 38.9, text: 'IMPERSONATE YOU', px: 64 },
      { t: 43.86 - 38.9, text: 'STEAL YOUR IDENTITY', px: 64 }] }) },
    face(45.9, 49.7, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 49.7, t1: 61.2, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'CHECK IF YOU WERE IN IT (FREE)', y: .19, gap: 190, items: [
      { t: 50.08 - 49.7, text: 'NPD.PENTESTER.COM', px: 60, sub: "his company's free checker" }, { t: 53.08 - 49.7, text: 'FIRST + LAST NAME', px: 64 },
      { t: 54.86 - 49.7, text: 'YEAR OF BIRTH', px: 64 }, { t: 56.62 - 49.7, text: 'EVERY STATE YOU LIVED IN', px: 54 }] }) },
    face(61.2, 63.6),
    { kind: '2d', t0: 63.6, t1: 72.0, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'IF YOU WERE EXPOSED', word: 'FREEZE YOUR CREDIT', at: 63.86 - 63.6, px: 120, sub: 'free in the US (since 2018)', subAt: 65.4 - 63.6 }) },
    face(72.0, 82.0, { in: { type: 'whip', dur: .35 }, punch: [{ t: 81.72 - 72.0, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 3.3, lines: [[{ w: "if you're over 30", k: 's', at: 0 }], [{ w: "every address you've ever lived at", k: 's', at: 1.88 }]] },
    { t0: 3.32, t1: 6.8333, lines: [[{ w: 'your social security number', k: 'bo', at: 4.3 }], [{ w: 'is out there', k: 'sc', at: 5.92 }]] },
    { t0: 6.9, t1: 11.6, lines: [[{ w: 'the national public', k: 's', at: 7.0 }], [{ w: 'data breach', k: 'bo', at: 7.4 }]] },
    { t0: 21.05, t1: 25.8, lines: [[{ w: 'almost', k: 's', at: 22.88 }], [{ w: "everybody's affected", k: 'sc', at: 23.86 }]] },
    { t0: 25.85, t1: 29.6, lines: [[{ w: "this isn't a fact, but", k: 's', at: 27.24 }], [{ w: 'almost guaranteed', k: 'bo', at: 28.28 }]] },
    { t0: 45.95, t1: 49.7, lines: [[{ w: "check if you're in it", k: 's', at: 47.98 }], [{ w: 'completely free', k: 'sc', at: 48.9 }]] },
    { t0: 61.25, t1: 63.6, lines: [[{ w: 'what you need to do is', k: 's', at: 62.98 }]] },
    { t0: 72.05, t1: 76.0, lines: [[{ w: "it doesn't do anything", k: 's', at: 73.18 }], [{ w: 'other than stop people', k: 'bo', at: 74.46 }]] },
    { t0: 76.05, t1: 86, keep: true, lines: [[{ w: 'opening cards, loans, mortgages', k: 's', at: 76.06 }], [{ w: 'in your name', k: 'sc', at: 81.16 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 4.3, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 12.96, g: .22, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 63.86, g: .2, align: 'start', max: 1.1 },
  ],
});
