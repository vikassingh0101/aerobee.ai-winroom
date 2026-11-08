import React from 'react';
import { HandDrawnPen, HandDrawnMagnifier, HandDrawnEnvelope } from './HandDrawnIcons';
import { FabricBackground } from './FabricBackground';

export const ProblemSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF7F0] text-[#0F0D0A] honeycomb-bg-light overflow-hidden" id="the-problem">
      {/* Dynamic Beeswax Linen-inspired Fabric Background */}
      <FabricBackground theme="light" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag */}
        <div className="flex justify-center mb-5">
          <span className="font-mono text-xs uppercase tracking-widest text-[#A89F8C] bg-[#FDD878]/30 px-3.5 py-1 rounded-full border border-[#C97D0E]/30">
            01 // The Friction
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-20">
          <h2 className="font-fraunces font-bold text-3xl sm:text-5xl text-[#0F0D0A] leading-snug sm:leading-tight tracking-tight">
            Your team spends{' '}
            <span className="bg-[#FDD878] px-2 py-0.5 rounded-md border border-[#0F0D0A]/10 font-black inline-block my-0.5 sm:my-0">
              30% of their day
            </span>{' '}
            on things Winroom does in seconds.
          </h2>
          <p className="mt-4 text-[#7A7160] text-base sm:text-lg max-w-xl mx-auto">
            Sales reps were hired to close deals, not copy-paste phone numbers and reconstruct call transcripts from scratch.
          </p>
        </div>

        {/* 3 Hand-drawn Cards (subtle tilt on tablet/desktop, clean aligned on mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-10 max-w-5xl mx-auto">
          
          {/* Card 1: Logging calls they just finished */}
          <div className="sketch-card bg-[#FDD878] border-2 border-[#0F0D0A] p-6 sm:p-8 flex flex-col justify-between transform sm:-rotate-1 sm:hover:rotate-0 transition-transform relative">
            {/* Ink pin doodle */}
            <div className="w-3 h-3 rounded-full bg-[#0F0D0A] absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-70"></div>
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F0] border-2 border-[#0F0D0A] flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                <HandDrawnPen size={28} className="sm:w-8 sm:h-8" />
              </div>
              <span className="font-mono text-xs text-[#524A3B] uppercase tracking-wider block mb-2">
                Problem 01 // Busywork
              </span>
              <h3 className="font-fraunces font-bold text-xl sm:text-2xl text-[#0F0D0A] leading-snug mb-2 sm:mb-3">
                Logging calls they just finished
              </h3>
              <p className="text-sm text-[#453E31] leading-relaxed">
                Staring at blank CRM fields trying to remember what customer objections were raised 45 minutes ago.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0F0D0A]/20 font-mono text-xs text-[#0F0D0A] flex items-center justify-between">
              <span>Average lost:</span>
              <span className="font-bold underline decoration-[#0F0D0A]">42 mins / day</span>
            </div>
          </div>

          {/* Card 2: Hunting for what was said last week */}
          <div className="sketch-card bg-[#FDD878] border-2 border-[#0F0D0A] p-6 sm:p-8 flex flex-col justify-between transform sm:rotate-1 sm:hover:rotate-0 transition-transform relative">
            <div className="w-3 h-3 rounded-full bg-[#0F0D0A] absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-70"></div>
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F0] border-2 border-[#0F0D0A] flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                <HandDrawnMagnifier size={28} className="sm:w-8 sm:h-8" />
              </div>
              <span className="font-mono text-xs text-[#524A3B] uppercase tracking-wider block mb-2">
                Problem 02 // Amnesia
              </span>
              <h3 className="font-fraunces font-bold text-xl sm:text-2xl text-[#0F0D0A] leading-snug mb-2 sm:mb-3">
                Hunting for what was said last week
              </h3>
              <p className="text-sm text-[#453E31] leading-relaxed">
                Scouring scratchpads, Slack DMs, and fragmented email chains right before the follow-up meeting starts.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0F0D0A]/20 font-mono text-xs text-[#0F0D0A] flex items-center justify-between">
              <span>Average lost:</span>
              <span className="font-bold underline decoration-[#0F0D0A]">35 mins / day</span>
            </div>
          </div>

          {/* Card 3: Writing follow-ups from memory */}
          <div className="sketch-card bg-[#FDD878] border-2 border-[#0F0D0A] p-6 sm:p-8 flex flex-col justify-between transform sm:-rotate-1 sm:hover:rotate-0 transition-transform relative">
            <div className="w-3 h-3 rounded-full bg-[#0F0D0A] absolute -top-1.5 left-1/2 -translate-x-1/2 opacity-70"></div>
            <div>
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FAF7F0] border-2 border-[#0F0D0A] flex items-center justify-center mb-5 sm:mb-6 shadow-sm">
                <HandDrawnEnvelope size={28} className="sm:w-8 sm:h-8" />
              </div>
              <span className="font-mono text-xs text-[#524A3B] uppercase tracking-wider block mb-2">
                Problem 03 // Delay
              </span>
              <h3 className="font-fraunces font-bold text-xl sm:text-2xl text-[#0F0D0A] leading-snug mb-2 sm:mb-3">
                Writing follow-ups from memory
              </h3>
              <p className="text-sm text-[#453E31] leading-relaxed">
                Drafting generic recaps hours later that miss the exact pricing concessions and decision criteria discussed.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#0F0D0A]/20 font-mono text-xs text-[#0F0D0A] flex items-center justify-between">
              <span>Average lost:</span>
              <span className="font-bold underline decoration-[#0F0D0A]">55 mins / day</span>
            </div>
          </div>

        </div>

        {/* Hand-drawn summary banner */}
        <div className="mt-14 max-w-2xl mx-auto p-4 bg-[#FAF7F0] border-2 border-[#0F0D0A] text-center wobbly-box shadow">
          <p className="font-mono text-xs sm:text-sm text-[#0F0D0A]">
            <span className="text-[#C97D0E] font-bold">TOTAL DRAIN:</span> ~2.2 hours every single workday per rep taken away from selling.
          </p>
        </div>

      </div>
    </section>
  );
};
