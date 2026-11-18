export default async () => ({ duration: 1, shots: [{ kind: '2d', t0: 0, t1: 1, draw(ctx, lt, { W, H, warmBg }) {
  warmBg(ctx); ctx.textAlign = 'center';
  const rows = [['400 190px Brush', 'easiest way'], ['400 170px Brush2', 'easiest way'], ['400 150px Fancy', 'I think Calender'], ['400 150px Script', 'I think Calender'], ['700 130px Pop', 'genuinely'], ['800 130px Pop', 'Wealth'], ['500 60px Pop', "It's   also the   to know"]];
  rows.forEach(([f, t], i) => { ctx.font = f; const y = 230 + i * 250; const g = ctx.createLinearGradient(0, y - 120, 0, y + 10); g.addColorStop(0, '#ffd36a'); g.addColorStop(1, '#ff7a00'); ctx.shadowColor = '#ff6a00'; ctx.shadowBlur = 40; ctx.fillStyle = i >= 2 && i != 4 ? '#fff' : g; ctx.fillText(t, W / 2, y); ctx.shadowBlur = 0; ctx.font = '500 28px Pop'; ctx.fillStyle = '#aaa'; ctx.fillText(f, W / 2, y + 50); });
} }] });
