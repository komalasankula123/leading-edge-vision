/**
 * Canvas Background: Golden Circuit Network & Neural Nodes
 * Leading Edge Vision
 */

(function () {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, active: false };

  const PARTICLE_COUNT = 55;
  const CONNECT_DISTANCE = 135;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  class CircuitNode {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.radius = Math.random() * 2 + 1;
      this.baseAlpha = Math.random() * 0.4 + 0.2;
      this.isGolden = Math.random() > 0.4; // Electric yellow nodes
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // React to mouse
      if (mouse.active && mouse.x !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150) {
          const force = (150 - dist) / 150;
          this.x -= (dx / dist) * force * 1.5;
          this.y -= (dy / dist) * force * 1.5;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      if (this.isGolden) {
        ctx.fillStyle = `rgba(255, 230, 0, ${this.baseAlpha + 0.3})`;
        ctx.shadowBlur = 6;
        ctx.shadowColor = '#FFE600';
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.baseAlpha})`;
        ctx.shadowBlur = 0;
      }
      ctx.fill();
    }
  }

  function init() {
    resize();
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new CircuitNode());
    }
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting circuit tracks
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECT_DISTANCE) {
          const alpha = (1 - dist / CONNECT_DISTANCE) * 0.18;
          ctx.strokeStyle = `rgba(255, 230, 0, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }

    // Render particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Mouse reticle locator
    if (mouse.active && mouse.x !== null) {
      ctx.save();
      ctx.strokeStyle = 'rgba(255, 230, 0, 0.45)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 18, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = '10px "JetBrains Mono", monospace';
      ctx.fillStyle = 'rgba(255, 230, 0, 0.8)';
      ctx.fillText(`LEV // TOKYO EXPEDITION`, mouse.x + 24, mouse.y - 8);
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  init();
  render();
})();
