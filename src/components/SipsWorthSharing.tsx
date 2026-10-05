import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Share2, Users, Check, Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface SipsWorthSharingProps {
  onOpenReservation: () => void;
}

export const SipsWorthSharing: React.FC<SipsWorthSharingProps> = ({ onOpenReservation }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
          },
        }
      );

      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
          },
        }
      );

      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 65%',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-20">
      {/* Big Forest Green Container (Matching reference image: "SIPS WORTH SHARING") */}
      <div
        ref={containerRef}
        className="relative rounded-[28px] sm:rounded-[36px] md:rounded-[44px] bg-[#234133] text-[#FAF7F2] p-6 sm:p-10 md:p-14 lg:p-16 overflow-hidden shadow-2xl"
      >
        {/* Hand-drawn Cookie Doodles in the corner (Replicating exact reference image detail) */}
        <div className="absolute top-6 sm:top-10 right-6 sm:right-12 pointer-events-none opacity-80 sm:opacity-90">
          <svg
            className="w-24 h-24 sm:w-36 sm:h-36 stroke-[#8FAC9A] fill-none"
            viewBox="0 0 160 160"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Top Cookie with bite & chocolate chips */}
            <path
              d="M65 30 C85 20, 115 28, 125 45 C132 58, 128 78, 115 88 C100 100, 72 95, 58 85 C45 75, 45 45, 65 30 Z"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Chocolate Chips inside Cookie 1 */}
            <circle cx="75" cy="45" r="3.5" fill="#8FAC9A" />
            <circle cx="95" cy="42" r="4" fill="#8FAC9A" />
            <circle cx="110" cy="62" r="3" fill="#8FAC9A" />
            <circle cx="82" cy="68" r="4.5" fill="#8FAC9A" />
            <circle cx="65" cy="65" r="3" fill="#8FAC9A" />

            {/* Bottom Second Cookie */}
            <path
              d="M95 85 C115 80, 138 90, 142 108 C145 125, 130 142, 112 145 C95 148, 80 135, 78 120 C76 102, 85 90, 95 85 Z"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Chocolate Chips inside Cookie 2 */}
            <circle cx="100" cy="105" r="3.5" fill="#8FAC9A" />
            <circle cx="120" cy="112" r="3" fill="#8FAC9A" />
            <circle cx="108" cy="128" r="4" fill="#8FAC9A" />
            <circle cx="92" cy="124" r="3" fill="#8FAC9A" />

            {/* Crumb details */}
            <circle cx="48" cy="98" r="1.5" fill="#8FAC9A" />
            <circle cx="55" cy="105" r="2" fill="#8FAC9A" />
            <circle cx="145" cy="85" r="1.5" fill="#8FAC9A" />
          </svg>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          {/* Left Column: Big Headline */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <span className="text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#8FAC9A] uppercase mb-2">
              Community & Conversation
            </span>
            <h2
              ref={headlineRef}
              className="font-display text-5xl sm:text-7xl md:text-8xl tracking-tight text-[#8FAC9A] uppercase leading-[0.9] mb-6"
            >
              Sips Worth Sharing
            </h2>

            <p className="text-sm sm:text-base text-[#D4E3DB] leading-relaxed max-w-lg mb-8 font-light">
              From dawn espresso rituals to slow twilight dinners, Oura was built
              around the long wooden table. Every cup is brewed to spark connection,
              shared laughter, and timeless memories.
            </p>

            {/* Interactive CTA buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenReservation}
                className="px-6 py-3.5 rounded-full bg-[#FAF7F2] text-[#1D3529] font-bold text-xs sm:text-sm tracking-wider uppercase hover:bg-white hover:shadow-lg transition-all duration-200 smooth-press flex items-center gap-2"
              >
                <Users className="w-4 h-4" />
                <span>Reserve a Shared Table</span>
              </button>

              <button
                onClick={handleShare}
                className="px-5 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm tracking-wider uppercase transition-all duration-200 smooth-press flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Link Copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#8FAC9A]" />
                    <span>Share With Friends</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Tall Pouring Photo with floating quote badge */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div
              ref={imageRef}
              className="relative w-full max-w-[440px] rounded-[28px] sm:rounded-[36px] overflow-hidden bg-[#162920] shadow-2xl border border-white/10"
            >
              {/* Tall Barista Pouring Chemex Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1518832553480-cd0e625ed3e6?auto=format&fit=crop&w=1000&q=85"
                  alt="Barista pouring artisanal Chemex coffee into carafe"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-[0.95]"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1000&q=85';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />
              </div>

              {/* Floating Frosted Dark Quote Badge (Matching exact reference image layout) */}
              <div
                ref={badgeRef}
                className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 p-4 sm:p-5 rounded-2xl bg-[#15231C]/90 backdrop-blur-md border border-white/15 text-white shadow-xl"
              >
                <div className="flex items-start gap-3">
                  <Heart className="w-4 h-4 text-[#8FAC9A] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm font-medium tracking-wide uppercase leading-snug text-[#E8F0EC]">
                    "Because great coffee isn't just a drink — it's a shared experience."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
