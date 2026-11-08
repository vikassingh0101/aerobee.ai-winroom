import React, { useEffect, useRef, useState } from 'react';
import { HandDrawnBee } from './HandDrawnBee';

interface Point {
  x: number;
  y: number;
}

interface IntegrationsConnectedCanvasProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
  winroomRef: React.RefObject<HTMLSpanElement | null>;
  cardRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  cardsCount: number;
  onUnderlineOpacityChange: (opacity: number) => void;
}

export const IntegrationsConnectedCanvas: React.FC<IntegrationsConnectedCanvasProps> = ({
  containerRef,
  winroomRef,
  cardRefs,
  cardsCount,
  onUnderlineOpacityChange,
}) => {
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [cardPoints, setCardPoints] = useState<Point[]>([]);
  const [googleMeetPoint, setGoogleMeetPoint] = useState<Point | null>(null);
  const [winroomTarget, setWinroomTarget] = useState<Point | null>(null);

  // Animation states for the bee and flight trail
  const [beePos, setBeePos] = useState<{ x: number; y: number; angle: number }>({ x: 0, y: 0, angle: 0 });
  const [beeOpacity, setBeeOpacity] = useState<number>(0);
  const [trailPath, setTrailPath] = useState<string>('');
  const [isFlapping, setIsFlapping] = useState<boolean>(false);

  // DOM ref to the hidden path for measuring points along the curved trajectory
  const flightPathRef = useRef<SVGPathElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  // Measure relative positions inside container
  const measureCoordinates = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const cWidth = containerRect.width;
    const cHeight = containerRect.height;
    setDimensions({ width: cWidth, height: cHeight });

    // Target Winroom right edge / underline area
    if (winroomRef.current) {
      const wRect = winroomRef.current.getBoundingClientRect();
      setWinroomTarget({
        x: wRect.right - containerRect.left + 4,
        y: wRect.bottom - containerRect.top - 2,
      });
    }

    // Measure cards for the horizontal connector line
    const points: Point[] = [];
    for (let i = 0; i < cardsCount; i++) {
      const el = cardRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        points.push({
          x: rect.left - containerRect.left + rect.width / 2,
          y: rect.top - containerRect.top + rect.height / 2,
        });
      }
    }
    setCardPoints(points);

    // Google Meet is index 1 — start precisely at the top center border of the card
    const meetEl = cardRefs.current[1];
    if (meetEl) {
      const mRect = meetEl.getBoundingClientRect();
      setGoogleMeetPoint({
        x: mRect.left - containerRect.left + mRect.width / 2,
        y: mRect.top - containerRect.top,
      });
    }
  };

  useEffect(() => {
    measureCoordinates();

    const handleResize = () => {
      measureCoordinates();
    };

    window.addEventListener('resize', handleResize);
    const observer = new ResizeObserver(() => {
      measureCoordinates();
    });

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const timer = setTimeout(measureCoordinates, 250);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [containerRef, winroomRef, cardRefs, cardsCount]);

  // Horizontal dotted connector across cards (grouped by row to avoid diagonal crosses through card text on mobile)
  const buildConnectorPath = (): string => {
    if (cardPoints.length < 2) return '';
    // Group points by rows (cards with similar Y within 35px)
    const rows: Point[][] = [];
    const sorted = [...cardPoints].sort((a, b) => a.y - b.y || a.x - b.x);

    sorted.forEach((pt) => {
      const existingRow = rows.find((r) => Math.abs(r[0].y - pt.y) < 35);
      if (existingRow) {
        existingRow.push(pt);
      } else {
        rows.push([pt]);
      }
    });

    let fullD = '';
    rows.forEach((row) => {
      row.sort((a, b) => a.x - b.x);
      if (row.length >= 2) {
        let d = `M ${row[0].x} ${row[0].y}`;
        for (let i = 1; i < row.length; i++) {
          const prev = row[i - 1];
          const curr = row[i];
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2 - 10;
          d += ` Q ${midX} ${midY}, ${curr.x} ${curr.y}`;
        }
        fullD += (fullD ? ' ' : '') + d;
      }
    });
    return fullD;
  };

  // Graceful, smooth curved trajectory from Google Meet card top outline directly to Winroom
  const buildFlightPathD = (): string => {
    if (!googleMeetPoint || !winroomTarget) return '';
    const sx = googleMeetPoint.x;
    const sy = googleMeetPoint.y;
    const ex = winroomTarget.x;
    const ey = winroomTarget.y;

    const dx = ex - sx;
    const dy = ey - sy;

    const isMobile = window.innerWidth < 768;
    // On mobile screens, give curve adequate curvature to bypass center text
    const cp1x = isMobile ? sx + 15 : sx - Math.min(60, Math.abs(dx) * 0.35);
    const cp1y = sy + dy * 0.52;
    const cp2x = isMobile ? ex + 20 : ex - dx * 0.2;
    const cp2y = ey - dy * 0.15;

    return `M ${sx.toFixed(1)} ${sy.toFixed(1)} C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${ex.toFixed(1)} ${ey.toFixed(1)}`;
  };

  const flightPathD = buildFlightPathD();

  // Animation loop: Google Meet -> fly along curved trajectory -> reach Winroom -> underline appears -> fade out in sync -> repeat
  useEffect(() => {
    if (!flightPathRef.current || !flightPathD || !googleMeetPoint || !winroomTarget) return;

    const totalDuration = 6200;  // 6.2s total cycle
    const appearDuration = 600;  // 0.6s bee fades in at Google Meet card top
    const flightDuration = 3200; // 3.2s smooth curved flight
    const holdAtWinroom = 1200;  // 1.2s hover with underline illuminated
    const fadeOutDuration = 800; // 0.8s simultaneous fade out of bee, path, and underline
    const resetGap = 400;        // 0.4s reset pause

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = (timestamp - startTimeRef.current) % totalDuration;
      const pathEl = flightPathRef.current;

      if (!pathEl) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }

      const pathLength = pathEl.getTotalLength();

      if (elapsed < appearDuration) {
        // Phase 1: Fade in at Google Meet outline
        const pt = pathEl.getPointAtLength(0);
        const nextPt = pathEl.getPointAtLength(Math.min(pathLength, 5));
        const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);

        setBeePos({ x: pt.x, y: pt.y, angle });
        const curBeeOp = Math.min(1, elapsed / (appearDuration * 0.8));
        setBeeOpacity(curBeeOp);
        setIsFlapping(false);
        setTrailPath('');
        onUnderlineOpacityChange(0);
      } else if (elapsed < appearDuration + flightDuration) {
        // Phase 2: Curved flight, wings flapping, drawing dotted path
        const flightTime = elapsed - appearDuration;
        const progress = Math.min(1, flightTime / flightDuration);

        // Smooth easeInOut sine easing for natural flight speed
        const eased = (1 - Math.cos(progress * Math.PI)) / 2;
        const currentDist = Math.max(0.1, eased * pathLength);
        const pt = pathEl.getPointAtLength(currentDist);

        // Direction tangent
        const lookAhead = Math.min(pathLength, currentDist + 3);
        const nextPt = pathEl.getPointAtLength(lookAhead);
        const angle = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);

        setBeePos({ x: pt.x, y: pt.y, angle });
        setBeeOpacity(1);
        setIsFlapping(true);

        // Underline remains strictly hidden until the bee arrives (progress >= 0.98)
        if (progress >= 0.98) {
          const underProgress = (progress - 0.98) / 0.02;
          onUnderlineOpacityChange(underProgress);
        } else {
          onUnderlineOpacityChange(0);
        }

        // Draw the curved dotted trail up to current bee position
        const samples = Math.max(2, Math.floor(progress * 40));
        let partialD = `M ${pathEl.getPointAtLength(0).x.toFixed(1)} ${pathEl.getPointAtLength(0).y.toFixed(1)}`;
        for (let i = 1; i <= samples; i++) {
          const sDist = (i / samples) * currentDist;
          const sPt = pathEl.getPointAtLength(sDist);
          partialD += ` L ${sPt.x.toFixed(1)} ${sPt.y.toFixed(1)}`;
        }
        setTrailPath(partialD);
      } else if (elapsed < appearDuration + flightDuration + holdAtWinroom) {
        // Phase 3: Reached Winroom! Bee rests at underline, underline fully illuminated
        const endPt = pathEl.getPointAtLength(pathLength);
        setBeePos({ x: endPt.x, y: endPt.y, angle: -5 });
        setBeeOpacity(1);
        setIsFlapping(false);
        onUnderlineOpacityChange(1);
      } else if (elapsed < appearDuration + flightDuration + holdAtWinroom + fadeOutDuration) {
        // Phase 4: Simultaneous fade out of bee, path, and underline in sync
        const fadeTime = elapsed - (appearDuration + flightDuration + holdAtWinroom);
        const fadeFraction = Math.min(1, fadeTime / fadeOutDuration);
        const synchedOpacity = 1 - fadeFraction;

        setBeeOpacity(synchedOpacity);
        setIsFlapping(false);
        onUnderlineOpacityChange(synchedOpacity);
      } else {
        // Phase 5: Reset gap before next loop
        setBeeOpacity(0);
        setIsFlapping(false);
        setTrailPath('');
        onUnderlineOpacityChange(0);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [flightPathD, googleMeetPoint, winroomTarget, onUnderlineOpacityChange]);

  const connectorPathD = buildConnectorPath();

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-visible">
      {/* Hidden reference path for geometry measurement */}
      <svg className="absolute w-0 h-0 overflow-hidden" aria-hidden="true">
        <path ref={flightPathRef} d={flightPathD} fill="none" />
      </svg>

      {/* SVG canvas */}
      <svg
        width={dimensions.width || '100%'}
        height={dimensions.height || '100%'}
        viewBox={`0 0 ${dimensions.width || 1000} ${dimensions.height || 600}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full overflow-visible"
      >
        {/* 1. CONTINUOUS SLOW-PULSING CONNECTOR LINE ACROSS CARDS ONLY */}
        {connectorPathD && (
          <g className="slow-pulse-line">
            {/* Background soft honey halo */}
            <path
              d={connectorPathD}
              stroke="#F5A623"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.25"
            />
            {/* Pulsing dotted line connecting cards */}
            <path
              d={connectorPathD}
              stroke="#C97D0E"
              strokeWidth="2.4"
              strokeDasharray="6 8"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="slow-dash-move"
            />
          </g>
        )}

        {/* Card anchor points */}
        {cardPoints.map((pt, idx) => (
          <g key={idx}>
            <circle cx={pt.x} cy={pt.y} r="3" fill="#F5A623" opacity="0.8" />
            <circle cx={pt.x} cy={pt.y} r="1.2" fill="#0F0D0A" />
          </g>
        ))}

        {/* 2. DOTTED PATH DRAWN BY BEE ALONG CURVED TRAJECTORY (fades out in sync) */}
        {trailPath && (
          <g opacity={beeOpacity}>
            {/* Soft amber under-glow */}
            <path
              d={trailPath}
              stroke="#F5A623"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.35"
            />
            {/* Honey-yellow ink dotted trail */}
            <path
              d={trailPath}
              stroke="#F5A623"
              strokeWidth="2.2"
              strokeDasharray="4 6"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.95"
            />
          </g>
        )}
      </svg>

      {/* 3. ANIMATED FLYING BEE (fades out in sync) */}
      {beePos.x !== 0 && (
        <div
          className="absolute pointer-events-none transition-transform will-change-transform"
          style={{
            left: `${beePos.x}px`,
            top: `${beePos.y}px`,
            transform: `translate(-50%, -50%) rotate(${beePos.angle}deg)`,
            opacity: beeOpacity,
          }}
        >
          <HandDrawnBee
            size={34}
            isFlapping={isFlapping}
            forwardLean={true}
            className="drop-shadow-md"
          />
        </div>
      )}
    </div>
  );
};
