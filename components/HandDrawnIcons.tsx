import React from 'react';

// Hand-drawn pen drawing icon
export const HandDrawnPen: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8 32 L15 30 L31 14 C 33 12, 33 9, 30 7 C 28 5, 25 5, 23 8 L8 23 L7 32 L12 32"
      stroke="#0F0D0A"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M22 9 L28 15" stroke="#0F0D0A" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 26 L17 28" stroke="#0F0D0A" strokeWidth="1.6" strokeLinecap="round" />
    <path d="M6 34 C 10 33, 14 35, 18 34" stroke="#F5A623" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

// Hand-drawn magnifier icon
export const HandDrawnMagnifier: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M17 29 C 23.6 29, 29 23.6, 29 17 C 29 10.4, 23.6 5, 17 5 C 10.4 5, 5 10.4, 5 17 C 5 23.6, 10.4 29, 17 29 Z"
      stroke="#0F0D0A"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 26 L34 34 M31 31 L35 35"
      stroke="#0F0D0A"
      strokeWidth="3.2"
      strokeLinecap="round"
    />
    <path
      d="M12 13 C 14 10, 18 9, 21 11"
      stroke="#F5A623"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

// Hand-drawn envelope icon
export const HandDrawnEnvelope: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 32 }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M5 10 C 5 8.5, 6.5 7.5, 8.5 7.5 L31.5 7.5 C 33.5 7.5, 35 8.5, 35 10 L35 29 C 35 30.5, 33.5 32, 31.5 32 L8.5 32 C 6.5 32, 5 30.5, 5 29 Z"
      stroke="#0F0D0A"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 9 L19.2 20.8 C 19.8 21.3, 20.6 21.3, 21.2 20.8 L34 9"
      stroke="#0F0D0A"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 31 L15 20 M34 31 L25 20"
      stroke="#0F0D0A"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <circle cx="20" cy="19" r="2" fill="#F5A623" />
  </svg>
);

// Hand-drawn channel icons for Hero section (Phone, Email, SMS, Zoom)
export const HandDrawnPhone: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M8 5 C 7 6, 6 8, 7 11 C 9 17, 15 23, 21 25 C 24 26, 26 25, 27 24 L24 19 L20 20 C 17 18, 14 15, 12 12 L13 8 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    <path d="M22 6 C 25 7, 27 9, 28 12" stroke="#F5A623" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const HandDrawnEmail: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="4" y="7" width="24" height="18" rx="2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M4 8 L16 18 L28 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HandDrawnSMS: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path
      d="M5 7 C 5 5.5, 6.5 4.5, 8.5 4.5 L23.5 4.5 C 25.5 4.5, 27 5.5, 27 7 L27 21 C 27 22.5, 25.5 24, 23.5 24 L12 24 L6 28 L7 23 L6 23 C 5 22, 5 21, 5 20 Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle cx="11" cy="14" r="1.5" fill="#F5A623" />
    <circle cx="16" cy="14" r="1.5" fill="#F5A623" />
    <circle cx="21" cy="14" r="1.5" fill="#F5A623" />
  </svg>
);

export const HandDrawnVideo: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="4" y="7" width="16" height="18" rx="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 12 L28 7 L28 25 L20 20 Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="16" r="3" stroke="#F5A623" strokeWidth="1.5" />
  </svg>
);

// Hand-drawn custom integration icons for Section 5 (custom hand-drawn style, not corporate logos)
export const HandDrawnZoom: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="10" width="22" height="24" rx="4" stroke="#0F0D0A" strokeWidth="2.2" fill="#FAF7F0" />
    <path d="M28 17 L38 10 L38 34 L28 27 Z" stroke="#0F0D0A" strokeWidth="2.2" strokeLinejoin="round" fill="#FAF7F0" />
    <path d="M11 20 C 13 17, 16 17, 18 19 L21 22" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HandDrawnMeet: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="6" y="11" width="20" height="22" rx="3" stroke="#0F0D0A" strokeWidth="2.2" fill="#FAF7F0" />
    <path d="M26 18 L37 11 L37 33 L26 26 Z" stroke="#0F0D0A" strokeWidth="2.2" strokeLinejoin="round" fill="#FAF7F0" />
    <circle cx="16" cy="22" r="4" stroke="#F5A623" strokeWidth="2" fill="none" />
  </svg>
);

export const HandDrawnCalendly: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="10" width="30" height="26" rx="3" stroke="#0F0D0A" strokeWidth="2.2" fill="#FAF7F0" />
    <path d="M14 6 L14 12 M30 6 L30 12" stroke="#0F0D0A" strokeWidth="2.4" strokeLinecap="round" />
    <path d="M7 17 L37 17" stroke="#0F0D0A" strokeWidth="2" strokeLinecap="round" />
    <circle cx="15" cy="24" r="2" fill="#F5A623" />
    <circle cx="22" cy="24" r="2" fill="#0F0D0A" />
    <circle cx="29" cy="24" r="2" fill="#0F0D0A" />
    <circle cx="15" cy="30" r="2" fill="#0F0D0A" />
    <circle cx="22" cy="30" r="2" fill="#F5A623" />
  </svg>
);

export const HandDrawnTwilio: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="22" cy="22" r="16" stroke="#0F0D0A" strokeWidth="2.2" fill="#FAF7F0" />
    <circle cx="17" cy="18" r="3" fill="#F5A623" />
    <circle cx="27" cy="18" r="3" fill="#0F0D0A" />
    <circle cx="17" cy="26" r="3" fill="#0F0D0A" />
    <circle cx="27" cy="26" r="3" fill="#F5A623" />
  </svg>
);

export const HandDrawnGmail: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="11" width="30" height="22" rx="3" stroke="#0F0D0A" strokeWidth="2.2" fill="#FAF7F0" />
    <path d="M8 12 L22 24 L36 12" stroke="#0F0D0A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M8 20 L8 32 M36 20 L36 32" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const HandDrawnOutlook: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="7" y="11" width="30" height="22" rx="3" stroke="#0F0D0A" strokeWidth="2.2" fill="#FAF7F0" />
    <circle cx="19" cy="22" r="7" stroke="#0F0D0A" strokeWidth="2" fill="#FAF7F0" />
    <ellipse cx="19" cy="22" rx="3.5" ry="5.5" stroke="#F5A623" strokeWidth="1.8" />
    <path d="M26 16 L35 16 M26 22 L35 22 M26 28 L32 28" stroke="#0F0D0A" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export const HandDrawnChatSMS: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8 10 C 8 7.5, 10 6, 13 6 L31 6 C 34 6, 36 7.5, 36 10 L36 25 C 36 27.5, 34 29, 31 29 L16 29 L8 36 L9 29 C 8 28, 8 26.5, 8 25 Z"
      stroke="#0F0D0A"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="#FAF7F0"
    />
    <path d="M14 17 L19 17 M23 17 L30 17 M14 22 L25 22" stroke="#F5A623" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// Hand-drawn honey wavy underline component
export const HandDrawnUnderline: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg
    viewBox="0 0 200 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full overflow-visible ${className}`}
    preserveAspectRatio="none"
  >
    <path
      d="M3 11 C 45 4, 85 14, 135 6 C 160 3, 185 10, 197 7"
      stroke="#F5A623"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 13 C 55 8, 105 13, 160 8 C 175 6, 188 9, 194 8"
      stroke="#F5A623"
      strokeWidth="2"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);
