import React from 'react';

interface HandDrawnBeeProps {
  className?: string;
  size?: number;
  showFlightTrace?: boolean;
  forwardLean?: boolean;
  isFlapping?: boolean;
}

/**
 * Hand-drawn ink-style bee character adhering to Aerobee rules:
 * - Hand-drawn ink style, not clipart or cartoon
 * - Slight forward lean, wings mid-flight, curious antenna
 * - Pen-drawn hatching and delicate honey stripes
 * - Authentic artisanal pen strokes
 */
export const HandDrawnBee: React.FC<HandDrawnBeeProps> = ({
  className = '',
  size = 48,
  forwardLean = true,
  isFlapping = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${forwardLean ? 'rotate-[-8deg]' : ''} ${className}`}
      style={{ overflow: 'visible' }}
    >
      <defs>
        {/* Subtle ink filter for uneven line weight */}
        <filter id="inkRough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.2" />
        </filter>
      </defs>

      <g filter="url(#inkRough)">
        {/* WINGS - Mid-flight, translucent with delicate hand-drawn quill veins */}
        {/* Back wing */}
        <g className={isFlapping ? 'bee-wing-flap-back' : ''}>
          <path
            d="M 44 38 C 42 22, 54 8, 70 12 C 80 15, 78 30, 60 38 C 52 42, 46 41, 44 38 Z"
            fill="#FAF7F0"
            fillOpacity="0.45"
            stroke="#0F0D0A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M 52 32 C 60 22, 66 18, 72 16 M 58 35 C 66 30, 71 27, 74 24"
            stroke="#0F0D0A"
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.6"
          />
        </g>

        {/* Front wing - slightly larger, overlapping */}
        <g className={isFlapping ? 'bee-wing-flap-front' : ''}>
          <path
            d="M 48 42 C 48 20, 62 4, 82 8 C 94 11, 92 28, 72 38 C 62 43, 52 44, 48 42 Z"
            fill="#FAF7F0"
            fillOpacity="0.65"
            stroke="#0F0D0A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Wing internal venation lines */}
          <path
            d="M 58 35 C 66 22, 74 15, 82 13 M 62 38 C 72 30, 80 24, 85 20 M 68 39 C 78 35, 84 32, 88 28"
            stroke="#0F0D0A"
            strokeWidth="1.3"
            strokeLinecap="round"
            opacity="0.65"
          />
        </g>

        {/* BODY - Oval with organic pen contouring & warm honey stripes */}
        <g>
          {/* Base body outline */}
          <path
            d="M 22 55 C 20 44, 30 38, 48 40 C 66 42, 74 54, 70 65 C 66 76, 44 78, 28 72 C 22 68, 20 62, 22 55 Z"
            fill="#F5A623"
            stroke="#0F0D0A"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Hand-drawn ink stripes across thorax & abdomen */}
          {/* Stripe 1 (head collar) */}
          <path
            d="M 58 44 C 64 52, 63 60, 56 67"
            stroke="#0F0D0A"
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Stripe 2 (middle abdomen) */}
          <path
            d="M 45 40 C 51 51, 50 63, 42 72"
            stroke="#0F0D0A"
            strokeWidth="3.8"
            strokeLinecap="round"
          />
          {/* Stripe 3 (rear abdomen) */}
          <path
            d="M 33 45 C 38 54, 37 63, 31 71"
            stroke="#0F0D0A"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Stinger - sharp fine hand-drawn quill flick */}
          <path
            d="M 22 56 C 16 57, 13 58, 11 59 C 14 60, 18 61, 23 61"
            fill="#0F0D0A"
            stroke="#0F0D0A"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Head & Eye */}
          <ellipse
            cx="72"
            cy="55"
            rx="11"
            ry="10"
            fill="#0F0D0A"
            stroke="#0F0D0A"
            strokeWidth="2"
          />
          {/* Inquisitive little eye highlight */}
          <circle cx="75" cy="53" r="2.2" fill="#FAF7F0" />

          {/* Antennae - Curious, slender, curled tip */}
          <path
            d="M 76 48 C 81 40, 88 36, 93 39 C 94 40, 93 42, 91 42"
            fill="none"
            stroke="#0F0D0A"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M 78 51 C 85 46, 92 46, 95 49 C 96 50, 94 52, 92 51"
            fill="none"
            stroke="#0F0D0A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Fine legs (subtle ink stipples underneath) */}
          <path
            d="M 50 71 C 48 78, 44 82, 40 84"
            fill="none"
            stroke="#0F0D0A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M 60 67 C 62 75, 66 79, 70 82"
            fill="none"
            stroke="#0F0D0A"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </g>
      </g>
    </svg>
  );
};
