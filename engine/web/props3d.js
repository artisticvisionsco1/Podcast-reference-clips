// Reusable code-built 3D scenes for the warm cinematic style (this account only).
// Each builder returns {scene, camera, update(t), bloom}.
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

const AMBER = 0xff8a1a;

export function stage({ env, fov = 32, cam = [0, 1.2, 8], look = [0, 1, 0], fog = 0x0b0703, fogNear = 8, fogFar = 26, envI = .35 }) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(fog);
  scene.fog = new THREE.Fog(fog, fogNear, fogFar);
  scene.environment = env; scene.environmentIntensity = envI;
  const camera = new THREE.PerspectiveCamera(fov, 1080 / 1920, .1, 200);
  camera.position.set(...cam); camera.lookAt(...look);
  camera.userData.look = new THREE.Vector3(...look);
  return { scene, camera };
}

// warm dust motes drifting in front of everything
export function dust(scene, n = 260, spread = [7, 9, 6], center = [0, 1.5, 1]) {
  const g = new THREE.BufferGeometry(), p = new Float32Array(n * 3), seed = [];
  for (let i = 0; i < n; i++) { p[i * 3] = (Math.random() - .5) * spread[0] + center[0]; p[i * 3 + 1] = (Math.random() - .5) * spread[1] + center[1]; p[i * 3 + 2] = (Math.random() - .5) * spread[2] + center[2]; seed.push(Math.random() * 6.28); }
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d');
  const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32); gr.addColorStop(0, 'rgba(255,200,130,1)'); gr.addColorStop(1, 'rgba(255,140,40,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  const m = new THREE.PointsMaterial({ size: .06, map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .8 });
  const pts = new THREE.Points(g, m); scene.add(pts);
  const base = p.slice();
  return t => { for (let i = 0; i < n; i++) { p[i * 3] = base[i * 3] + Math.sin(t * .3 + seed[i]) * .15; p[i * 3 + 1] = base[i * 3 + 1] + ((t * .12 + seed[i]) % 1.5) - .75; } g.attributes.position.needsUpdate = true; };
}

export const gold = () => new THREE.MeshPhysicalMaterial({ color: 0xffb04a, metalness: 1, roughness: .22, clearcoat: .6, clearcoatRoughness: .2, envMapIntensity: 1.4 });

// ---------- trophy ----------
export function trophyMesh() {
  const g = new THREE.Group(), m = gold();
  const prof = [[0, 0], [.62, 0], [.62, .12], [.5, .16], [.5, .34], [.42, .4], [.14, .48], [.1, .62], [.1, .9], [.16, 1.0], [.3, 1.05], [.55, 1.25], [.72, 1.6], [.8, 2.1], [.82, 2.32], [.76, 2.34], [.7, 2.12], [.62, 1.66], [.45, 1.32], [.2, 1.2], [0, 1.18]];
  const lathe = new THREE.LatheGeometry(prof.map(([x, y]) => new THREE.Vector2(x, y)), 96);
  g.add(new THREE.Mesh(lathe, m));
  for (const s of [-1, 1]) {
    const h = new THREE.Mesh(new THREE.TorusGeometry(.34, .055, 20, 64, Math.PI * 1.25), m);
    h.position.set(s * .8, 1.75, 0); h.rotation.z = s > 0 ? -Math.PI * .625 : Math.PI * .375; g.add(h);
  }
  const base = new THREE.Mesh(new RoundedBoxGeometry(1.5, .32, 1.5, 4, .05), new THREE.MeshPhysicalMaterial({ color: 0x1a120a, metalness: .3, roughness: .35, clearcoat: 1 }));
  base.position.y = -.16; g.add(base);
  const plate = new THREE.Mesh(new THREE.BoxGeometry(.7, .14, .02), m); plate.position.set(0, -.16, .76); g.add(plate);
  return g;
}

export function trophyScene({ env }) {
  const { scene, camera } = stage({ env, cam: [0, 1.9, 10.5], look: [0, 1.6, 0], envI: .35 });
  const tro = trophyMesh(); tro.position.y = .2; scene.add(tro);
  const key = new THREE.SpotLight(0xffc27a, 26, 20, .5, .6); key.position.set(3, 6, 4); key.target = tro; scene.add(key);
  const rim = new THREE.PointLight(AMBER, 13, 12); rim.position.set(-2.5, 2.5, -2.5); scene.add(rim);
  const rim2 = new THREE.PointLight(0xffa040, 7, 10); rim2.position.set(2.5, 1, -2); scene.add(rim2);
  const halo = glowSprite(5, 'rgba(255,140,30,.25)'); halo.position.set(0, 1.4, -1.5); scene.add(halo);
  const d = dust(scene);
  return { scene, camera, hero: tro, bloom: { strength: .45, radius: .5, threshold: .85 }, update(t) {
    tro.rotation.y = -.6 + t * .45; tro.position.y = 1.0 + Math.sin(t * 1.6) * .06;
    camera.position.z = 10.5 - t * .3; camera.lookAt(camera.userData.look); d(t);
  } };
}

export function glowSprite(size, color) {
  const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d');
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128); g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }));
  s.scale.set(size, size, 1); return s;
}

