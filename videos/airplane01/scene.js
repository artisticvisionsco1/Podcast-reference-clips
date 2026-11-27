// airplane01: Ryan Montgomery ("0day") on The Diary Of A CEO — a Bluetooth spam demo that makes every phone in the studio
// unusable, even in airplane mode, and the fix: turn Bluetooth off in Settings.
import { listCard, wordCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 101.792, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [5.375],
  shots: [
    face(0, 5.375, { in: null, punch: [{ t: 3.6, s: 1.08 }, { t: 4.88, s: 1.1 }], overlay: bannerOverlay("AIRPLANE MODE ISN'T ENOUGH", 5.3) }),
    face(5.375, 11.2, { in: { type: 'whip', dur: .35 } }),
    face(11.2, 23.9, { punch: [{ t: 17.82 - 11.2, s: 1.08 }] }),
    face(23.9, 31.9, { punch: [{ t: 29.56 - 23.9, s: 1.08 }] }),
    face(31.9, 37.6),
    face(37.6, 49.9, { punch: [{ t: 43.96 - 37.6, s: 1.1 }] }),
    { kind: '2d', t0: 49.9, t1: 66.4, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'HOW THE ATTACK WORKS', y: .19, gap: 220, check: false, items: [
      { t: 51.8 - 49.9, text: 'FAKE "APPLE DEVICE NEARBY"', px: 48, sub: 'like a pair of AirPods asking to connect' }, { t: 60.98 - 49.9, text: 'SENT AT A HUGE RATE', px: 64 },
      { t: 63.84 - 49.9, text: 'POPUP AFTER POPUP', px: 64 }] }) },
    { kind: '2d', t0: 66.4, t1: 73.8, in: { type: 'whip', dur: .4 }, draw: wordCard({ title: 'AIRPLANE MODE DOES NOT', word: 'TURN OFF BLUETOOTH', at: 69.48 - 66.4, px: 110, sub: 'on iPhone, it can stay on', subAt: 70.82 - 66.4 }) },
    { kind: '2d', t0: 73.8, t1: 86.5, in: { type: 'whip', dur: .4 }, draw: listCard({ title: 'THE FIX', y: .19, gap: 210, tag: 'NOT FROM CONTROL CENTER', tagBelow: true, items: [
      { t: 77.3 - 73.8, text: 'SETTINGS', px: 76 }, { t: 79.66 - 73.8, text: '→ BLUETOOTH', px: 76 },
      { t: 81.62 - 73.8, text: '→ OFF', px: 76, sub: 'the Control Center button only disconnects', tagAt: 83.0 - 73.8 }] }) },
    face(86.5, 101.792, { in: { type: 'whip', dur: .35 }, punch: [{ t: 96.62 - 86.5, s: 1.08 }, { t: 100.6 - 86.5, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 3.5, lines: [[{ w: "Apple doesn't disable", k: 's', at: 1.74 }], [{ w: 'your Bluetooth', k: 'bo', at: 3.6 }]] },
    { t0: 3.55, t1: 5.375, lines: [[{ w: 'in', k: 's', at: 4.68 }], [{ w: 'airplane mode', k: 'sc', at: 4.88 }]] },
    { t0: 5.45, t1: 11.2, lines: [[{ w: 'put it in', k: 's', at: 6.98 }], [{ w: 'airplane mode', k: 'bo', at: 7.4 }], [{ w: 'and press play', k: 's', at: 8.62 }]] },
    { t0: 11.25, t1: 18.5, lines: [[{ w: 'look at your iPad', k: 's', at: 11.64 }], [{ w: 'popping up', k: 'sc', at: 17.82 }]] },
    { t0: 18.55, t1: 23.9, lines: [[{ w: 'this could', k: 's', at: 19.78 }], [{ w: 'completely crash', k: 'bo', at: 20.04 }], [{ w: 'the phone', k: 's', at: 20.84 }]] },
    { t0: 23.95, t1: 29.5, lines: [[{ w: 'everybody in here', k: 's', at: 27.7 }], [{ w: 'is getting those notifications', k: 'bo', at: 28.6 }]] },
    { t0: 29.55, t1: 31.9, lines: [[{ w: 'everyone in', k: 's', at: 29.56 }], [{ w: 'your studio', k: 'sc', at: 30.08 }]] },
    { t0: 31.95, t1: 37.6, lines: [[{ w: "phone's in airplane mode", k: 's', at: 31.94 }], [{ w: 'on, off', k: 'bo', at: 33.8 }]] },
    { t0: 37.65, t1: 44.6, lines: [[{ w: 'makes your phone', k: 's', at: 42.84 }], [{ w: 'essentially unusable', k: 'sc', at: 43.46 }]] },
    { t0: 44.65, t1: 49.9, lines: [[{ w: 'I could be walking by', k: 's', at: 44.74 }], [{ w: "so you're unable", k: 's', at: 48.06 }], [{ w: 'to use your device', k: 'bo', at: 48.78 }]] },
    { t0: 86.55, t1: 89.6, lines: [[{ w: 'a harmless attack', k: 's', at: 87.24 }], [{ w: 'an annoying attack', k: 'bo', at: 88.26 }]] },
    { t0: 89.65, t1: 97.8, lines: [[{ w: "you're getting spammed", k: 's', at: 94.56 }], [{ w: "you can't do anything", k: 'sc', at: 96.54 }]] },
    { t0: 97.85, t1: 106, keep: true, lines: [[{ w: 'just disable', k: 's', at: 99.86 }], [{ w: 'your Bluetooth', k: 'bo', at: 100.38 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 3.6, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 69.48, g: .22, align: 'start', max: 1.1 },
  ],
});
