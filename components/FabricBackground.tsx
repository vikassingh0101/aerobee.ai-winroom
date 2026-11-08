import React, { useEffect, useRef } from 'react';
import {
  initFabricInteraction,
  getFabricInteractionState,
  subscribeFabricInteraction,
} from '../utils/fabricInteraction';

interface FabricBackgroundProps {
  theme?: 'dark' | 'light';
  className?: string;
  intensity?: number;
}

interface PollenParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  phase: number;
}

export const FabricBackground: React.FC<FabricBackgroundProps> = ({
  theme = 'dark',
  className = '',
  intensity = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    initFabricInteraction();

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animFrameId: number;
    let isVisible = true;
    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    // Smoothed mouse and CTA physics state (per-section instance)
    let localMouseX = -2000;
    let localMouseY = -2000;
    let smoothedMouseX = -2000;
    let smoothedMouseY = -2000;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;
    let mousePresence = 0; // 0 to 1

    let localCtaX = -2000;
    let localCtaY = -2000;
    let ctaRadius = 40;
    let ctaInfluence = 0; // 0 to 1 smooth
    let targetCtaInfluence = 0;

    // Reduced motion check
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize Pollen particles
    const particleCount = Math.max(16, Math.min(36, Math.floor(width / 60)));
    const particles: PollenParticle[] = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25 - 0.1, // subtle upward pollen buoyancy
        size: 1.2 + Math.random() * 1.8,
        alpha: 0.15 + Math.random() * 0.35,
        baseAlpha: 0.15 + Math.random() * 0.35,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const resize = () => {
      if (!container || !canvas) return;
      const rect = container.getBoundingClientRect();
      width = Math.max(10, rect.width);
      height = Math.max(10, rect.height);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);
    };

    resize();
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(container);

    // Pause rendering when scrolled out of view to maximize performance
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animFrameId) {
          lastTime = performance.now();
          render(lastTime);
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Update coordinates when global fabric state updates
    const unsubscribe = subscribeFabricInteraction((gState) => {
      if (!container) return;
      const rect = container.getBoundingClientRect();

      // Local mouse coords
      localMouseX = gState.targetMouseX - rect.left;
      localMouseY = gState.targetMouseY - rect.top;
      mouseVelocityX = gState.mouseVelocityX;
      mouseVelocityY = gState.mouseVelocityY;

      const isInside =
        gState.isMouseInside &&
        localMouseX >= -120 &&
        localMouseX <= width + 120 &&
        localMouseY >= -120 &&
        localMouseY <= height + 120;

      // CTA check
      if (gState.activeCTA && gState.activeCTA.isHovered) {
        const ctaGlobX = gState.activeCTA.x;
        const ctaGlobY = gState.activeCTA.y;
        localCtaX = ctaGlobX - rect.left;
        localCtaY = ctaGlobY - rect.top;
        ctaRadius = gState.activeCTA.radius;

        // Is CTA near this section?
        const isCtaNear =
          localCtaX >= -150 &&
          localCtaX <= width + 150 &&
          localCtaY >= -150 &&
          localCtaY <= height + 150;

        targetCtaInfluence = isCtaNear ? 1.0 : 0.0;
      } else {
        targetCtaInfluence = 0.0;
      }
    });

    let lastTime = performance.now();

    // Fabric Wave Height Function
    const getFabricWave = (x: number, y: number, timeSec: number): number => {
      // Natural slow fabric drape undulation
      const t1 = timeSec * 0.45;
      const t2 = timeSec * 0.35;

      // Primary silk diagonal folds
      const fold1 = Math.sin(x * 0.0022 + y * 0.0016 + t1) * 16;
      // Secondary cross-weave drape
      const fold2 = Math.cos(x * 0.0015 - y * 0.0024 - t2) * 12;
      // Gentle harmonic ripple
      const fold3 = Math.sin((x + y) * 0.003 + t1 * 1.5) * 6;

      let totalHeight = fold1 + fold2 + fold3;

      // Mouse displacement & ripple (moving along the fabric)
      if (mousePresence > 0.01) {
        const dx = x - smoothedMouseX;
        const dy = y - smoothedMouseY;
        const dist = Math.hypot(dx, dy);
        const radius = 240;

        if (dist < radius) {
          const norm = 1 - dist / radius;
          const bell = norm * norm * (3 - 2 * norm);
          // Silk indentation & gentle trailing ripple
          const ripple =
            Math.sin(dist * 0.038 - timeSec * 3.5) * bell * 18 * mousePresence;
          totalHeight += ripple;
        }
      }

      // CTA magnetic tension & pulse
      if (ctaInfluence > 0.01) {
        const cdx = x - localCtaX;
        const cdy = y - localCtaY;
        const cdist = Math.hypot(cdx, cdy);
        const ctaEffectRadius = Math.max(160, ctaRadius * 3.2);

        if (cdist < ctaEffectRadius) {
          const cnorm = 1 - cdist / ctaEffectRadius;
          const cBell = cnorm * cnorm;
          // Concentric honey wave pulsing from the CTA
          const cPulse =
            Math.sin(cdist * 0.045 - timeSec * 4.2) *
            cBell *
            24 *
            ctaInfluence;
          totalHeight += cPulse;
        }
      }

      return totalHeight * intensity;
    };

    const render = (now: number) => {
      if (!isVisible) {
        animFrameId = 0;
        return;
      }

      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      const timeSec = now * 0.001;

      // Smooth mouse physics (gentle inertia like silk floating after touch)
      if (localMouseX > -1000) {
        if (smoothedMouseX === -2000) {
          smoothedMouseX = localMouseX;
          smoothedMouseY = localMouseY;
        } else {
          smoothedMouseX += (localMouseX - smoothedMouseX) * Math.min(1, dt * 5);
          smoothedMouseY += (localMouseY - smoothedMouseY) * Math.min(1, dt * 5);
        }

        const isInside =
          localMouseX >= -80 &&
          localMouseX <= width + 80 &&
          localMouseY >= -80 &&
          localMouseY <= height + 80;

        const targetPresence = isInside ? 1.0 : 0.0;
        mousePresence += (targetPresence - mousePresence) * Math.min(1, dt * 4);
      }

      // Smooth CTA influence transition
      ctaInfluence += (targetCtaInfluence - ctaInfluence) * Math.min(1, dt * 6);

      ctx.clearRect(0, 0, width, height);

      // -------------------------------------------------------------
      // 1. SILK DRAPE RIBBONS (Continuous undulating fabric folds)
      // -------------------------------------------------------------
      const ribbonCount = Math.max(8, Math.min(14, Math.floor(height / 65)));
      const stepX = 26;

      for (let r = 0; r <= ribbonCount; r++) {
        const baseY = (r / ribbonCount) * height;
        ctx.beginPath();

        for (let x = 0; x <= width + stepX; x += stepX) {
          const wave = getFabricWave(x, baseY, timeSec);
          const py = baseY + wave;
          if (x === 0) {
            ctx.moveTo(x, py);
          } else {
            ctx.lineTo(x, py);
          }
        }

        // Color and stroke based on theme and proximity to mouse / CTA
        const ribbonDistToMouse = Math.abs(baseY - smoothedMouseY);
        const mouseFactor =
          mousePresence > 0.01
            ? Math.max(0, 1 - ribbonDistToMouse / 280) * mousePresence
            : 0;

        const ribbonDistToCta = Math.abs(baseY - localCtaY);
        const ctaFactor =
          ctaInfluence > 0.01
            ? Math.max(0, 1 - ribbonDistToCta / 240) * ctaInfluence
            : 0;

        if (theme === 'dark') {
          // Warm obsidian fabric with honey silk highlights
          const baseAlpha = 0.05 + mouseFactor * 0.12 + ctaFactor * 0.18;
          ctx.strokeStyle = `rgba(245, 166, 35, ${baseAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.2 + mouseFactor * 0.8 + ctaFactor * 1.2;
        } else {
          // Beeswax cream fabric with warm caramel/honey sheen
          const baseAlpha = 0.04 + mouseFactor * 0.09 + ctaFactor * 0.14;
          ctx.strokeStyle = `rgba(201, 125, 14, ${baseAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.0 + mouseFactor * 0.6 + ctaFactor * 1.0;
        }

        ctx.stroke();
      }

      // -------------------------------------------------------------
      // 2. BEEHIVE HONEYCOMB LATTICE (Woven into the moving fabric)
      // -------------------------------------------------------------
      const hexR = 36; // Hexagon radius
      const hexW = hexR * Math.sqrt(3);
      const hexH = hexR * 1.5;

      const cols = Math.ceil(width / hexW) + 2;
      const rows = Math.ceil(height / hexH) + 2;

      for (let row = -1; row < rows; row++) {
        const rowY = row * hexH;
        const xOffset = (row % 2) * (hexW / 2);

        for (let col = -1; col < cols; col++) {
          const cellX = col * hexW + xOffset;
          const cellY = rowY;

          // Local fabric wave at hexagon center
          const h = getFabricWave(cellX, cellY, timeSec);

          // 2D surface tilt deflection (makes hex cells flex as fabric waves roll past)
          const slopeX =
            (getFabricWave(cellX + 10, cellY, timeSec) -
              getFabricWave(cellX - 10, cellY, timeSec)) *
            0.25;
          const slopeY =
            (getFabricWave(cellX, cellY + 10, timeSec) -
              getFabricWave(cellX, cellY - 10, timeSec)) *
            0.25;

          const displacedX = cellX + slopeX;
          const displacedY = cellY + slopeY;

          // Proximity to mouse
          const dMouse = Math.hypot(
            cellX - smoothedMouseX,
            cellY - smoothedMouseY
          );
          const mouseGlow =
            mousePresence > 0.01 ? Math.max(0, 1 - dMouse / 220) : 0;

          // Proximity to active CTA
          const dCta = Math.hypot(cellX - localCtaX, cellY - localCtaY);
          const ctaGlow =
            ctaInfluence > 0.01 ? Math.max(0, 1 - dCta / 240) : 0;

          // Compute stroke style for this hex cell
          let hexAlpha = 0;
          if (theme === 'dark') {
            hexAlpha =
              0.035 +
              mouseGlow * 0.18 * mousePresence +
              ctaGlow * 0.28 * ctaInfluence;
            ctx.strokeStyle = `rgba(245, 166, 35, ${hexAlpha.toFixed(3)})`;
          } else {
            hexAlpha =
              0.028 +
              mouseGlow * 0.12 * mousePresence +
              ctaGlow * 0.22 * ctaInfluence;
            ctx.strokeStyle = `rgba(201, 125, 14, ${hexAlpha.toFixed(3)})`;
          }

          ctx.lineWidth = 0.8 + (mouseGlow + ctaGlow) * 0.8;

          // Draw regular hexagon whose size breathes with the fabric height
          const dynamicR = hexR + h * 0.12;

          ctx.beginPath();
          for (let a = 0; a < 6; a++) {
            const angle = (Math.PI / 3) * a + Math.PI / 6;
            const px = displacedX + dynamicR * Math.cos(angle);
            const py = displacedY + dynamicR * Math.sin(angle);
            if (a === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();
          ctx.stroke();

          // If close to active CTA, draw small amber honey nodes at cell center/vertices
          if (ctaGlow > 0.35 && ctaInfluence > 0.1) {
            ctx.beginPath();
            ctx.arc(displacedX, displacedY, 1.8, 0, Math.PI * 2);
            ctx.fillStyle =
              theme === 'dark'
                ? `rgba(253, 216, 120, ${(ctaGlow * 0.6 * ctaInfluence).toFixed(2)})`
                : `rgba(245, 166, 35, ${(ctaGlow * 0.5 * ctaInfluence).toFixed(2)})`;
            ctx.fill();
          }
        }
      }

      // -------------------------------------------------------------
      // 3. CTA INTERACTION EFFECT (Radial Honey Aura & Resonance)
      // -------------------------------------------------------------
      if (ctaInfluence > 0.02 && localCtaX > -500 && localCtaY > -500) {
        // A. Soft radial honey bloom beneath CTA
        const glowRadius = Math.max(120, ctaRadius * 2.6);
        const grad = ctx.createRadialGradient(
          localCtaX,
          localCtaY,
          10,
          localCtaX,
          localCtaY,
          glowRadius
        );

        if (theme === 'dark') {
          grad.addColorStop(0, `rgba(245, 166, 35, ${(0.24 * ctaInfluence).toFixed(3)})`);
          grad.addColorStop(0.35, `rgba(253, 216, 120, ${(0.11 * ctaInfluence).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(245, 166, 35, 0)');
        } else {
          grad.addColorStop(0, `rgba(245, 166, 35, ${(0.19 * ctaInfluence).toFixed(3)})`);
          grad.addColorStop(0.35, `rgba(201, 125, 14, ${(0.08 * ctaInfluence).toFixed(3)})`);
          grad.addColorStop(1, 'rgba(201, 125, 14, 0)');
        }

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(localCtaX, localCtaY, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // B. Concentric honeycomb resonance wave rings radiating outward
        const pulseSpeed = timeSec * 1.4;
        for (let ring = 0; ring < 3; ring++) {
          const ringProgress = ((pulseSpeed + ring * 0.33) % 1);
          const currentR = ctaRadius * 0.8 + ringProgress * 150;
          const ringAlpha = (1 - ringProgress) * 0.32 * ctaInfluence;

          ctx.beginPath();
          // 6-sided hexagonal resonance wave
          for (let s = 0; s < 6; s++) {
            const angle = (Math.PI / 3) * s + Math.PI / 6;
            const px = localCtaX + currentR * Math.cos(angle);
            const py = localCtaY + currentR * Math.sin(angle);
            if (s === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
          }
          ctx.closePath();

          ctx.strokeStyle =
            theme === 'dark'
              ? `rgba(253, 216, 120, ${ringAlpha.toFixed(3)})`
              : `rgba(201, 125, 14, ${ringAlpha.toFixed(3)})`;
          ctx.lineWidth = 1.5;
          ctx.setLineDash([5, 5]);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      }

      // -------------------------------------------------------------
      // 4. FLOATING HONEY POLLEN DUST (Drifting on the fabric)
      // -------------------------------------------------------------
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wave vector advection
        const waveX = (getFabricWave(p.x + 10, p.y, timeSec) - getFabricWave(p.x - 10, p.y, timeSec)) * 0.05;
        const waveY = (getFabricWave(p.x, p.y + 10, timeSec) - getFabricWave(p.x, p.y - 10, timeSec)) * 0.05;

        p.x += p.vx + waveX;
        p.y += p.vy + waveY;

        // Wrap around boundaries
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Interaction with mouse: gently stirred when mouse passes by
        const dPToMouse = Math.hypot(p.x - smoothedMouseX, p.y - smoothedMouseY);
        let extraAlpha = 0;
        if (dPToMouse < 180 && mousePresence > 0.01) {
          const push = (1 - dPToMouse / 180) * 0.8 * mousePresence;
          p.x += (p.x - smoothedMouseX) * 0.02 * push;
          p.y += (p.y - smoothedMouseY) * 0.02 * push;
          extraAlpha = push * 0.35;
        }

        // Draw soft pollen glow
        const currentAlpha = Math.min(0.8, p.baseAlpha + extraAlpha);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (theme === 'dark') {
          ctx.fillStyle = `rgba(253, 216, 120, ${currentAlpha.toFixed(3)})`;
        } else {
          ctx.fillStyle = `rgba(201, 125, 14, ${currentAlpha.toFixed(3)})`;
        }
        ctx.fill();
      }

      if (!prefersReducedMotion) {
        animFrameId = requestAnimationFrame(render);
      }
    };

    // Initial render
    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      unsubscribe();
    };
  }, [theme, intensity]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