// ---------- person (faceless mannequin) ----------
export function person(mat, h = 1) {
  const g = new THREE.Group();
  const cap = (r, l, x, y, z, rz = 0) => { const m = new THREE.Mesh(new THREE.CapsuleGeometry(r, l, 6, 16), mat); m.position.set(x, y, z); m.rotation.z = rz; g.add(m); return m; };
  cap(.2, .55, 0, 1.12, 0);                    // torso
  const head = new THREE.Mesh(new THREE.SphereGeometry(.15, 24, 16), mat); head.position.y = 1.68; g.add(head);
  cap(.07, .52, -.27, 1.08, 0, .08); cap(.07, .52, .27, 1.08, 0, -.08); // arms
  cap(.09, .6, -.11, .42, 0); cap(.09, .6, .11, .42, 0);                 // legs
  g.scale.setScalar(h); return g;
}

// ---------- pedestal above the crowd ----------
export function pedestalScene({ env }) {
  const { scene, camera } = stage({ env, fov: 34, cam: [0, 3.2, 17], look: [0, 3.6, 0], fogNear: 10, fogFar: 34, envI: .15 });
  // glowing pillar with vertical gradient
  const pg = new THREE.BoxGeometry(1.6, 4, 1.6, 1, 8, 1); const col = []; const pos = pg.attributes.position;
  for (let i = 0; i < pos.count; i++) { const k = (pos.getY(i) + 2) / 4; const c = new THREE.Color().setRGB(.55 + .45 * k, .12 + .38 * k, .02 + .1 * k); col.push(c.r, c.g, c.b); }
  pg.setAttribute('color', new THREE.Float32BufferAttribute(col, 3));
  const pillar = new THREE.Mesh(pg, new THREE.MeshStandardMaterial({ vertexColors: true, emissive: 0xff5a00, emissiveIntensity: .12, roughness: .5, metalness: .1 }));
  pillar.position.y = 2; scene.add(pillar);
  const topGlow = new THREE.Mesh(new THREE.BoxGeometry(1.62, .04, 1.62), new THREE.MeshBasicMaterial({ color: 0xffd08a })); topGlow.position.y = 4.01; scene.add(topGlow);
  const hero = person(new THREE.MeshStandardMaterial({ color: 0x2a1a10, roughness: .6, metalness: .2 }), 1.0); hero.position.y = 4.02; scene.add(hero);
  const heroRim = new THREE.SpotLight(0xffb060, 18, 10, .5, .7); heroRim.position.set(0, 8, -3); heroRim.target = hero; scene.add(heroRim);
  const pl = new THREE.PointLight(0xff6a10, 14, 14, 1.6); pl.position.set(0, 1.5, 3.2); scene.add(pl);
  scene.add(new THREE.HemisphereLight(0x3a2410, 0x050302, .6));
  // crowd
  const crowdMat = new THREE.MeshStandardMaterial({ color: 0x3b2418, roughness: .8 });
  const body = new THREE.CapsuleGeometry(.2, .5, 4, 10), head = new THREE.SphereGeometry(.14, 12, 8);
  const N = 900, ib = new THREE.InstancedMesh(body, crowdMat, N), ih = new THREE.InstancedMesh(head, crowdMat, N);
  const M = new THREE.Matrix4(); let n = 0;
  for (let i = 0; n < N && i < 5000; i++) {
    const x = (Math.random() - .5) * 22, z = -10 + Math.random() * 16; if (Math.abs(x) < 1.4 && Math.abs(z) < 1.4) continue;
    const s = .9 + Math.random() * .25;
    M.makeScale(s, s, s).setPosition(x, .55 * s, z); ib.setMatrixAt(n, M);
    M.makeScale(s, s, s).setPosition(x, 1.08 * s, z); ih.setMatrixAt(n, M); n++;
  }
  ib.count = ih.count = n; scene.add(ib, ih);
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshStandardMaterial({ color: 0x120a05, roughness: .9 })); ground.rotation.x = -Math.PI / 2; scene.add(ground);
  const halo = glowSprite(9, 'rgba(255,110,20,.18)'); halo.position.set(0, 3, -1); scene.add(halo);
  const d = dust(scene, 300, [10, 7, 8], [0, 3, 2]);
  return { scene, camera, bloom: { strength: .55, radius: .6, threshold: .8 }, update(t) {
    camera.position.set(Math.sin(t * .2) * .6, 3.2 + t * .1, 17 - t * .6); camera.lookAt(0, 3.6 + t * .05, 0); d(t);
  } };
}

