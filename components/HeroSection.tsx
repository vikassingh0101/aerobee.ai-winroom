import React from 'react';
import { HandDrawnUnderline } from './HandDrawnIcons';
import { HeroPipeline } from './HeroPipeline';
import { FabricBackground } from './FabricBackground';

interface HeroSectionProps {
  onOpenWaitlist: () => void;
  onSeeInAction: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenWaitlist, onSeeInAction }) => {
  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 overflow-hidden honeycomb-bg" id="hero-section">
      {/* Dynamic Beehive-inspired Fabric Background */}
      <FabricBackground theme="dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top subtle badge in JetBrains Mono */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#3E3427] bg-[#171410]/80 backdrop-blur-sm text-xs font-mono text-[#A89F8C]">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse"></span>
            <span>WINROOM BY AEROBEE // REVOLUTIONIZING SALES OPS</span>
          </div>
        </div>

        {/* Centered Typography */}
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-fraunces font-black text-3xl sm:text-5xl lg:text-7xl text-[#FAF7F0] tracking-tight leading-[1.15] mb-6">
            Your reps sell.{' '}
            <span className="relative inline-block text-[#FAF7F0] my-1 sm:my-0">
              Winroom handles the rest.
              <span className="absolute left-0 right-0 -bottom-1.5 sm:-bottom-4 w-full block pointer-events-none">
                <HandDrawnUnderline className="h-2.5 sm:h-5 text-[#F5A623]" />
              </span>
            </span>
          </h1>

          <p className="font-sans text-base sm:text-xl text-[#A89F8C] max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed font-normal">
            Auto-logs every call. Coaches reps live. Keeps your CRM clean. All without your team lifting a finger.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-12 sm:mb-16">
            <button
              onClick={onOpenWaitlist}
              className="w-full sm:w-auto wobbly-btn px-8 py-4 bg-[#F5A623] text-[#0F0D0A] font-semibold text-base border-2 border-[#0F0D0A] hover:bg-[#ffb53f] transition-all cursor-pointer shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Join the Waitlist
            </button>

            <button
              onClick={onSeeInAction}
              className="w-full sm:w-auto hand-drawn-link text-[#FAF7F0] hover:text-[#F5A623] font-medium text-base py-2 transition-colors cursor-pointer group flex items-center justify-center gap-1.5"
            >
              <span>See it in action</span>
              <span className="font-mono text-sm transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        {/* HERO ILLUSTRATION:
            Multi-channel animated pipeline with synchronized honey dots, flight trajectory, and live outcome checklist
        */}
        <div className="relative max-w-5xl mx-auto mt-4 sm:mt-6">
          <div className="w-full bg-[#171410] border-2 border-[#2E271F] p-4 sm:p-8 lg:p-10 relative overflow-hidden sketch-card-dark">
            
            {/* Non-overlapping Flow Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 mb-4 pb-3 border-b border-[#2E271F] text-[11px] font-mono">
              <span className="text-[#A89F8C] tracking-wider truncate">
                FIG 1.0 // MULTI-CHANNEL FLIGHT PIPELINE
              </span>
              <span className="text-[#F5A623] flex items-center gap-1.5 shrink-0 self-start sm:self-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-pulse"></span>
                <span>REAL-TIME STREAM ACTIVE</span>
              </span>
            </div>

            {/* Synchronized Animated Pipeline (Touchpoints -> Dotted branches & Honey dots -> Flight path -> Winroom) */}
            <HeroPipeline />

          </div>
        </div>

      </div>
    </section>
  );
};
