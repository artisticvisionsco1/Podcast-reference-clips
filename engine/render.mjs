// Render videos/<name>/scene.js -> out/<name>.silent.mp4 (or --stills t1,t2,...)
import http from 'node:http'; import fs from 'node:fs'; import path from 'node:path'; import { spawn } from 'node:child_process';
import { createRequire } from 'node:module'; const { chromium } = createRequire(import.meta.url)('playwright');
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [name, ...flags] = process.argv.slice(2);
const opt = k => { const i = flags.indexOf(k); return i >= 0 ? flags[i + 1] : null; };
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.woff2': 'font/woff2', '.jpg': 'image/jpeg', '.png': 'image/png', '.json': 'application/json' };
const srv = http.createServer((q, r) => {
  let p = decodeURIComponent(q.url.split('?')[0]); if (p === '/') p = '/web/index.html';
  const f = p.startsWith('/node_modules/') || p.startsWith('/web/') ? path.join(ROOT, 'engine', p) : path.join(ROOT, p);
  fs.readFile(f, (e, d) => { if (e) { r.writeHead(404); r.end(); return; } r.writeHead(200, { 'Content-Type': MIME[path.extname(f)] || 'application/octet-stream' }); r.end(d); });
}).listen(0);
const port = srv.address().port;
const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
page.on('console', m => { if (m.type() === 'error') console.error('PAGE:', m.text()); });
page.on('pageerror', e => console.error('PAGEERR:', e.message));
await page.goto(`http://localhost:${port}/?v=${name}`);
await page.waitForFunction(() => window.READY || window.ERR, null, { timeout: 120000 });
const err = await page.evaluate(() => window.ERR); if (err) { console.error(err); process.exit(1); }
const dur = await page.evaluate(() => window.SCENE_INFO.duration);
fs.mkdirSync(path.join(ROOT, 'out'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'out', `${name}.events.json`), JSON.stringify(await page.evaluate(() => window.SCENE_EVENTS), null, 1));
fs.mkdirSync(path.join(ROOT, 'out'), { recursive: true });
const grab = async t => { await page.evaluate(t => window.renderFrame(t), t); return Buffer.from((await page.evaluate(() => window.grab())).split(',')[1], 'base64'); };
if (flags.includes('--stills')) {
  const ts = (opt('--stills') && !opt('--stills').startsWith('--') ? opt('--stills').split(',').map(Number) : Array.from({ length: 12 }, (_, i) => +(dur * (i + .5) / 12).toFixed(2)));
  const dir = path.join(ROOT, 'out', name + '-stills'); fs.mkdirSync(dir, { recursive: true });
  for (const t of ts) { fs.writeFileSync(path.join(dir, `t${t.toFixed(2)}.jpg`), await grab(t)); console.log('still', t); }
} else {
  const fps = 30, from = +(opt('--from') ?? 0), to = +(opt('--to') ?? dur);
  const outF = path.join(ROOT, 'out', `${name}.silent.mp4`);
  const ff = spawn('ffmpeg', ['-y', '-v', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-', '-c:v', 'libx264', '-preset', 'medium', '-crf', '17', '-pix_fmt', 'yuv420p', outF], { stdio: ['pipe', 'inherit', 'inherit'] });
  const N = Math.round((to - from) * fps), t0 = Date.now();
  for (let i = 0; i < N; i++) { const b = await grab(from + i / fps); if (!ff.stdin.write(b)) await new Promise(r => ff.stdin.once('drain', r)); if (i % 30 === 0) console.log(`frame ${i}/${N} ${((Date.now() - t0) / (i + 1)).toFixed(0)} ms/f`); }
  ff.stdin.end(); await new Promise(r => ff.on('close', r)); console.log('wrote', outF);
}
await browser.close(); srv.close();
