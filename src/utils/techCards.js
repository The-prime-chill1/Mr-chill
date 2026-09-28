// Helper to convert hex to rgba
function hexToRgba(hex, alpha = 1) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  const r = (num >> 16) & 255;
  const g = (num >> 8) & 255;
  const b = num & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// Helper to draw rounded rectangle on canvas
function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

/**
 * Generates an ultra-crisp base64 PNG data URL for a technology card.
 * 100% reliable across all browsers, mobile and desktop — no XML/SVG parsing errors.
 */
export function createTechCardPng({ name, color, cat, drawIcon }) {
  const canvas = document.createElement('canvas');
  canvas.width = 460;
  canvas.height = 360;
  const ctx = canvas.getContext('2d');

  // 1. Dark Cyber Gradient Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, 360);
  bgGrad.addColorStop(0, '#090f1d');
  bgGrad.addColorStop(1, '#0f182c');
  ctx.fillStyle = bgGrad;
  roundRect(ctx, 4, 4, 452, 352, 28);
  ctx.fill();

  // 2. Center Radial Glow with Brand Color
  const glow = ctx.createRadialGradient(230, 160, 5, 230, 160, 170);
  glow.addColorStop(0, hexToRgba(color, 0.38));
  glow.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = glow;
  ctx.fillRect(4, 4, 452, 352);

  // 3. Card Border
  ctx.strokeStyle = hexToRgba(color, 0.45);
  ctx.lineWidth = 2.5;
  roundRect(ctx, 4, 4, 452, 352, 28);
  ctx.stroke();

  // 4. Category Pill at the top
  const pillW = 150;
  const pillH = 26;
  const pillX = 230 - pillW / 2;
  const pillY = 28;
  ctx.fillStyle = hexToRgba(color, 0.12);
  roundRect(ctx, pillX, pillY, pillW, pillH, 13);
  ctx.fill();
  ctx.strokeStyle = hexToRgba(color, 0.35);
  ctx.lineWidth = 1.2;
  roundRect(ctx, pillX, pillY, pillW, pillH, 13);
  ctx.stroke();

  ctx.fillStyle = color;
  ctx.font = '700 11px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(cat.toUpperCase(), 230, pillY + pillH / 2);

  // 5. Draw the verified vector icon centered at (230, 175)
  ctx.save();
  drawIcon(ctx, 230, 175, color);
  ctx.restore();

  // 6. Technology Name at the bottom
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 24px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name, 230, 310);

  return canvas.toDataURL('image/png');
}

/**
 * Builds the complete list of 13 technology cards.
 */
