import React, { useState } from 'react';
import { HandDrawnBee } from './HandDrawnBee';
import { HandDrawnUnderline } from './HandDrawnIcons';
import { FabricBackground } from './FabricBackground';
import confetti from 'canvas-confetti';

interface FooterSectionProps {
  onOpenDiscovery: () => void;
  onOpenWaitlist: (email?: string) => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({ onOpenDiscovery, onOpenWaitlist }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubmitted(true);
      try {
        confetti({
          particleCount: 55,
          spread: 60,
          origin: { y: 0.85 },
          colors: ['#F5A623', '#FDD878', '#FAF7F0', '#C97D0E'],
        });
      } catch {}
      onOpenWaitlist(email);
    }
  };

  return (
    <footer className="relative bg-[#0F0D0A] text-[#FAF7F0] pt-24 pb-16 honeycomb-bg overflow-hidden border-t-2 border-[#2E271F]" id="footer-section">
      {/* Dynamic Honey-Silk Fabric Background */}
      <FabricBackground theme="dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer CTA Block */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F5A623] bg-[#171410] px-3.5 py-1 rounded-full border border-[#3E3427] inline-block mb-6">
            Early Access Cohort 01
          </span>

          <h2 className="font-fraunces font-black text-3xl sm:text-5xl lg:text-6xl text-[#FAF7F0] tracking-tight leading-tight mb-6">
            Be the first team to{' '}
            <span className="relative inline-block text-[#FAF7F0]">
              stop taking notes.
              <span className="absolute left-0 right-0 -bottom-2 w-full block pointer-events-none">
                <HandDrawnUnderline className="h-3 text-[#F5A623]" />
              </span>
            </span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-[#A89F8C] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
            Give your sales reps back 10+ hours a week and get pristine, reliable CRM pipeline visibility automatically.
          </p>

          {/* Email input field with hand-drawn border + [Join the Waitlist] honey button */}
          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-lg mx-auto mb-6">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your work email..."
                className="w-full sm:w-80 px-5 py-3.5 bg-[#171410] text-[#FAF7F0] placeholder-[#A89F8C] border-2 border-[#3E3427] focus:border-[#F5A623] sketch-input font-sans text-sm outline-none transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto wobbly-btn px-6 py-3.5 bg-[#F5A623] text-[#0F0D0A] font-semibold text-sm border-2 border-[#0F0D0A] hover:bg-[#ffb53f] transition-all cursor-pointer whitespace-nowrap"
              >
                Join the Waitlist
              </button>
            </form>
          ) : (
            <div className="p-4 bg-[#1F1B16] border-2 border-[#F5A623] wobbly-box text-center max-w-md mx-auto mb-6">
              <div className="font-mono text-sm text-[#81c995] font-bold mb-1">✓ YOU'RE ON THE LIST!</div>
              <p className="text-xs text-[#A89F8C]">We've reserved your early access spot. Check your inbox shortly.</p>
            </div>
          )}

          {/* Secondary link: [Book a Discovery Call →] */}
          <div className="flex justify-center">
            <button
              onClick={onOpenDiscovery}
              className="hand-drawn-link text-[#FAF7F0] hover:text-[#F5A623] font-medium text-sm sm:text-base cursor-pointer py-1 group flex items-center gap-1.5"
            >
              <span>Book a Discovery Call</span>
              <span className="font-mono transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* Footer Sub-Bar with aerobee brand and copyright */}
        <div className="pt-12 mt-12 border-t border-[#2E271F] flex flex-col sm:flex-row items-center justify-between gap-6 relative">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#1A1612] border border-[#3E3427]">
              <HandDrawnBee size={24} forwardLean={true} />
            </div>
            <div className="font-fraunces font-bold text-lg text-[#FAF7F0]">
              aerobee <span className="font-mono font-normal text-xs text-[#A89F8C]">/ Winroom</span>
            </div>
          </div>

          <div className="font-mono text-xs text-[#A89F8C] flex flex-wrap items-center justify-center gap-6">
            <span>© {new Date().getFullYear()} Aerobee, Inc.</span>
            <a href="#how-it-works" className="hover:text-[#F5A623] transition-colors">How it works</a>
            <a href="#integrations" className="hover:text-[#F5A623] transition-colors">Integrations</a>
            <a href="#faq" className="hover:text-[#F5A623] transition-colors">FAQ</a>
            <span className="text-[#3E3427]">•</span>
            <span>Made with warm ink & honey</span>
          </div>

          {/* Small bee illustration in bottom right corner (per design rules) */}
          <div className="hidden sm:block absolute right-0 -bottom-8 pointer-events-none opacity-80 hover:opacity-100 transition-opacity">
            <div className="relative">
              <HandDrawnBee size={44} forwardLean={true} />
              {/* Little flight loop SVG doodle */}
              <svg width="40" height="20" viewBox="0 0 40 20" fill="none" className="absolute -left-8 top-3">
                <path d="M 0 10 Q 15 0, 25 10 T 40 10" stroke="#F5A623" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
