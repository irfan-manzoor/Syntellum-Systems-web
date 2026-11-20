import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  alpha: number;
  energy: number;
  pulse: number;
  pulsePhase: number;
}

interface ClickPulseWave {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export function InteractiveParticleField() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const mouse = {
      x: -1000,
      y: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      lastTime: performance.now(),
      isActive: false,
    };

    // Compute particle count scaled to screen size
    const particleCount = Math.floor(Math.min(95, Math.max(45, (width * height) / 18000)));
    const particles: Particle[] = [];
    const clickWaves: ClickPulseWave[] = [];

    for (let i = 0; i < particleCount; i++) {
      const r = 1.0 + Math.random() * 1.4;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: r,
        baseRadius: r,
        alpha: 0.25 + Math.random() * 0.35,
        energy: 0,
        pulse: 0,
        pulsePhase: 0,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();

      if (!mouse.isActive || mouse.x < -500) {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
        mouse.vx = 0;
        mouse.vy = 0;
        mouse.speed = 0;
        mouse.lastTime = now;
        mouse.isActive = true;
        return;
      }

      const dx = e.clientX - mouse.x;
      const dy = e.clientY - mouse.y;
      const dt = Math.max(8, now - mouse.lastTime);
      const frameScale = 16.67 / dt;

      const instVx = dx * frameScale;
      const instVy = dy * frameScale;
      const instSpeed = Math.min(65, Math.hypot(instVx, instVy));

      // Fast upward response to sudden cursor flicks, smoothed to avoid micro-jitter
      mouse.vx = mouse.vx * 0.45 + instVx * 0.55;
      mouse.vy = mouse.vy * 0.45 + instVy * 0.55;
      mouse.speed = Math.max(mouse.speed * 0.7, instSpeed);

      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.lastTime = now;
      mouse.isActive = true;
    };

