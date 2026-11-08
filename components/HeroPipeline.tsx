import React, { useState, useEffect, useRef } from 'react';
import { HandDrawnBee } from './HandDrawnBee';
import { HandDrawnPhone, HandDrawnEmail, HandDrawnSMS, HandDrawnVideo } from './HandDrawnIcons';

/**
 * HeroPipeline Component:
 * Synchronized animation cycle:
 * Phase 0 (0ms - 1000ms): Touchpoints light up in honey yellow all at once.
 * Phase 1 (1000ms - 3000ms): Honey dots move along the 4 dotted branches, all arriving at junction at the exact same moment.
 * Phase 2 (3000ms - 5000ms): Bee flies from the junction along the merged path to the end of the dotted line.
 * Phase 3 (5000ms - 7500ms): Winroom box lights up; green outcomes appear sequentially with time counts.
 * Phase 4 (7500ms - 8500ms): Brief pause before looping seamlessly.
 */

export const HeroPipeline: React.FC = () => {
  // Animation progress timer (0 to 8500 ms)
  const [animTime, setAnimTime] = useState<number>(0);

  // Path references to accurately sample coordinates
  const branch0Ref = useRef<SVGPathElement | null>(null);
  const branch1Ref = useRef<SVGPathElement | null>(null);
  const branch2Ref = useRef<SVGPathElement | null>(null);
  const branch3Ref = useRef<SVGPathElement | null>(null);
  const mainPathRef = useRef<SVGPathElement | null>(null);

  // Stored path lengths
  const [lengths, setLengths] = useState<{
    b0: number;
    b1: number;
    b2: number;
    b3: number;
    main: number;
  }>({ b0: 100, b1: 100, b2: 100, b3: 100, main: 100 });

  // Measure path lengths on mount
  useEffect(() => {
    const measure = () => {
      if (
        branch0Ref.current &&
        branch1Ref.current &&
        branch2Ref.current &&
        branch3Ref.current &&
        mainPathRef.current
      ) {
        setLengths({
          b0: branch0Ref.current.getTotalLength() || 100,
          b1: branch1Ref.current.getTotalLength() || 100,
          b2: branch2Ref.current.getTotalLength() || 100,
          b3: branch3Ref.current.getTotalLength() || 100,
          main: mainPathRef.current.getTotalLength() || 100,
        });
      }
    };
    measure();
    // Re-measure on next tick just in case
    const t = setTimeout(measure, 100);
    return () => clearTimeout(t);
  }, []);

  // Animation frame loop
  useEffect(() => {
    let animationFrameId: number;
    let lastStamp = performance.now();

    const loop = (now: number) => {
      const delta = now - lastStamp;
      lastStamp = now;
      setAnimTime((prev) => (prev + delta) % 8500);
      animationFrameId = requestAnimationFrame(loop);
    };

    animationFrameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  // Compute sub-phases from animTime:
  // 0 -> 1000: Touchpoints illuminated
  const touchpointsLit = animTime >= 200 && animTime < 7600;

  // 1000 -> 3000: Dots traveling (normalized 0 to 1)
  const isDotsPhase = animTime >= 1000 && animTime < 3000;
  const dotsProgress = isDotsPhase ? (animTime - 1000) / 2000 : animTime >= 3000 && animTime < 3300 ? 1 : 0;

  // 3000 -> 5000: Bee flying along main path (normalized 0 to 1)
  const isBeeFlightPhase = animTime >= 3000 && animTime < 5000;
  const beeProgress = isBeeFlightPhase
    ? (animTime - 3000) / 2000
    : animTime >= 5000
    ? 1
    : 0;

  // Has the bee reached the end?
  const beeAtEnd = animTime >= 5000 && animTime < 8200;

  // Winroom node lights up when bee arrives
  const winroomLit = beeAtEnd;

  // Sequential green items reveal
  const showGreen1 = animTime >= 5200 && animTime < 8300;
  const showGreen2 = animTime >= 5700 && animTime < 8300;
  const showGreen3 = animTime >= 6200 && animTime < 8300;

  // Calculate coordinates along SVG paths
  const getDotPos = (ref: React.RefObject<SVGPathElement | null>, len: number, p: number) => {
    if (!ref.current) return { x: 0, y: 0 };
    try {
      const pt = ref.current.getPointAtLength(p * len);
      return { x: pt.x, y: pt.y };
    } catch {
      return { x: 0, y: 0 };
    }
  };

  const dot0 = getDotPos(branch0Ref, lengths.b0, dotsProgress);
  const dot1 = getDotPos(branch1Ref, lengths.b1, dotsProgress);
  const dot2 = getDotPos(branch2Ref, lengths.b2, dotsProgress);
  const dot3 = getDotPos(branch3Ref, lengths.b3, dotsProgress);

  // Bee position & rotation
  const getBeePos = (p: number) => {
    if (!mainPathRef.current) return { x: 170, y: 148, angle: 0 };
    try {
      const len = lengths.main;
      const pt = mainPathRef.current.getPointAtLength(p * len);
      // Sample slightly ahead for tangent angle
      const ahead = Math.min(len, p * len + 3);
      const ptAhead = mainPathRef.current.getPointAtLength(ahead);
      const angle = (Math.atan2(ptAhead.y - pt.y, ptAhead.x - pt.x) * 180) / Math.PI;
      return { x: pt.x, y: pt.y, angle };
    } catch {
      return { x: 170, y: 148, angle: 0 };
    }
  };

  const beePos = getBeePos(beeProgress);

  // SVG branch definitions (viewBox="0 0 340 300"):
  // Branch 0 (Top / Phone): y starts at 38 -> curves to junction (170, 148)
  const d0 = "M 0 38 C 70 38, 110 144, 170 148";
  // Branch 1 (Video): y starts at 112 -> curves to junction (170, 148)
  const d1 = "M 0 112 C 60 112, 110 146, 170 148";
  // Branch 2 (Email): y starts at 186 -> curves to junction (170, 148)
  const d2 = "M 0 186 C 60 186, 110 150, 170 148";
  // Branch 3 (SMS): y starts at 260 -> curves to junction (170, 148)
  const d3 = "M 0 260 C 70 260, 110 152, 170 148";
  // Merged main path: from (170, 148) to Winroom entry point at (340, 148)
  const dMain = "M 170 148 C 220 148, 270 148, 340 148";

  // Helper for cubic bezier calculation on mobile extended branches
  const evalBezier = (p0: number, p1: number, p2: number, p3: number, t: number) => {
    const mt = 1 - t;
    return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
  };

  // Mobile connector branch points (viewBox="0 0 340 180")
  const mDot0 = {
    x: evalBezier(45, 45, 130, 170, dotsProgress),
    y: evalBezier(14, 62, 88, 104, dotsProgress),
  };
  const mDot1 = {
    x: evalBezier(120, 120, 150, 170, dotsProgress),
    y: evalBezier(14, 58, 86, 104, dotsProgress),
  };
  const mDot2 = {
    x: evalBezier(220, 220, 190, 170, dotsProgress),
    y: evalBezier(14, 58, 86, 104, dotsProgress),
  };
  const mDot3 = {
    x: evalBezier(295, 295, 210, 170, dotsProgress),
    y: evalBezier(14, 62, 88, 104, dotsProgress),
  };

  const mobileBeeY = isBeeFlightPhase ? 104 + beeProgress * 68 : beeAtEnd ? 172 : 104;
  const trailProgress = isBeeFlightPhase ? beeProgress : beeAtEnd ? 1 : 0;
  const trailEndX = Math.min(338, 170 + (338 - 170) * trailProgress);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center pt-2 sm:pt-4">
      
      {/* 1. FIRST DIV COMPONENT: Customer Touchpoints
          - All light up at once in yellow
          - Each box is connected to the corresponding branch in the SVG
      */}
      <div className="lg:col-span-4 flex flex-col gap-2.5 sm:gap-3 relative z-10">
        <div className="text-xs font-mono uppercase tracking-wider mb-1 flex items-center justify-between">
          <span className="text-[#A89F8C] flex items-center gap-1.5">
            <span>Customer Touchpoints</span>
            <span className="text-[#F5A623]">⇣</span>
          </span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded font-mono transition-all duration-300 ${
              touchpointsLit
                ? 'bg-[#F5A623] text-[#0F0D0A] font-bold shadow-[0_0_10px_rgba(245,166,35,0.5)]'
                : 'bg-[#231E18] text-[#A89F8C]'
            }`}
          >
            {touchpointsLit ? 'STREAMING ACTIVE' : 'STANDBY'}
          </span>
        </div>

        {/* Channel 1: Phone (Branch 0 connection point) */}
        <div
          className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-lg border transition-all duration-400 relative ${
            touchpointsLit
              ? 'bg-[#2A241C] border-[#F5A623] text-[#FAF7F0] shadow-[0_0_16px_rgba(245,166,35,0.25)] ring-1 ring-[#F5A623]/40'
              : 'bg-[#1F1B16] border-[#3E3427] text-[#FAF7F0]'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-md shrink-0 flex items-center justify-center transition-colors duration-400 ${
              touchpointsLit ? 'bg-[#F5A623] text-[#0F0D0A]' : 'bg-[#2A241C] text-[#F5A623]'
            }`}
          >
            <HandDrawnPhone size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Inbound & Outbound Calls</div>
            <div className="text-[11px] font-mono text-[#A89F8C] truncate">VoIP, Twilio, Native Dialers</div>
          </div>
          {/* Connector dot at right edge */}
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${
              touchpointsLit ? 'bg-[#F5A623] shadow-[0_0_8px_#F5A623] scale-125' : 'bg-[#524A3B]'
            }`}
          ></span>
        </div>

        {/* Channel 2: Video (Branch 1 connection point) */}
        <div
          className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-lg border transition-all duration-400 relative ${
            touchpointsLit
              ? 'bg-[#2A241C] border-[#F5A623] text-[#FAF7F0] shadow-[0_0_16px_rgba(245,166,35,0.25)] ring-1 ring-[#F5A623]/40'
              : 'bg-[#1F1B16] border-[#3E3427] text-[#FAF7F0]'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-md shrink-0 flex items-center justify-center transition-colors duration-400 ${
              touchpointsLit ? 'bg-[#F5A623] text-[#0F0D0A]' : 'bg-[#2A241C] text-[#F5A623]'
            }`}
          >
            <HandDrawnVideo size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Video Sales Demos</div>
            <div className="text-[11px] font-mono text-[#A89F8C] truncate">Zoom, Google Meet, Teams</div>
          </div>
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${
              touchpointsLit ? 'bg-[#F5A623] shadow-[0_0_8px_#F5A623] scale-125' : 'bg-[#524A3B]'
            }`}
          ></span>
        </div>

        {/* Channel 3: Email (Branch 2 connection point) */}
        <div
          className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-lg border transition-all duration-400 relative ${
            touchpointsLit
              ? 'bg-[#2A241C] border-[#F5A623] text-[#FAF7F0] shadow-[0_0_16px_rgba(245,166,35,0.25)] ring-1 ring-[#F5A623]/40'
              : 'bg-[#1F1B16] border-[#3E3427] text-[#FAF7F0]'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-md shrink-0 flex items-center justify-center transition-colors duration-400 ${
              touchpointsLit ? 'bg-[#F5A623] text-[#0F0D0A]' : 'bg-[#2A241C] text-[#F5A623]'
            }`}
          >
            <HandDrawnEmail size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">Email Threads & Proposals</div>
            <div className="text-[11px] font-mono text-[#A89F8C] truncate">Gmail, Outlook, Superhuman</div>
          </div>
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${
              touchpointsLit ? 'bg-[#F5A623] shadow-[0_0_8px_#F5A623] scale-125' : 'bg-[#524A3B]'
            }`}
          ></span>
        </div>

        {/* Channel 4: SMS (Branch 3 connection point) */}
        <div
          className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-lg border transition-all duration-400 relative ${
            touchpointsLit
              ? 'bg-[#2A241C] border-[#F5A623] text-[#FAF7F0] shadow-[0_0_16px_rgba(245,166,35,0.25)] ring-1 ring-[#F5A623]/40'
              : 'bg-[#1F1B16] border-[#3E3427] text-[#FAF7F0]'
          }`}
        >
          <div
            className={`w-9 h-9 rounded-md shrink-0 flex items-center justify-center transition-colors duration-400 ${
              touchpointsLit ? 'bg-[#F5A623] text-[#0F0D0A]' : 'bg-[#2A241C] text-[#F5A623]'
            }`}
          >
            <HandDrawnSMS size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">SMS & Fast Async Chat</div>
            <div className="text-[11px] font-mono text-[#A89F8C] truncate">WhatsApp, iMessage, Text</div>
          </div>
          <span
            className={`w-2.5 h-2.5 rounded-full shrink-0 transition-all duration-300 ${
              touchpointsLit ? 'bg-[#F5A623] shadow-[0_0_8px_#F5A623] scale-125' : 'bg-[#524A3B]'
            }`}
          ></span>
        </div>
      </div>

      {/* 2A. MOBILE VERTICAL CONNECTOR (< lg) - Extended branch lengths and UI-optimized spacing */}
      <div className="lg:hidden relative h-[180px] w-full flex items-center justify-center my-2 sm:my-3 max-w-sm mx-auto px-1">
        <svg
          viewBox="0 0 340 180"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            <filter id="mobileHoneyGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Extended Dotted Convergence Branches */}
          <path
            d="M 45 14 C 45 62, 130 88, 170 104"
            stroke="#F5A623"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            d="M 120 14 C 120 58, 150 86, 170 104"
            stroke="#F5A623"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            d="M 220 14 C 220 58, 190 86, 170 104"
            stroke="#F5A623"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            d="M 295 14 C 295 62, 210 88, 170 104"
            stroke="#F5A623"
            strokeWidth="2"
            strokeDasharray="4 5"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Top Branch Anchor Labels & Origin Nodes */}
          <g className="opacity-90">
            <circle cx="45" cy="14" r="3" fill="#F5A623" />
            <text x="45" y="7" textAnchor="middle" fill="#A89F8C" fontSize="8.5" fontFamily="monospace" letterSpacing="0.05em">
              CALLS
            </text>
          </g>
          <g className="opacity-90">
            <circle cx="120" cy="14" r="3" fill="#F5A623" />
            <text x="120" y="7" textAnchor="middle" fill="#A89F8C" fontSize="8.5" fontFamily="monospace" letterSpacing="0.05em">
              VIDEO
            </text>
          </g>
          <g className="opacity-90">
            <circle cx="220" cy="14" r="3" fill="#F5A623" />
            <text x="220" y="7" textAnchor="middle" fill="#A89F8C" fontSize="8.5" fontFamily="monospace" letterSpacing="0.05em">
              EMAIL
            </text>
          </g>
          <g className="opacity-90">
            <circle cx="295" cy="14" r="3" fill="#F5A623" />
            <text x="295" y="7" textAnchor="middle" fill="#A89F8C" fontSize="8.5" fontFamily="monospace" letterSpacing="0.05em">
              SMS
            </text>
          </g>

          {/* Dynamic Flight Trail: appears as trail for bee from the junction and continuously trails along with it */}
          {trailProgress > 0 && (
            <path
              d={`M 170 104 L 170 ${mobileBeeY}`}
              stroke="#F5A623"
              strokeWidth="2.5"
              strokeDasharray="5 5"
              strokeLinecap="round"
              className="opacity-95"
            />
          )}

          {/* Animated Honey Dots traveling down along the extended branches */}
          {(isDotsPhase || (animTime >= 800 && animTime < 1000)) && (
            <g filter="url(#mobileHoneyGlow)">
              {/* Honey Dot 0 (Calls) */}
              <circle cx={mDot0.x} cy={mDot0.y} r="4.5" fill="#FDD878" stroke="#F5A623" strokeWidth="1.2" />
              <circle cx={mDot0.x} cy={mDot0.y} r="1.8" fill="#FFFFFF" />

              {/* Honey Dot 1 (Video) */}
              <circle cx={mDot1.x} cy={mDot1.y} r="4.5" fill="#FDD878" stroke="#F5A623" strokeWidth="1.2" />
              <circle cx={mDot1.x} cy={mDot1.y} r="1.8" fill="#FFFFFF" />

              {/* Honey Dot 2 (Email) */}
              <circle cx={mDot2.x} cy={mDot2.y} r="4.5" fill="#FDD878" stroke="#F5A623" strokeWidth="1.2" />
              <circle cx={mDot2.x} cy={mDot2.y} r="1.8" fill="#FFFFFF" />

              {/* Honey Dot 3 (SMS) */}
              <circle cx={mDot3.x} cy={mDot3.y} r="4.5" fill="#FDD878" stroke="#F5A623" strokeWidth="1.2" />
              <circle cx={mDot3.x} cy={mDot3.y} r="1.8" fill="#FFFFFF" />
            </g>
          )}
        </svg>

        {/* Mobile Bee flying downwards toward Winroom */}
        <div
          className="absolute z-20 pointer-events-none transition-transform will-change-transform"
          style={{
            left: '50%',
            top: `${(mobileBeeY / 180) * 100}%`,
            transform: 'translate(-50%, -50%) rotate(90deg)',
          }}
        >
          <div className="relative">
            <HandDrawnBee
              size={36}
              forwardLean={true}
              isFlapping={isBeeFlightPhase}
              className={`drop-shadow-lg transition-transform ${
                isBeeFlightPhase ? 'scale-110' : beeAtEnd ? 'scale-100' : 'scale-95'
              }`}
            />
          </div>
        </div>
      </div>

      {/* 2B. DESKTOP SVG COMPONENT (lg:flex) */}
      <div className="hidden lg:flex lg:col-span-4 relative h-[290px] items-center justify-center">
        <svg
          viewBox="0 0 340 300"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full overflow-visible"
        >
          <defs>
            {/* Glow filters for honey dots */}
            <filter id="honeyGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* DOTTED BRANCHES (Connecting to the 4 touchpoints) */}
          <path
            ref={branch0Ref}
            d={d0}
            stroke="#F5A623"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            ref={branch1Ref}
            d={d1}
            stroke="#F5A623"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            ref={branch2Ref}
            d={d2}
            stroke="#F5A623"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
            className="opacity-80"
          />
          <path
            ref={branch3Ref}
            d={d3}
            stroke="#F5A623"
            strokeWidth="2.5"
            strokeDasharray="5 5"
            strokeLinecap="round"
            className="opacity-80"
          />

          {/* Reference path for length & tangent calculations */}
          <path
            ref={mainPathRef}
            d={dMain}
            stroke="none"
            fill="none"
          />

          {/* Dynamic Flight Trail: appears as trail for bee from the junction and continuously trails alongside the bee */}
          {trailProgress > 0 && (
            <path
              d={`M 170 148 L ${trailEndX} 148`}
              stroke="#F5A623"
              strokeWidth="3"
              strokeDasharray="6 6"
              strokeLinecap="round"
              className="opacity-95"
            />
          )}

          {/* HONEY DOTS MOVING ALONG THE 4 BRANCHES
              Where branches join, all 4 dots arrive at the exact same moment!
          */}
          {(isDotsPhase || (animTime >= 800 && animTime < 1000)) && (
            <g filter="url(#honeyGlow)">
              {/* Honey Dot 0 (Branch 0) */}
              <circle cx={dot0.x} cy={dot0.y} r="5" fill="#FDD878" stroke="#F5A623" strokeWidth="1.5" />
              <circle cx={dot0.x} cy={dot0.y} r="2" fill="#FFFFFF" />

              {/* Honey Dot 1 (Branch 1) */}
              <circle cx={dot1.x} cy={dot1.y} r="5" fill="#FDD878" stroke="#F5A623" strokeWidth="1.5" />
              <circle cx={dot1.x} cy={dot1.y} r="2" fill="#FFFFFF" />

              {/* Honey Dot 2 (Branch 2) */}
              <circle cx={dot2.x} cy={dot2.y} r="5" fill="#FDD878" stroke="#F5A623" strokeWidth="1.5" />
              <circle cx={dot2.x} cy={dot2.y} r="2" fill="#FFFFFF" />

              {/* Honey Dot 3 (Branch 3) */}
              <circle cx={dot3.x} cy={dot3.y} r="5" fill="#FDD878" stroke="#F5A623" strokeWidth="1.5" />
              <circle cx={dot3.x} cy={dot3.y} r="2" fill="#FFFFFF" />
            </g>
          )}
        </svg>

        {/* THE BEE (Desktop):
            - Waits or hovers near junction until dots arrive
            - Flies along the path to the end of the dotted line
        */}
        <div
          className="absolute z-20 pointer-events-none transition-transform"
          style={{
            left: `${(beePos.x / 340) * 100}%`,
            top: `${(beePos.y / 300) * 100}%`,
            transform: `translate(-50%, -50%) rotate(${beePos.angle * 0.4 - 5}deg)`,
          }}
        >
          <div className="relative">
            <HandDrawnBee
              size={54}
              forwardLean={true}
              isFlapping={isBeeFlightPhase}
              className={`drop-shadow-lg transition-transform ${
                isBeeFlightPhase ? 'scale-110' : beeAtEnd ? 'scale-100' : 'scale-95'
              }`}
            />
          </div>
        </div>
      </div>

      {/* 3. LAST DIV COMPONENT: Winroom Destination Node
          - Lights up a bit once the bee reaches at the end of the dotted line
          - Text in green appears one by one with the time count next to it
      */}
      <div className="lg:col-span-4 relative z-10">
        <div
          className={`p-6 rounded-xl border-2 transition-all duration-500 sketch-card-dark relative ${
            winroomLit
              ? 'bg-[#29221A] border-[#F5A623] shadow-[0_0_28px_rgba(245,166,35,0.35)] ring-2 ring-[#F5A623]/30'
              : 'bg-[#231E18] border-[#3E3427] shadow-md'
          }`}
        >
          {/* Badge */}
          <div className="flex items-center justify-between mb-3">
            <div
              className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono transition-colors duration-400 ${
                winroomLit
                  ? 'bg-[#F5A623] text-[#0F0D0A] font-bold shadow-[0_0_8px_rgba(245,166,35,0.4)]'
                  : 'bg-[#F5A623]/20 border border-[#F5A623]/50 text-[#F5A623]'
              }`}
            >
              <span>⚡ WINROOM CORE</span>
            </div>
            <span className="font-mono text-[10px] text-[#A89F8C]">
              {winroomLit ? '● PROCESSING COMPLETE' : '○ AWAITING SIGNAL'}
            </span>
          </div>

          {/* Winroom logo mark */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center font-fraunces font-bold text-2xl transition-all duration-400 ${
                winroomLit
                  ? 'bg-[#0F0D0A] border-[#F5A623] text-[#F5A623] shadow-[0_0_15px_rgba(245,166,35,0.4)] scale-105'
                  : 'bg-[#0F0D0A] border-[#3E3427] text-[#FAF7F0]'
              }`}
            >
              W
            </div>
            <div>
              <h3 className="font-fraunces font-bold text-xl text-[#FAF7F0]">Winroom Engine</h3>
              <p className="text-xs font-mono text-[#A89F8C]">Aerobee Autonomous Sales Sync</p>
            </div>
          </div>

          {/* Micro checklist of instantaneous actions
              Appears one by one with time count next to it once the bee reaches the end
          */}
          <div className="space-y-2.5 pt-3 border-t border-[#3E3427] font-mono text-xs">
            
            {/* Item 1: CRM auto-updated */}
            <div
              className={`flex items-center justify-between p-1.5 rounded transition-all duration-400 ${
                showGreen1
                  ? 'opacity-100 translate-y-0 text-[#81c995] bg-[#81c995]/10 border border-[#81c995]/30 shadow-sm'
                  : 'opacity-20 translate-y-1 text-[#524A3B] bg-transparent'
              }`}
            >
              <span className="font-semibold flex items-center gap-1.5">
                <span className={showGreen1 ? 'text-[#81c995]' : 'text-transparent'}>✓</span>
                <span>CRM auto-updated</span>
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  showGreen1 ? 'bg-[#81c995]/20 text-[#81c995]' : 'text-[#524A3B]'
                }`}
              >
                0.4s
              </span>
            </div>

            {/* Item 2: Next steps assigned */}
            <div
              className={`flex items-center justify-between p-1.5 rounded transition-all duration-400 ${
                showGreen2
                  ? 'opacity-100 translate-y-0 text-[#81c995] bg-[#81c995]/10 border border-[#81c995]/30 shadow-sm'
                  : 'opacity-20 translate-y-1 text-[#524A3B] bg-transparent'
              }`}
            >
              <span className="font-semibold flex items-center gap-1.5">
                <span className={showGreen2 ? 'text-[#81c995]' : 'text-transparent'}>✓</span>
                <span>Next steps assigned</span>
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  showGreen2 ? 'bg-[#81c995]/20 text-[#81c995]' : 'text-[#524A3B]'
                }`}
              >
                0.2s
              </span>
            </div>

            {/* Item 3: Rep whisper coached */}
            <div
              className={`flex items-center justify-between p-1.5 rounded transition-all duration-400 ${
                showGreen3
                  ? 'opacity-100 translate-y-0 text-[#81c995] bg-[#81c995]/10 border border-[#81c995]/30 shadow-sm'
                  : 'opacity-20 translate-y-1 text-[#524A3B] bg-transparent'
              }`}
            >
              <span className="font-semibold flex items-center gap-1.5">
                <span className={showGreen3 ? 'text-[#81c995]' : 'text-transparent'}>✓</span>
                <span>Rep whisper coached</span>
              </span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                  showGreen3 ? 'bg-[#81c995]/20 text-[#81c995]' : 'text-[#524A3B]'
                }`}
              >
                Live
              </span>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};