// ---------- hourglass ----------
export function hourglassScene({ env }) {
  const { scene, camera } = stage({ env, cam: [0, 1.6, 9], look: [0, 1.6, 0], envI: .35 });
  const g = new THREE.Group(); scene.add(g);
  const prof = []; for (let i = 0; i <= 40; i++) { const y = i / 40 * 2.6; const k = Math.abs(y - 1.3) / 1.3; prof.push(new THREE.Vector2(.08 + .62 * Math.pow(k, .7), y)); }
  const glass = new THREE.Mesh(new THREE.LatheGeometry(prof, 80), new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: .05, transparent: true, opacity: .12, envMapIntensity: 1.5, clearcoat: 1, side: THREE.DoubleSide, depthWrite: false }));
  glass.position.y = .2; g.add(glass);
  const wood = new THREE.MeshPhysicalMaterial({ color: 0x3a2210, roughness: .35, metalness: .1, clearcoat: .8 });
  for (const y of [.1, 2.9]) { const d = new THREE.Mesh(new THREE.CylinderGeometry(.95, .95, .2, 64), wood); d.position.y = y; g.add(d); }
  for (let i = 0; i < 3; i++) { const a = i / 3 * Math.PI * 2; const r = new THREE.Mesh(new THREE.CylinderGeometry(.05, .05, 2.8, 16), gold()); r.position.set(Math.cos(a) * .82, 1.5, Math.sin(a) * .82); g.add(r); }
  const sandM = new THREE.MeshStandardMaterial({ color: 0xffa040, emissive: 0xff7a10, emissiveIntensity: .35, roughness: .8 });
  const top = new THREE.Mesh(new THREE.ConeGeometry(.55, .7, 48), sandM); top.rotation.x = Math.PI; g.add(top);
  const bot = new THREE.Mesh(new THREE.ConeGeometry(.6, .5, 48), sandM); g.add(bot);
  const stream = new THREE.Mesh(new THREE.CylinderGeometry(.015, .015, 1.1, 8), new THREE.MeshBasicMaterial({ color: 0xffb860 })); stream.position.y = 1.0; g.add(stream);
  const key = new THREE.SpotLight(0xffc27a, 31, 20, .5, .6); key.position.set(3, 6, 4); key.target = g; scene.add(key);
  const rim = new THREE.PointLight(AMBER, 15, 12); rim.position.set(-2.5, 2.5, -2.5); scene.add(rim);
  const halo = glowSprite(5, 'rgba(255,140,30,.22)'); halo.position.set(0, 1.5, -1.5); scene.add(halo);
  const d = dust(scene);
  return { scene, camera, bloom: { strength: .45, radius: .5, threshold: .85 }, update(t) {
    const k = Math.min(1, t / 6);
    top.scale.setScalar(Math.max(.05, 1 - k * .7)); top.position.y = 1.62 + (1 - top.scale.y) * .0;
    bot.scale.setScalar(.35 + k * .65); bot.position.y = .3 + .25 * bot.scale.y;
    g.rotation.y = t * .35; camera.position.z = 9 - t * .25; camera.lookAt(camera.userData.look); d(t);
  } };
}

// ---------- rising gold coin stacks (growth) ----------
export function coinStacksScene({ env, stacks = [3, 6, 10, 15, 22] }) {
  const { scene, camera } = stage({ env, cam: [-.8, 3.0, 11.5], look: [-.2, 1.2, -.5], envI: .3, fog: 0x0b0703 });
  const coinG = new THREE.LatheGeometry([[0,0],[.4,0],[.42,.012],[.42,.088],[.4,.1],[.36,.1],[.35,.09],[0,.09]].map(([x,y])=>new THREE.Vector2(x,y)), 64), m = gold();
  const groups = stacks.map((n, i) => { const grp = new THREE.Group(); grp.position.set((i - (stacks.length - 1) / 2) * 1.0, 0, -i * .25); for (let j = 0; j < n; j++) { const c = new THREE.Mesh(coinG, m); c.position.y = j * .105; c.rotation.y = Math.random(); c.visible = false; grp.add(c); } scene.add(grp); return grp; });
  const fc = document.createElement('canvas'); fc.width = fc.height = 256; const fx = fc.getContext('2d'); const fgr = fx.createRadialGradient(128, 128, 0, 128, 128, 128); fgr.addColorStop(0, 'rgba(255,255,255,1)'); fgr.addColorStop(1, 'rgba(255,255,255,0)'); fx.fillStyle = fgr; fx.fillRect(0, 0, 256, 256);
  const floor = new THREE.Mesh(new THREE.CircleGeometry(4.5, 64), new THREE.MeshStandardMaterial({ color: 0x140b04, roughness: .3, metalness: .6, transparent: true, alphaMap: new THREE.CanvasTexture(fc) })); floor.rotation.x = -Math.PI / 2; scene.add(floor);
  const key = new THREE.SpotLight(0xffc27a, 35, 25, .6, .6); key.position.set(3, 7, 5); scene.add(key);
  const rim = new THREE.PointLight(AMBER, 18, 14); rim.position.set(-3, 3, -3); scene.add(rim);
  const d = dust(scene);
  return { scene, camera, bloom: { strength: .45, radius: .5, threshold: .85 }, update(t) {
    groups.forEach((grp, i) => grp.children.forEach((c, j) => { const at = .15 + i * .25 + j * .03; const k = Math.min(1, Math.max(0, (t - at) / .18)); c.visible = k > 0; c.position.y = j * .105 + (1 - k) * .8; }));
    camera.position.x = -.5 + t * .15; camera.position.z = 11 - t * .3; camera.lookAt(camera.userData.look); d(t);
  } };
}

