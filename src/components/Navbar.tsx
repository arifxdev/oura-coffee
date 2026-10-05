import React from 'react';
import { ShoppingBag, Sparkles, Clock, MapPin } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenMenu: (category?: 'Coffee' | 'Food') => void;
  onOpenReservation: () => void;
  onOpenStory: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenMenu,
  onOpenReservation,
  onOpenStory,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300 bg-[#ECE7DF]/90 backdrop-blur-md border-b border-[#DCD5C9]/60">
      {/* Top micro announcement bar */}
      <div className="bg-[#234133] text-[#D8E6DE] text-[11px] font-medium tracking-wider uppercase py-1.5 px-4 text-center flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#8FAC9A]" />
          <span> Open Daily: 1:00 PM – 2:00 AM</span>
        </span>
        <span className="hidden sm:inline text-white/30">|</span>
        <span className="hidden sm:flex items-center gap-1.5 text-[#BBD4C7]">
          <MapPin className="w-3.5 h-3.5 text-[#8FAC9A]" />
          <span>Plot 14 C, DHA Karachi Phase VIII Zone A Zulfiqar & Al Murtaza Commercial Area </span>
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 h-20 flex items-center justify-between">
        {/* Left Navigation Zone (Matching reference layout: MENU, FOODS, HISTORY) */}
        <nav className="flex items-center gap-6 md:gap-8 flex-1 justify-start">
          <button
            onClick={() => onOpenMenu('Coffee')}
            className="text-xs md:text-sm font-semibold tracking-widest text-[#2B2724] hover:text-[#234133] transition-colors uppercase relative group py-2"
          >
            Menu
            <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-[#234133] transition-all duration-200 group-hover:w-full" />
          </button>
          <button
            onClick={() => onOpenMenu('Food')}
            className="text-xs md:text-sm font-semibold tracking-widest text-[#2B2724] hover:text-[#234133] transition-colors uppercase relative group py-2"
          >
            Foods
            <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-[#234133] transition-all duration-200 group-hover:w-full" />
          </button>
          <button
            onClick={onOpenStory}
            className="hidden sm:inline-block text-xs md:text-sm font-semibold tracking-widest text-[#2B2724] hover:text-[#234133] transition-colors uppercase relative group py-2"
          >
            History
            <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-[#234133] transition-all duration-200 group-hover:w-full" />
          </button>
        </nav>

        {/* Center Brand Zone: Distinctive OURA Logo Lockup (Replicating Co-Fi pill badge aesthetic) */}
        <div className="flex-shrink-0 flex items-center justify-center">
          <a
            href="#"
            className="group flex items-center justify-center border-2 border-[#1E1C19] rounded-full px-5 py-1.5 bg-[#FAF7F2] shadow-sm hover:bg-[#1E1C19] hover:text-[#FAF7F2] transition-all duration-300"
            aria-label="Oura Coffee Homepage"
          >
            <span className="font-display text-2xl md:text-3xl tracking-wider uppercase font-normal transition-colors">
              OU<span className="inline-block mx-0.5 text-xs font-sans tracking-normal align-middle border-b-2 border-current">━</span>RA
            </span>
          </a>
        </div>

        {/* Right Action Zone: RESERVATIONS, STORY, CART (0) */}
        <div className="flex items-center gap-4 sm:gap-6 flex-1 justify-end">
          <button
            onClick={onOpenReservation}
            className="hidden md:inline-block text-xs md:text-sm font-semibold tracking-widest text-[#2B2724] hover:text-[#234133] transition-colors uppercase relative group py-2"
          >
            Reservations
            <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-[#234133] transition-all duration-200 group-hover:w-full" />
          </button>

          <button
            onClick={onOpenStory}
            className="hidden lg:inline-block text-xs md:text-sm font-semibold tracking-widest text-[#2B2724] hover:text-[#234133] transition-colors uppercase relative group py-2"
          >
            Blog
            <span className="absolute bottom-1 left-0 w-0 h-[1.5px] bg-[#234133] transition-all duration-200 group-hover:w-full" />
          </button>

          {/* Cart Button with reactive count badge */}
          <button
            onClick={onOpenCart}
            aria-label="Shopping Cart"
            className="relative flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border border-[#D0C6B8] bg-[#FAF8F5] hover:bg-[#234133] hover:text-white hover:border-[#234133] transition-all duration-200 smooth-press group shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 text-[#2B2724] group-hover:text-white transition-colors" />
            <span className="text-xs md:text-sm font-bold tracking-wider uppercase">
              Cart <span className="tabular-nums">({cartCount})</span>
            </span>
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#345C4D] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#234133] text-white text-[10px] items-center justify-center font-bold">
                  {cartCount}
                </span>
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
