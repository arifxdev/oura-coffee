import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, newQty: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.salePrice * item.quantity,
    0
  );
  const freeShippingThreshold = 100;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      onClearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-[#DDD5C8] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#E5DDD2] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#234133]" />
              <h2 className="font-display text-2xl tracking-wide uppercase text-[#1B1917]">
                Your Roaster Cart
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#7B7369] hover:bg-[#EDE5DA] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderConfirmed ? (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-in zoom-in duration-300" />
                <h3 className="font-display text-3xl text-[#1B1917]">
                  Order Confirmed!
                </h3>
                <p className="text-xs text-[#6B635A] max-w-xs mx-auto leading-relaxed">
                  Thank you! Your artisan batch coffee has been queued for roasting & packaging at Oura Coffee Flagship.
                </p>
                <div className="p-4 bg-[#EFE9DF] rounded-2xl text-left text-xs space-y-1.5 mt-6">
                  <div className="flex justify-between">
                    <span className="text-[#7A7167]">Order Ref:</span>
                    <span className="font-mono font-bold">#OURA-{Math.floor(1000 + Math.random() * 9000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#7A7167]">Est. Dispatch:</span>
                    <span className="font-medium text-[#234133]">Tomorrow Morning</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setOrderConfirmed(false);
                    onClose();
                  }}
                  className="w-full py-3 rounded-full bg-[#181614] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#234133] transition-colors mt-4"
                >
                  Continue Browsing
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EFE9DE] mx-auto flex items-center justify-center text-[#998F84]">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <p className="font-display text-2xl text-[#1B1917]">Cart Is Empty</p>
                <p className="text-xs text-[#7B7369]">
                  Explore our signature roasts and single origins to start your brew ritual.
                </p>
              </div>
            ) : (
              <>
                {/* Free shipping bar */}
                <div className="bg-[#EFE9DE] p-3.5 rounded-2xl">
                  <div className="flex justify-between text-[11px] font-semibold text-[#574F46] mb-1.5">
                    <span>
                      {subtotal >= freeShippingThreshold
                        ? '✨ Free Dispatch Qualified!'
                        : `Add $${(freeShippingThreshold - subtotal).toFixed(0)} for Free Dispatch`}
                    </span>
                    <span className="tabular-nums font-mono">{freeShippingProgress.toFixed(0)}%</span>
                  </div>
                  <div className="w-full bg-[#DDD4C7] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#234133] h-full transition-all duration-300"
                      style={{ width: `${freeShippingProgress}%` }}
                    />
                  </div>
                </div>

                {/* Items List */}
                <div className="divide-y divide-[#EADFCF]">
                  {items.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 items-center">
                      <div className="w-18 h-18 rounded-xl bg-white border border-[#DFD6C9] p-1.5 flex items-center justify-center shrink-0">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-bold uppercase text-[#857C72] tracking-wider block">
                          {item.product.badge}
                        </span>
                        <h4 className="font-display text-lg text-[#1B1917] truncate uppercase">
                          {item.product.name}
                        </h4>
                        <p className="text-xs font-semibold text-[#234133] tabular-nums">
                          ${item.product.salePrice}
                        </p>

                        {/* Quantity Stepper */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-[#D5CABB] rounded-lg bg-white overflow-hidden">
                            <button
                              onClick={() =>
                                onUpdateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-1 hover:bg-[#EFE9DF] transition-colors"
                            >
                              <Minus className="w-3 h-3 text-[#5A534B]" />
                            </button>
                            <span className="px-2.5 text-xs font-bold tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                onUpdateQuantity(item.product.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-[#EFE9DF] transition-colors"
                            >
                              <Plus className="w-3 h-3 text-[#5A534B]" />
                            </button>
                          </div>

                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            className="text-[#9C9286] hover:text-red-700 transition-colors p-1"
                            title="Remove"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Footer Checkout Module */}
          {!orderConfirmed && items.length > 0 && (
            <div className="p-6 border-t border-[#E5DDD2] bg-[#F5F0E8] space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-[#6D655C]">
                  <span>Subtotal</span>
                  <span className="font-bold text-[#1B1917] tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-[#6D655C]">
                  <span>Express Courier Dispatch</span>
                  <span className="font-medium text-[#234133]">
                    {subtotal >= freeShippingThreshold ? 'FREE' : '$6.00'}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1B1917] pt-2 border-t border-[#DFD6C9]">
                  <span>Total</span>
                  <span className="tabular-nums">
                    ${(subtotal + (subtotal >= freeShippingThreshold ? 0 : 6)).toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 rounded-full bg-[#181614] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#234133] transition-all duration-200 smooth-press flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Proceed To Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-[#8C8377] text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#234133]" />
                <span>Direct from Oura Malang Roastery · Guaranteed Fresh Roast</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
