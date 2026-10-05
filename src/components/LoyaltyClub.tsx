import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { Sparkles, Check, Gift, Coffee, X } from 'lucide-react';

export const LoyaltyClub: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stampedBeans, setStampedBeans] = useState(7); // starts at 7/10 for excitement
  const [voucherClaimed, setVoucherClaimed] = useState(false);

  // Magnetic button effect (Emil Kowalski style design engineering)
  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const hCenter = rect.left + rect.width / 2;
      const vCenter = rect.top + rect.height / 2;
      const distX = (e.clientX - hCenter) * 0.28;
      const distY = (e.clientY - vCenter) * 0.28;

      gsap.to(button, {
        x: distX,
        y: distY,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1, 0.4)',
      });
    };

    button.addEventListener('mousemove', handleMouseMove);
    button.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      button.removeEventListener('mousemove', handleMouseMove);
      button.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleStamp = (index: number) => {
    if (index < stampedBeans) return;
    setStampedBeans(index + 1);
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-20">
      {/* Warm Sand Container (Matching reference image: "BUY 10 DRINKS, GET 1 FREE") */}
      <div
        ref={containerRef}
        className="relative rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-[#DFD5C6] p-8 sm:p-14 md:p-18 border border-[#CEBFAD] overflow-hidden shadow-inner text-center"
      >
        {/* Left Hand-Drawn Cupcake Illustration (Matching reference image) */}
        <div className="absolute left-6 sm:left-12 bottom-6 sm:bottom-12 pointer-events-none opacity-85 hidden sm:block">
          <svg
            className="w-20 h-24 md:w-24 md:h-28 stroke-[#292522] fill-none"
            viewBox="0 0 100 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Cupcake Base Wrapper */}
            <path
              d="M25 65 L32 110 L68 110 L75 65"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Wrapper fluting lines */}
            <line x1="41" y1="65" x2="44" y2="110" strokeWidth="1.5" />
            <line x1="50" y1="65" x2="50" y2="110" strokeWidth="1.5" />
            <line x1="59" y1="65" x2="56" y2="110" strokeWidth="1.5" />

            {/* Swirled Frosting Top */}
            <path
              d="M20 65 C18 55, 30 50, 36 54 C38 42, 55 38, 62 48 C68 38, 80 46, 78 65 Z"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            {/* Frosting Swirl Line */}
            <path
              d="M32 52 C45 35, 60 40, 68 50"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
            {/* Cherry on top */}
            <circle cx="50" cy="30" r="6" strokeWidth="2" />
            <path d="M50 24 C50 15, 60 12, 64 10" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </div>

        {/* Right Hand-Drawn Croissant Illustration (Matching reference image) */}
        <div className="absolute right-6 sm:right-12 bottom-6 sm:bottom-12 pointer-events-none opacity-85 hidden sm:block">
          <svg
            className="w-24 h-24 md:w-28 md:h-28 stroke-[#292522] fill-none"
            viewBox="0 0 120 120"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Curved buttery croissant body */}
            <path
              d="M25 80 C20 65, 35 40, 60 30 C85 20, 105 40, 100 65 C95 85, 75 95, 55 90 C35 85, 25 80, 25 80 Z"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />
            {/* Laminated pastry crust folds */}
            <path d="M42 42 C50 55, 50 75, 45 88" strokeWidth="1.8" />
            <path d="M60 31 C70 48, 70 70, 65 91" strokeWidth="1.8" />
            <path d="M80 34 C88 50, 85 70, 78 85" strokeWidth="1.8" />
          </svg>
        </div>

        {/* Center Content */}
        <div className="max-w-2xl mx-auto relative z-10">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl uppercase tracking-tight text-[#1E1B18] mb-4">
            Buy 10 Drinks, Get 1 Free
          </h2>

          <p className="text-xs sm:text-sm md:text-base font-medium tracking-wide uppercase text-[#524B43] leading-relaxed max-w-xl mx-auto mb-8">
            Every handcrafted drink earns you a bean. Collect 10 beans and your next
            one's free — because loyalty should taste like reward.
          </p>

          {/* Magnetic Button matching reference: "JOIN THE CLUB" */}
          <div className="inline-block relative">
            <button
              ref={buttonRef}
              onClick={() => setIsModalOpen(true)}
              className="px-8 sm:px-10 py-3.5 sm:py-4 rounded-full bg-[#181614] text-[#FAF8F5] text-xs sm:text-sm font-bold tracking-widest uppercase hover:bg-[#234133] transition-colors shadow-lg cursor-pointer"
            >
              Join The Club
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Loyalty Stamp Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] border border-[#D5CABB] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#6B635A] hover:bg-[#EDE5DA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E5444] mb-1 block">
                Oura Bean Pass · Malang
              </span>
              <h3 className="font-display text-3xl text-[#1E1C19]">Your Digital Stamp Card</h3>
              <p className="text-xs text-[#7A7167] mt-1">
                Tap the next empty bean slot to simulate ordering a cup!
              </p>
            </div>

            {/* 10 Bean Slots Grid */}
            <div className="grid grid-cols-5 gap-3 p-4 bg-[#EFE9DF] rounded-2xl mb-6">
              {Array.from({ length: 10 }).map((_, i) => {
                const isStamped = i < stampedBeans;
                const isTenth = i === 9;

                return (
                  <button
                    key={i}
                    onClick={() => handleStamp(i)}
                    className={`aspect-square rounded-xl flex flex-col items-center justify-center transition-all duration-200 ${
                      isStamped
                        ? 'bg-[#234133] text-[#BBD4C7] shadow-sm scale-100'
                        : isTenth
                        ? 'bg-[#E3DAD0] border-2 border-dashed border-[#234133] text-[#234133] hover:scale-105'
                        : 'bg-[#FAF8F5] border border-[#DCD5C9] text-[#9A9186] hover:bg-white'
                    }`}
                  >
                    {isStamped ? (
                      <Check className="w-5 h-5 text-white animate-in zoom-in-50 duration-200" />
                    ) : isTenth ? (
                      <Gift className="w-5 h-5 animate-pulse" />
                    ) : (
                      <span className="font-mono text-xs font-bold">{i + 1}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Progress status */}
            <div className="text-center mb-6">
              {stampedBeans >= 10 ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold">
                  🎉 Congratulations! You unlocked a Free Specialty Brew of your choice!
                </div>
              ) : (
                <p className="text-xs text-[#524B43]">
                  <strong className="text-[#1E1C19]">{10 - stampedBeans} more beans</strong> to earn your complimentary cup!
                </p>
              )}
            </div>

            <button
              onClick={() => {
                if (stampedBeans >= 10) {
                  setVoucherClaimed(true);
                }
                setIsModalOpen(false);
              }}
              className="w-full py-3.5 rounded-full bg-[#1E1C19] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#234133] transition-colors"
            >
              {stampedBeans >= 10 ? 'Redeem Voucher at Counter' : 'Done For Now'}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
