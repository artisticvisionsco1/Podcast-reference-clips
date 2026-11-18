import { brainScene } from '/web/props3d.js';
export default async () => ({ duration: 3, shots: [{ kind: '3d', t0: 0, t1: 3, build: brainScene }],
  lockups: [{ t0: .2, t1: 3, y: .78, lines: [[{ w: 'the cause of', k: 's', at: .2 }], [{ w: 'dementia', k: 'sc', at: .5 }]] }] });