// ---------- glowing phone (scrolling / social media) ----------
export function phoneScene({ env }) {
  const { scene, camera } = stage({ env, cam: [0, 1.6, 7.5], look: [0, 1.6, 0], envI: .3 });
  const body = new THREE.Mesh(new RoundedBoxGeometry(1.5, 3.0, .14, 6, .18), new THREE.MeshPhysicalMaterial({ color: 0x111111, metalness: .8, roughness: .25, clearcoat: 1 }));
  body.position.y = 1.4; scene.add(body);
  const sc = document.createElement('canvas'); sc.width = 300; sc.height = 600; const sx = sc.getContext('2d'); const tex = new THREE.CanvasTexture(sc); tex.colorSpace = THREE.SRGBColorSpace;
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(1.36, 2.82), new THREE.MeshBasicMaterial({ map: tex, toneMapped: false })); screen.position.set(0, 1.4, .072); scene.add(screen);
  const rim = new THREE.PointLight(AMBER, 15, 12); rim.position.set(-2.5, 2.5, -2); scene.add(rim);
  const key = new THREE.SpotLight(0xffc27a, 20, 20, .5, .6); key.position.set(3, 5, 4); scene.add(key);
  const d = dust(scene);
  return { scene, camera, bloom: { strength: .5, radius: .5, threshold: .82 }, update(t) {
    sx.fillStyle = '#1a1208'; sx.fillRect(0, 0, 300, 600);
    const off = (t * 260) % 150;
    for (let i = -1; i < 6; i++) { const y = i * 150 - off + 20; sx.fillStyle = i % 2 ? '#ff8a1a' : '#ffb760'; sx.globalAlpha = .9; sx.fillRect(18, y, 264, 110); sx.globalAlpha = 1; sx.fillStyle = '#2a1a0a'; sx.fillRect(30, y + 80, 160, 12); }
    tex.needsUpdate = true;
    body.rotation.y = screen.rotation.y = -.35 + Math.sin(t * .6) * .12; screen.position.x = Math.sin(screen.rotation.y) * .072;
    camera.position.z = 7.5 - t * .2; camera.lookAt(camera.userData.look); d(t);
  } };
}

// ---------- brain (code-built: displaced hemispheres with ridged folds + glowing neurons) ----------
function hash3(x, y, z) { const s = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453; return s - Math.floor(s); }
function vnoise(x, y, z) {
  const xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z), xf = x - xi, yf = y - yi, zf = z - zi;
  const u = xf * xf * (3 - 2 * xf), v = yf * yf * (3 - 2 * yf), w = zf * zf * (3 - 2 * zf);
  const L = (a, b, k) => a + (b - a) * k; const h = (i, j, k) => hash3(xi + i, yi + j, zi + k);
  return L(L(L(h(0,0,0), h(1,0,0), u), L(h(0,1,0), h(1,1,0), u), v), L(L(h(0,0,1), h(1,0,1), u), L(h(0,1,1), h(1,1,1), u), v), w);
}
function ridged(x, y, z) { let a = 0, f = 1, amp = 1; for (let o = 0; o < 2; o++) { const n = 1 - Math.abs(vnoise(x * f, y * f, z * f) * 2 - 1); a += n * n * amp; f *= 2.1; amp *= .5; } return a; }

export function brainMesh(matOpts = {}) {
  const g = new THREE.Group();
  const mat = new THREE.MeshPhysicalMaterial({ color: 0xe09a6a, metalness: .35, roughness: .42, clearcoat: .5, clearcoatRoughness: .35, ...matOpts });
  for (const side of [-1, 1]) {
    const geo = new THREE.IcosahedronGeometry(1, 110); const p = geo.attributes.position; const v = new THREE.Vector3();
    for (let i = 0; i < p.count; i++) {
      v.fromBufferAttribute(p, i);
      // hemisphere shape: long front-back, flat inner wall, tapered bottom
      let x = v.x * .78, y = v.y * .82, z = v.z * 1.12;
      if (side * x < 0) x *= .18;                       // flatten the medial wall
      if (y < 0) { y *= .75; z *= 1 - .15 * -y; }
      const w1 = vnoise(v.x * 2.6 + side * 5, v.y * 2.6, v.z * 2.6), w2 = vnoise(v.x * 2.6 + 9, v.y * 2.6 + 3, v.z * 2.6 - 2);
      const fold = Math.abs(Math.sin(v.x * 10 + v.y * 12 + v.z * 8 + w1 * 15 + w2 * 9));
      const k = .06 * Math.pow(fold, .4) - .05;                          // gyri bumps / sulci grooves
      const n = new THREE.Vector3(x, y, z).normalize();
      p.setXYZ(i, x + n.x * k + side * .2, y + n.y * k, z + n.z * k);
    }
    geo.computeVertexNormals();
    g.add(new THREE.Mesh(geo, mat));
  }
  // cerebellum + stem
  const cb = new THREE.Mesh(new THREE.SphereGeometry(.36, 48, 32), mat); cb.scale.set(1.5, .7, 1); cb.position.set(0, -.55, -.62); g.add(cb);
  const st = new THREE.Mesh(new THREE.CylinderGeometry(.15, .1, .55, 24), mat); st.position.set(0, -.8, -.3); st.rotation.x = .35; g.add(st);
  return g;
}

