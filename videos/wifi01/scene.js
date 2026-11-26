// wifi01: Ryan Montgomery ("0day") on The Diary Of A CEO — a fake "free Wi-Fi" network with a Google sign-in page that
// captures the password, and the hotel-room version of the same trick.
import { listCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 109.25, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [8.3333],
  shots: [
    face(0, 8.3333, { in: null, punch: [{ t: 5.86, s: 1.08 }, { t: 7.1, s: 1.1 }], overlay: bannerOverlay('THE FREE WI-FI TRAP', 8.25) }),
    face(8.3333, 21.0, { in: { type: 'whip', dur: .35 } }),
    face(21.0, 34.4, { punch: [{ t: 25.1 - 21.0, s: 1.08 }] }),
    { kind: '2d', t0: 34.4, t1: 50.6, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'WHAT JUST HAPPENED', y: .19, gap: 210, tag: 'NETWORK GONE', tagBelow: true, items: [
      { t: 36.32 - 34.4, text: 'JOINED THE "FREE" WI-FI', px: 60 }, { t: 38.26 - 34.4, text: '"GOOGLE SIGN-IN" POPPED UP', px: 54 },
      { t: 43.24 - 34.4, text: 'EMAIL + PASSWORD: STOLEN', px: 56, tagAt: 49.28 - 34.4 }] }) },
    face(50.6, 58.3, { in: { type: 'whip', dur: .35 }, punch: [{ t: 57.86 - 50.6, s: 1.1 }] }),
    face(58.3, 75.0, { punch: [{ t: 66.72 - 58.3, s: 1.08 }] }),
    face(75.0, 87.6, { punch: [{ t: 85.42 - 75.0, s: 1.08 }] }),
    { kind: '2d', t0: 87.6, t1: 98.0, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'NOW THINK ABOUT YOUR HOTEL', y: .19, gap: 210, check: false, tag: 'ON OPEN WI-FI', tagBelow: true, items: [
      { t: 92.0 - 87.6, text: '"WHAT\'S YOUR ROOM NUMBER?"', px: 48 }, { t: 94.42 - 87.6, text: '"ENTER YOUR CARD TO PAY"', px: 50, tagAt: 97.56 - 87.6 }] }) },
    face(98.0, 109.25, { in: { type: 'whip', dur: .35 }, punch: [{ t: 107.94 - 98.0, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 4.8, lines: [[{ w: 'connecting to', k: 's', at: 2.74 }], [{ w: 'a public Wi-Fi', k: 'bo', at: 3.4 }]] },
    { t0: 4.85, t1: 8.3333, lines: [[{ w: 'can pull in', k: 's', at: 4.86 }], [{ w: 'my passwords', k: 'sc', at: 5.86 }], [{ w: 'and expose my email', k: 's', at: 6.54 }]] },
    { t0: 8.4, t1: 15.5, lines: [[{ w: 'another thing I want to show you', k: 's', at: 8.34 }], [{ w: 'the captive portal', k: 'sc', at: 13.1 }]] },
    { t0: 15.55, t1: 21.0, lines: [[{ w: "I'll call it", k: 's', at: 14.52 }], [{ w: 'flight story', k: 'bo', at: 15.64 }], [{ w: 'free', k: 'sc', at: 19.14 }]] },
    { t0: 21.05, t1: 27.7, lines: [[{ w: "I'm broadcasting a network", k: 's', at: 23.04 }], [{ w: 'flight story free', k: 'bo', at: 25.1 }]] },
    { t0: 27.75, t1: 34.4, lines: [[{ w: "it looks like it's", k: 's', at: 29.66 }], [{ w: 'open to connect to', k: 'sc', at: 30.2 }]] },
    { t0: 50.65, t1: 56.8, lines: [[{ w: 'a pretty', k: 's', at: 54.94 }], [{ w: 'dangerous attack', k: 'bo', at: 55.26 }]] },
    { t0: 56.85, t1: 60.3, lines: [[{ w: "because it's", k: 's', at: 57.68 }], [{ w: 'so simple', k: 'sc', at: 57.86 }]] },
    { t0: 60.35, t1: 66.6, lines: [[{ w: 'this used to be difficult', k: 's', at: 60.4 }], [{ w: 'now you can buy devices', k: 'bo', at: 64.26 }]] },
    { t0: 66.65, t1: 75.0, lines: [[{ w: 'almost every device on this table', k: 's', at: 66.72 }], [{ w: 'can do that exact attack', k: 'sc', at: 68.26 }]] },
    { t0: 75.05, t1: 79.5, lines: [[{ w: 'we all', k: 's', at: 76.82 }], [{ w: 'connect to Wi-Fi', k: 'bo', at: 78.06 }], [{ w: 'around the world', k: 's', at: 77.56 }]] },
    { t0: 79.55, t1: 87.6, lines: [[{ w: 'can pull in', k: 's', at: 83.96 }], [{ w: 'my passwords', k: 'sc', at: 85.42 }]] },
    { t0: 98.05, t1: 105.9, lines: [[{ w: 'just from', k: 's', at: 101.72 }], [{ w: 'that captive portal alone', k: 'bo', at: 102.26 }]] },
    { t0: 105.95, t1: 114, keep: true, lines: [[{ w: 'on the same network as somebody', k: 's', at: 106.24 }], [{ w: 'it can get dangerous', k: 'sc', at: 107.94 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 5.86, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 43.24, g: .22, align: 'start', max: 1.1 },
  ],
});
