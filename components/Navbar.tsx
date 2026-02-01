
import React from 'react';
import { AppView } from '../types';

interface NavbarProps {
  currentView: AppView;
  setView: (view: AppView) => void;
  cartCount: number;
  onOpenCart: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, setView, cartCount, onOpenCart }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 px-6 py-4 flex items-center justify-between">
      <div 
        className="flex items-center gap-2 cursor-pointer group"
        onClick={() => setView('Home')}
      >
        <div className="w-8 h-8 bg-cyan-500 rounded-sm transform rotate-45 group-hover:rotate-90 transition-transform duration-500"></div>
        <span className="text-2xl font-bold tracking-tighter glitch-text">MINIMAL7</span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
        {(['Home', 'Shop', 'Studio', 'Oracle'] as AppView[]).map((view) => (
          <button
            key={view}
            onClick={() => setView(view)}
            className={`transition-colors hover:text-cyan-400 ${
              currentView === view ? 'text-cyan-400' : 'text-slate-400'
            }`}
          >
            {view}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenCart}
          className="relative p-2 text-slate-300 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-slate-950">
              {cartCount}
            </span>
          )}
        </button>
        <button className="md:hidden p-2 text-slate-300">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