export function brainScene({ env, glowFade = [1, 1] }) {
  const { scene, camera } = stage({ env, fov: 30, cam: [0, .6, 9.5], look: [0, -.45, 0], envI: .35 });
  const brain = brainMesh(); scene.add(brain);
  // neurons: points inside + connections
  const pts = [], N = 70; for (let i = 0; i < N; i++) { const v = new THREE.Vector3((Math.random() - .5) * 2.2, (Math.random() - .3) * 1.4, (Math.random() - .5) * 2.0); if (v.length() < 1.15) pts.push(v); }
  const lp = []; pts.forEach((a, i) => pts.forEach((b, j) => { if (j > i && a.distanceTo(b) < .55) lp.push(a.x, a.y, a.z, b.x, b.y, b.z); }));
  const lg = new THREE.BufferGeometry(); lg.setAttribute('position', new THREE.Float32BufferAttribute(lp, 3));
  const lines = new THREE.LineSegments(lg, new THREE.LineBasicMaterial({ color: 0xffa040, transparent: true, opacity: .0, blending: THREE.AdditiveBlending, depthWrite: false })); scene.add(lines);
  const key = new THREE.SpotLight(0xffc890, 30, 20, .5, .6); key.position.set(4, 5, 5); scene.add(key);
  const rim = new THREE.PointLight(AMBER, 22, 12); rim.position.set(-3, 2, -3); scene.add(rim);
  const under = new THREE.PointLight(0xff5a10, 8, 8); under.position.set(0, -2.5, 1.5); scene.add(under);
  const halo = glowSprite(6, 'rgba(255,130,30,.22)'); halo.position.set(0, 0, -2); scene.add(halo);
  const d = dust(scene, 220, [7, 9, 6], [0, 0, 1]);
  return { scene, camera, brain, lines, hero: brain, bloom: { strength: .5, radius: .55, threshold: .82 }, update(t) {
    brain.rotation.y = -1.25 + t * .25; lines.rotation.y = brain.rotation.y;
    brain.position.y = Math.sin(t * 1.3) * .04;
    lines.material.opacity = Math.min(.55, t * .5) * (.75 + .25 * Math.sin(t * 6));
    camera.position.z = 9.5 - t * .3; camera.lookAt(camera.userData.look); d(t);
  } };
}

// ---------- spinning gold coin (flip of a coin) ----------
export function coinFlipScene({ env }) {
  const { scene, camera } = stage({ env, cam: [0, 1.4, 7.5], look: [0, 1.6, 0], envI: .45 });
  const m = gold();
  const prof = [[0, -.07], [.9, -.07], [.95, -.05], [.95, .05], [.9, .07], [.8, .07], [.78, .05], [0, .05]].map(([x, y]) => new THREE.Vector2(x, y));
  const coin = new THREE.Group();
  const body = new THREE.Mesh(new THREE.LatheGeometry(prof, 96), m); body.rotation.x = Math.PI / 2; coin.add(body);
  // embossed face: ring + star-ish relief on both sides
  for (const s of [1, -1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(.62, .03, 12, 96), m); ring.position.z = s * .055; coin.add(ring);
    const sh = new THREE.Shape(); for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + Math.PI / 2, r = i % 2 ? .2 : .45; i ? sh.lineTo(Math.cos(a) * r, Math.sin(a) * r) : sh.moveTo(Math.cos(a) * r, Math.sin(a) * r); }
    const star = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, { depth: .03, bevelEnabled: true, bevelSize: .015, bevelThickness: .015, bevelSegments: 2 }), m);
    star.position.z = s * .05; if (s < 0) star.rotation.y = Math.PI; coin.add(star);
  }
  coin.position.y = 1.6; scene.add(coin);
  const key = new THREE.SpotLight(0xffc890, 32, 20, .5, .6); key.position.set(3, 6, 5); key.target = coin; scene.add(key);
  const rim = new THREE.PointLight(AMBER, 20, 12); rim.position.set(-3, 2.5, -2.5); scene.add(rim);
  const halo = glowSprite(5, 'rgba(255,140,30,.22)'); halo.position.set(0, 1.6, -1.5); scene.add(halo);
  const d = dust(scene);
  return { scene, camera, hero: coin, bloom: { strength: .5, radius: .55, threshold: .82 }, update(t) {
    coin.rotation.x = t * 9.5; coin.rotation.y = .5; coin.position.y = 1.6 + Math.sin(Math.min(t, 2.2) / 2.2 * Math.PI) * .5;
    camera.position.z = 7.5 - t * .3; camera.lookAt(camera.userData.look); d(t);
  } };
}

