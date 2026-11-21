// bots01: Senator Bernie Sanders on The Diary Of A CEO — AI knows every call; kids confide in bots; young people can't phone
import { listCard, chatCard, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
const C = 29.3;
export default async () => ({
  duration: 73.792, faceFps: 24, vignette: .38, leak: .3, grain: 8,
  joins: [4.083, 42.75],
  shots: [
    face(0, 4.083, { in: null, punch: [{ t: 1.09, s: 1.1 }], overlay: bannerOverlay('WHAT AI IS DOING TO US', 4.083) }),
    { kind: '2d', t0: 4.083, t1: 13.4, in: { type: 'whip', dur: .4 },
      draw: listCard({ title: 'SOMEBODY WILL KNOW YOUR', y: .13, gap: 200, tag: '100%', tagBelow: false, items: [
        { t: 7.0 - 4.083, text: 'CALLS', px: 100, tagAt: 12.69 - 4.083 }, { t: 8.6 - 4.083, text: 'TEXTS', px: 100, tagAt: 12.8 - 4.083 },
        { t: 10.0 - 4.083, text: 'EMAILS', px: 100, tagAt: 12.9 - 4.083 }, { t: 10.7 - 4.083, text: 'WEBSITES', px: 100, tagAt: 13.0 - 4.083 }] }) },
    face(13.4, 21.6, { punch: [{ t: 1.77, s: 1.08 }] }),
    face(21.6, C, { punch: [{ t: 7.43, s: 1.1 }] }),
    { kind: '2d', t0: C, t1: 42.75, in: { type: 'whip', dur: .4 },
      draw: chatCard({ name: 'AI Companion', msgs: [{ t: 38.29 - C, text: 'Hey bot, my good friend 🙂', me: true }, { t: 39.75 - C, text: 'I got this problem…', me: true }, { t: 40.67 - C, text: 'I broke up. What do I do?', me: true }], typing: [42.2 - C, 99] }) },
    face(42.75, 51.7, { punch: [{ t: 7.05, s: 1.1 }] }),
    face(51.7, 55.8),
    face(55.8, 60.6, { punch: [{ t: 1.12, s: 1.1 }] }),
    { kind: '2d', t0: 60.6, t1: 68.2, in: { type: 'whip', dur: .4 },
      draw: chatCard({ name: 'Friend', msgs: [{ t: 62.6 - 60.6, text: "I'm really nervous to call 😬", me: true }, { t: 64.7 - 60.6, text: "let's just text?", me: true }, { t: 66.5 - 60.6, text: 'ok 👍', me: false }] }) },
    face(68.2, 73.792, { punch: [{ t: 4.56, s: 1.1 }] }),
  ],
  lockups: [
    { t0: 0, t1: 1.45, lines: [[{ w: 'what happens to', k: 's', at: .09 }], [{ w: 'humanity', k: 'bo', at: 1.09 }]] },
    { t0: 1.5, t1: 4.083, lines: [[{ w: "when we don't know how to", k: 's', at: 1.49 }], [{ w: 'relate to each other?', k: 'sc', at: 2.69 }]] },
    { t0: 4.15, t1: 7.0, y: .7, lines: [[{ w: 'in a short period of time', k: 's', at: 5.09 }]] },
    { t0: 11.7, t1: 13.4, y: .7, lines: [[{ w: 'somebody will know it?', k: 's', at: 11.81 }], [{ w: 'a hundred percent', k: 'sc', at: 12.55 }]] },
    { t0: 13.45, t1: 16.2, lines: [[{ w: 'so what does it mean to', k: 's', at: 14.15 }], [{ w: 'freedom?', k: 'bo', at: 15.17 }]] },
    { t0: 16.25, t1: 21.6, lines: [[{ w: 'I will know where you go', k: 's', at: 17.55 }], [{ w: "who you're meeting with", k: 'sc', at: 18.63 }]] },
    { t0: 21.65, t1: 25.3, lines: [[{ w: 'the other issue', k: 's', at: 22.89 }], [{ w: "we don't talk about enough", k: 'b', at: 23.67 }]] },
    { t0: 25.35, t1: C, lines: [[{ w: 'what happens to you as a', k: 's', at: 25.75 }], [{ w: 'human being?', k: 'sc', at: 29.03 }]] },
    { t0: 29.35, t1: 38.2, y: .74, lines: [[{ w: 'kids now are spending', k: 's', at: 30.61 }], [{ w: 'significant time', k: 'bo', at: 32.17 }], [{ w: 'with bots', k: 'sc', at: 36.95 }]] },
    { t0: 42.8, t1: 48.3, lines: [[{ w: 'I hire young people', k: 's', at: 42.84 }], [{ w: 'to answer calls', k: 'sc', at: 43.84 }]] },
    { t0: 48.35, t1: 51.7, lines: [[{ w: 'young people have a', k: 's', at: 48.9 }], [{ w: 'hard time', k: 'bo', at: 49.8 }], [{ w: 'on the telephone', k: 'sc', at: 50.3 }]] },
    { t0: 51.75, t1: 55.8, lines: [[{ w: 'because they', k: 's', at: 53.46 }], [{ w: 'text all the time', k: 'bo', at: 54.08 }]] },
    { t0: 55.85, t1: 57.3, lines: [[{ w: 'what happens to', k: 's', at: 55.92 }], [{ w: 'humanity', k: 'bo', at: 56.92 }]] },
    { t0: 57.35, t1: 60.6, lines: [[{ w: "when we don't know how to", k: 's', at: 57.32 }], [{ w: 'relate to each other?', k: 'sc', at: 58.52 }]] },
    { t0: 60.65, t1: 64.6, y: .74, lines: [[{ w: "I'm really", k: 's', at: 62.48 }], [{ w: 'nervous', k: 'sc', at: 62.82 }]] },
    { t0: 64.65, t1: 68.2, y: .74, lines: [[{ w: "let's", k: 's', at: 64.72 }], [{ w: 'TEXT', k: 'hl', at: 65.0 }]] },
    { t0: 68.25, t1: 71.0, lines: [[{ w: 'getting in relationships', k: 's', at: 69.88 }], [{ w: 'later', k: 'sc', at: 71.6 }]] },
    { t0: 71.05, t1: 75, keep: true, lines: [[{ w: 'more', k: 's', at: 72.58 }], [{ w: 'mental health problems', k: 'bo', at: 72.76 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 1.09, g: .24, align: 'start', max: 1.2 },
    { n: 'pop_hard', t: 12.69, g: .18 }, { n: 'pop_hard', t: 12.9, g: .18 },
    { n: 'pop_light', t: 38.29, g: .25 }, { n: 'pop_light', t: 39.75, g: .25 }, { n: 'pop_light', t: 40.67, g: .25 },
    { n: 'pop_light', t: 62.6, g: .25 }, { n: 'pop_light', t: 64.7, g: .25 }, { n: 'pop_light', t: 66.5, g: .22 },
  ],
});
