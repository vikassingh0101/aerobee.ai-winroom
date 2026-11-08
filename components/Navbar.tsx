import React from 'react';
import { HandDrawnBee } from './HandDrawnBee';

interface NavbarProps {
  onOpenWaitlist: () => void;
  onOpenDiscovery?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenWaitlist }) => {
  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#0F0D0A]/90 border-b border-[#2E271F] transition-all">
      {/* Hand-drawn bottom accent border line */}
      <div className="absolute bottom-0 left-0 w-full h-[2px] overflow-hidden pointer-events-none">
        <svg viewBox="0 0 1200 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 3 Q 300 1, 600 4 T 1200 2" stroke="#F5A623" strokeWidth="1.8" strokeOpacity="0.45" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: aerobee wordmark with tiny hand-drawn bee icon */}
        <a href="#" className="flex items-center gap-3 group" id="aerobee-brand-logo">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-[#1A1612] border border-[#3E3427] group-hover:border-[#F5A623] transition-colors">
            <HandDrawnBee size={32} forwardLean={true} className="transition-transform group-hover:scale-110" />
          </div>
          <span className="font-fraunces font-bold text-2xl tracking-tight text-[#FAF7F0] group-hover:text-[#F5A623] transition-colors">
            aerobee
          </span>
        </a>

        {/* Right Navigation */}
        <nav className="flex items-center gap-6 sm:gap-8">
          <a
            href="#how-it-works"
            className="text-sm font-medium text-[#A89F8C] hover:text-[#FAF7F0] transition-colors hidden sm:inline-block"
            id="nav-link-how-it-works"
          >
            How it works
          </a>
          <a
            href="#integrations"
            className="text-sm font-medium text-[#A89F8C] hover:text-[#FAF7F0] transition-colors hidden sm:inline-block"
            id="nav-link-integrations"
          >
            Integrations
          </a>
          <a
            href="#faq"
            className="text-sm font-medium text-[#A89F8C] hover:text-[#FAF7F0] transition-colors hidden md:inline-block"
            id="nav-link-faq"
          >
            FAQ
          </a>

          {/* Join Waitlist — honey button with hand-drawn wobbly outline */}
          <button
            onClick={onOpenWaitlist}
            className="wobbly-btn px-5 py-2.5 bg-[#F5A623] text-[#0F0D0A] font-medium text-sm border-2 border-[#0F0D0A] flex items-center gap-2 hover:bg-[#ffb53f] transition-all cursor-pointer"
            id="nav-cta-waitlist"
          >
            <span>Join Waitlist</span>
            <span className="font-mono text-xs opacity-75">→</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
