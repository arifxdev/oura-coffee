import React, { useState } from 'react';
import { FULL_MENU } from '../data/coffeeData';
import { X, Coffee, Utensils, Sparkles, Plus, Check } from 'lucide-react';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategory?: 'Coffee' | 'Food';
  onOrderItem?: (itemName: string, price: string) => void;
}

export const MenuModal: React.FC<MenuModalProps> = ({
  isOpen,
  onClose,
  initialCategory = 'Coffee',
  onOrderItem,
}) => {
  const [selectedCat, setSelectedCat] = useState<string>(
    initialCategory === 'Food' ? 'Food' : 'Coffee'
  );
  const [orderedItem, setOrderedItem] = useState<string | null>(null);

  if (!isOpen) return null;

  const categories = ['All', 'Coffee', 'Specialty', 'Food', 'Pastries'];

  const filteredItems =
    selectedCat === 'All'
      ? FULL_MENU
      : FULL_MENU.filter((item) => item.category === selectedCat);

  const handleOrder = (name: string, price: string) => {
    if (onOrderItem) onOrderItem(name, price);
    setOrderedItem(name);
    setTimeout(() => setOrderedItem(null), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#D5CABB] rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E5DDD2]">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E5444]">
              Oura Coffee & Dining · Malang
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#1B1917] uppercase">
              Full House Menu
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-[#6B635A] hover:bg-[#EDE5DA] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 py-4 overflow-x-auto no-scrollbar border-b border-[#EFE9DF]">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                selectedCat === cat
                  ? 'bg-[#181614] text-white shadow-xs'
                  : 'bg-[#EFE9DF] text-[#696157] hover:text-[#181614] hover:bg-[#E5DDD2]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-2xl bg-[#F5F0E8] border border-[#E0D7C9] flex flex-col justify-between hover:border-[#BFB4A5] transition-colors"
              >
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="font-display text-xl text-[#1B1917] uppercase">
                      {item.name}
                    </h4>
                    <span className="font-bold text-sm text-[#234133] tabular-nums ml-2">
                      {item.price}
                    </span>
                  </div>

                  <p className="text-xs text-[#5D554D] leading-relaxed mb-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#E5DDD2]">
                  <div className="flex gap-1">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] text-[#7A7167] font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOrder(item.name, item.price)}
                    className="text-xs font-bold text-[#181614] hover:text-[#234133] flex items-center gap-1 uppercase tracking-wider py-1 px-2 rounded-lg hover:bg-white transition-colors"
                  >
                    {orderedItem === item.name ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Added
                      </span>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" /> Quick Add
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Note */}
        <div className="pt-4 border-t border-[#E5DDD2] flex items-center justify-between text-xs text-[#7A7167]">
          <span>Service Hours: 08:00 – 22:30 Daily</span>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#181614] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#234133] transition-colors"
          >
            Done Browsing
          </button>
        </div>
      </div>
    </div>
  );
};
