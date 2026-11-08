import React, { useState } from 'react';
import { HandDrawnBee } from './HandDrawnBee';
import { HandDrawnUnderline } from './HandDrawnIcons';
import { FabricBackground } from './FabricBackground';

export type FAQCategory = 'all' | 'crm' | 'privacy' | 'pricing';

interface FAQItem {
  id: string;
  category: 'crm' | 'privacy' | 'pricing';
  categoryLabel: string;
  badge: string;
  question: string;
  answer: string;
  highlights?: string[];
  note?: string;
}

const FAQ_DATA: FAQItem[] = [
  // CRM Integration
  {
    id: 'crm-1',
    category: 'crm',
    categoryLabel: 'CRM Integration',
    badge: 'CRM // Salesforce & HubSpot',
    question: 'How does Winroom connect with Salesforce, HubSpot, and other CRMs?',
    answer:
      'Winroom connects in under 2 minutes through native 1-click OAuth. Once connected, it automatically maps to your standard and custom CRM objects—including Opportunities, Deals, Accounts, Contacts, and custom pipeline stages. There are no webhooks to write or brittle third-party connectors required.',
    highlights: [
      'Native bidirectional sync for Salesforce, HubSpot, Close, and Pipedrive',
      'Supports custom properties, drop-down stages, and mandatory fields',
      'Zero manual entry: calls, meeting summaries, and action items update automatically',
    ],
    note: 'Custom field mapping takes under 5 minutes during initial setup.',
  },
  {
    id: 'crm-2',
    category: 'crm',
    categoryLabel: 'CRM Integration',
    badge: 'Workflow // Auto vs. Review',
    question: 'Do reps have to review or manually approve notes before they sync?',
    answer:
      'You have complete governance. Winroom supports two modes: "Full Autopilot", which syncs structured call notes, buyer objections, and next steps into your CRM within 60 seconds of hanging up; and "Rep Review Mode", which sends the rep a quick 1-tap card in Slack or Web to approve or tweak before saving.',
    highlights: [
      'Full Autopilot: 100% hands-free background synchronization',
      'Rep Review Mode: 1-tap review card sent directly to Slack or email',
      'Manager presets allow different rules per sales tier or territory',
    ],
  },
  {
    id: 'crm-3',
    category: 'crm',
    categoryLabel: 'CRM Integration',
    badge: 'Data Hygiene // Deduplication',
    question: 'What happens if a contact or opportunity does not exist in our CRM yet?',
    answer:
      'Winroom automatically identifies newly introduced participants from call audio, calendar invites, and email threads. It extracts their full name, verified company domain, title, and phone number, checking against your existing database to prevent duplicate records before creating or linking them.',
    highlights: [
      'Intelligent deduplication matches company email domains',
      'Associates new buyers directly to the parent account or deal room',
      'Flags unmapped participants for easy 1-click confirmation',
    ],
  },

  // Data Privacy & Security
  {
    id: 'privacy-1',
    category: 'privacy',
    categoryLabel: 'Data Privacy',
    badge: 'Security // Zero Model Training',
    question: 'Is our sales conversation data used to train public AI models?',
    answer:
      'Never. We operate under strict enterprise zero-data-retention and non-training agreements. Your proprietary customer conversations, deal pricing discussions, and transcripts remain exclusively yours and are never used to train public foundation models or shared with third parties.',
    highlights: [
      'Zero training on customer audio, transcripts, or CRM records',
      'Isolated workspace tenant boundaries for every customer organization',
      'Strict contractual guarantee backed by enterprise data processing agreements (DPA)',
    ],
    note: 'Signed enterprise DPAs and Business Associate Agreements available upon request.',
  },
  {
    id: 'privacy-2',
    category: 'privacy',
    categoryLabel: 'Data Privacy',
    badge: 'Encryption // TLS 1.3 & AES-256',
    question: 'Where is audio processed and how is our company data encrypted?',
    answer:
      'All audio streams and data payloads are encrypted in transit using TLS 1.3 and at rest with AES-256 encryption. Processing occurs in ephemeral, stateless secure sandbox clusters. Once transcript analysis and CRM logging are complete, raw audio is purged according to your organization’s custom data retention policy.',
    highlights: [
      'End-to-end encryption across all web, telephony, and API endpoints',
      'Configurable data retention windows (e.g. 7 days, 30 days, or instant wipe)',
      'Role-based access control (RBAC) so reps only see their authorized deals',
    ],
  },
  {
    id: 'privacy-3',
    category: 'privacy',
    categoryLabel: 'Data Privacy',
    badge: 'Compliance // SOC 2 & GDPR',
    question: 'Are you SOC 2 Type II and GDPR compliant?',
    answer:
      'Yes. Winroom is SOC 2 Type II certified and fully GDPR and CCPA compliant. We support single sign-on (SSO via Okta, Google Workspace, Azure AD), comprehensive audit logging, and automated compliance announcements for two-party consent states.',
    highlights: [
      'SOC 2 Type II certified security architecture and controls',
      'Native SAML 2.0 / SSO integration for enterprise user provisioning',
      'Configurable automated call recording consent chimes and bot notices',
    ],
  },

  // Pricing & Plans
  {
    id: 'pricing-1',
    category: 'pricing',
    categoryLabel: 'Pricing & Plans',
    badge: 'Billing // Transparent Per-Seat',
    question: 'How does Winroom pricing work?',
    answer:
      'Winroom uses straightforward per-seat monthly or annual billing designed for growing sales teams. Every tier includes unlimited call transcriptions, automated CRM field extraction, live coaching whispers, and all native integrations. There are no hidden fees or per-minute overage surcharges.',
    highlights: [
      'Flat per-seat pricing with no surprise minute caps or usage fees',
      'Includes unlimited audio logging across Zoom, Meet, phone, and email',
      'Annual billing plans include a 20% discount and dedicated onboarding engineer',
    ],
  },
  {
    id: 'pricing-2',
    category: 'pricing',
    categoryLabel: 'Pricing & Plans',
    badge: 'Trial // 14-Day Pilot',
    question: 'Can we test Winroom on a pilot pod before rolling it out team-wide?',
    answer:
      'Yes! Most revenue organizations begin with a 14-day pilot with a cohort of 5 to 10 reps. This allows sales leadership to benchmark CRM data accuracy, measure saved rep hours, and observe win-rate improvements firsthand before wider organizational rollout.',
    highlights: [
      'Full feature access during the pilot period with white-glove setup',
      'Dedicated Slack channel with our solutions engineering team',
      'Pre-and-post pilot analytics report measuring rep hours saved',
    ],
    note: 'Early Access Cohort 01 pilots include complimentary custom CRM mapping.',
  },
  {
    id: 'pricing-3',
    category: 'pricing',
    categoryLabel: 'Pricing & Plans',
    badge: 'Flexibility // Team Scaling',
    question: 'Can we add, swap, or remove seats as our team changes?',
    answer:
      'Yes, seats are fully flexible. You can invite new account executives or SDRs, transfer licenses between team members, or scale up seats at any time directly from the admin dashboard with instant prorated billing adjustments.',
    highlights: [
      'Self-serve license reassignment without contacting support',
      'Prorated adjustments on monthly and annual contracts',
      'Read-only manager and executive dashboard seats are completely free',
    ],
  },
];

