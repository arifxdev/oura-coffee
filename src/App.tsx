import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { RoasterRibbon } from './components/RoasterRibbon';
import { BestProducts } from './components/BestProducts';
import { BrewPairEnjoy } from './components/BrewPairEnjoy';
import { SipsWorthSharing } from './components/SipsWorthSharing';
import { LoyaltyClub } from './components/LoyaltyClub';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { MenuModal } from './components/MenuModal';
import { ReservationModal } from './components/ReservationModal';
import { HistoryModal } from './components/HistoryModal';
import { Product, CartItem } from './types';
import { FEATURED_PRODUCTS } from './data/coffeeData';
import { Check, ShoppingBag } from 'lucide-react';

export default function App() {
  const [cart, setCart] = useState<CartItem[]>([
    { product: FEATURED_PRODUCTS[1], quantity: 1, grindOption: 'Whole Bean' },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuInitialCategory, setMenuInitialCategory] = useState<'Coffee' | 'Food'>('Coffee');
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 2400);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, grindOption: 'Whole Bean' }];
    });
    showToast(`Added ${quantity}x ${product.name} to cart`);
  };

  const handleUpdateQuantity = (productId: string, newQty: number) => {
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleOpenMenuWithCategory = (category: 'Coffee' | 'Food' = 'Coffee') => {
    setMenuInitialCategory(category);
    setIsMenuOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#ECE7DF] text-[#1D1B18] font-sans-clean cafe-grain relative flex flex-col">
      {/* Top Navigation Bar */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMenu={handleOpenMenuWithCategory}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenStory={() => setIsHistoryOpen(true)}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreMenu={() => handleOpenMenuWithCategory('Coffee')}
          onExploreProducts={() => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* Clean white roaster ribbon directly under hero */}
        <RoasterRibbon />

        {/* Featured 3-Card Product Grid ("BEST PRODUCTS") */}
        <BestProducts
          onAddToCart={handleAddToCart}
          onQuickView={(product) => setQuickViewProduct(product)}
        />

        {/* 4-Item Capsule Gallery ("BREW. PAIR. ENJOY.") */}
        <BrewPairEnjoy
          onOpenFullMenu={() => handleOpenMenuWithCategory('Food')}
        />

        {/* Forest Green Deep Container ("SIPS WORTH SHARING") */}
        <SipsWorthSharing
          onOpenReservation={() => setIsReservationOpen(true)}
        />

        {/* Loyalty Program ("BUY 10 DRINKS, GET 1 FREE") with Magnetic Interaction */}
        <LoyaltyClub />
      </main>

      {/* Footer */}
      <Footer
        onOpenMenu={() => handleOpenMenuWithCategory('Coffee')}
        onOpenReservation={() => setIsReservationOpen(true)}
        onOpenStory={() => setIsHistoryOpen(true)}
      />

      {/* Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
      />

      {/* Product Quick View Modal */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Full Dine-In & Beverage Menu Modal */}
      <MenuModal
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        initialCategory={menuInitialCategory}
        onOrderItem={(name, price) => {
          showToast(`Added ${name} (${price}) to table order`);
        }}
      />

      {/* Reservation Booking Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
      />

      {/* Heritage & Roastery Story Modal */}
      <HistoryModal
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-[#181614] text-[#FAF8F5] px-4 py-3 rounded-2xl shadow-2xl border border-white/10 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="w-6 h-6 rounded-full bg-[#234133] flex items-center justify-center text-emerald-400">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span className="text-xs font-semibold">{toastMessage}</span>
          <button
            onClick={() => setIsCartOpen(true)}
            className="ml-2 text-xs font-bold text-[#8FAC9A] hover:underline uppercase"
          >
            View Cart
          </button>
        </div>
      )}
    </div>
  );
}
