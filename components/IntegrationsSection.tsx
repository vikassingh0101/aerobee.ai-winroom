import React, { useRef, useState } from 'react';
import {
  HandDrawnZoom,
  HandDrawnMeet,
  HandDrawnCalendly,
  HandDrawnTwilio,
  HandDrawnGmail,
  HandDrawnOutlook,
  HandDrawnChatSMS,
  HandDrawnUnderline,
} from './HandDrawnIcons';
import { IntegrationsConnectedCanvas } from './IntegrationsConnectedCanvas';
import { FabricBackground } from './FabricBackground';

const INTEGRATIONS = [
  { name: 'Zoom', component: HandDrawnZoom, desc: 'Video & Audio' },
  { name: 'Google Meet', component: HandDrawnMeet, desc: 'Conferences' },
  { name: 'Calendly', component: HandDrawnCalendly, desc: 'Scheduling' },
  { name: 'Twilio', component: HandDrawnTwilio, desc: 'VoIP & Calls' },
  { name: 'Gmail', component: HandDrawnGmail, desc: 'Email Threads' },
  { name: 'Outlook', component: HandDrawnOutlook, desc: 'Exchange / 365' },
  { name: 'SMS & Text', component: HandDrawnChatSMS, desc: 'Mobile Chat' },
];

export const IntegrationsSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const winroomRef = useRef<HTMLSpanElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [underlineOpacity, setUnderlineOpacity] = useState<number>(0);

  return (
    <section className="relative py-20 sm:py-28 bg-[#FAF7F0] text-[#0F0D0A] honeycomb-bg-light overflow-hidden border-t border-[#0F0D0A]/10" id="integrations">
      {/* Dynamic Beeswax Linen-inspired Fabric Background */}
      <FabricBackground theme="light" />

      <div ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Dynamic Canvas with Slow-Pulsing Connector Line & Bee Flight Path */}
        <IntegrationsConnectedCanvas
          containerRef={containerRef}
          winroomRef={winroomRef}
          cardRefs={cardRefs}
          cardsCount={INTEGRATIONS.length}
          onUnderlineOpacityChange={setUnderlineOpacity}
        />

        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 relative z-20">
          <div className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#C97D0E] tracking-widest mb-3 bg-[#FDD878]/30 px-3 py-1 rounded-full border border-[#C97D0E]/20">
            <span>Ecosystem Connectivity</span>
          </div>
          <h2 className="font-fraunces font-bold text-3xl sm:text-5xl text-[#0F0D0A] tracking-tight leading-tight">
            <span ref={winroomRef} className="relative inline-block">
              <span className="relative z-10">Winroom</span>
              {/* Sketch highlighter underline: strictly under "Winroom" text, appears only on bee arrival and fades out in sync */}
              <span
                className="absolute left-0 right-0 -bottom-1.5 sm:-bottom-3 w-full block pointer-events-none transition-opacity duration-200"
                style={{
                  opacity: underlineOpacity,
                  visibility: underlineOpacity > 0 ? 'visible' : 'hidden',
                }}
              >
                <HandDrawnUnderline className="h-3 sm:h-4.5 w-full text-[#F5A623] highlighter-glow" />
              </span>
            </span>{' '}
            connects to your whole stack.
          </h2>
          <p className="mt-4 text-[#7A7160] text-base sm:text-lg max-w-xl mx-auto">
            Zero rip-and-replace. Winroom listens silently across the communication channels your reps already use every day.
          </p>
        </div>

        {/* Row of integration icons connected by dotted bee-path lines */}
        <div className="relative max-w-5xl mx-auto z-20">
          {/* Integration Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 sm:gap-6 relative">
            {INTEGRATIONS.map((item, index) => {
              const IconComp = item.component;
              return (
                <div
                  key={index}
                  ref={(el) => {
                    cardRefs.current[index] = el;
                  }}
                  className={`flex flex-col items-center text-center p-3.5 sm:p-4 rounded-xl bg-[#FAF7F0] border-2 border-[#0F0D0A] sketch-card hover:-translate-y-1.5 transition-all cursor-default relative group ${
                    index === 6 ? 'col-span-2 sm:col-span-1 max-w-[240px] sm:max-w-none mx-auto w-full' : ''
                  }`}
                >
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#FDD878] border border-[#0F0D0A] flex items-center justify-center mb-2.5 sm:mb-3 group-hover:scale-105 transition-transform shadow-sm">
                    <IconComp size={28} className="sm:w-8 sm:h-8" />
                  </div>
                  <h4 className="font-fraunces font-bold text-xs sm:text-sm text-[#0F0D0A] mb-0.5 truncate max-w-full">
                    {item.name}
                  </h4>
                  <span className="font-mono text-[9px] sm:text-[10px] text-[#7A7160] uppercase tracking-wide truncate max-w-full">
                    {item.desc}
                  </span>
                </div>
              );
            })}
          </div>

        </div>

        {/* Integration Security Note */}
        <div className="mt-10 sm:mt-14 text-center relative z-20 px-2">
          <div className="inline-flex items-center justify-center gap-2 font-mono text-[11px] sm:text-xs text-[#524A3B] bg-[#FAF7F0] border border-[#0F0D0A]/20 px-3 sm:px-4 py-2 rounded-xl sm:rounded-full max-w-full flex-wrap">
            <span className="text-[#C97D0E] shrink-0">🔒</span>
            <span>SOC2 Type II compliant</span>
            <span className="opacity-40">•</span>
            <span>Zero-retention encryption</span>
            <span className="opacity-40">•</span>
            <span>CRM-native sync</span>
          </div>
        </div>

      </div>
    </section>
  );
};
