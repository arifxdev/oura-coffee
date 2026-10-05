import React from 'react';
import { X, Award, Flame, HeartHandshake } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#D5CABB] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[88vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B635A] hover:bg-[#EDE5DA] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E5444] mb-1 block">
          Our Heritage
        </span>
        <h2 className="font-display text-3xl sm:text-5xl text-[#1B1917] uppercase mb-4">
          The Oura Story
        </h2>

        <div className="space-y-4 text-xs sm:text-sm text-[#4E473F] leading-relaxed">
          <p>
            Established at Jl. Pahlawan Trip in Malang, <strong>OURA Coffee & Dining</strong> was
            conceived as an architectural sanctuary where raw brutalist textures meet warm,
            sunlit hospitality.
          </p>

          <div className="rounded-2xl overflow-hidden my-4 border border-[#DFD6C9]">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80"
              alt="Oura Coffee heritage interior"
              className="w-full h-48 sm:h-56 object-cover"
            />
          </div>

          <h3 className="font-display text-xl text-[#1B1917] uppercase pt-2">
            The Labore Roastery Synergy
          </h3>
          <p>
            Partnering directly with sister roastery <strong>Labore</strong>, our coffee program
            sources exclusively from sustainable high-elevation micro-lots across Sumatra Gayo,
            Ethiopia Yirgacheffe, and Colombia Huila. Every drum batch is roasted with precision
            profiling to unlock natural stone fruit, cacao, and honey notes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
            <div className="p-3 bg-[#EFE9DF] rounded-xl text-center">
              <Award className="w-5 h-5 text-[#2E5444] mx-auto mb-1" />
              <p className="font-bold text-xs text-[#1B1917]">Specialty Grade</p>
              <p className="text-[11px] text-[#6E665E]">88+ SCA cupping standard</p>
            </div>
            <div className="p-3 bg-[#EFE9DF] rounded-xl text-center">
              <Flame className="w-5 h-5 text-[#2E5444] mx-auto mb-1" />
              <p className="font-bold text-xs text-[#1B1917]">Micro-Batch Roast</p>
              <p className="text-[11px] text-[#6E665E]">Small drum profiles</p>
            </div>
            <div className="p-3 bg-[#EFE9DF] rounded-xl text-center">
              <HeartHandshake className="w-5 h-5 text-[#2E5444] mx-auto mb-1" />
              <p className="font-bold text-xs text-[#1B1917]">Casual Fine Dining</p>
              <p className="text-[11px] text-[#6E665E]">Indonesian & Western</p>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#DFD6C9] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-full bg-[#181614] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#234133] transition-colors"
          >
            Close Story
          </button>
        </div>
      </div>
    </div>
  );
};
