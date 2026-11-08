import React from 'react';
import { HandDrawnBee } from './HandDrawnBee';
import { FabricBackground } from './FabricBackground';

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="relative py-20 sm:py-32 bg-[#0F0D0A] text-[#FAF7F0] honeycomb-bg overflow-hidden" id="how-it-works">
      {/* Dynamic Honey-Silk Fabric Background */}
      <FabricBackground theme="dark" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag */}
        <div className="flex justify-center mb-5">
          <span className="font-mono text-xs uppercase tracking-widest text-[#A89F8C] bg-[#171410] px-3.5 py-1 rounded-full border border-[#2E271F]">
            02 // The Process
          </span>
        </div>

        {/* Section Headline */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-24">
          <h2 className="font-fraunces font-bold text-4xl sm:text-6xl text-[#FAF7F0] leading-tight tracking-tight">
            It listens. It learns.{' '}
            <span className="text-[#F5A623] italic">It handles it.</span>
          </h2>
          <p className="mt-4 text-[#A89F8C] text-base sm:text-lg max-w-xl mx-auto">
            A seamless background intelligence pipeline connecting every verbal commitment to your system of record.
          </p>
        </div>

        {/* 3-STEP FLOW CONNECTED BY A BEE FLIGHT PATH
            (dashed honey line with tiny bee mid-path, hand-drawn hexagonal cards)
        */}
        <div className="relative max-w-5xl mx-auto">
          
          {/* Connector Flight Path (Desktop) */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 -translate-y-1/2 h-20 pointer-events-none z-0">
            <svg viewBox="0 0 1000 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible">
              <path
                d="M 120 40 C 240 10, 360 70, 500 40 C 640 10, 760 70, 880 40"
                stroke="#F5A623"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                strokeLinecap="round"
              />
              {/* Pollen speckles along path */}
              <circle cx="280" cy="30" r="2.5" fill="#FDD878" />
              <circle cx="430" cy="55" r="2" fill="#F5A623" />
              <circle cx="700" cy="32" r="2.5" fill="#FDD878" />
              <circle cx="820" cy="58" r="2" fill="#F5A623" />
            </svg>

            {/* Tiny bee mid-path between Step 1 and Step 2 */}
            <div className="absolute left-[33%] top-2 -translate-x-1/2 z-10">
              <HandDrawnBee size={36} forwardLean={true} className="animate-pulse" />
            </div>

            {/* Another tiny bee between Step 2 and Step 3 */}
            <div className="absolute left-[68%] top-5 -translate-x-1/2 z-10">
              <HandDrawnBee size={34} forwardLean={true} />
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative z-10">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
              {/* Hand-drawn Hexagonal Card */}
              <div className="relative w-full max-w-sm md:max-w-[280px] p-6 sm:p-8 bg-[#171410] border-2 border-[#2E271F] hover:border-[#F5A623] transition-colors sketch-card-dark flex flex-col items-center">
                
                {/* Hex shape doodle banner */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 flex items-center justify-center relative">
                  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <polygon
                      points="30,2 56,16 56,44 30,58 4,44 4,16"
                      stroke="#F5A623"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="#231E18"
                    />
                  </svg>
                  <span className="absolute font-mono font-bold text-sm text-[#F5A623]">01</span>
                </div>

                <div className="font-mono text-xs text-[#F5A623] uppercase tracking-widest mb-2">
                  STEP 01 // CONVERSATION
                </div>

                <h3 className="font-fraunces font-bold text-xl sm:text-2xl text-[#FAF7F0] mb-2 sm:mb-3">
                  Your team has a conversation
                </h3>

                <p className="text-sm text-[#A89F8C] leading-relaxed">
                  Any channel. Zoom, cold calls, in-person demos, WhatsApp, or long email threads. Reps focus 100% on the prospect.
                </p>

                <div className="mt-6 pt-3 border-t border-[#2E271F] w-full font-mono text-[11px] text-[#A89F8C]">
                  [Zero manual setup required]
                </div>
              </div>

              {/* Mobile Vertical Connector between 1 and 2 */}
              <div className="md:hidden flex flex-col items-center my-3 text-[#F5A623]">
                <span className="w-0.5 h-6 border-l-2 border-dashed border-[#F5A623]/60"></span>
                <span className="text-xs -my-1 font-mono">⇣</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
              {/* Hand-drawn Hexagonal Card */}
              <div className="relative w-full max-w-sm md:max-w-[280px] p-6 sm:p-8 bg-[#1C1813] border-2 border-[#F5A623]/80 hover:border-[#F5A623] transition-colors sketch-card-dark flex flex-col items-center shadow-lg">
                
                {/* Hex shape doodle banner */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 flex items-center justify-center relative">
                  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <polygon
                      points="30,2 56,16 56,44 30,58 4,44 4,16"
                      stroke="#F5A623"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      fill="#2E2417"
                    />
                  </svg>
                  <span className="absolute font-mono font-bold text-sm text-[#FAF7F0]">02</span>
                </div>

                <div className="font-mono text-xs text-[#F5A623] uppercase tracking-widest mb-2">
                  STEP 02 // INTELLIGENCE
                </div>

                <h3 className="font-fraunces font-bold text-xl sm:text-2xl text-[#FAF7F0] mb-2 sm:mb-3">
                  Winroom listens across every channel
                </h3>

                <p className="text-sm text-[#A89F8C] leading-relaxed">
                  Background AI layer ingests speech and text in real-time, matching entities, sentiment, deal risks, and customer intent.
                </p>

                <div className="mt-6 pt-3 border-t border-[#3E3427] w-full font-mono text-[11px] text-[#F5A623]">
                  [Sub-second parsing latency]
                </div>
              </div>

              {/* Mobile Vertical Connector between 2 and 3 */}
              <div className="md:hidden flex flex-col items-center my-3 text-[#F5A623]">
                <span className="w-0.5 h-6 border-l-2 border-dashed border-[#F5A623]/60"></span>
                <span className="text-xs -my-1 font-mono">⇣</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
              {/* Hand-drawn Hexagonal Card */}
              <div className="relative w-full max-w-sm md:max-w-[280px] p-6 sm:p-8 bg-[#171410] border-2 border-[#2E271F] hover:border-[#F5A623] transition-colors sketch-card-dark flex flex-col items-center">
                
                {/* Hex shape doodle banner */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 mb-5 sm:mb-6 flex items-center justify-center relative">
                  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                    <polygon
                      points="30,2 56,16 56,44 30,58 4,44 4,16"
                      stroke="#F5A623"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="#231E18"
                    />
                  </svg>
                  <span className="absolute font-mono font-bold text-sm text-[#F5A623]">03</span>
                </div>

                <div className="font-mono text-xs text-[#F5A623] uppercase tracking-widest mb-2">
                  STEP 03 // OUTCOME
                </div>

                <h3 className="font-fraunces font-bold text-xl sm:text-2xl text-[#FAF7F0] mb-2 sm:mb-3">
                  Logs it. Coaches them. Updates your CRM.
                </h3>

                <p className="text-sm text-[#A89F8C] leading-relaxed">
                  Accurate CRM records generated instantly, follow-up emails drafted with pricing specifics, and live tips fed to the rep.
                </p>

                <div className="mt-6 pt-3 border-t border-[#2E271F] w-full font-mono text-[11px] text-[#A89F8C]">
                  [Zero manual data entry]
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
