import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const COLORS = [
  'rgba(123, 47, 247, 0.15)', // Purple low opacity (15%)
  'rgba(241, 7, 163, 0.15)',  // Pink low opacity (15%)
  'rgba(239, 177, 29, 0.15)',  // Gold low opacity (15%)
  'rgba(214, 83, 109, 0.15)',  // Soft red low opacity (15%)
];

export const SubtleParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: Particle[] = [];
    const maxParticles = 20; // Low particle count (15-25 maximum)

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });

    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    // Initialize particles spread across the canvas area
    for (let i = 0; i < maxParticles; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        // Move extremely slowly (upwards and sideways)
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.1 - Math.random() * 0.2, // slow upward drift
        size: 1 + Math.random() * 2, // small physical size (1-3px)
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      });
    }

    // Animation Loop
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update positions slowly
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders seamlessly
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = canvas.height;

        // Render particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none -z-10"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};