// ---------- brain variants: 'decay' (dims, neurons die, dust falls) and 'flush' (glowing waste particles washed out) ----------
export function brainFxScene({ env, mode = 'decay' }) {
  const b = brainScene({ env });
  const { scene, brain, lines } = b;
  const mats = []; brain.traverse(o => { if (o.isMesh) mats.push(o.material); });
  const base = mats[0].color.clone();
  // particle cloud around the brain
  const N = 900, g = new THREE.BufferGeometry(), p = new Float32Array(N * 3), v = [];
  for (let i = 0; i < N; i++) { const d = new THREE.Vector3().randomDirection().multiplyScalar(.5 + Math.random() * .9); p.set([d.x * 1.1, d.y * .8, d.z * 1.2], i * 3); v.push(d.clone().normalize()); }
  g.setAttribute('position', new THREE.BufferAttribute(p, 3));
  const c = document.createElement('canvas'); c.width = c.height = 64; const x = c.getContext('2d'); const gr = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  gr.addColorStop(0, mode === 'flush' ? 'rgba(160,220,255,1)' : 'rgba(255,170,90,1)'); gr.addColorStop(1, 'rgba(0,0,0,0)'); x.fillStyle = gr; x.fillRect(0, 0, 64, 64);
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ size: mode === 'flush' ? .075 : .035, map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .0 }));
  scene.add(pts); const p0 = p.slice();
  const up = b.update;
  b.update = t => {
    up(t); pts.rotation.y = brain.rotation.y;
    if (mode === 'decay') {
      const k = Math.min(1, t / 3.2);
      mats.forEach(m => { m.color.copy(base).lerp(new THREE.Color(0x3a2a22), k * .75); m.roughness = .42 + k * .4; });
      lines.material.opacity = Math.max(0, .55 - k * .7) * (Math.random() > k * .6 ? 1 : .1);
      pts.material.opacity = .7; for (let i = 0; i < N; i++) { p[i * 3 + 1] = p0[i * 3 + 1] - ((t * .25 + i * .013) % 1.6); }
      g.attributes.position.needsUpdate = true;
    } else {
      pts.material.opacity = Math.min(.95, t * .8);
      for (let i = 0; i < N; i++) { const s = ((t * .45 + (i % 97) / 97) % 1); const r = .4 + s * 2.4; p[i * 3] = v[i].x * r * 1.1; p[i * 3 + 1] = v[i].y * r * .8 - s * .6; p[i * 3 + 2] = v[i].z * r * 1.2; }
      g.attributes.position.needsUpdate = true;
    }
  };
  return b;
}

// ---------- moon (deep sleep / REM) ----------
export function moonScene({ env }) {
  const { scene, camera } = stage({ env, fov: 30, cam: [0, -.6, 11], look: [0, -.6, 0], fog: 0x07050a, envI: .1 });
  const geo = new THREE.IcosahedronGeometry(1.35, 96); const pos = geo.attributes.position, v = new THREE.Vector3();
  let sd = 7; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;  // seeded: same moon every render
  const craters = Array.from({ length: 40 }, () => { const u = rnd() * 2 - 1, a = rnd() * 6.2832, q = Math.sqrt(1 - u * u);
    return { c: new THREE.Vector3(q * Math.cos(a), u, q * Math.sin(a)), r: .07 + rnd() * .22 }; });
  for (let i = 0; i < pos.count; i++) { v.fromBufferAttribute(pos, i).normalize(); let h = 0; for (const k of craters) { const d = v.distanceTo(k.c) / k.r; h -= .045 * Math.exp(-d * d * 2.2); h += .02 * Math.exp(-Math.pow((d - 1.05) / .18, 2)); } v.multiplyScalar(1.35 * (1 + h)); pos.setXYZ(i, v.x, v.y, v.z); }
  geo.computeVertexNormals();
  const moon = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color: 0xe0b888, roughness: .95, metalness: 0, emissive: 0x2a1404, emissiveIntensity: .25 }));
  scene.add(moon);
  const sun = new THREE.DirectionalLight(0xffd8a8, 2.2); sun.position.set(5, 2.5, 2); scene.add(sun);
  scene.add(new THREE.AmbientLight(0x2a1a30, .35));
  const halo = glowSprite(7, 'rgba(255,170,90,.28)'); halo.position.z = -1; scene.add(halo);
  // stars
  const sg = new THREE.BufferGeometry(), sp = []; for (let i = 0; i < 500; i++) sp.push((Math.random() - .5) * 30, (Math.random() - .5) * 50, -10 - Math.random() * 10);
  sg.setAttribute('position', new THREE.Float32BufferAttribute(sp, 3)); const stars = new THREE.Points(sg, new THREE.PointsMaterial({ size: .06, color: 0xffe8cc, transparent: true, opacity: .8 })); scene.add(stars);
  return { scene, camera, hero: moon, bloom: { strength: .6, radius: .6, threshold: .7 }, update(t) {
    moon.rotation.y = t * .12; moon.rotation.x = .2; camera.position.z = 11 - t * .3; stars.material.opacity = .5 + .3 * Math.sin(t * 2);
  } };
}

