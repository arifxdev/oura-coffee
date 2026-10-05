import React, { useState } from 'react';
import { ArrowRight, Check, Instagram, MapPin, Mail, Phone } from 'lucide-react';

interface FooterProps {
  onOpenMenu: () => void;
  onOpenReservation: () => void;
  onOpenStory: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenMenu,
  onOpenReservation,
  onOpenStory,
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <footer className="bg-[#181614] text-[#FAF7F2] border-t border-[#2B2723]">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#2C2824]">
          {/* Col 1: Brand & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="inline-block border border-white/20 rounded-full px-4 py-1 bg-white/5">
              <span className="font-display text-2xl tracking-wider text-[#FAF7F2]">
                OU<span className="inline-block mx-0.5 text-xs font-sans align-middle border-b border-current">━</span>RA
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#A8A096] max-w-sm leading-relaxed font-light">
              Specialty coffee roastery, artisanal bakery, and casual fine dining.
              Redefining daily brewing rituals in the heart of Malang, East Java.
            </p>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#C5BBAE]">
              <a
                href="https://www.instagram.com/oura.coffee"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-[#8FAC9A] transition-colors py-1 px-3 rounded-full bg-white/5 border border-white/10"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>@oura.coffee</span>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8FAC9A] mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-[#B5ABA0]">
              <li>
                <button
                  onClick={onOpenMenu}
                  className="hover:text-white transition-colors"
                >
                  Dining & Drink Menu
                </button>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  Signature Roast Canisters
                </a>
              </li>
              <li>
                <button
                  onClick={onOpenReservation}
                  className="hover:text-white transition-colors"
                >
                  Table Reservations
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenStory}
                  className="hover:text-white transition-colors"
                >
                  Our Heritage & Labore Roastery
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Visit Us */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8FAC9A] mb-4">
              Flagship Cafe
            </h4>
            <div className="space-y-3 text-xs text-[#B5ABA0]">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#8FAC9A] shrink-0 mt-0.5" />
                <span>Jl. Pahlawan Trip No. A11, Oro-oro Dowo, Klojen, Malang, East Java 65112</span>
              </p>
              <p className="text-[11px] text-[#8A8177]">
                Open Daily: 08:00 – 22:30 WIB
              </p>
              <p className="text-[11px] text-[#8A8177]">
                Indoor Skylight Dining & Second Floor Terrace
              </p>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#8FAC9A] mb-4">
              The Roast Dispatch
            </h4>
            <p className="text-xs text-[#9E958B] mb-3 leading-relaxed">
              Receive notifications when seasonal micro-lots drop fresh from the drum.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-full bg-white/5 border border-white/15 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#8FAC9A]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-full bg-[#8FAC9A] text-[#181614] hover:bg-white transition-colors"
                >
                  {subscribed ? <Check className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-emerald-400 font-medium">
                  Subscribed! Welcome to the Oura coffee circle.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7A7268]">
          <p>© {new Date().getFullYear()} Oura Coffee & Dining. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span>Specialty Coffee Association Member</span>
            <span>·</span>
            <span>Artisan Roastery Partner: Labore</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
