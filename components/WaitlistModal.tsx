import React, { useState } from 'react';
import { HandDrawnBee } from './HandDrawnBee';
import confetti from 'canvas-confetti';

interface WaitlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialEmail?: string;
}

export const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose, initialEmail = '' }) => {
  const [email, setEmail] = useState(initialEmail);
  const [name, setName] = useState('');
  const [crm, setCrm] = useState('Salesforce');
  const [teamSize, setTeamSize] = useState('5-20 reps');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F5A623', '#FDD878', '#FAF7F0', '#C97D0E'],
      });
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg p-6 sm:p-8 bg-[#171410] border-2 border-[#F5A623] sketch-card-dark text-[#FAF7F0] shadow-2xl">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#3E3427] flex items-center justify-center text-[#A89F8C] hover:text-[#FAF7F0] hover:border-[#F5A623] transition-colors"
        >
          ✕
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#231E18] border border-[#F5A623] flex items-center justify-center">
                <HandDrawnBee size={28} forwardLean={true} />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-2xl text-[#FAF7F0]">Join the Winroom Waitlist</h3>
                <p className="font-mono text-xs text-[#F5A623]">BATCH 01 ACCESS • ROLLING INVITATIONS</p>
              </div>
            </div>

            <p className="text-sm text-[#A89F8C] mb-6">
              Be among the first sales teams to experience zero-admin autonomous CRM syncing and real-time whisper coaching.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-[#A89F8C] uppercase mb-1.5">Your Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full px-4 py-2.5 bg-[#0F0D0A] border border-[#3E3427] focus:border-[#F5A623] rounded-lg text-sm text-[#FAF7F0] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#A89F8C] uppercase mb-1.5">Work Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@company.com"
                  className="w-full px-4 py-2.5 bg-[#0F0D0A] border border-[#3E3427] focus:border-[#F5A623] rounded-lg text-sm text-[#FAF7F0] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-mono text-[#A89F8C] uppercase mb-1.5">Primary CRM</label>
                  <select
                    value={crm}
                    onChange={(e) => setCrm(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0F0D0A] border border-[#3E3427] focus:border-[#F5A623] rounded-lg text-sm text-[#FAF7F0] outline-none cursor-pointer"
                  >
                    <option value="Salesforce">Salesforce</option>
                    <option value="HubSpot">HubSpot</option>
                    <option value="Pipedrive">Pipedrive</option>
                    <option value="Close">Close CRM</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-[#A89F8C] uppercase mb-1.5">Sales Team Size</label>
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#0F0D0A] border border-[#3E3427] focus:border-[#F5A623] rounded-lg text-sm text-[#FAF7F0] outline-none cursor-pointer"
                  >
                    <option value="1-5 reps">1 - 5 reps</option>
                    <option value="5-20 reps">5 - 20 reps</option>
                    <option value="20-50 reps">20 - 50 reps</option>
                    <option value="50+ reps">50+ reps</option>
                  </select>
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full wobbly-btn py-3.5 bg-[#F5A623] text-[#0F0D0A] font-semibold text-sm border-2 border-[#0F0D0A] hover:bg-[#ffb53f] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Request Priority Access</span>
                  <span className="font-mono text-xs">→</span>
                </button>
              </div>

              <p className="text-[11px] text-center font-mono text-[#A89F8C]">
                We respect your inbox. Zero spam, ever.
              </p>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#231E18] border-2 border-[#F5A623] flex items-center justify-center mx-auto mb-4">
              <HandDrawnBee size={40} forwardLean={true} />
            </div>
            <h3 className="font-fraunces font-bold text-2xl text-[#FAF7F0] mb-2">You're in the hive!</h3>
            <p className="text-sm text-[#A89F8C] max-w-sm mx-auto mb-6">
              Thanks {name ? name.split(' ')[0] : 'there'}! We've prioritized <span className="text-[#F5A623] font-mono">{email}</span> for our upcoming private cohort.
            </p>
            <div className="p-3 bg-[#1F1B16] rounded-lg border border-[#3E3427] text-xs font-mono text-[#81c995] mb-6">
              STATUS: RESERVED • CRM: {crm.toUpperCase()} • TEAM: {teamSize}
            </div>
            <button
              onClick={onClose}
              className="wobbly-btn px-6 py-2.5 bg-[#FAF7F0] text-[#0F0D0A] font-medium text-xs border border-[#0F0D0A] cursor-pointer"
            >
              Back to aerobee.ai
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
