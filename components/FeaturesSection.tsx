import React, { useState, useEffect } from 'react';
import { HandDrawnUnderline } from './HandDrawnIcons';
import { HandDrawnBee } from './HandDrawnBee';
import { FabricBackground } from './FabricBackground';

interface CRMLogEntry {
  time: string;
  field: string;
  val: string;
  status: 'synced' | 'detected' | 'advanced';
}

const SAMPLE_LOGS: CRMLogEntry[] = [
  { time: '14:22:04', field: 'OPP_STAGE', val: 'Discovery → Formal Evaluation', status: 'advanced' },
  { time: '14:22:06', field: 'BUDGET_CONFIRMED', val: '$140,000 ARR (Annual Pre-pay)', status: 'synced' },
  { time: '14:22:09', field: 'DECISION_MAKER', val: 'Sarah Lin (VP Revenue Operations)', status: 'detected' },
  { time: '14:22:12', field: 'COMPETITOR_NOTED', val: 'Gong / Chorus renewal in 60 days', status: 'detected' },
  { time: '14:22:15', field: 'NEXT_STEP_SLA', val: 'Security Packet sent by Wed 5 PM', status: 'synced' },
  { time: '14:22:19', field: 'FOLLOW_UP_DRAFT', val: 'Tailored pricing recap generated', status: 'synced' },
  { time: '14:22:23', field: 'CLOSE_PROBABILITY', val: 'Increased from 35% → 72%', status: 'advanced' },
];

