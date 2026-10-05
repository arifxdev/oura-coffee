import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PAIRING_GALLERY } from '../data/coffeeData';
import { PairingItem } from '../types';
import { Utensils, Coffee, X, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BrewPairEnjoyProps {
  onOpenFullMenu: () => void;
}

export const BrewPairEnjoy: React.FC<BrewPairEnjoyProps> = ({ onOpenFullMenu }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState<PairingItem | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headingRef.current,
            start: 'top 85%',
          },
        }
      );

      const items = galleryRef.current?.children;
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-20"
    >
      {/* Centered Headline (Matching reference image: "BREW. PAIR. ENJOY.") */}
      <div className="text-center mb-8 md:mb-14">
        <h2
          ref={headingRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#191715]"
        >
          Brew. Pair. Enjoy.
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-medium tracking-widest text-[#7B7369] uppercase">
          Artisanal Coffee & Crafted Dining Pairing Experience
        </p>
      </div>

      {/* 4-Column Rounded Squircle Image Gallery (Matching reference image) */}
      <div
        ref={galleryRef}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
      >
        {PAIRING_GALLERY.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative rounded-[24px] sm:rounded-[32px] overflow-hidden aspect-[3/4] bg-[#221F1B] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5"
          >
            {/* Photography */}
            <img
              src={item.image}
              alt={item.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 filter brightness-[0.92] group-hover:brightness-100"
              onError={(e) => {
                const target = e.currentTarget;
                target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80';
              }}
            />

            {/* Gradient Scrim for Legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent transition-opacity duration-300" />

            {/* Top Category Badge */}
            <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
              <span className="inline-block px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white">
                {item.category}
              </span>
            </div>

            {/* Bottom Content Preview */}
            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5 right-3 sm:right-5 z-10 text-white">
              <p className="text-[11px] sm:text-xs font-medium text-[#C8D9D0] uppercase tracking-wider mb-0.5">
                {item.subtitle}
              </p>
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl uppercase tracking-wide leading-none group-hover:text-[#B4DAC7] transition-colors">
                {item.title}
              </h3>

              {/* Reveal prompt */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] text-white/70 group-hover:text-white transition-colors">
                <span>View Pairing</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button to explore full dining menu */}
      <div className="text-center mt-8 sm:mt-12">
        <button
          onClick={onOpenFullMenu}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#C5BBAE] bg-[#FAF8F5] text-xs sm:text-sm font-bold uppercase tracking-wider text-[#1C1A17] hover:bg-[#234133] hover:text-white hover:border-[#234133] transition-all duration-200 smooth-press shadow-xs"
        >
          <Utensils className="w-4 h-4" />
          <span>Explore Complete Food & Drink Menu</span>
        </button>
      </div>

      {/* Modal for detail view */}
      {activeItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
          <div className="bg-[#FAF8F5] border border-[#D5CABB] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-[#6B635A] hover:bg-[#EDE5DA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-5">
              <img
                src={activeItem.image}
                alt={activeItem.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#2E5444] mb-1 block">
              {activeItem.category} Pairing Note
            </span>
            <h3 className="font-display text-3xl text-[#1E1C19] mb-2 uppercase">
              {activeItem.title}
            </h3>

            <p className="text-sm text-[#4A443D] leading-relaxed mb-4">
              {activeItem.flavorNotes}
            </p>

            <div className="bg-[#EFE9DF] p-4 rounded-xl mb-5 border-l-3 border-[#2E5444]">
              <p className="text-xs font-bold uppercase text-[#2E5444] mb-0.5">Chef's Recommendation</p>
              <p className="text-xs text-[#524B43]">{activeItem.chefNote}</p>
            </div>

            <button
              onClick={() => setActiveItem(null)}
              className="w-full py-3 rounded-full bg-[#1E1C19] text-white font-semibold text-xs tracking-wider uppercase hover:bg-[#2E5444] transition-colors"
            >
              Close Pairing
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
