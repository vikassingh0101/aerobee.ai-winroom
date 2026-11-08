import React, { useState } from 'react';
import { HandDrawnBee } from './HandDrawnBee';

interface DiscoveryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoveryModal: React.FC<DiscoveryModalProps> = ({ isOpen, onClose }) => {
  const [selectedSlot, setSelectedSlot] = useState('Tomorrow 10:00 AM');
  const [booked, setBooked] = useState(false);

  if (!isOpen) return null;

  const SLOTS = [
    'Tomorrow 10:00 AM EST',
    'Tomorrow 2:30 PM EST',
    'Thursday 11:00 AM EST',
    'Friday 1:00 PM EST',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md p-6 sm:p-8 bg-[#171410] border-2 border-[#F5A623] sketch-card-dark text-[#FAF7F0] shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#3E3427] flex items-center justify-center text-[#A89F8C] hover:text-[#FAF7F0] hover:border-[#F5A623] transition-colors"
        >
          ✕
        </button>

        {!booked ? (
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#231E18] border border-[#F5A623] flex items-center justify-center">
                <HandDrawnBee size={28} forwardLean={true} />
              </div>
              <div>
                <h3 className="font-fraunces font-bold text-2xl text-[#FAF7F0]">Book a 15-Min Discovery</h3>
                <p className="font-mono text-xs text-[#F5A623]">PRIVATE PRODUCT DEMO WITH THE FOUNDERS</p>
              </div>
            </div>

            <p className="text-sm text-[#A89F8C] mb-5">
              Watch Winroom silently sync a live sales demo into Salesforce with live rep coaching.
            </p>

            <div className="space-y-2 mb-6">
              <label className="block text-xs font-mono text-[#A89F8C] uppercase mb-2">Select a Convenient Time</label>
              {SLOTS.map((slot) => (
                <button
                  key={slot}
                  onClick={() => setSelectedSlot(slot)}
                  className={`w-full text-left px-4 py-2.5 rounded-lg border text-sm font-sans flex items-center justify-between transition-colors ${
                    selectedSlot === slot
                      ? 'border-[#F5A623] bg-[#2A241C] text-[#FAF7F0]'
                      : 'border-[#3E3427] bg-[#0F0D0A] text-[#A89F8C] hover:border-[#F5A623]/50'
                  }`}
                >
                  <span>{slot}</span>
                  {selectedSlot === slot && <span className="font-mono text-[#F5A623] text-xs">SELECTED</span>}
                </button>
              ))}
            </div>

            <button
              onClick={() => setBooked(true)}
              className="w-full wobbly-btn py-3.5 bg-[#F5A623] text-[#0F0D0A] font-semibold text-sm border-2 border-[#0F0D0A] hover:bg-[#ffb53f] transition-all cursor-pointer"
            >
              Confirm Discovery Session →
            </button>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-[#231E18] border-2 border-[#81c995] flex items-center justify-center mx-auto mb-4 text-[#81c995] text-xl font-bold">
              ✓
            </div>
            <h3 className="font-fraunces font-bold text-2xl text-[#FAF7F0] mb-2">Discovery Call Reserved</h3>
            <p className="text-sm text-[#A89F8C] mb-4">
              We've blocked out <span className="text-[#F5A623] font-mono">{selectedSlot}</span>. A calendar invitation with video bridge will arrive in your email.
            </p>
            <button
              onClick={onClose}
              className="wobbly-btn px-6 py-2.5 bg-[#FAF7F0] text-[#0F0D0A] font-medium text-xs border border-[#0F0D0A] cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
