// Quality demo of the code-built 3D cards (no footage).
import { trophyScene, pedestalScene, coinStacksScene, hourglassScene, phoneScene } from '/web/props3d.js';
export default async () => ({
  duration: 12.5,
  shots: [
    { kind: '3d', t0: 0, t1: 2.6, build: trophyScene },
    { kind: '3d', t0: 2.6, t1: 5.4, build: pedestalScene, in: { type: 'whip', dur: .3 } },
    { kind: '3d', t0: 5.4, t1: 8.0, build: coinStacksScene, in: { type: 'amber', dur: .4 } },
    { kind: '3d', t0: 8.0, t1: 10.5, build: hourglassScene, in: { type: 'whip', dur: .3 } },
    { kind: '3d', t0: 10.5, t1: 12.5, build: phoneScene, in: { type: 'amber', dur: .4 } },
  ],
  lockups: [
    { t0: .2, t1: 2.5, y: .78, lines: [[{ w: 'people want the', k: 's', at: .25 }], [{ w: 'immediate', k: 'sc', at: .55 }], [{ w: 'reward', k: 'b', at: 1.1 }]] },
    { t0: 3.0, t1: 5.3, y: .8, lines: [[{ w: "where you'll", k: 's', at: 3.0 }, { w: 'be in', k: 's', at: 3.3 }], [{ w: '5 years', k: 'sc', at: 3.6 }]] },
    { t0: 5.8, t1: 7.9, y: .78, lines: [[{ w: 'a better measure of your', k: 's', at: 5.8 }], [{ w: 'Wealth', k: 'hl', at: 6.2 }]] },
    { t0: 8.3, t1: 10.4, y: .8, lines: [[{ w: 'your', k: 's', at: 8.3 }, { w: 'time', k: 'sc', at: 8.5 }], [{ w: 'is the real', k: 's', at: 9.0 }, { w: 'currency', k: 'b', at: 9.3 }]] },
    { t0: 10.8, t1: 12.5, y: .8, lines: [[{ w: 'endless', k: 's', at: 10.8 }], [{ w: 'scrolling', k: 'sc', at: 11.1 }]] },
  ],
});
