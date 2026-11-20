import React, { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  age: number;
}

interface SparkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

interface HudRipple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  isMagnetic?: boolean;
  tickCount?: number;
  color?: string;
  speed?: number;
}

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dotRef = useRef<HTMLDivElement | null>(null);

  const [isEnabled, setIsEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on devices with a fine pointer (mouse/trackpad), not touch screens
    const hasFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (!hasFinePointer) return;

    setIsEnabled(true);

    const mouse = { x: -100, y: -100, prevX: -100, prevY: -100, speed: 0 };

    // High-agility trail points (tight responsive follow)
    const trailLength = 10;
    const trailPoints: TrailPoint[] = Array.from({ length: trailLength }, () => ({
      x: -100,
      y: -100,
      age: 0,
    }));

    // Floating cybernetic sparks and HUD ripples
    const sparks: SparkParticle[] = [];
    const ripples: HudRipple[] = [];

    let lastHoveredEl: Element | null = null;
    let animId: number;
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : null;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Spawn subtle magnetic lock-on pulse when interacting with clickable elements
    const emitMagneticPulse = (posX: number, posY: number) => {
      // Primary magnetic HUD ring
      ripples.push({
        x: posX,
        y: posY,
        radius: 4,
        maxRadius: 26,
        alpha: 0.88,
        isMagnetic: true,
        tickCount: 4,
        color: '#5DD9E8',
        speed: 0.18,
      });

      // Secondary soft concentric echo
      setTimeout(() => {
        ripples.push({
          x: mouse.x > 0 ? mouse.x : posX,
          y: mouse.y > 0 ? mouse.y : posY,
          radius: 3,
          maxRadius: 18,
          alpha: 0.55,
          isMagnetic: true,
          tickCount: 0,
          color: '#438CFF',
          speed: 0.22,
        });
      }, 75);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const dx = mouse.x - mouse.prevX;
      const dy = mouse.y - mouse.prevY;
      mouse.speed = Math.sqrt(dx * dx + dy * dy);

      if (!isVisible) setIsVisible(true);

      // Spawn agile cybernetic micro-sparks on active cursor motion
      if (mouse.speed > 10 && Math.random() < 0.7) {
        sparks.push({
          x: mouse.x + (Math.random() - 0.5) * 4,
          y: mouse.y + (Math.random() - 0.5) * 4,
          vx: (Math.random() - 0.5) * 2 - dx * 0.12,
          vy: (Math.random() - 0.5) * 2 - dy * 0.12,
          alpha: 0.9,
          size: 1.2 + Math.random() * 1.5,
          color: Math.random() > 0.35 ? '#5DD9E8' : '#438CFF',
        });
      }

      // Check if entering an interactive element (buttons, links, inputs, nav items)
      const target = e.target as HTMLElement | null;
      const interactiveEl = target?.closest(
        'a, button, input, textarea, select, [role="button"], [data-magnetic="true"], .interactive-hover'
      ) || null;

      if (interactiveEl !== lastHoveredEl) {
        if (interactiveEl) {
          // Trigger magnetic ripple on interaction entry
          emitMagneticPulse(e.clientX, e.clientY);
        }
        lastHoveredEl = interactiveEl;
        setIsHovered(!!interactiveEl);
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsClicking(true);
      // Spawn expanding HUD radar ripple on click
      ripples.push({
        x: e.clientX,
        y: e.clientY,
        radius: 4,
        maxRadius: 36,
        alpha: 0.95,
        isMagnetic: false,
        tickCount: 4,
        color: '#5DD9E8',
        speed: 0.22,
      });

      // Quick burst of sparks
      for (let i = 0; i < 7; i++) {
        const angle = (Math.PI * 2 * i) / 7 + Math.random() * 0.3;
        const speed = 2.5 + Math.random() * 2.5;
        sparks.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: 1.6,
          color: '#5DD9E8',
        });
      }
    };

    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => {
      setIsVisible(false);
      lastHoveredEl = null;
      setIsHovered(false);
    };
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // 60fps High-Speed Animation Loop
    const tick = () => {
      // Update pinpoint core dot transform with zero latency
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouse.x}px, ${mouse.y}px, 0)`;
      }

      // Render Canvas Trail with High-Speed Easing
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Update trail points with rapid, agile spring physics
        let prevPointX = mouse.x;
        let prevPointY = mouse.y;

        for (let i = 0; i < trailPoints.length; i++) {
          const pt = trailPoints[i];
          const spring = 0.76 - (i / trailPoints.length) * 0.18;

          pt.x += (prevPointX - pt.x) * spring;
          pt.y += (prevPointY - pt.y) * spring;

          prevPointX = pt.x;
          prevPointY = pt.y;
        }

        // Draw Fluid Luminescent High-Speed Laser Trail
        if (mouse.x > 0 && mouse.y > 0) {
          ctx.beginPath();
          ctx.moveTo(mouse.x, mouse.y);

          for (let i = 0; i < trailPoints.length - 1; i++) {
            const xc = (trailPoints[i].x + trailPoints[i + 1].x) / 2;
            const yc = (trailPoints[i].y + trailPoints[i + 1].y) / 2;
            ctx.quadraticCurveTo(trailPoints[i].x, trailPoints[i].y, xc, yc);
          }

          // Outer glowing trail
          ctx.strokeStyle = 'rgba(93, 217, 232, 0.55)';
          ctx.lineWidth = isHovered ? 2.4 : 1.6;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.shadowColor = '#5DD9E8';
          ctx.shadowBlur = 8;
          ctx.stroke();

          // Inner laser core hairline
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.75)';
          ctx.lineWidth = 0.8;
          ctx.shadowBlur = 3;
          ctx.stroke();

          // Reset shadow
          ctx.shadowBlur = 0;
        }

        // Render Active Sparks
        for (let i = sparks.length - 1; i >= 0; i--) {
          const s = sparks[i];
          s.x += s.vx;
          s.y += s.vy;
          s.alpha *= 0.86;

          ctx.fillStyle = s.color;
          ctx.globalAlpha = s.alpha;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
          ctx.fill();

          if (s.alpha < 0.05) {
            sparks.splice(i, 1);
          }
        }
        ctx.globalAlpha = 1.0;

        // Render Magnetic Ripples & Click Waves (Intelligent HUD Aesthetic)
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i];
          const speed = r.speed || 0.18;
          r.radius += (r.maxRadius - r.radius) * speed;
          r.alpha *= 0.88;

          ctx.save();
          // Primary ripple ring
          ctx.strokeStyle = r.color === '#438CFF'
            ? `rgba(67, 140, 255, ${r.alpha})`
            : `rgba(93, 217, 232, ${r.alpha})`;
          ctx.lineWidth = r.isMagnetic ? 1.0 : 1.4;
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
          ctx.stroke();

          // Subtle HUD Cardinal Ticks on Magnetic Lock-on
          if (r.isMagnetic && r.tickCount === 4 && r.radius > 6) {
            ctx.strokeStyle = `rgba(255, 255, 255, ${r.alpha * 0.75})`;
            ctx.lineWidth = 1.0;
            const tickLen = 2.5;
            const rad = r.radius;
            ctx.beginPath();
            // North, South, East, West micro notches
            ctx.moveTo(r.x, r.y - rad);
            ctx.lineTo(r.x, r.y - rad - tickLen);
            ctx.moveTo(r.x, r.y + rad);
            ctx.lineTo(r.x, r.y + rad + tickLen);
            ctx.moveTo(r.x - rad, r.y);
            ctx.lineTo(r.x - rad - tickLen, r.y);
            ctx.moveTo(r.x + rad, r.y);
            ctx.lineTo(r.x + rad + tickLen, r.y);
            ctx.stroke();
          }
          ctx.restore();

          if (r.alpha < 0.03 || Math.abs(r.maxRadius - r.radius) < 0.5) {
            ripples.splice(i, 1);
          }
        }
      }

      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isVisible, isHovered]);

  if (!isEnabled) return null;

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      aria-hidden="true"
    >
      {/* 1. Hardware-Accelerated High-Speed Canvas Trail Ribbon & Magnetic Ripples */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* 2. Pinpoint Core Dot (Zero Latency HUD Pointer) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-[3.5px] -mt-[3.5px] rounded-full bg-[#5DD9E8] transition-all duration-100 ease-out z-20 ${
          isHovered
            ? 'w-2.5 h-2.5 -ml-[5px] -mt-[5px] shadow-[0_0_14px_#5DD9E8,0_0_6px_#FFF]'
            : 'w-1.5 h-1.5 shadow-[0_0_8px_#5DD9E8,0_0_3px_#FFF]'
        } ${isClicking ? 'scale-75 bg-white shadow-[0_0_16px_#FFF]' : 'scale-100'}`}
        style={{ willChange: 'transform' }}
      />
    </div>
  );
}