// ---------- night street with lamps; a wave of light sweeps the debris away ----------
export function streetScene({ env }) {
  const { scene, camera } = stage({ env, fov: 40, cam: [0, 2.6, 6], look: [0, 1.6, -10], fog: 0x0b0703, fogNear: 6, fogFar: 40, envI: .1 });
  const road = new THREE.Mesh(new THREE.PlaneGeometry(8, 80), new THREE.MeshStandardMaterial({ color: 0x1a120c, roughness: .55, metalness: .2 })); road.rotation.x = -Math.PI / 2; road.position.z = -30; scene.add(road);
  const lineM = new THREE.MeshStandardMaterial({ color: 0x6a4a30, roughness: .6 });
  for (let i = 0; i < 20; i++) { const l = new THREE.Mesh(new THREE.PlaneGeometry(.12, 1.4), lineM); l.rotation.x = -Math.PI / 2; l.position.set(0, .01, 4 - i * 4); scene.add(l); }
  const poleM = new THREE.MeshStandardMaterial({ color: 0x2a1c12, roughness: .5, metalness: .6 });
  const lamps = [];
  for (let i = 0; i < 9; i++) for (const s of [-1, 1]) {
    const z = 2 - i * 7 - (s > 0 ? 3.5 : 0);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(.05, .07, 4.2, 12), poleM); pole.position.set(s * 3.4, 2.1, z); scene.add(pole);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(.9, .06, .06), poleM); arm.position.set(s * 3.0, 4.15, z); scene.add(arm);
    const bulb = new THREE.Mesh(new THREE.SphereGeometry(.12, 16, 12), new THREE.MeshBasicMaterial({ color: 0xffd9a0 })); bulb.position.set(s * 2.6, 4.05, z); scene.add(bulb);
    const L = new THREE.PointLight(0xffa040, 3.5, 9, 1.6); L.position.set(s * 2.6, 3.9, z); scene.add(L); lamps.push(L);
    const gl = glowSprite(1.6, 'rgba(255,170,80,.35)'); gl.position.copy(bulb.position); scene.add(gl);
  }
  // debris on the road
  const N = 1400, dg = new THREE.BufferGeometry(), dp = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) dp.set([(Math.random() - .5) * 6, .03 + Math.random() * .05, 4 - Math.random() * 50], i * 3);
  dg.setAttribute('position', new THREE.BufferAttribute(dp, 3)); const d0 = dp.slice();
  const debris = new THREE.Points(dg, new THREE.PointsMaterial({ size: .07, color: 0x8a6a50, transparent: true, opacity: .9 })); scene.add(debris);
  // the cleaning wave: a bright band moving down the road
  const wave = new THREE.Mesh(new THREE.PlaneGeometry(6.4, .5), new THREE.MeshBasicMaterial({ color: 0xffc070, transparent: true, opacity: .22, blending: THREE.AdditiveBlending, depthWrite: false }));
  wave.rotation.x = -Math.PI / 2; wave.position.y = .03; scene.add(wave);
  const wl = new THREE.PointLight(0xffb050, 12, 7, 1.4); scene.add(wl);
  scene.add(new THREE.HemisphereLight(0x302014, 0x050302, .5));
  return { scene, camera, bloom: { strength: .7, radius: .6, threshold: .65 }, update(t) {
    const wz = -2 - t * 7; wave.position.z = wz; wl.position.set(0, .8, wz);
    for (let i = 0; i < N; i++) { const z = d0[i * 3 + 2]; if (z > wz) { const k = Math.min(1, (z - wz) / 3); dp[i * 3] = d0[i * 3] + Math.sign(d0[i * 3] || 1) * k * 4; dp[i * 3 + 1] = d0[i * 3 + 1] + k * 1.2; } }
    dg.attributes.position.needsUpdate = true;
    camera.position.z = 6 - t * 1.2; camera.lookAt(0, 1.6, camera.position.z - 16);
  } };
}

