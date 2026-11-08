import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WavyDivider } from './components/WavyDivider';
import { ProblemSection } from './components/ProblemSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { FeaturesSection } from './components/FeaturesSection';
import { IntegrationsSection } from './components/IntegrationsSection';
import { FAQSection } from './components/FAQSection';
import { FooterSection } from './components/FooterSection';
import { WaitlistModal } from './components/WaitlistModal';
import { DiscoveryModal } from './components/DiscoveryModal';

export const App: React.FC = () => {
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const [waitlistEmail, setWaitlistEmail] = useState('');
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

  const handleOpenWaitlist = (email?: string) => {
    if (email) setWaitlistEmail(email);
    setWaitlistOpen(true);
  };

  const handleCloseWaitlist = () => {
    setWaitlistOpen(false);
    setWaitlistEmail('');
  };

  const handleOpenDiscovery = () => {
    setDiscoveryOpen(true);
  };

  const handleCloseDiscovery = () => {
    setDiscoveryOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0F0D0A] text-[#FAF7F0] font-sans selection:bg-[#F5A623] selection:text-[#0F0D0A]">
      {/* Navigation */}
      <Navbar
        onOpenWaitlist={() => handleOpenWaitlist()}
        onOpenDiscovery={handleOpenDiscovery}
      />

      <main>
        {/* Hero Section (Dark, Honeycomb pattern, Bee flight path into Winroom) */}
        <HeroSection
          onOpenWaitlist={() => handleOpenWaitlist()}
          onSeeInAction={handleOpenDiscovery}
        />

        {/* Hand-drawn Wavy Divider: Dark to Light */}
        <WavyDivider
          fillColor="#FAF7F0"
          strokeColor="#F5A623"
          className="-mb-1"
        />

        {/* Section 2: The Problem (Light / Beeswax, Pollen cards with tilt and sketch borders) */}
        <ProblemSection />

        {/* Hand-drawn Wavy Divider: Light to Dark */}
        <WavyDivider
          fillColor="#0F0D0A"
          strokeColor="#F5A623"
          className="-mt-1 -mb-1"
        />

        {/* Section 3: How It Works (Dark, 3 Hex Cards connected by bee flight path) */}
        <HowItWorksSection />

        {/* Section 4: Features (Alternating Dark & Light with live CRM ticker and whisper bubble) */}
        <FeaturesSection onOpenWaitlist={() => handleOpenWaitlist()} />

        {/* Section 5: Integrations (Light, Row of custom hand-drawn icons with dotted bee-path) */}
        <IntegrationsSection />

        {/* Hand-drawn Wavy Divider: Light to Dark */}
        <WavyDivider
          fillColor="#0F0D0A"
          strokeColor="#F5A623"
          className="-mt-1 -mb-1"
        />

        {/* Section 6: Frequently Asked Questions (Dark sketch-card accordion: CRM, Privacy, Pricing) */}
        <FAQSection
          onOpenWaitlist={() => handleOpenWaitlist()}
          onOpenDiscovery={handleOpenDiscovery}
        />

        {/* Footer CTA Section (Dark, Big Fraunces headline, email input, corner bee) */}
        <FooterSection
          onOpenWaitlist={(email) => handleOpenWaitlist(email)}
          onOpenDiscovery={handleOpenDiscovery}
        />
      </main>

      {/* Interactive Modals */}
      <WaitlistModal
        isOpen={waitlistOpen}
        onClose={handleCloseWaitlist}
        initialEmail={waitlistEmail}
      />

      <DiscoveryModal
        isOpen={discoveryOpen}
        onClose={handleCloseDiscovery}
      />
    </div>
  );
};

export default App;
