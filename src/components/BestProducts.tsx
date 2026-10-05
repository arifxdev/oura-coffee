import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FEATURED_PRODUCTS } from '../data/coffeeData';
import { Product } from '../types';
import { Check, ShoppingBag, Eye, Star, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface BestProductsProps {
  onAddToCart: (product: Product, quantity?: number) => void;
  onQuickView: (product: Product) => void;
}

export const BestProducts: React.FC<BestProductsProps> = ({ onAddToCart, onQuickView }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [addedIds, setAddedIds] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Staggered reveal of section title and the 3 cards
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

      const cards = cardsRef.current?.children;
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 45, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleAdd = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1);
    setAddedIds((prev) => ({ ...prev, [product.id]: true }));
    setTimeout(() => {
      setAddedIds((prev) => ({ ...prev, [product.id]: false }));
    }, 1500);
  };

  return (
    <section
      id="products"
      ref={sectionRef}
      className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-12 md:py-20"
    >
      {/* Section Header (Matching reference image: "BEST PRODUCTS") */}
      <div className="text-center mb-10 md:mb-14">
        <h2
          ref={headingRef}
          className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tight text-[#191715]"
        >
          Best Products
        </h2>
        <p className="mt-2 text-xs sm:text-sm font-medium tracking-widest text-[#7B7369] uppercase">
          Curated Roasts · Specialty Cans & Whole Beans
        </p>
      </div>

      {/* 3-Card Grid Matching Reference Hierarchy */}
      <div
        ref={cardsRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch"
      >
        {FEATURED_PRODUCTS.map((product) => {
          const isAdded = !!addedIds[product.id];
          const isFeatured = product.isPopular; // Center card style in reference image

          return (
            <div
              key={product.id}
              onClick={() => onQuickView(product)}
              className={`group relative rounded-[28px] md:rounded-[32px] p-6 lg:p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                isFeatured
                  ? 'bg-[#E3DAD0] border-2 border-[#C9BDB0] shadow-md hover:shadow-xl hover:-translate-y-1.5'
                  : 'bg-[#FAF8F5] border border-[#DDD5C8] hover:border-[#BFB4A5] shadow-xs hover:shadow-lg hover:-translate-y-1'
              }`}
            >
              {/* Top Meta: Subtitle & Title (Matching reference typography) */}
              <div className="text-center mb-6">
                <span className="block text-[11px] sm:text-xs font-semibold tracking-widest text-[#847B72] uppercase mb-1.5">
                  {product.badge}
                </span>
                <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl text-[#1B1917] tracking-wide uppercase group-hover:text-[#234133] transition-colors">
                  {product.name}
                </h3>
              </div>

              {/* Product Packshot Image Slot with Soft Lighting */}
              <div className="relative w-full h-56 sm:h-64 lg:h-72 flex items-center justify-center my-2 overflow-hidden rounded-2xl">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105 filter drop-shadow-md"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.src = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Quick view hover icon button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onQuickView(product);
                  }}
                  aria-label="Quick View Product"
                  className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm text-[#2B2724] opacity-0 group-hover:opacity-100 transition-all duration-200 hover:bg-[#234133] hover:text-white shadow-sm"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>

              {/* Flavor tags */}
              <div className="flex items-center justify-center gap-1.5 my-3 text-[11px] text-[#7A7268] font-medium">
                {product.notes.slice(0, 2).map((note, idx) => (
                  <React.Fragment key={note}>
                    {idx > 0 && <span>·</span>}
                    <span>{note}</span>
                  </React.Fragment>
                ))}
              </div>

              {/* Card Footer (Matching reference: ADD TO CART on left, Price with crossed-out original on right) */}
              <div className="pt-4 border-t border-[#DFD6C9] flex items-center justify-between gap-4 mt-auto">
                {/* Left Action: Either Solid Black Pill (like center card in reference) or clean text link */}
                {isFeatured ? (
                  <button
                    onClick={(e) => handleAdd(product, e)}
                    className="flex-1 py-2.5 px-4 rounded-full bg-[#181614] text-[#FAF8F5] text-xs font-bold tracking-wider uppercase hover:bg-[#234133] transition-all duration-200 smooth-press flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add To Cart</span>
                      </>
                    )}
                  </button>
                ) : (
                  <button
                    onClick={(e) => handleAdd(product, e)}
                    className="text-xs font-bold tracking-wider uppercase text-[#191715] hover:text-[#234133] py-2 transition-colors flex items-center gap-1.5 group/btn"
                  >
                    {isAdded ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Added
                      </span>
                    ) : (
                      <>
                        <span>Add To Cart</span>
                        <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-0.5">
                          →
                        </span>
                      </>
                    )}
                  </button>
                )}

                {/* Right Price: Formatted exactly like reference "99$ ~80$~" */}
                <div className="flex items-baseline gap-1.5 text-right font-sans shrink-0">
                  <span className="text-sm line-through text-[#948B80] tabular-nums font-normal">
                    ${product.originalPrice}
                  </span>
                  <span className="text-base sm:text-lg font-bold text-[#181614] tabular-nums">
                    ${product.salePrice}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
