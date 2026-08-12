import { useEffect, useRef } from 'react';

export default function TechCanvasBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    const parent = canvas.parentElement;
    let W = (canvas.width = parent.offsetWidth || window.innerWidth);
    let H = (canvas.height = parent.offsetHeight || window.innerHeight);

    // ── Mouse Tracking, Shockwaves & Cursor Sparks ──
    const mouse = { x: null, y: null, prevX: null, prevY: null };
    let shockwaves = [];
    let sparks = [];
    let comets = [];

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect();
      const currX = e.clientX - r.left;
      const currY = e.clientY - r.top;

      if (mouse.x !== null) {
        const distMoved = Math.hypot(currX - mouse.x, currY - mouse.y);
        // Spawn sparks on mouse movement
        if (distMoved > 8 && sparks.length < 35) {
          sparks.push({
            x: currX,
            y: currY,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5 - 0.5,
            size: rand(1.2, 2.5),
            alpha: 0.9,
            color: Math.random() > 0.4 ? '#00c2ff' : '#818cf8',
          });
        }
      }
      mouse.x = currX;
      mouse.y = currY;
    };

    const onLeave = () => { mouse.x = null; mouse.y = null; };
    const onClick = (e) => {
      const r = canvas.getBoundingClientRect();
      const clickX = e.clientX - r.left;
      const clickY = e.clientY - r.top;
      shockwaves.push({ x: clickX, y: clickY, rad: 2, alpha: 1 });

      // Burst of sparks on click
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = rand(1.5, 4.2);
        sparks.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: rand(1.8, 3.2),
          alpha: 1,
          color: Math.random() > 0.5 ? '#00c2ff' : '#22d3ee',
        });
      }
    };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    parent.addEventListener('click', onClick);

    const onResize = () => {
      W = canvas.width = parent.offsetWidth;
      H = canvas.height = parent.offsetHeight;
      init();
    };
    window.addEventListener('resize', onResize);

    const rand = (a, b) => a + Math.random() * (b - a);
    const isLight = () => document.documentElement.getAttribute('data-theme') === 'light';

    // ── 1. Network Nodes & Floating Tech Glyphs ──
    const NODE_COUNT = Math.min(Math.floor((W * H) / 9200), 75);
    let nodes = [], pulses = [];
    const techGlyphs = ['</>', '{ }', '01', 'AI', 'JS', 'React', '⚡'];

    function init() {
      nodes = Array.from({ length: NODE_COUNT }, (_, idx) => ({
        x: rand(0, W),
        y: rand(0, H),
        vx: rand(-0.55, 0.55),
        vy: rand(-0.55, 0.55),
        r: rand(1.5, 3.2),
        pulse: rand(0, Math.PI * 2),
        ps: rand(0.018, 0.04),
        type: idx % 14 === 0 ? 'lightbulb' : idx % 8 === 0 ? 'glyph' : idx % 6 === 0 ? 'cube' : idx % 4 === 0 ? 'hex' : 'dot',
        glyph: techGlyphs[idx % techGlyphs.length],
      }));
    }
    init();

    function addPulse(a, b) {
      pulses.push({ sx: a.x, sy: a.y, ex: b.x, ey: b.y, t: 0, spd: rand(0.012, 0.025) });
    }

    function spawnComet() {
      if (comets.length < 3) {
        const startTop = Math.random() > 0.5;
        comets.push({
          x: startTop ? rand(0, W * 0.7) : 0,
          y: startTop ? 0 : rand(0, H * 0.7),
          vx: rand(3.5, 6.5),
          vy: rand(2.0, 4.5),
          len: rand(70, 130),
          alpha: rand(0.65, 0.95),
          color: Math.random() > 0.4 ? '#00c2ff' : '#818cf8',
        });
      }
    }

    // ── Helper Paths ──
    function hexPath(x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;
        i === 0 ? ctx.moveTo(x + r * Math.cos(a), y + r * Math.sin(a))
                : ctx.lineTo(x + r * Math.cos(a), y + r * Math.sin(a));
      }
      ctx.closePath();
    }

    function drawLightbulbIcon(x, y, size, colorStr) {
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = colorStr;
      ctx.fillStyle = colorStr;
      ctx.lineWidth = 1.2;

      ctx.beginPath();
      ctx.arc(0, 0, size * 1.8, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -size * 0.2, size * 0.6, Math.PI * 0.75, Math.PI * 2.25);
      ctx.lineTo(size * 0.25, size * 0.5);
      ctx.lineTo(-size * 0.25, size * 0.5);
      ctx.closePath();
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, -size * 0.2, size * 0.2, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function drawWireframeCube(x, y, size, colorStr) {
      ctx.save();
      ctx.translate(x, y);
      ctx.strokeStyle = colorStr;
      ctx.lineWidth = 0.95;
      const h = size * 0.6;
      const w = size * 0.8;

      ctx.beginPath();
      ctx.rect(-w/2, -h/2, w, h);
      ctx.rect(-w/2 + w*0.3, -h/2 - h*0.3, w, h);
      ctx.moveTo(-w/2, -h/2); ctx.lineTo(-w/2 + w*0.3, -h/2 - h*0.3);
      ctx.moveTo(w/2, -h/2); ctx.lineTo(w/2 + w*0.3, -h/2 - h*0.3);
      ctx.moveTo(-w/2, h/2); ctx.lineTo(-w/2 + w*0.3, h/2 - h*0.3);
      ctx.moveTo(w/2, h/2); ctx.lineTo(w/2 + w*0.3, h/2 - h*0.3);
      ctx.stroke();

      ctx.restore();
    }

    // ── RENDER LOOP ──
    function render() {
      ctx.clearRect(0, 0, W, H);

      const light = isLight();
      const c0 = light ? 'rgba(2,132,199,A)' : 'rgba(0,194,255,A)';
      const ca = light ? 'rgba(99,102,241,A)' : 'rgba(129,140,248,A)';
      const hexColor = light ? '#0284c7' : '#00c2ff';
      const col = (t, a) => t.replace('A', (typeof a === 'number' ? a.toFixed(2) : a));

      // Spawn occasional energy comets
      if (Math.random() < 0.015) spawnComet();

      // Draw Energy Comets
      for (let c = comets.length - 1; c >= 0; c--) {
        const com = comets[c];
        com.x += com.vx;
        com.y += com.vy;
        com.alpha -= 0.007;

        if (com.alpha <= 0 || com.x > W + 100 || com.y > H + 100) {
          comets.splice(c, 1);
          continue;
        }

        const grad = ctx.createLinearGradient(com.x, com.y, com.x - com.vx * 15, com.y - com.vy * 15);
        grad.addColorStop(0, com.color);
        grad.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.moveTo(com.x, com.y);
        ctx.lineTo(com.x - com.vx * (com.len / 10), com.y - com.vy * (com.len / 10));
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.8;
        ctx.shadowColor = com.color;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // Shockwaves
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.rad += 5; sw.alpha -= 0.018;
        if (sw.alpha <= 0) { shockwaves.splice(s, 1); continue; }
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.rad, 0, Math.PI * 2);
        ctx.strokeStyle = col(c0, sw.alpha);
        ctx.lineWidth = 1.6;
        ctx.shadowColor = hexColor; ctx.shadowBlur = 14;
        ctx.stroke(); ctx.shadowBlur = 0;
        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.rad * 0.55, 0, Math.PI * 2);
        ctx.strokeStyle = col(ca, sw.alpha * 0.5);
        ctx.lineWidth = 1; ctx.stroke();
      }

      // Cursor Sparks
      for (let sp = sparks.length - 1; sp >= 0; sp--) {
        const s = sparks[sp];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= 0.025;
        if (s.alpha <= 0) { sparks.splice(sp, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = col(s.color === '#00c2ff' ? c0 : ca, s.alpha);
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Node Connections & Polygon Triangle Mesh Fills
      const maxD = 140;
      const maxD2 = maxD * maxD;
      const maxTriD2 = (maxD * 0.85) * (maxD * 0.85);

      for (let i = 0; i < nodes.length; i++) {
        const ni = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const nj = nodes[j];
          const dx = ni.x - nj.x, dy = ni.y - nj.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < maxD2) {
            const d = Math.sqrt(d2);
            const a = (1 - d / maxD) * (light ? 0.28 : 0.42);
            ctx.beginPath();
            ctx.moveTo(ni.x, ni.y);
            ctx.lineTo(nj.x, nj.y);
            ctx.strokeStyle = col(c0, a);
            ctx.lineWidth = 0.95; ctx.stroke();

            if (Math.random() < 0.001) addPulse(ni, nj);

            // Constellation Triangle Fills (Optimized neighbor check)
            const kLimit = Math.min(j + 10, nodes.length);
            for (let k = j + 1; k < kLimit; k++) {
              const nk = nodes[k];
              const dx2 = ni.x - nk.x, dy2 = ni.y - nk.y;
              const dist2_i = dx2 * dx2 + dy2 * dy2;
              if (dist2_i >= maxTriD2) continue;

              const dx3 = nj.x - nk.x, dy3 = nj.y - nk.y;
              const dist2_j = dx3 * dx3 + dy3 * dy3;
              if (dist2_j >= maxTriD2) continue;

              ctx.beginPath();
              ctx.moveTo(ni.x, ni.y);
              ctx.lineTo(nj.x, nj.y);
              ctx.lineTo(nk.x, nk.y);
              ctx.closePath();
              ctx.fillStyle = col(c0, light ? 0.025 : 0.045);
              ctx.fill();
            }
          }
        }
      }

      // Mouse Magnet Forcefield
      if (mouse.x !== null) {
        for (const n of nodes) {
          const dx = n.x - mouse.x, dy = n.y - mouse.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 175) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = col(ca, (1 - d / 175) * 0.65);
            ctx.lineWidth = 1.2; ctx.stroke();
            n.vx += (dx / d) * 0.08;
            n.vy += (dy / d) * 0.08;
          }
        }
        const glow = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 80);
        glow.addColorStop(0, `rgba(0,194,255,${light ? 0.10 : 0.15})`);
        glow.addColorStop(1, 'transparent');
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 80, 0, Math.PI * 2);
        ctx.fillStyle = glow; ctx.fill();
      }

      // Traveling Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pl = pulses[p];
        pl.t += pl.spd;
        if (pl.t >= 1) { pulses.splice(p, 1); continue; }
        const px = pl.sx + (pl.ex - pl.sx) * pl.t;
        const py = pl.sy + (pl.ey - pl.sy) * pl.t;
        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = hexColor;
        ctx.shadowColor = hexColor; ctx.shadowBlur = 12;
        ctx.fill(); ctx.shadowBlur = 0;
      }

      // Nodes & Special Tech Elements
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        n.vx = Math.max(-1.2, Math.min(1.2, n.vx * 0.995));
        n.vy = Math.max(-1.2, Math.min(1.2, n.vy * 0.995));
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.pulse += n.ps;
        const glow = (Math.sin(n.pulse) + 1) / 2;
        const a = 0.35 + glow * 0.55;
        const strokeCol = col(c0, a);

        if (n.type === 'lightbulb') {
          drawLightbulbIcon(n.x, n.y, 8 + glow * 2, strokeCol);
        } else if (n.type === 'glyph') {
          ctx.font = '600 11px monospace';
          ctx.fillStyle = col(ca, a * 0.9);
          ctx.fillText(n.glyph, n.x - 8, n.y + 4);
        } else if (n.type === 'cube') {
          drawWireframeCube(n.x, n.y, 14 + glow * 4, strokeCol);
        } else if (n.type === 'hex') {
          hexPath(n.x, n.y, 7 + glow * 3);
          ctx.strokeStyle = strokeCol;
          ctx.lineWidth = 0.9; ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r + glow * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = col(c0, a);
          ctx.shadowColor = hexColor; ctx.shadowBlur = 7;
          ctx.fill(); ctx.shadowBlur = 0;
        }
      }

      animId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      parent.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}
    />
  );
}

