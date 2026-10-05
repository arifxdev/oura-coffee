import React, { useState } from 'react';
import { Product } from '../types';
import { X, Check, ShoppingBag, Star, Flame, Coffee, Sparkles } from 'lucide-react';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [grind, setGrind] = useState<'Whole Bean' | 'Espresso' | 'Pour Over' | 'French Press'>('Whole Bean');
  const [added, setAdded] = useState(false);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="bg-[#FAF8F5] border border-[#D5CABB] rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-[#6B635A] hover:bg-[#EDE5DA] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Image */}
          <div className="h-64 sm:h-72 bg-[#EFE9DF] rounded-2xl p-4 flex items-center justify-center border border-[#DFD6C9]">
            <img
              src={product.image}
              alt={product.name}
              className="max-h-full max-w-full object-contain filter drop-shadow-md"
            />
          </div>

          {/* Details */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#2E5444] mb-1 block">
              {product.badge}
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#1B1917] uppercase mb-1">
              {product.name}
            </h3>

            <div className="flex items-center gap-2 mb-3 text-xs text-[#7A7167]">
              <span className="flex items-center text-amber-600 font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-500 stroke-amber-500 mr-1" />
                {product.rating}
              </span>
              <span>·</span>
              <span>{product.reviewsCount} Reviews</span>
              <span>·</span>
              <span className="font-medium">{product.weight}</span>
            </div>

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-2xl font-bold text-[#1B1917] tabular-nums">
                ${product.salePrice}
              </span>
              <span className="text-sm line-through text-[#999084] tabular-nums">
                ${product.originalPrice}
              </span>
            </div>

            <p className="text-xs text-[#544E47] leading-relaxed mb-4">
              {product.description}
            </p>

            {/* Flavor Notes */}
            <div className="mb-4">
              <span className="text-[11px] font-bold uppercase text-[#736B62] block mb-1.5">
                Sensory Notes
              </span>
              <div className="flex flex-wrap gap-1.5">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className="px-2.5 py-1 rounded-md bg-[#EFE9DE] text-[#2F2B26] text-xs font-medium"
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>

            {/* Grind selector */}
            <div className="mb-6">
              <span className="text-[11px] font-bold uppercase text-[#736B62] block mb-1.5">
                Grind Selection
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {(['Whole Bean', 'Espresso', 'Pour Over', 'French Press'] as const).map(
                  (opt) => (
                    <button
                      key={opt}
                      onClick={() => setGrind(opt)}
                      className={`py-1.5 px-2 text-xs rounded-lg font-medium border text-center transition-all ${
                        grind === opt
                          ? 'border-[#234133] bg-[#234133] text-white'
                          : 'border-[#D5CABB] text-[#554E46] hover:bg-[#EFE9DE]'
                      }`}
                    >
                      {opt}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Action */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-[#D5CABB] rounded-full bg-white px-2 py-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-2 text-sm font-bold text-[#6D655C]"
                >
                  -
                </button>
                <span className="px-2 text-xs font-bold tabular-nums">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-2 text-sm font-bold text-[#6D655C]"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAdd}
                className="flex-1 py-3 px-4 rounded-full bg-[#181614] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#234133] transition-all duration-200 smooth-press flex items-center justify-center gap-2"
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span>Added to Cart</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Cart · ${(product.salePrice * quantity).toFixed(0)}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