    const handleHeroPointerDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target || !target.closest('[data-hero-section="true"]')) {
        return;
      }

      const clickX = e.clientX;
      const clickY = e.clientY;
      const groupRadius = 185;

      // Spawn localized HUD pulse ring at click site
      clickWaves.push({
        x: clickX,
        y: clickY,
        radius: 6,
        maxRadius: groupRadius,
        alpha: 0.75,
      });

      // Find the localized node group around the click coordinates
      const nearby: { particle: Particle; dist: number }[] = [];
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - clickX;
        const dy = p.y - clickY;
        const dist = Math.hypot(dx, dy);
        if (dist <= groupRadius) {
          nearby.push({ particle: p, dist });
        }
      }

      // Guarantee a localized group activates even in sparser regions
      if (nearby.length < 3) {
        const fallback = particles
          .map((p) => ({
            particle: p,
            dist: Math.hypot(p.x - clickX, p.y - clickY),
          }))
          .filter((item) => item.dist <= 260)
          .sort((a, b) => a.dist - b.dist)
          .slice(0, 5);
        for (const item of fallback) {
          if (!nearby.some((n) => n.particle === item.particle)) {
            nearby.push(item);
          }
        }
      }

      for (const { particle: p, dist } of nearby) {
        const proximity = Math.max(0.2, 1 - dist / (groupRadius + 40));
        p.pulse = Math.max(p.pulse, proximity);
        p.pulsePhase = 0;
        p.energy = Math.min(1, p.energy + proximity * 0.75);

        // Localized outward radial expansion impulse for the clicked group
        if (dist > 1) {
          const dx = p.x - clickX;
          const dy = p.y - clickY;
          const impulse = proximity * 2.1;
          p.vx += (dx / dist) * impulse;
          p.vy += (dy / dist) * impulse;
        }
      }
    };

    const handleMouseLeave = () => {
      mouse.isActive = false;
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.vx = 0;
      mouse.vy = 0;
      mouse.speed = 0;
    };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('pointerdown', handleHeroPointerDown, { capture: true, passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      const maxConnectDist = 110;
      const mouseGravityDist = 170;
      const mouseConnectDist = 140;
      const repulsionSpeedThreshold = 10; // px per 16.67ms frame above which repulsion engages
      const maxParticleSpeed = 6.2;

      // Decay cursor velocity each frame so repulsion settles cleanly when pointer pauses
      mouse.speed *= 0.87;
      mouse.vx *= 0.85;
      mouse.vy *= 0.85;

      const repulsionIntensity = Math.max(
        0,
        Math.min(1, (mouse.speed - repulsionSpeedThreshold) / 22)
      );
      const activeRepelDist = 175 + repulsionIntensity * 95;
      const tetherOpacityFactor = Math.max(0, 1 - repulsionIntensity * 1.65);

      // 0. Render localized click expansion/pulse rings
      for (let w = clickWaves.length - 1; w >= 0; w--) {
        const wave = clickWaves[w];
        wave.radius += (wave.maxRadius - wave.radius) * 0.14;
        wave.alpha *= 0.91;

        if (wave.alpha < 0.02 || wave.maxRadius - wave.radius < 1) {
          clickWaves.splice(w, 1);
          continue;
        }

        // Primary outer pulse ring
        ctx.beginPath();
        ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(93, 217, 232, ${wave.alpha * 0.45})`;
        ctx.lineWidth = 1.1;
        ctx.stroke();

        // Subtle inner secondary echo ring
        if (wave.radius > 16) {
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius * 0.62, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(67, 140, 255, ${wave.alpha * 0.28})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }
      }

      const centerX = width * 0.5;
      const centerY = height * 0.5;
      const halfW = Math.max(1, width * 0.56);
      const halfH = Math.max(1, height * 0.56);

      const getCenterFalloff = (px: number, py: number) => {
        const normDist = Math.min(1, Math.hypot((px - centerX) / halfW, (py - centerY) / halfH));
        // Smooth radial falloff: 1.0 at viewport center, tapering cleanly to 0.1 at viewport edges
        return Math.max(0.1, 1 - Math.pow(normDist, 1.45) * 0.9);
      };

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.isActive) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (repulsionIntensity > 0.08) {
            // Velocity-driven repulsion: scatter particles radially away + directional wake
            if (dist < activeRepelDist && dist > 1) {
              const falloff = 1 - dist / activeRepelDist;
              const repelForce = falloff * (0.42 + repulsionIntensity * 1.45);
              p.vx -= (dx / dist) * repelForce;
              p.vy -= (dy / dist) * repelForce;

              // Subtle fluid wake along cursor travel vector
              p.vx += mouse.vx * falloff * 0.045;
              p.vy += mouse.vy * falloff * 0.045;

              p.energy = Math.min(1, p.energy + falloff * (0.3 + repulsionIntensity * 0.65));
            }
          } else if (dist < mouseGravityDist && dist > 2) {
            // Calm proximity behavior: gentle gravitational attraction toward cursor
            const attractionBlend = 1 - repulsionIntensity / 0.08;
            const force = (1 - dist / mouseGravityDist) * 0.055 * attractionBlend;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        // Clamp peak velocity after strong repulsion or click-expansion impulses
        const pSpeed = Math.hypot(p.vx, p.vy);
        if (pSpeed > maxParticleSpeed) {
          const clampScale = maxParticleSpeed / pSpeed;
          p.vx *= clampScale;
          p.vy *= clampScale;
        }

        // Apply velocities with smooth friction
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.975;
        p.vy *= 0.975;
        p.energy *= 0.94;

        // Localized click pulse oscillation & decay
        let pulseWaveScale = 0;
        if (p.pulse > 0.01) {
          p.pulsePhase += 0.24;
          pulseWaveScale = p.pulse * (0.85 + Math.sin(p.pulsePhase) * 0.35);
          p.pulse *= 0.945;
        } else {
          p.pulse = 0;
        }

        p.radius = p.baseRadius * (1 + p.energy * 0.65 + pulseWaveScale * 1.35);

        // Maintain ambient base drift
        if (Math.abs(p.vx) < 0.1) p.vx += (Math.random() - 0.5) * 0.08;
        if (Math.abs(p.vy) < 0.1) p.vy += (Math.random() - 0.5) * 0.08;

        // Wrap around viewport edges
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Distance-based opacity falloff from viewport center
        const pCenterFalloff = getCenterFalloff(p.x, p.y);
        const effectiveFalloff = Math.min(1, pCenterFalloff + p.pulse * 0.25);

        // Draw particle dot (brightens briefly on kinetic repulsion or group pulse, modulated by center falloff)
        const baseDotAlpha = Math.min(0.96, p.alpha + p.energy * 0.45 + p.pulse * 0.45);
        const drawAlpha = baseDotAlpha * effectiveFalloff;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(93, 217, 232, ${drawAlpha})`;
        ctx.fill();

        // Localized expansion halo around each node in the clicked group
        if (p.pulse > 0.04) {
          const haloRadius = p.radius + (1 - p.pulse * 0.4) * 7.5;
          ctx.beginPath();
          ctx.arc(p.x, p.y, haloRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(93, 217, 232, ${p.pulse * 0.55 * effectiveFalloff})`;
          ctx.lineWidth = 0.85;
          ctx.stroke();
        }

        // 2. Connect with thin lines to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectDist) {
            const pairEnergy = Math.max(p.energy, p2.energy);
            const pairPulse = Math.max(p.pulse, p2.pulse);
            const p2Falloff = Math.min(1, getCenterFalloff(p2.x, p2.y) + p2.pulse * 0.25);
            const edgeFalloff = (effectiveFalloff + p2Falloff) * 0.5;
            const lineAlpha =
              (1 - dist / maxConnectDist) *
              (0.18 + pairEnergy * 0.2 + pairPulse * 0.35) *
              edgeFalloff;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(93, 217, 232, ${lineAlpha})`;
            ctx.lineWidth = pairPulse > 0.15 ? 1.15 : 0.75;
            ctx.stroke();
          }
        }

        // 3. Connect to mouse cursor when close and moving calmly
        if (mouse.isActive && tetherOpacityFactor > 0.02) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseConnectDist) {
            const lineAlpha =
              (1 - dist / mouseConnectDist) * 0.28 * tetherOpacityFactor * effectiveFalloff;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(93, 217, 232, ${lineAlpha})`;
            ctx.lineWidth = 0.85;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('pointerdown', handleHeroPointerDown, { capture: true });
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none select-none z-10 opacity-70"
      aria-hidden="true"
    />
  );
}
