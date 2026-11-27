// scam01: Steven Bartlett & Ryan Montgomery ("0day") on The Diary Of A CEO — a new hire bought a £1,000 gift card for a
// fake "Steven"; voice-note and video deepfakes are next. The checks, and Ryan's tip: screenshot it and ask an AI.
import { listCard, counterCard, chatCard, iconed, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 98.0, faceFps: 24, vignette: .38, leak: .3, grain: 8, cardFx: true,
  joins: [6.0417],
  shots: [
    face(0, 6.0417, { in: null, punch: [{ t: .98, s: 1.08 }, { t: 5.44, s: 1.1 }], overlay: bannerOverlay('HIS NEW HIRE LOST £1,000 TO THIS', 5.95) }),
    face(6.0417, 16.3, { in: { type: 'whip', dur: .35 }, punch: [{ t: 7.32 - 6.0417, s: 1.08 }, { t: 12.96 - 6.0417, s: 1.08 }] }),
    { kind: '2d', t0: 16.3, t1: 29.3, in: { type: 'whip', dur: .4 }, draw: chatCard({ name: '"Steven" (not really)', avatar: 'S', status: 'via text and email', ph: 980, msgs: [
      { t: 17.34 - 16.3, text: 'Can you stop at the bank and grab this?' },
      { t: 19.14 - 16.3, text: 'Or grab these gift cards and send them to this person?' },
      { t: 25.0 - 16.3, text: 'VOICE NOTE  ▸  0:12' }, { t: 25.78 - 16.3, text: 'VIDEO  ▸  0:08' }] }) },
    face(29.3, 33.9, { in: { type: 'whip', dur: .35 } }),
    { kind: '2d', t0: 33.9, t1: 38.3, in: { type: 'whip', dur: .4 }, draw: counterCard({ label: 'ONE OF HIS COMPANIES LOST', to: 200000, pre: '€', px: 190, at: 34.8 - 33.9, dur: .9, y: .3, sub: 'TO ONE PHISHING ATTACK', subAt: 36.5 - 33.9 }) },
    face(38.3, 56.0, { in: { type: 'whip', dur: .35 }, punch: [{ t: 44.52 - 38.3, s: 1.08 }, { t: 51.1 - 38.3, s: 1.08 }, { t: 55.56 - 38.3, s: 1.1 }] }),
    face(56.0, 68.6, { punch: [{ t: 60.62 - 56.0, s: 1.08 }] }),
    { kind: '2d', t0: 68.6, t1: 81.3, in: { type: 'whip', dur: .4 }, draw: iconed(listCard({ title: 'BEFORE YOU CLICK OR PAY, CHECK', y: .19, gap: 200, items: [
      { t: 69.04 - 68.6, text: 'THE DOMAIN', px: 68, sub: 'examplle.com is not example.com' },
      { t: 77.82 - 68.6, text: 'THE NAME SPELLING', px: 64 },
      { t: 79.84 - 68.6, text: 'THE PHONE NUMBER', px: 64 }] }), { n: 'shield', at: .6, y: .72, s: 1.9 }) },
    face(81.3, 88.7, { in: { type: 'whip', dur: .35 }, punch: [{ t: 84.02 - 81.3, s: 1.08 }] }),
    { kind: '2d', t0: 88.7, t1: 98.0, in: { type: 'whip', dur: .4 }, draw: chatCard({ name: 'ChatGPT · Gemini · Claude', avatar: 'AI', ph: 900, typing: [97.9 - 88.7, 99], msgs: [
      { me: true, t: 93.18 - 88.7, text: '[screenshot of the message]' },
      { me: true, t: 95.82 - 88.7, text: 'Is this real? What should I do?' }] }) },
  ],
  lockups: [
    { t0: 0, t1: 2.1, lines: [[{ w: 'spent', k: 's', at: .26 }], [{ w: '£1,000', k: 'hl', at: .98 }], [{ w: 'on a gift card', k: 's', at: 1.58 }]] },
    { t0: 2.15, t1: 4.55, lines: [[{ w: 'sent it to someone', k: 's', at: 2.22 }], [{ w: 'who they thought', k: 's', at: 3.52 }], [{ w: 'was me', k: 'sc', at: 3.98 }]] },
    { t0: 4.6, t1: 6.0417, lines: [[{ w: 'and', k: 's', at: 5.08 }], [{ w: 'lost the money', k: 'bo', at: 5.44 }]] },
    { t0: 6.1, t1: 9.9, lines: [[{ w: 'it happens', k: 's', at: 7.02 }], [{ w: 'all the time', k: 'bo', at: 7.32 }]] },
    { t0: 9.95, t1: 16.3, lines: [[{ w: 'trying to phish', k: 's', at: 12.62 }], [{ w: 'via text', k: 'sc', at: 13.16 }], [{ w: 'and email', k: 's', at: 15.34 }]] },
    { t0: 29.35, t1: 33.9, lines: [[{ w: 'on WhatsApp', k: 's', at: 29.72 }], [{ w: 'to my colleagues', k: 'bo', at: 30.22 }]] },
    { t0: 38.35, t1: 44.2, lines: [[{ w: 'team members', k: 's', at: 38.94 }], [{ w: 'got an email', k: 'bo', at: 42.68 }], [{ w: 'thought it was me', k: 's', at: 43.6 }]] },
    { t0: 44.25, t1: 49.9, lines: [[{ w: 'their', k: 's', at: 44.4 }], [{ w: 'first week', k: 'sc', at: 44.52 }], [{ w: 'bought a gift card', k: 's', at: 48.3 }]] },
    { t0: 49.95, t1: 56.0, lines: [[{ w: 'sent it to someone', k: 's', at: 52.34 }], [{ w: 'lost the money', k: 'bo', at: 55.56 }]] },
    { t0: 56.05, t1: 62.4, lines: [[{ w: 'an important time', k: 's', at: 58.14 }], [{ w: 'to be vigilant', k: 'sc', at: 60.62 }]] },
    { t0: 62.45, t1: 68.6, lines: [[{ w: 'the basics', k: 's', at: 65.58 }], [{ w: 'of phishing', k: 'bo', at: 66.08 }]] },
    { t0: 81.35, t1: 85.95, lines: [[{ w: 'not sure if it\'s real?', k: 's', at: 82.68 }], [{ w: 'screenshot it', k: 'hl', at: 84.02 }], [{ w: 'and ask an AI', k: 's', at: 85.2 }]] },
    { t0: 86.0, t1: 88.7, lines: [[{ w: "that's a good point", k: 's', at: 86.5 }], [{ w: 'you can do that', k: 'bo', at: 87.46 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: .98, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 34.8, g: .22, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 84.02, g: .2, align: 'start', max: 1.1 },
  ],
});