// ---------- glass of orange juice; sugar cubes drop in one by one (sugar01 hook) ----------
// drops: local times (s) when each cube hits the juice. settled: cubes already at the bottom at t=0.
export function ojGlassScene({ env, drops = [], settled = 0, cam = [0, 1.45, 9.6], sun = false }) {
  const { scene, camera } = stage({ env, fov: 30, cam, look: [0, 1.15, 0], fog: 0x080503, fogNear: 7, fogFar: 22, envI: .55 });
  const R = .82, Hh = 2.3;
  const prof = [[0, 0], [R * .92, 0], [R * .96, .04], [R, .2], [R * 1.06, Hh], [R * 1.02, Hh + .02], [R * .99, .22], [R * .9, .1], [0, .1]];
  const glass = new THREE.Mesh(new THREE.LatheGeometry(prof.map(([x, y]) => new THREE.Vector2(x, y)), 128),
    new THREE.MeshPhysicalMaterial({ color: 0xffe8d0, metalness: 0, roughness: .06, transparent: true, opacity: .06, envMapIntensity: .7, clearcoat: .6, side: THREE.DoubleSide, depthWrite: false }));
  const lip = new THREE.Mesh(new THREE.TorusGeometry(R * 1.05, .012, 8, 128), new THREE.MeshBasicMaterial({ color: 0xffd9a8, transparent: true, opacity: .55 })); lip.rotation.x = Math.PI / 2; lip.position.y = Hh;
  const lvl0 = 1.62;
  const juiceM = new THREE.MeshStandardMaterial({ color: 0xff7a00, emissive: 0xff5200, emissiveIntensity: .32, roughness: .3, transparent: true, opacity: .86, envMapIntensity: .35 });
  const juice = new THREE.Mesh(new THREE.CylinderGeometry(R * .985, R * .93, 1, 96, 1, false), juiceM);
  const surf = new THREE.Mesh(new THREE.CircleGeometry(R * 1.0, 96), new THREE.MeshStandardMaterial({ color: 0xff9a20, emissive: 0xff7000, emissiveIntensity: .45, roughness: .15, envMapIntensity: .6 }));
  surf.rotation.x = -Math.PI / 2;
  const grp = new THREE.Group(); grp.add(glass, lip, juice, surf); scene.add(grp);
  // sugar cubes
  const cubeG = new RoundedBoxGeometry(.3, .3, .3, 3, .045);
  const cubeM = new THREE.MeshStandardMaterial({ color: 0xfff6ea, roughness: .85, emissive: 0x2a1a0a, emissiveIntensity: .25 });
  const N = drops.length + settled, cubes = [];
  let sd = 3; const rnd = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  for (let i = 0; i < N; i++) {
    const m = new THREE.Mesh(cubeG, cubeM); grp.add(m);
    const ring = i % 4, layer = Math.floor(i / 4);
    const a = ring * 1.57 + layer * .7 + rnd() * .3;
    cubes.push({ m, t: i < settled ? -9 : drops[i - settled], x0: (rnd() - .5) * .5, rest: new THREE.Vector3(Math.cos(a) * .36, .27 + layer * .27, Math.sin(a) * .36), spin: new THREE.Vector3(rnd() * 6, rnd() * 6, rnd() * 6) });
  }
  // ripples
  const ripM = () => new THREE.MeshBasicMaterial({ color: 0xffe0a0, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  const rips = cubes.map(() => { const r = new THREE.Mesh(new THREE.RingGeometry(.9, 1, 64), ripM()); r.rotation.x = -Math.PI / 2; grp.add(r); return r; });
  // bubbles
  const B = 160, bg = new THREE.BufferGeometry(), bp = new Float32Array(B * 3), bs = [];
  for (let i = 0; i < B; i++) { const a = rnd() * 6.28, r = rnd() * R * .85; bp.set([Math.cos(a) * r, .2, Math.sin(a) * r], i * 3); bs.push(rnd()); }
  bg.setAttribute('position', new THREE.BufferAttribute(bp, 3)); const bp0 = bp.slice();
  const bubbles = new THREE.Points(bg, new THREE.PointsMaterial({ size: .035, color: 0xfff0c8, transparent: true, opacity: .7, depthWrite: false, blending: THREE.AdditiveBlending })); grp.add(bubbles);
  // table + light
  const table = new THREE.Mesh(new THREE.CircleGeometry(9, 64), new THREE.MeshStandardMaterial({ color: 0x1a120b, roughness: .35, metalness: .3 }));
  table.rotation.x = -Math.PI / 2; scene.add(table);
  const key = new THREE.SpotLight(0xffe2c0, 16, 20, .5, .6, 1.6); key.position.set(3, 6, 4); key.target = grp; scene.add(key);
  const rim = new THREE.SpotLight(0xff9a30, 30, 16, .6, .8, 1.5); rim.position.set(-2, 3.5, -4); rim.target = grp; scene.add(rim);
  scene.add(new THREE.HemisphereLight(0x3a2614, 0x050302, .5));
  const halo = glowSprite(sun ? 9 : 6, sun ? 'rgba(255,170,70,.42)' : 'rgba(255,140,40,.3)'); halo.position.set(0, 1.5, -2.5); scene.add(halo);
  const dd = dust(scene, 160, [6, 6, 4], [0, 1.6, 0]);
  return { scene, camera, hero: grp, bloom: { strength: .55, radius: .55, threshold: .78 }, update(t) {
    grp.rotation.y = .25 + t * .08;
    camera.position.z = cam[2] - t * .28; camera.lookAt(0, 1.0, 0);
    let hit = 0;
    cubes.forEach((c, i) => {
      const dt = t - c.t;
      if (dt < -.55) { c.m.visible = false; rips[i].material.opacity = 0; return; }
      c.m.visible = true;
      if (dt < 0) { // falling from above with spin, accelerating
        const k = 1 + dt / .55; const y = lvl0 + 2.6 - 2.6 * k * k;
        c.m.position.set(c.x0, y, 0); c.m.rotation.set(c.spin.x * k, c.spin.y * k, c.spin.z * k);
      } else { // sink and settle at the bottom
        hit++;
        const k = 1 - Math.exp(-dt * 3.2);
        c.m.position.set(lerp3(c.x0, c.rest.x, k), lvl0 - (lvl0 - c.rest.y) * k, lerp3(0, c.rest.z, k));
        c.m.rotation.set(c.spin.x * (1 + k * .3), c.spin.y, c.spin.z * (1 + k * .2));
      }
      const r = rips[i]; const rk = dt >= 0 && dt < 1 ? dt : -1;
      r.material.opacity = rk >= 0 ? .55 * (1 - rk) : 0; const s = .1 + rk * .75; r.scale.set(s, s, s); r.position.set(c.x0 * .5, lvl0 + .012, 0);
    });
    const lvl = lvl0 + hit * .012;
    juice.scale.y = lvl - .11; juice.position.y = .11 + (lvl - .11) / 2; surf.position.y = lvl;
    surf.position.y += Math.sin(t * 9) * .004 * Math.min(hit, 1);
    for (let i = 0; i < B; i++) { const k = (t * (.18 + bs[i] * .25) + bs[i]) % 1; bp[i * 3 + 1] = .14 + k * (lvl - .2); bp[i * 3] = bp0[i * 3] + Math.sin(t * 2 + i) * .02; }
    bg.attributes.position.needsUpdate = true; dd(t);
  } };
}
const lerp3 = (a, b, k) => a + (b - a) * k;