export function getTechGalleryItems() {
  if (typeof document === 'undefined') return [];

  return [
    {
      text: 'React',
      image: createTechCardPng({
        name: 'React',
        color: '#00c2ff',
        cat: 'Frontend Web',
        drawIcon: (ctx, cx, cy) => {
          ctx.strokeStyle = '#00c2ff';
          ctx.lineWidth = 4;
          for (let angle of [0, Math.PI / 3, (2 * Math.PI) / 3]) {
            ctx.beginPath();
            ctx.ellipse(cx, cy, 54, 20, angle, 0, Math.PI * 2);
            ctx.stroke();
          }
          ctx.fillStyle = '#00c2ff';
          ctx.beginPath();
          ctx.arc(cx, cy, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      })
    },
    {
      text: 'JavaScript',
      image: createTechCardPng({
        name: 'JavaScript',
        color: '#f7df1e',
        cat: 'ES6+ Logic',
        drawIcon: (ctx, cx, cy) => {
          ctx.fillStyle = '#f7df1e';
          roundRect(ctx, cx - 44, cy - 44, 88, 88, 16);
          ctx.fill();
          ctx.fillStyle = '#000000';
          ctx.font = '900 50px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('JS', cx + 16, cy + 18);
        }
      })
    },
    {
      text: 'TypeScript',
      image: createTechCardPng({
        name: 'TypeScript',
        color: '#3178c6',
        cat: 'Type-Safe App',
        drawIcon: (ctx, cx, cy) => {
          ctx.fillStyle = '#3178c6';
          roundRect(ctx, cx - 44, cy - 44, 88, 88, 16);
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 50px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('TS', cx + 16, cy + 18);
        }
      })
    },
    {
      text: 'Java',
      image: createTechCardPng({
        name: 'Java',
        color: '#f89820',
        cat: 'Backend & OOP',
        drawIcon: (ctx, cx, cy) => {
          ctx.strokeStyle = '#f89820';
          ctx.lineWidth = 4;
          // Cup body
          ctx.beginPath();
          ctx.arc(cx, cy + 4, 26, 0, Math.PI);
          ctx.stroke();
          // Cup rim
          ctx.beginPath();
          ctx.moveTo(cx - 26, cy + 4);
          ctx.lineTo(cx + 26, cy + 4);
          ctx.stroke();
          // Base saucer
          ctx.beginPath();
          ctx.moveTo(cx - 32, cy + 32);
          ctx.lineTo(cx + 32, cy + 32);
          ctx.stroke();
          // Handle
          ctx.beginPath();
          ctx.arc(cx + 26, cy + 12, 10, -Math.PI / 2, Math.PI / 2);
          ctx.stroke();
          // Steam lines
          ctx.lineWidth = 3;
          ctx.strokeStyle = '#5382a1';
          ctx.beginPath();
          ctx.moveTo(cx - 10, cy - 4);
          ctx.bezierCurveTo(cx - 16, cy - 14, cx - 6, cy - 22, cx - 10, cy - 32);
          ctx.stroke();
          ctx.strokeStyle = '#e76f00';
          ctx.beginPath();
          ctx.moveTo(cx + 2, cy - 6);
          ctx.bezierCurveTo(cx - 4, cy - 18, cx + 8, cy - 26, cx + 2, cy - 38);
          ctx.stroke();
          ctx.strokeStyle = '#5382a1';
          ctx.beginPath();
          ctx.moveTo(cx + 14, cy - 4);
          ctx.bezierCurveTo(cx + 8, cy - 14, cx + 20, cy - 22, cx + 14, cy - 32);
          ctx.stroke();
        }
      })
    },
    {
      text: 'Python',
      image: createTechCardPng({
        name: 'Python',
        color: '#3776ab',
        cat: 'Data & Scripting',
        drawIcon: (ctx, cx, cy) => {
          // Blue snake top
          ctx.fillStyle = '#3776ab';
          ctx.beginPath();
          roundRect(ctx, cx - 36, cy - 36, 44, 38, 12);
          ctx.fill();
          roundRect(ctx, cx - 14, cy - 14, 44, 18, 6);
          ctx.fill();
          // Blue eye
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.arc(cx - 20, cy - 24, 3.5, 0, Math.PI * 2);
          ctx.fill();

          // Yellow snake bottom
          ctx.fillStyle = '#ffd43b';
          ctx.beginPath();
          roundRect(ctx, cx - 8, cy - 2, 44, 38, 12);
          ctx.fill();
          roundRect(ctx, cx - 30, cy - 4, 44, 18, 6);
          ctx.fill();
          // Yellow eye
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(cx + 20, cy + 24, 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      })
    },
    {
      text: 'Node.js',
      image: createTechCardPng({
        name: 'Node.js',
        color: '#22c55e',
        cat: 'Backend APIs',
        drawIcon: (ctx, cx, cy) => {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 4;
          ctx.fillStyle = 'rgba(34, 197, 94, 0.18)';
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 6;
            const x = cx + 46 * Math.cos(angle);
            const y = cy + 46 * Math.sin(angle);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          ctx.fillStyle = '#22c55e';
          ctx.font = '900 24px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('node', cx, cy);
        }
      })
    },
    {
      text: 'C / C++',
      image: createTechCardPng({
        name: 'C / C++',
        color: '#00599c',
        cat: 'Systems & Alg.',
        drawIcon: (ctx, cx, cy) => {
          ctx.fillStyle = '#00599c';
          ctx.font = '900 52px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('C', cx - 18, cy + 2);

          ctx.fillStyle = '#00c2ff';
          ctx.font = '900 30px system-ui, sans-serif';
          ctx.fillText('++', cx + 22, cy - 2);
        }
      })
    },
    {
      text: 'MySQL / SQL',
      image: createTechCardPng({
        name: 'MySQL / SQL',
        color: '#00758f',
        cat: 'Relational DB',
        drawIcon: (ctx, cx, cy) => {
          ctx.strokeStyle = '#00758f';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.ellipse(cx, cy - 20, 42, 13, 0, 0, Math.PI * 2);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(cx, cy, 42, 13, 0, 0, Math.PI);
          ctx.stroke();
          ctx.beginPath();
          ctx.ellipse(cx, cy + 20, 42, 13, 0, 0, Math.PI);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(cx - 42, cy - 20);
          ctx.lineTo(cx - 42, cy + 20);
          ctx.moveTo(cx + 42, cy - 20);
          ctx.lineTo(cx + 42, cy + 20);
          ctx.stroke();
          ctx.fillStyle = '#00c2ff';
          ctx.font = '900 18px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('SQL', cx, cy + 2);
        }
      })
    },
    {
      text: 'Git / GitHub',
      image: createTechCardPng({
        name: 'Git / GitHub',
        color: '#f05032',
        cat: 'Version Control',
        drawIcon: (ctx, cx, cy) => {
          ctx.strokeStyle = '#f05032';
          ctx.lineWidth = 4;
          ctx.fillStyle = 'rgba(240,80,50,0.15)';
          ctx.beginPath();
          ctx.arc(cx, cy, 40, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.strokeStyle = '#ffffff';
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(cx - 14, cy - 10);
          ctx.lineTo(cx - 2, cy + 4);
          ctx.lineTo(cx - 2, cy + 22);
          ctx.moveTo(cx + 12, cy - 14);
          ctx.lineTo(cx - 2, cy + 4);
          ctx.stroke();

          ctx.fillStyle = '#f05032';
          for (let pt of [[cx - 14, cy - 10], [cx + 12, cy - 14], [cx - 2, cy + 22]]) {
            ctx.beginPath();
            ctx.arc(pt[0], pt[1], 6.5, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#ffffff';
            ctx.lineWidth = 2;
            ctx.stroke();
          }
        }
      })
    },
    {
      text: 'HTML & CSS',
      image: createTechCardPng({
        name: 'HTML & CSS',
        color: '#e34f26',
        cat: 'Markup & Styles',
        drawIcon: (ctx, cx, cy) => {
          // HTML5 shield
          ctx.fillStyle = '#e34f26';
          ctx.beginPath();
          ctx.moveTo(cx - 40, cy - 32);
          ctx.lineTo(cx - 4, cy - 32);
          ctx.lineTo(cx - 4, cy + 36);
          ctx.lineTo(cx - 24, cy + 44);
          ctx.lineTo(cx - 40, cy + 32);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.font = '900 20px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('5', cx - 22, cy);

          // CSS3 shield
          ctx.fillStyle = '#1572b6';
          ctx.beginPath();
          ctx.moveTo(cx + 4, cy - 32);
          ctx.lineTo(cx + 40, cy - 32);
          ctx.lineTo(cx + 40, cy + 32);
          ctx.lineTo(cx + 24, cy + 44);
          ctx.lineTo(cx + 4, cy + 36);
          ctx.closePath();
          ctx.fill();
          ctx.fillStyle = '#ffffff';
          ctx.fillText('3', cx + 22, cy);
        }
      })
    },
    {
      text: 'Figma',
      image: createTechCardPng({
        name: 'Figma',
        color: '#a259ff',
        cat: 'UI/UX Design',
        drawIcon: (ctx, cx, cy) => {
          const r = 14;
          const pills = [
            { x: cx - r, y: cy - 2 * r, color: '#f24e1e' },
            { x: cx + r, y: cy - 2 * r, color: '#ff7262' },
            { x: cx - r, y: cy, color: '#a259ff' },
            { x: cx + r, y: cy, color: '#1abcfe' },
            { x: cx - r, y: cy + 2 * r, color: '#0acf83' },
          ];
          for (let p of pills) {
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      })
    },
    {
      text: 'Next.js',
      image: createTechCardPng({
        name: 'Next.js',
        color: '#ffffff',
        cat: 'SSR & Fullstack',
        drawIcon: (ctx, cx, cy) => {
          ctx.fillStyle = '#000000';
          ctx.strokeStyle = 'rgba(255,255,255,0.4)';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(cx, cy, 38, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = '#ffffff';
          ctx.font = '900 40px system-ui, sans-serif';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText('N', cx - 4, cy + 2);
          ctx.fillStyle = '#00c2ff';
          ctx.fillText('.', cx + 18, cy + 2);
        }
      })
    },
    {
      text: 'Vercel / Cloud',
      image: createTechCardPng({
        name: 'Vercel / Cloud',
        color: '#00c2ff',
        cat: 'CI/CD & Cloud',
        drawIcon: (ctx, cx, cy) => {
          // White Triangle
          ctx.fillStyle = '#ffffff';
          ctx.beginPath();
          ctx.moveTo(cx, cy - 34);
          ctx.lineTo(cx + 36, cy + 26);
          ctx.lineTo(cx - 36, cy + 26);
          ctx.closePath();
          ctx.fill();

          // Dark Inner Cutout
          ctx.fillStyle = '#090f1d';
          ctx.beginPath();
          ctx.moveTo(cx, cy - 12);
          ctx.lineTo(cx + 18, cy + 20);
          ctx.lineTo(cx - 18, cy + 20);
          ctx.closePath();
          ctx.fill();

          // Cyan Core Dot
          ctx.fillStyle = '#00c2ff';
          ctx.beginPath();
          ctx.arc(cx, cy + 10, 5, 0, Math.PI * 2);
          ctx.fill();
        }
      })
    }
  ];
}