export const FeaturesSection: React.FC<{ onOpenWaitlist: () => void }> = ({ onOpenWaitlist }) => {
  // Animated ticker state for Feature 1
  const [visibleLogs, setVisibleLogs] = useState<CRMLogEntry[]>(SAMPLE_LOGS.slice(0, 4));

  useEffect(() => {
    let index = 4;
    const interval = setInterval(() => {
      setVisibleLogs(prev => {
        const nextItem = SAMPLE_LOGS[index % SAMPLE_LOGS.length];
        index++;
        return [nextItem, ...prev.slice(0, 4)];
      });
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div id="features" className="w-full">
      
      {/* FEATURE 1 (Dark Background #0F0D0A) */}
      <section className="relative py-20 sm:py-28 bg-[#0F0D0A] text-[#FAF7F0] honeycomb-bg overflow-hidden border-t border-[#2E271F]">
        {/* Dynamic Dark Honey-Silk Fabric Background */}
        <FabricBackground theme="dark" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#F5A623] tracking-widest mb-4">
                <span>Feature 01 // Auto-logging</span>
              </div>

              <h2 className="font-fraunces font-bold text-3xl sm:text-5xl text-[#FAF7F0] leading-tight tracking-tight mb-6">
                Zero CRM admin.{' '}
                <span className="relative inline-block text-[#F5A623]">
                  Ever.
                  <span className="absolute left-0 right-0 -bottom-1 w-full block pointer-events-none">
                    <HandDrawnUnderline className="h-2 text-[#F5A623]" />
                  </span>
                </span>
              </h2>

              <p className="font-sans text-[#A89F8C] text-base sm:text-lg leading-relaxed mb-6">
                As soon as your sales rep hangs up or sends an email, Winroom has already extracted every critical deal term, populated custom fields in Salesforce or HubSpot, and advanced the pipeline stage.
              </p>

              <div className="space-y-3 font-sans text-sm text-[#FAF7F0] mb-8">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#F5A623] font-bold">✓</span>
                  <span>100% field completion compliance across every rep without nagging</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#F5A623] font-bold">✓</span>
                  <span>Extracts timeline, MEDDPICC criteria, blockers, and buyer sentiments</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#F5A623] font-bold">✓</span>
                  <span>Eliminates pipeline blind spots for sales leadership</span>
                </div>
              </div>

              <button
                onClick={onOpenWaitlist}
                className="wobbly-btn px-6 py-3 bg-[#F5A623] text-[#0F0D0A] font-semibold text-sm border-2 border-[#0F0D0A] hover:bg-[#ffb53f] transition-all cursor-pointer"
              >
                Get Zero Admin Early Access →
              </button>
            </div>

            {/* Right: Animated JetBrains Mono Ticker showing live fake CRM log entries */}
            <div className="lg:col-span-6">
              <div className="w-full bg-[#171410] border-2 border-[#2E271F] p-5 sm:p-7 rounded-xl sketch-card-dark relative">
                
                {/* Ticker Header */}
                <div className="flex items-center justify-between border-b border-[#2E271F] pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623] animate-pulse"></span>
                    <span className="font-mono text-xs text-[#FAF7F0] font-medium">LIVE CRM AUTOLOG_FEED</span>
                  </div>
                  <span className="font-mono text-[11px] text-[#A89F8C]">LATENCY: 42ms</span>
                </div>

                {/* Ticker Log Rows */}
                <div className="space-y-3 font-mono text-xs">
                  {visibleLogs.map((log, i) => (
                    <div
                      key={`${log.time}-${i}`}
                      className="p-2.5 sm:p-3 rounded-lg bg-[#1F1B16] border border-[#3E3427] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-2 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="text-[#A89F8C] text-[11px]">{log.time}</span>
                        <span className="text-[#F5A623] font-bold text-[11px] bg-[#F5A623]/10 px-1.5 py-0.5 rounded border border-[#F5A623]/20">
                          {log.field}
                        </span>
                      </div>
                      <div className="text-[#FAF7F0] text-[12px] truncate min-w-0 flex-1 font-sans">
                        {log.val}
                      </div>
                      <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded self-start sm:self-center bg-[#2A241C] text-[#81c995] border border-[#81c995]/30 shrink-0">
                        {log.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Live stream footer */}
                <div className="mt-4 pt-3 border-t border-[#2E271F] flex items-center justify-between text-[11px] font-mono text-[#A89F8C]">
                  <span className="flex items-center gap-1 text-[#F5A623]">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#F5A623]"></span>
                    Listening to call audio stream...
                  </span>
                  <span>AUTO_COMMIT: TRUE</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FEATURE 2 (Light / Beeswax Background #FAF7F0) */}
      <section className="relative py-20 sm:py-28 bg-[#FAF7F0] text-[#0F0D0A] honeycomb-bg-light overflow-hidden border-t border-[#F5A623]">
        {/* Dynamic Light Beeswax Fabric Background */}
        <FabricBackground theme="light" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Hand-drawn Live Coaching Whisper Bubble Illustration */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative max-w-lg mx-auto">
                
                {/* Rep's Active Call Container */}
                <div className="bg-[#FAF7F0] border-2 border-[#0F0D0A] p-4 sm:p-6 sketch-card relative z-10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 border-b-2 border-[#0F0D0A]/20 pb-3 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="font-mono text-xs font-bold text-[#0F0D0A]">CALL IN PROGRESS // 18:42</span>
                    </div>
                    <span className="font-mono text-xs text-[#7A7160]">Prospect: VP Finance</span>
                  </div>

                  {/* Transcript quote */}
                  <div className="p-3 sm:p-3.5 bg-[#FAF7F0] border border-[#0F0D0A]/30 rounded-lg mb-5 sm:mb-6 font-sans text-xs sm:text-sm italic text-[#4A4335]">
                    "We really love the platform, but our budget is completely frozen until Q4 kicks off in November."
                  </div>

                  {/* HAND-DRAWN WHISPER BUBBLE */}
                  <div className="relative p-4 sm:p-5 bg-[#FDD878] border-2 border-[#0F0D0A] wobbly-box shadow-md">
                    {/* Tail pointing up-left */}
                    <div className="absolute -top-3 left-6 sm:left-10 w-5 h-5 bg-[#FDD878] border-t-2 border-l-2 border-[#0F0D0A] rotate-45"></div>

                    <div className="flex flex-wrap items-center justify-between gap-1 mb-2">
                      <div className="flex items-center gap-1.5">
                        <HandDrawnBee size={22} forwardLean={true} />
                        <span className="font-mono text-xs font-bold uppercase text-[#0F0D0A]">Winroom Live Whisper</span>
                      </div>
                      <span className="font-mono text-[10px] text-[#524A3B]">OBJECTION DETECTED</span>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[#0F0D0A] font-medium leading-snug">
                      <span className="font-bold">Recommendation:</span> Ask if Q4 budget allocation planning starts in September. Offer our deferred billing addendum so they can onboard now and pay in Q4.
                    </p>

                    <div className="mt-3 pt-2 border-t border-[#0F0D0A]/20 flex flex-wrap items-center justify-between gap-1 text-[10px] sm:text-[11px] font-mono text-[#524A3B]">
                      <span>Confidence score: 96%</span>
                      <span className="text-[#0F0D0A] font-bold underline">One-click battlecard</span>
                    </div>
                  </div>
                </div>

                {/* Subtle sketch backdrop element - responsive offset to prevent horizontal page overflow */}
                <div className="hidden sm:block absolute -bottom-4 -right-4 w-full h-full border-2 border-[#0F0D0A] bg-[#E8E2D1] rounded-2xl -z-0"></div>
              </div>
            </div>

            {/* Right Content */}
            <div className="lg:col-span-6 order-1 lg:order-2">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase text-[#C97D0E] tracking-widest mb-4">
                <span>Feature 02 // Real-Time Enablement</span>
              </div>

              <h2 className="font-fraunces font-bold text-3xl sm:text-5xl text-[#0F0D0A] leading-tight tracking-tight mb-6">
                Your rep’s secret weapon on{' '}
                <span className="relative inline-block">
                  every call.
                  <span className="absolute left-0 right-0 -bottom-1 w-full block pointer-events-none">
                    <HandDrawnUnderline className="h-2 text-[#C97D0E]" />
                  </span>
                </span>
              </h2>

              <p className="font-sans text-[#524A3B] text-base sm:text-lg leading-relaxed mb-6">
                Instead of post-call debriefs when it's already too late, Winroom whispers battlecards, pricing answers, and objection counters directly to your reps while the buyer is still on the line.
              </p>

              <div className="space-y-3 font-sans text-sm text-[#2E271F] mb-8">
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#C97D0E] font-bold">✓</span>
                  <span>Instant recall of competitor kill points without fumbling through docs</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#C97D0E] font-bold">✓</span>
                  <span>Quiet, non-intrusive HUD that keeps the rep present in the conversation</span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="font-mono text-[#C97D0E] font-bold">✓</span>
                  <span>Ramps new sales hires in weeks rather than quarters</span>
                </div>
              </div>

              <button
                onClick={onOpenWaitlist}
                className="wobbly-btn px-6 py-3 bg-[#0F0D0A] text-[#FAF7F0] font-semibold text-sm border-2 border-[#0F0D0A] hover:bg-[#231E18] transition-all cursor-pointer"
              >
                Join the Live Coaching Beta →
              </button>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