interface FAQSectionProps {
  onOpenWaitlist?: () => void;
  onOpenDiscovery?: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenWaitlist, onOpenDiscovery }) => {
  const [activeCategory, setActiveCategory] = useState<FAQCategory>('all');
  const [expandedIds, setExpandedIds] = useState<Record<string, boolean>>({
    'crm-1': true, // Open the first item by default for inviting discovery
  });

  const filteredItems = FAQ_DATA.filter(
    (item) => activeCategory === 'all' || item.category === activeCategory
  );

  const toggleItem = (id: string) => {
    setExpandedIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleExpandAll = () => {
    const allExpanded: Record<string, boolean> = {};
    filteredItems.forEach((item) => {
      allExpanded[item.id] = true;
    });
    setExpandedIds(allExpanded);
  };

  const handleCollapseAll = () => {
    setExpandedIds({});
  };

  const categories: { key: FAQCategory; label: string; icon: string }[] = [
    { key: 'all', label: 'All Questions', icon: '✦' },
    { key: 'crm', label: 'CRM Integration', icon: '⬢' },
    { key: 'privacy', label: 'Data Privacy & Security', icon: '🛡' },
    { key: 'pricing', label: 'Pricing & Pilot', icon: '⚡' },
  ];

  return (
    <section
      id="faq"
      className="relative py-20 sm:py-28 bg-[#0F0D0A] text-[#FAF7F0] honeycomb-bg overflow-hidden border-t-2 border-[#2E271F]"
    >
      {/* Dynamic Honey-Silk Fabric Background with Cursor Following & CTA Resonance */}
      <FabricBackground theme="dark" intensity={0.9} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Tag */}
        <div className="flex justify-center mb-5">
          <span className="font-mono text-xs uppercase tracking-widest text-[#F5A623] bg-[#171410] px-3.5 py-1 rounded-full border border-[#3E3427] flex items-center gap-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F5A623] animate-ping"></span>
            06 // The Hive Knowledge Base
          </span>
        </div>

        {/* Section Headline */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <h2 className="font-fraunces font-black text-3xl sm:text-5xl text-[#FAF7F0] tracking-tight leading-tight mb-4">
            Frequently Asked{' '}
            <span className="relative inline-block text-[#FAF7F0]">
              Questions.
              <span className="absolute left-0 right-0 -bottom-2 w-full block pointer-events-none">
                <HandDrawnUnderline className="h-3 text-[#F5A623]" />
              </span>
            </span>
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#A89F8C] max-w-xl mx-auto leading-relaxed">
            Clear, transparent answers about how Winroom integrates with your revenue stack, guards your client privacy, and scales with your team.
          </p>
        </div>

        {/* Category Filter Pills + Expand/Collapse Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-10 pb-4 border-b border-[#2E271F]">
          {/* Filter Chips */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`wobbly-btn px-4 py-2 text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 border ${
                    isActive
                      ? 'bg-[#F5A623] text-[#0F0D0A] border-[#0F0D0A] shadow-md font-semibold'
                      : 'bg-[#171410] text-[#A89F8C] border-[#2E271F] hover:text-[#FAF7F0] hover:border-[#F5A623]/60'
                  }`}
                  id={`faq-tab-${cat.key}`}
                >
                  <span className={isActive ? 'text-[#0F0D0A]' : 'text-[#F5A623]'}>
                    {cat.icon}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Expand / Collapse All Helpers */}
          <div className="flex items-center gap-3 text-xs font-mono text-[#A89F8C]">
            <button
              onClick={handleExpandAll}
              className="hover:text-[#F5A623] transition-colors underline decoration-dotted decoration-[#3E3427] cursor-pointer"
              id="faq-expand-all"
            >
              [Expand All]
            </button>
            <span className="text-[#3E3427]">|</span>
            <button
              onClick={handleCollapseAll}
              className="hover:text-[#F5A623] transition-colors underline decoration-dotted decoration-[#3E3427] cursor-pointer"
              id="faq-collapse-all"
            >
              [Collapse All]
            </button>
          </div>
        </div>

        {/* Accordion Cards List */}
        <div className="space-y-4 sm:space-y-5">
          {filteredItems.map((item, idx) => {
            const isOpen = !!expandedIds[item.id];

            return (
              <div
                key={item.id}
                className={`sketch-card-dark transition-all duration-200 relative overflow-hidden ${
                  isOpen
                    ? 'bg-[#1A1612] border-2 border-[#F5A623] shadow-[0_8px_30px_rgba(245,166,35,0.08)]'
                    : 'bg-[#171410] border-2 border-[#2E271F] hover:border-[#3E3427]'
                }`}
                id={`faq-card-${item.id}`}
              >
                {/* Hand-drawn ink pin dot in the top corner */}
                <div
                  className={`w-2.5 h-2.5 rounded-full absolute top-3.5 right-4 transition-colors ${
                    isOpen ? 'bg-[#F5A623] shadow-[0_0_8px_#F5A623]' : 'bg-[#2E271F]'
                  }`}
                />

                {/* Accordion Header / Trigger */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full text-left p-5 sm:p-7 flex items-start justify-between gap-4 cursor-pointer select-none group"
                  id={`faq-btn-${item.id}`}
                >
                  <div className="flex-1 pr-2">
                    {/* Badge & Number */}
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <span className="font-mono text-[11px] text-[#F5A623] tracking-widest uppercase bg-[#231E18] px-2.5 py-0.5 rounded border border-[#3E3427]">
                        {item.badge}
                      </span>
                      <span className="font-mono text-[11px] text-[#A89F8C]/60">
                        #{String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Question Title */}
                    <h3 className="font-fraunces font-bold text-lg sm:text-xl text-[#FAF7F0] group-hover:text-[#F5A623] transition-colors leading-snug">
                      {item.question}
                    </h3>
                  </div>

                  {/* Hand-drawn Toggle Icon (+ / - indicator) */}
                  <div
                    className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 border-2 transition-all mt-0.5 ${
                      isOpen
                        ? 'bg-[#F5A623] border-[#0F0D0A] text-[#0F0D0A] rotate-180 shadow-sm'
                        : 'bg-[#231E18] border-[#3E3427] text-[#A89F8C] group-hover:border-[#F5A623] group-hover:text-[#FAF7F0]'
                    }`}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    >
                      {isOpen ? (
                        /* Minus line */
                        <path
                          d="M5 12 H19"
                          stroke="currentColor"
                          strokeWidth="2.6"
                          strokeLinecap="round"
                        />
                      ) : (
                        /* Plus cross */
                        <>
                          <path
                            d="M12 5 V19"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                          />
                          <path
                            d="M5 12 H19"
                            stroke="currentColor"
                            strokeWidth="2.4"
                            strokeLinecap="round"
                          />
                        </>
                      )}
                    </svg>
                  </div>
                </button>

                {/* Accordion Answer Content (Expanded State) */}
                {isOpen && (
                  <div
                    id={`faq-answer-${item.id}`}
                    role="region"
                    aria-labelledby={`faq-btn-${item.id}`}
                    className="px-5 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-[#2E271F]/80 text-[#A89F8C] text-sm sm:text-base leading-relaxed animate-fadeIn"
                  >
                    {/* Primary Answer Paragraph */}
                    <p className="text-[#FAF7F0]/90 mb-4">{item.answer}</p>

                    {/* Bullet Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <div className="bg-[#120F0C] rounded-lg p-3.5 sm:p-4 border border-[#2E271F] my-4 space-y-2">
                        {item.highlights.map((bullet, bIdx) => (
                          <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#FAF7F0]">
                            {/* Honey Hexagon check marker */}
                            <span className="text-[#F5A623] text-xs mt-0.5 shrink-0 font-mono">
                              ⬢
                            </span>
                            <span>{bullet}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Optional Note / Callout */}
                    {item.note && (
                      <div className="flex items-center gap-2 text-xs font-mono text-[#FDD878] mt-3 bg-[#F5A623]/10 px-3 py-1.5 rounded border border-[#F5A623]/20 w-fit">
                        <span className="text-sm">🐝</span>
                        <span>{item.note}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom "Still have questions?" Sketch Card */}
        <div className="mt-12 sm:mt-16 sketch-card-dark bg-[#171410] border-2 border-[#2E271F] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 relative overflow-hidden">
          {/* Subtle honey glow background */}
          <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-[#F5A623]/5 blur-2xl pointer-events-none" />

          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-[#231E18] border border-[#3E3427] flex items-center justify-center shrink-0">
              <HandDrawnBee size={36} forwardLean={true} />
            </div>
            <div>
              <h4 className="font-fraunces font-bold text-lg sm:text-xl text-[#FAF7F0] mb-1">
                Have a specific CRM schema or security question?
              </h4>
              <p className="text-xs sm:text-sm text-[#A89F8C]">
                Our solutions engineering team can walk you through your custom fields and security architecture live.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
            {onOpenDiscovery && (
              <button
                onClick={onOpenDiscovery}
                className="wobbly-btn px-4 py-2.5 bg-[#FAF7F0] text-[#0F0D0A] font-medium text-xs sm:text-sm border-2 border-[#0F0D0A] hover:bg-[#FDD878] transition-all cursor-pointer"
                id="faq-cta-discovery"
              >
                <span>Book 15-Min Discovery</span>
              </button>
            )}

            {onOpenWaitlist && (
              <button
                onClick={onOpenWaitlist}
                className="wobbly-btn px-5 py-2.5 bg-[#F5A623] text-[#0F0D0A] font-medium text-xs sm:text-sm border-2 border-[#0F0D0A] hover:bg-[#ffb53f] transition-all cursor-pointer flex items-center gap-1.5"
                id="faq-cta-waitlist"
              >
                <span>Join Waitlist</span>
                <span className="font-mono text-xs">→</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
