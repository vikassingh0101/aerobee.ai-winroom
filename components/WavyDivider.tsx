import React from 'react';

interface WavyDividerProps {
  fillColor?: string; // Color filling the wave (e.g., #FAF7F0 for beeswax or #0F0D0A for warm-black)
  strokeColor?: string;
  className?: string;
  inverted?: boolean;
}

export const WavyDivider: React.FC<WavyDividerProps> = ({
  fillColor = '#FAF7F0',
  strokeColor = '#F5A623',
  className = '',
  inverted = false,
}) => {
  return (
    <div className={`w-full overflow-hidden leading-none relative ${className}`}>
      <svg
        viewBox="0 0 1440 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-10 md:h-16 block ${inverted ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        {/* Hand-drawn organic wave path with slightly uneven stroke */}
        <path
          d="M0 45 C 180 65, 360 20, 540 40 C 720 60, 900 25, 1080 48 C 1260 68, 1380 32, 1440 45 L 1440 70 L 0 70 Z"
          fill={fillColor}
        />
        {/* Primary hand-drawn honey line */}
        <path
          d="M0 45 C 180 65, 360 20, 540 40 C 720 60, 900 25, 1080 48 C 1260 68, 1380 32, 1440 45"
          stroke={strokeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Secondary sketch accent line for ink texture */}
        <path
          d="M10 47 C 190 67, 370 23, 550 42 C 730 62, 910 27, 1090 50 C 1270 70, 1390 35, 1435 47"
          stroke={strokeColor}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="12 8"
          opacity="0.6"
        />
      </svg>
    </div>
  );
};
