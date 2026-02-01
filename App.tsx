
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Shop from './components/Shop';
import Studio from './components/Studio';
import Oracle from './components/Oracle';
import Cart from './components/Cart';
import { AppView, CartItem, Product } from './types';
import { SIZES } from './constants';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('Home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const handleAddToCart = (product: Product) => {
    // Default to 'M' for simplicity in this demo, usually would prompt for size
    const size = SIZES[1];
    
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id && item.selectedSize === size);
      if (existing) {
        return prev.map(item => 
          item.id === product.id && item.selectedSize === size 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prev, { ...product, quantity: 1, selectedSize: size }];
    });
    
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (id: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.id === id && item.selectedSize === size)));
  };

  const handleUpdateQty = (id: string, size: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id && item.selectedSize === size) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-white">
      <Navbar 
        currentView={view} 
        setView={setView} 
        cartCount={cartItems.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <main className="flex-grow">
        {view === 'Home' && <Hero onExplore={setView} />}
        {view === 'Shop' && <Shop onAddToCart={handleAddToCart} />}
        {view === 'Studio' && <Studio />}
        {view === 'Oracle' && <Oracle />}
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-cyan-500 rounded-sm transform rotate-45"></div>
              <span className="text-xl font-bold tracking-tighter uppercase italic">Minimal7</span>
            </div>
            <p className="text-slate-500 text-xs mono">© 2025 MINIMAL7 CORE. ALL RIGHTS RESERVED.</p>
          </div>
          
          <div className="flex gap-8 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Manifesto</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Supply Chain</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Dimension 7 Portal</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">FAQ</a>
          </div>

          <div className="flex gap-4">
            {['IG', 'X', 'DS'].map(social => (
              <div key={social} className="w-8 h-8 rounded border border-slate-800 flex items-center justify-center text-[10px] font-bold hover:bg-slate-900 cursor-pointer transition-colors">
                {social}
              </div>
            ))}
          </div>
        </div>
      </footer>

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems}
        onRemove={handleRemoveFromCart}
        onUpdateQty={handleUpdateQty}
      />

      {/* Persistent Action Bar for Mobile */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-slate-950/80 backdrop-blur-xl border border-slate-800 px-6 py-3 rounded-full flex gap-8 shadow-2xl">
        <button onClick={() => setView('Shop')} className={`text-xs font-bold uppercase ${view === 'Shop' ? 'text-cyan-400' : 'text-slate-500'}`}>Shop</button>
        <button onClick={() => setView('Studio')} className={`text-xs font-bold uppercase ${view === 'Studio' ? 'text-cyan-400' : 'text-slate-500'}`}>Studio</button>
        <button onClick={() => setView('Oracle')} className={`text-xs font-bold uppercase ${view === 'Oracle' ? 'text-cyan-400' : 'text-slate-500'}`}>Oracle</button>
      </div>
    </div>
  );
};

export default App;
