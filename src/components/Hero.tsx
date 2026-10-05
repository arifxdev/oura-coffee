import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Coffee, Flame, Droplets, Gauge, ArrowUpRight, Play, Check } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreMenu: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreMenu, onExploreProducts }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const kickerRef = useRef<HTMLParagraphElement>(null);
  const imageFrameRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLImageElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  const [activeProcess, setActiveProcess] = useState<number | null>(null);

  const brewProcesses = [
    { id: 0, label: 'Cup Profile', detail: 'Tasting notes balanced for vibrant acidity and syrupy body', icon: Coffee },
    { id: 1, label: 'Origin Beans', detail: '100% Arabica volcanic single origins, hand-sorted', icon: Flame },
    { id: 2, label: 'V60 Pour', detail: '93°C slow circular extraction at a 1:16 ratio', icon: Droplets },
    { id: 3, label: 'Italian Pressure', detail: '9-bar espresso pull yielding dense tiger-stripe crema', icon: Gauge },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of hero text
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        kickerRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.1 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 35, scale: 0.98 },
          { opacity: 1, y: 0, scale: 1, duration: 1 },
          '-=0.5'
        )
        .fromTo(
          imageFrameRef.current,
          { opacity: 0, y: 40, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 1.1, ease: 'expo.out' },
          '-=0.7'
        )
        .fromTo(
          iconsRef.current?.children || [],
          { opacity: 0, scale: 0.7, y: 10 },
          { opacity: 1, scale: 1, y: 0, stagger: 0.08, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.4'
        );

      // Subtle parallax effect on scroll
      if (imageInnerRef.current && imageFrameRef.current) {
        gsap.to(imageInnerRef.current, {
          yPercent: 12,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: imageFrameRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative pt-6 pb-12 md:pt-10 md:pb-16 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
      {/* Kicker (Matching reference: REDEFINING RITUALS, ONE SIP AT A TIME) */}
      <div className="text-center mb-3 md:mb-4">
        <p
          ref={kickerRef}
          className="text-xs sm:text-sm md:text-base font-semibold tracking-[0.25em] text-[#696159] uppercase"
        >
          Redefining Rituals, One Sip At A Time
        </p>
      </div>

      {/* Main Headline (Matching reference: ELEVATE YOUR EVERYDAY BREW) */}
      <div className="text-center mb-6 md:mb-10 overflow-hidden">
        <h1
          ref={titleRef}
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight uppercase text-[#191715] leading-[0.88] select-none"
        >
          Elevate Your Everyday Brew
        </h1>
      </div>

      {/* Hero Media Container (Rounded outer card matching reference structure) */}
      <div
        ref={imageFrameRef}
        className="relative w-full rounded-[28px] sm:rounded-[36px] md:rounded-[44px] p-2.5 sm:p-4 md:p-5 bg-[#E2D9CD]/80 border border-[#D3C7BA] shadow-lg shadow-black/5"
      >
        <div className="relative w-full h-[360px] sm:h-[480px] md:h-[600px] lg:h-[640px] rounded-[22px] sm:rounded-[30px] md:rounded-[38px] overflow-hidden bg-[#24211D]">
          {/* Main Barista Photography */}
          <img
            ref={imageInnerRef}
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=1800&q=85"
            alt="Oura Coffee Baristas handcrafting specialty pour-over coffee"
            referrerPolicy="no-referrer"
            className="w-full h-[115%] -top-[8%] absolute object-cover object-center filter brightness-[0.92] contrast-[1.03] will-change-transform"
            onError={(e) => {
              // Resilient fallback
              const target = e.currentTarget;
              target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1800&q=85';
            }}
          />

          {/* Measured cinematic lighting scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none" />

          {/* Top Right Process Icons Overlay (Matching the 4 icons in reference image) */}
          <div className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20">
            <div
              ref={iconsRef}
              className="flex items-center gap-1.5 sm:gap-2.5 p-1.5 sm:p-2 rounded-2xl bg-black/45 backdrop-blur-md border border-white/15 shadow-md"
            >
              {brewProcesses.map((proc) => {
                const IconComponent = proc.icon;
                const isActive = activeProcess === proc.id;
                return (
                  <button
                    key={proc.id}
                    onClick={() => setActiveProcess(isActive ? null : proc.id)}
                    aria-label={proc.label}
                    className={`relative p-2 sm:p-2.5 rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'bg-[#2E5444] text-white shadow-sm scale-105'
                        : 'text-white/80 hover:text-white hover:bg-white/15'
                    }`}
                  >
                    <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" />
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[#8FAC9A] rounded-full" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Micro details popup when an icon is clicked */}
            {activeProcess !== null && (
              <div className="mt-2.5 p-3 rounded-xl bg-black/85 backdrop-blur-lg border border-white/20 text-white max-w-[260px] text-xs shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
                <p className="font-bold text-[#8FAC9A] uppercase tracking-wider text-[11px] mb-1">
                  {brewProcesses[activeProcess].label}
                </p>
                <p className="text-white/85 text-[12px] leading-relaxed">
                  {brewProcesses[activeProcess].detail}
                </p>
              </div>
            )}
          </div>

          {/* Bottom Left Stylized Brand Badge (Matching the Co-Fi pill badge in reference image) */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 z-20">
            <div className="flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#1E372B]/95 backdrop-blur-md border border-[#8FAC9A]/30 text-white shadow-lg">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8FAC9A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#67B58B]"></span>
              </span>
              <span className="font-display text-lg sm:text-xl tracking-wider text-[#FAF7F2]">
                OURA COFFEE
              </span>
              <span className="hidden sm:inline text-[11px] font-sans font-medium text-[#B6D1C2] border-l border-white/20 pl-2.5">
                Malang Specialty Bar
              </span>
            </div>
          </div>

          {/* Bottom Right CTA Action Buttons */}
          <div className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 z-20 flex items-center gap-3">
            <button
              onClick={onExploreProducts}
              className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#FAF7F2] text-[#191715] font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:shadow-lg transition-all duration-200 smooth-press flex items-center gap-2 group"
            >
              <span>Explore Beans</span>
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={onExploreMenu}
              className="hidden sm:flex px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-black/45 backdrop-blur-md text-white border border-white/25 font-semibold text-xs sm:text-sm tracking-wider uppercase hover:bg-black/65 transition-all duration-200 smooth-press items-center gap-2"
            >
              <span>Dine-In Menu</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
