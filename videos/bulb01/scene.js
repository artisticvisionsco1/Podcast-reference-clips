// bulb01: Ryan Montgomery ("0day") on The Diary Of A CEO — why he says not to trust smart-home devices (most talk to a
// Chinese cloud server), what a malicious firmware update could do, and the fix: a VLAN, which he uses at home.
import { listCard, chainCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 106.125, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [6.7917, 104.7917],
  shots: [
    face(0, 6.7917, { in: null, punch: [{ t: 4.38, s: 1.08 }, { t: 6.3, s: 1.1 }], overlay: bannerOverlay('WHERE YOUR SMART BULB REALLY CONNECTS', 6.7) }),
    face(6.7917, 13.2, { in: { type: 'whip', dur: .35 } }),
    face(13.2, 19.0, { punch: [{ t: 15.86 - 13.2, s: 1.08 }] }),
    face(19.0, 26.6, { punch: [{ t: 23.92 - 19.0, s: 1.1 }] }),
    face(26.6, 33.7),
    { kind: '2d', t0: 33.7, t1: 47.0, in: { type: 'whip', dur: .4 }, draw: chainCard({ title: 'WHERE "MAKE IT RED" ACTUALLY GOES', levels: [
      { text: 'YOUR PHONE', t: 39.96 - 33.7 }, { text: 'CHINA', t: 40.7 - 33.7, sub: 'a Chinese cloud server' },
      { text: 'YOUR ROUTER', t: 42.1 - 33.7 }, { text: 'THE BULB', t: 43.42 - 33.7 }] }) },
    face(47.0, 61.4, { in: { type: 'whip', dur: .35 }, punch: [{ t: 58.3 - 47.0, s: 1.08 }] }),
    face(61.4, 84.2, { punch: [{ t: 66.36 - 61.4, s: 1.08 }, { t: 82.28 - 61.4, s: 1.1 }] }),
    { kind: '2d', t0: 84.2, t1: 104.7917, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'THE FIX (VERY SIMPLE)', y: .19, gap: 200, items: [
      { t: 88.8 - 84.2, text: 'ASK AN IT PERSON', px: 68, sub: 'family, a friend, or hire one' }, { t: 94.78 - 84.2, text: 'CREATE A VLAN', px: 72, sub: 'a virtual local area network' },
      { t: 99.84 - 84.2, text: 'SMART DEVICES → ONE SIDE', px: 54 }, { t: 102.76 - 84.2, text: 'PHONE + LAPTOP → OTHER', px: 56 }] }) },
    face(104.7917, 106.125, { in: { type: 'whip', dur: .3 } }),
  ],
  lockups: [
    { t0: 0, t1: 4.3, lines: [[{ w: 'these devices', k: 's', at: 1.32 }], [{ w: 'communicate with', k: 's', at: 3.54 }]] },
    { t0: 4.35, t1: 6.7917, lines: [[{ w: 'China', k: 'bo', at: 4.38 }], [{ w: 'almost all of them', k: 'sc', at: 4.8 }]] },
    { t0: 6.85, t1: 11.9, lines: [[{ w: 'internet-facing devices', k: 's', at: 7.3 }], [{ w: 'in your home', k: 'bo', at: 8.46 }]] },
    { t0: 11.95, t1: 15.2, lines: [[{ w: "don't trust", k: 'sc', at: 12.2 }], [{ w: 'any of them', k: 's', at: 12.68 }]] },
    { t0: 15.25, t1: 19.0, lines: [[{ w: "not because I'm some", k: 's', at: 15.24 }], [{ w: 'conspiracy theorist', k: 'sc', at: 15.86 }]] },
    { t0: 19.05, t1: 26.6, lines: [[{ w: 'they communicate with China', k: 's', at: 23.08 }], [{ w: "they're built in China", k: 'bo', at: 25.74 }]] },
    { t0: 26.65, t1: 29.6, lines: [[{ w: 'a Chinese', k: 's', at: 27.74 }], [{ w: 'cloud server', k: 'bo', at: 28.28 }]] },
    { t0: 29.65, t1: 33.7, lines: [[{ w: 'I want this bulb', k: 's', at: 30.6 }], [{ w: 'to be red', k: 'sc', at: 31.28 }]] },
    { t0: 47.05, t1: 52.6, lines: [[{ w: "let's say China", k: 's', at: 48.82 }], [{ w: 'decides to hate us', k: 'bo', at: 49.38 }]] },
    { t0: 52.65, t1: 58.9, lines: [[{ w: 'push out a firmware update', k: 's', at: 54.38 }], [{ w: "that's malicious", k: 'sc', at: 57.76 }]] },
    { t0: 58.95, t1: 61.4, lines: [[{ w: "they're already on", k: 's', at: 59.92 }], [{ w: 'your home network', k: 'bo', at: 60.92 }]] },
    { t0: 61.45, t1: 71.2, lines: [[{ w: 'malicious firmware', k: 'sc', at: 66.36 }], [{ w: 'that appears to be working fine', k: 's', at: 68.88 }]] },
    { t0: 71.25, t1: 77.8, lines: [[{ w: 'they could pivot', k: 'bo', at: 74.42 }], [{ w: 'to your computer', k: 's', at: 76.94 }]] },
    { t0: 77.85, t1: 84.2, lines: [[{ w: 'your phone, your cameras', k: 's', at: 77.92 }], [{ w: 'more access than you intended', k: 'sc', at: 82.28 }]] },
    { t0: 104.85, t1: 110, keep: true, lines: [[{ w: "that's what I do", k: 's', at: 104.88 }], [{ w: 'in my house', k: 'sc', at: 105.32 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 4.38, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 40.7, g: .22, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 94.78, g: .2, align: 'start', max: 1.1 },
  ],
});
