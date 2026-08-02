import { useEffect, useRef } from 'react';

export default function TechCanvasBg() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight || window.innerHeight);

    // Mouse tracking & shockwave ripple on click/move
    const mouse = { x: null, y: null, radius: 160 };
    let shockwaves = [];

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleClick = (e) => {
      const rect = canvas.getBoundingClientRect();
      shockwaves.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 4,
        maxRadius: 180,
        alpha: 0.8,
      });
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', handleMouseMove);
    parent.addEventListener('click', handleClick);
    parent.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Configuration
    const NODE_COUNT = Math.min(Math.floor((width * height) / 10000), 55);
    let nodes = [];
    let pulses = [];
    let radarAngle = 0;

    function initNodes() {
      nodes = [];
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.7,
          vy: (Math.random() - 0.5) * 0.7,
          radius: Math.random() * 2.2 + 1.5,
          pulse: Math.random() * Math.PI * 2,
          pulseSpeed: 0.02 + Math.random() * 0.03,
          isHex: Math.random() > 0.65,
        });
      }
    }

    function createPulse(startNode, endNode) {
      pulses.push({
        sx: startNode.x,
        sy: startNode.y,
        ex: endNode.x,
        ey: endNode.y,
        progress: 0,
        speed: 0.015 + Math.random() * 0.02,
      });
    }

    initNodes();

    // Hexagon Helper
    function drawHexagon(x, y, r, alpha, colorStr) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const hx = x + r * Math.cos(angle);
        const hy = y + r * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
      ctx.strokeStyle = colorStr.replace('ALPHA', alpha.toFixed(2));
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Animation Loop
    function render() {
      ctx.clearRect(0, 0, width, height);

      // Theme check
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      const baseColor = isLight ? 'rgba(2, 132, 199, ALPHA)' : 'rgba(0, 194, 255, ALPHA)';
      const accentColor = isLight ? 'rgba(99, 102, 241, ALPHA)' : 'rgba(129, 140, 248, ALPHA)';
      const primaryHex = isLight ? '#0284c7' : '#00c2ff';

      const cx = width / 2;
      const cy = height / 2;

      // 1. Radar Sweep Line Animation
      radarAngle += 0.008;
      const radarRadius = Math.max(width, height) * 0.6;
      const sweepX = cx + radarRadius * Math.cos(radarAngle);
      const sweepY = cy + radarRadius * Math.sin(radarAngle);

      const radarGrad = ctx.createLinearGradient(cx, cy, sweepX, sweepY);
      radarGrad.addColorStop(0, baseColor.replace('ALPHA', isLight ? '0.12' : '0.18'));
      radarGrad.addColorStop(1, 'transparent');

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radarRadius, radarAngle - 0.25, radarAngle);
      ctx.closePath();
      ctx.fillStyle = radarGrad;
      ctx.fill();

      // 2. Shockwave Ripples Animation
      for (let s = shockwaves.length - 1; s >= 0; s--) {
        const sw = shockwaves[s];
        sw.radius += 4;
        sw.alpha -= 0.015;

        if (sw.alpha <= 0 || sw.radius >= sw.maxRadius) {
          shockwaves.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(sw.x, sw.y, sw.radius, 0, Math.PI * 2);
        ctx.strokeStyle = baseColor.replace('ALPHA', sw.alpha.toFixed(2));
        ctx.lineWidth = 1.5;
        ctx.shadowColor = primaryHex;
        ctx.shadowBlur = 10;
        ctx.stroke();
        ctx.shadowBlur = 0;
      }

      // 3. Node Connection Lines
      const maxDistance = 145;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * (isLight ? 0.28 : 0.38);
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = baseColor.replace('ALPHA', alpha.toFixed(2));
            ctx.lineWidth = 1;
            ctx.stroke();

            // Trigger pulses along connections
            if (Math.random() < 0.001) {
              createPulse(nodes[i], nodes[j]);
            }
          }
        }
      }

      // 4. Interactive Mouse Magnet Connections
      if (mouse.x !== null && mouse.y !== null) {
        for (let i = 0; i < nodes.length; i++) {
          const dx = nodes[i].x - mouse.x;
          const dy = nodes[i].y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouse.radius) {
            const alpha = (1 - dist / mouse.radius) * 0.55;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = accentColor.replace('ALPHA', alpha.toFixed(2));
            ctx.lineWidth = 1.4;
            ctx.stroke();
          }
        }
      }

      // 5. Traveling Light Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const px = pulse.sx + (pulse.ex - pulse.sx) * pulse.progress;
        const py = pulse.sy + (pulse.ey - pulse.sy) * pulse.progress;

        ctx.beginPath();
        ctx.arc(px, py, 2.8, 0, Math.PI * 2);
        ctx.fillStyle = primaryHex;
        ctx.shadowColor = primaryHex;
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // 6. Draw & Update Nodes
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];

        n.x += n.vx;
        n.y += n.vy;
        n.pulse += n.pulseSpeed;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const pulseGlow = (Math.sin(n.pulse) + 1) / 2;
        const alpha = 0.35 + pulseGlow * 0.5;

        if (n.isHex) {
          drawHexagon(n.x, n.y, 8.5 + pulseGlow * 3.5, alpha * 0.65, baseColor);
        } else {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius + pulseGlow * 1.2, 0, Math.PI * 2);
          ctx.fillStyle = baseColor.replace('ALPHA', alpha.toFixed(2));
          ctx.shadowColor = primaryHex;
          ctx.shadowBlur = 6;
          ctx.fill();
          ctx.shadowBlur = 0;

          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * 2.6 + pulseGlow * 2.2, 0, Math.PI * 2);
          ctx.strokeStyle = baseColor.replace('ALPHA', (alpha * 0.35).toFixed(2));
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    }

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      parent.removeEventListener('mousemove', handleMouseMove);
      parent.removeEventListener('click', handleClick);
      parent.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
    />
  );
}
