// cable01: Ryan Montgomery ("0day") on The Diary Of A CEO — the O.MG cable: a normal-looking charger with a mini computer
// inside that can type 300 characters a second into an unlocked phone, then delete itself. Live demo.
import { listCard, typeCard, iconed, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const TYPED = 'This is how fast the cable types: three hundred characters every single second. A whole message, a link, a command, ' +
  'typed and sent before you could even look down at your screen. No virus to install. No app to download. Just a charger ' +
  'that looks exactly like yours, plugged into a phone that happens to be unlocked. Done.';
export default async () => ({
  duration: 125.708, faceFps: 24, vignette: .38, leak: .3, grain: 8, cardFx: true,
  joins: [5.5833, 113.25],
  shots: [
    face(0, 5.5833, { in: null, punch: [{ t: 3.06, s: 1.08 }, { t: 3.9, s: 1.1 }], overlay: bannerOverlay('THIS CHARGER CAN HACK YOUR PHONE', 5.5) }),
    face(5.5833, 17.3, { in: { type: 'whip', dur: .35 }, punch: [{ t: 14.44 - 5.5833, s: 1.08 }] }),
    { kind: '2d', t0: 17.3, t1: 24.2, in: { type: 'whip', dur: .4 }, draw: typeCard({ title: 'THE O.MG CABLE TYPES THIS FAST', text: TYPED, at: 19.06 - 17.3, cps: 300, counter: 'CHARACTERS PER SECOND' }) },
    face(24.2, 37.9, { in: { type: 'whip', dur: .35 }, punch: [{ t: 28.84 - 24.2, s: 1.08 }, { t: 36.18 - 24.2, s: 1.1 }] }),
    face(37.9, 57.9, { punch: [{ t: 46.48 - 37.9, s: 1.08 }, { t: 55.96 - 37.9, s: 1.1 }] }),
    { kind: '2d', t0: 57.9, t1: 77.6, in: { type: 'whip', dur: .4 }, draw: iconed(listCard({ title: 'WHAT IT COULD DO, BY ITSELF', y: .19, gap: 190, check: false, tag: "YOU'D NEVER KNOW", tagBelow: true, items: [
      { t: 60.32 - 57.9, text: 'GOAL: YOUR CONTACTS', px: 60 }, { t: 63.64 - 57.9, text: 'MAKES A HIDDEN SHORTCUT', px: 54 },
      { t: 68.2 - 57.9, text: 'EMAILS THEM OUT', px: 60 }, { t: 72.28 - 57.9, text: 'DELETES ITSELF', px: 60, sub: 'then acts like a normal charger', tagAt: 75.96 - 57.9 }] }), { n: 'cable', at: .6, y: .76, s: 1.5 }) },
    face(77.6, 91.0, { in: { type: 'whip', dur: .35 }, punch: [{ t: 83.0 - 77.6, s: 1.08 }, { t: 87.28 - 77.6, s: 1.1 }] }),
    face(91.0, 113.25, { punch: [{ t: 92.84 - 91.0, s: 1.08 }, { t: 106.2 - 91.0, s: 1.08 }] }),
    face(113.25, 125.708, { in: { type: 'whip', dur: .3 }, punch: [{ t: 119.28 - 113.25, s: 1.08 }, { t: 124.84 - 113.25, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 2.3, lines: [[{ w: 'completely', k: 's', at: .2 }], [{ w: 'removes itself', k: 'bo', at: .4 }]] },
    { t0: 2.32, t1: 5.5833, lines: [[{ w: 'behaves like a', k: 's', at: 2.36 }], [{ w: 'normal charger', k: 'sc', at: 3.06 }], [{ w: "you'd never know", k: 'hl', at: 3.72 }]] },
    { t0: 5.65, t1: 8.2, lines: [[{ w: 'is this a normal', k: 's', at: 5.74 }], [{ w: 'iPhone cable?', k: 'bo', at: 6.86 }]] },
    { t0: 8.25, t1: 13.5, lines: [[{ w: 'an orange marker', k: 's', at: 9.48 }], [{ w: "don't mix it up", k: 'bo', at: 11.74 }]] },
    { t0: 13.55, t1: 17.3, lines: [[{ w: 'when that gets plugged', k: 's', at: 13.66 }], [{ w: 'into your phone', k: 'bo', at: 14.44 }]] },
    { t0: 25.6, t1: 28.7, lines: [[{ w: 'what does', k: 's', at: 25.64 }], [{ w: 'that mean?', k: 'bo', at: 25.82 }]] },
    { t0: 28.75, t1: 32.3, lines: [[{ w: 'if I want to send', k: 's', at: 28.75 }], [{ w: 'hello', k: 'sc', at: 28.84 }], [{ w: 'and hit enter', k: 's', at: 29.86 }]] },
    { t0: 32.35, t1: 37.9, lines: [[{ w: 'jump around the phone', k: 's', at: 35.02 }], [{ w: 'emulate a keyboard', k: 'bo', at: 36.18 }]] },
    { t0: 37.95, t1: 44.8, lines: [[{ w: "what's the", k: 's', at: 40.5 }], [{ w: 'potential outcome', k: 'bo', at: 41.78 }]] },
    { t0: 44.85, t1: 51.9, lines: [[{ w: 'if your device', k: 's', at: 45.76 }], [{ w: 'is unlocked', k: 'sc', at: 46.48 }]] },
    { t0: 51.95, t1: 57.9, lines: [[{ w: 'the payload might', k: 's', at: 54.02 }], [{ w: 'pop off on its own', k: 'bo', at: 55.96 }]] },
    { t0: 77.65, t1: 81.8, lines: [[{ w: 'let me', k: 's', at: 78.3 }], [{ w: 'demonstrate it', k: 'bo', at: 78.7 }]] },
    { t0: 81.85, t1: 85.5, lines: [[{ w: 'a mini', k: 's', at: 82.82 }], [{ w: 'computer', k: 'sc', at: 83.0 }], [{ w: 'inside this charger', k: 's', at: 84.5 }]] },
    { t0: 85.55, t1: 91.0, lines: [[{ w: 'it looks like', k: 's', at: 86.84 }], [{ w: 'a regular charger', k: 'bo', at: 87.28 }]] },
    { t0: 91.05, t1: 94.1, lines: [[{ w: 'it made a network', k: 's', at: 91.9 }], [{ w: 'called O.MG', k: 'hl', at: 92.52 }]] },
    { t0: 94.15, t1: 99.4, lines: [[{ w: 'this is my phone', k: 's', at: 95.32 }], [{ w: "a victim's phone", k: 'sc', at: 96.34 }]] },
    { t0: 99.45, t1: 105.4, lines: [[{ w: 'taking the power', k: 's', at: 100.52 }], [{ w: 'from this phone', k: 'bo', at: 101.32 }]] },
    { t0: 105.45, t1: 113.25, lines: [[{ w: 'even though', k: 's', at: 105.5 }], [{ w: "it's not plugged in", k: 'bo', at: 106.2 }]] },
    { t0: 113.3, t1: 118.9, lines: [[{ w: "you've got this plugged in", k: 's', at: 114.8 }], [{ w: 'on your phone', k: 'bo', at: 116.8 }]] },
    { t0: 119.0, t1: 122.25, lines: [[{ w: 'Zero Day', k: 'sc', at: 119.28 }], [{ w: 'was here', k: 'b', at: 119.48 }]] },
    { t0: 122.3, t1: 130, keep: true, lines: [[{ w: "if that cable's plugged in", k: 's', at: 123.32 }], [{ w: 'you can essentially', k: 's', at: 124.36 }], [{ w: 'hack their phone', k: 'bo', at: 124.84 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 3.06, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 19.06, g: .22, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 72.28, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 119.28, g: .2, align: 'start', max: 1.1 },
  ],
});
