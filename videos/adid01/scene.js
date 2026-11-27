// adid01: Ryan Montgomery ("0day") on The Diary Of A CEO — mobile advertising IDs: apps read your ad ID, data brokers buy
// where your phone was, and mapping software can show your weekly routine. The fix: turn tracking off.
import { listCard, wordCard, mapCard, iconed, bannerOverlay } from '/web/cards2d.js';
const face = (t0, t1, o = {}) => ({ kind: 'face', t0, t1, src: t0, zoom: { from: 1.04, to: 1.1 }, focus: { x: .5, y: .3 }, in: o.in ?? { type: 'zoomin', dur: .3 }, ...o });
export default async () => ({
  duration: 97.458, faceFps: 24, vignette: .38, leak: .3, grain: 8, cardFx: true,
  joins: [7.4167],
  shots: [
    face(0, 7.4167, { in: null, punch: [{ t: 3.3, s: 1.08 }, { t: 6.64, s: 1.1 }], overlay: bannerOverlay('YOUR APPS SELL WHERE YOU GO', 7.35) }),
    // covers DOAC's Faraday-bag context box (7.5–9.75 s)
    { kind: '2d', t0: 7.4167, t1: 16.0, in: { type: 'whip', dur: .4 }, draw: iconed(wordCard({ title: 'HIS RULE WITH FEDERAL AGENCIES', word: 'FARADAY BAGS', at: 12.16 - 7.4167, px: 130, sub: 'a pouch that blocks every signal', subAt: 12.9 - 7.4167 }), { n: 'phone', at: .5, y: .64, s: 2.0 }) },
    face(16.0, 29.3, { in: { type: 'whip', dur: .35 }, punch: [{ t: 26.92 - 16.0, s: 1.08 }] }),
    face(29.3, 37.0, { punch: [{ t: 32.4 - 29.3, s: 1.08 }] }),
    { kind: '2d', t0: 37.0, t1: 50.2, in: { type: 'whip', dur: .4 }, draw: iconed(wordCard({ title: 'HAVE YOU HEARD OF', word: 'MOBILE AD IDs', at: .25, px: 130, sub: 'a tracking ID on every phone', subAt: 43.38 - 37.0, pill: '"ALLOW THIS APP TO TRACK?"', pillAt: 47.86 - 37.0 }), { n: 'phone', at: 1.0, y: .7, s: 1.9 }) },
    face(50.2, 63.4, { in: { type: 'whip', dur: .35 }, punch: [{ t: 55.86 - 50.2, s: 1.08 }, { t: 62.72 - 50.2, s: 1.1 }] }),
    { kind: '2d', t0: 63.4, t1: 82.4, in: { type: 'whip', dur: .4 }, draw: mapCard({ title: 'WHAT YOUR AD ID GIVES AWAY', at: .3, broker: 'SOLD TO DATA BROKERS', brokerAt: 63.86 - 63.4,
      hot: [{ x: .26, y: .24, label: 'STORE · TUE 6PM', at: 75.22 - 63.4 }, { x: .74, y: .45, label: 'GYM · MON 7AM', at: 77.18 - 63.4 }, { x: .38, y: .78, label: 'HOME · EVERY NIGHT', at: 79.18 - 63.4 }] }) },
    face(82.4, 89.3, { in: { type: 'whip', dur: .35 }, punch: [{ t: 82.86 - 82.4, s: 1.08 }, { t: 87.88 - 82.4, s: 1.1 }] }),
    { kind: '2d', t0: 89.3, t1: 96.0, in: { type: 'whip', dur: .4 }, draw: iconed(listCard({ title: 'THE FIX: TURN TRACKING OFF', y: .19, gap: 200, items: [
      { t: 91.58 - 89.3, text: 'IPHONE: PRIVACY & SECURITY', px: 46, sub: '→ Tracking → switch it OFF' },
      { t: 92.54 - 89.3, text: 'ANDROID: PRIVACY → ADS', px: 46, sub: '→ Delete advertising ID' },
      { t: 93.7 - 89.3, text: 'TAP "ASK APP NOT TO TRACK"', px: 46, sub: 'every time it pops up' }] }), { n: 'lock', at: .6, y: .7, s: 1.8 }) },
    face(96.0, 97.458, { in: { type: 'whip', dur: .3 } }),
  ],
  lockups: [
    { t0: 0, t1: 3.25, lines: [[{ w: "there's mapping software", k: 's', at: .2 }], [{ w: 'out there', k: 'bo', at: 1.72 }]] },
    { t0: 3.27, t1: 7.4167, lines: [[{ w: 'Steven goes to', k: 's', at: 3.3 }], [{ w: 'this store', k: 'sc', at: 4.14 }], [{ w: 'every week', k: 'hl', at: 6.64 }]] },
    { t0: 16.05, t1: 22.5, lines: [[{ w: "I can't really", k: 's', at: 17.76 }], [{ w: 'talk about that', k: 'bo', at: 18.64 }]] },
    { t0: 22.55, t1: 29.3, lines: [[{ w: 'somebody could locate', k: 's', at: 22.6 }], [{ w: 'who is with who', k: 'sc', at: 26.92 }]] },
    { t0: 29.35, t1: 33.3, lines: [[{ w: "it's less about listening", k: 's', at: 29.44 }], [{ w: 'location data', k: 'bo', at: 32.4 }]] },
    { t0: 33.35, t1: 37.0, lines: [[{ w: 'that leads me into', k: 's', at: 34.84 }], [{ w: 'something else', k: 'sc', at: 35.78 }]] },
    { t0: 50.25, t1: 56.9, lines: [[{ w: 'things are reading', k: 's', at: 54.26 }], [{ w: 'advertising ID', k: 'bo', at: 55.86 }]] },
    { t0: 56.95, t1: 61.5, lines: [[{ w: 'where this phone was', k: 's', at: 59.42 }], [{ w: 'at that time', k: 'sc', at: 60.56 }]] },
    { t0: 61.55, t1: 63.4, lines: [[{ w: 'sold to a', k: 's', at: 61.76 }], [{ w: 'data broker', k: 'hl', at: 62.72 }]] },
    { t0: 82.45, t1: 85.9, lines: [[{ w: 'another way', k: 's', at: 82.45 }], [{ w: 'to surveil people', k: 'bo', at: 82.86 }]] },
    { t0: 85.95, t1: 89.3, lines: [[{ w: "it's public, private", k: 's', at: 85.96 }], [{ w: "they're paying", k: 's', at: 87.72 }], [{ w: 'for that data', k: 'sc', at: 88.14 }]] },
    { t0: 96.05, t1: 102, keep: true, lines: [[{ w: 'but still', k: 's', at: 96.05 }], [{ w: 'a possibility', k: 'sc', at: 96.54 }]] },
  ],
  sfx: [
    { n: 'impact_big', t: 4.14, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 12.16, g: .2, align: 'start', max: 1.1 },
    { n: 'impact_big', t: 75.22, g: .2, align: 'start', max: 1.1 },
  ],
});
