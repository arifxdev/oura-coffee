import React, { useState } from 'react';
import { ROASTER_PARTNERS } from '../data/coffeeData';
import { Info, Sparkles, X } from 'lucide-react';

export const RoasterRibbon: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = useState<typeof ROASTER_PARTNERS[0] | null>(null);

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 -mt-2 sm:-mt-4 mb-14 md:mb-20">
      {/* The clean white rounded ribbon matching the reference image */}
      <div className="w-full bg-[#FAF8F5] border border-[#DDD5C8] rounded-2xl sm:rounded-full py-4 sm:py-5 px-6 sm:px-10 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 md:gap-8">
          <div className="w-full sm:w-auto text-center sm:text-left flex items-center justify-center sm:justify-start gap-2 text-xs font-semibold text-[#7D746A] uppercase tracking-widest border-b sm:border-b-0 sm:border-r border-[#E5DDD2] pb-2 sm:pb-0 sm:pr-6">
            <Sparkles className="w-3.5 h-3.5 text-[#2E5444]" />
            <span>Specialty Origins</span>
          </div>

          <div className="flex-1 flex flex-wrap items-center justify-around sm:justify-between gap-4 sm:gap-6">
            {ROASTER_PARTNERS.map((partner) => (
              <button
                key={partner.name}
                onClick={() => setSelectedPartner(partner)}
                className="group flex flex-col items-center sm:items-start text-left py-1 px-2.5 rounded-lg hover:bg-[#EFE9DF] transition-all duration-200 smooth-press cursor-pointer"
              >
                <span className="font-display text-base sm:text-lg md:text-xl text-[#2B2723] group-hover:text-[#234133] transition-colors tracking-wide">
                  {partner.name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans text-[#857B71] tracking-tight">
                  {partner.origin}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Origin Detail Modal */}
      {selectedPartner && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] border border-[#D5CABB] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setSelectedPartner(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#6B635A] hover:bg-[#EDE5DA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-wider text-[#2E5444]">
              <Sparkles className="w-4 h-4" />
              <span>Direct Trade Partnership</span>
            </div>

            <h3 className="font-display text-3xl text-[#1E1C19] mb-1">
              {selectedPartner.name}
            </h3>
            <p className="text-sm font-medium text-[#7D746A] mb-4">
              {selectedPartner.origin}
            </p>

            <div className="space-y-3 bg-[#EFE9DE] p-4 rounded-2xl mb-6 text-sm">
              <div className="flex justify-between items-center border-b border-[#DFD6C8] pb-2">
                <span className="text-[#6D655C]">Process Method</span>
                <span className="font-semibold text-[#1F1C18]">{selectedPartner.process}</span>
              </div>
              <div className="flex justify-between items-center border-b border-[#DFD6C8] pb-2">
                <span className="text-[#6D655C]">Roast Profile</span>
                <span className="font-semibold text-[#1F1C18]">Artisan Micro-Batch</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6D655C]">Quality Score</span>
                <span className="font-semibold text-[#2E5444]">88.5+ SCA Cup</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedPartner(null)}
              className="w-full py-3 rounded-full bg-[#1E1C19] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#2E5444] transition-colors"
            >
              Close Profile
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
