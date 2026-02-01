
import React from 'react';
import { AppView } from '../types';

interface HeroProps {
  onExplore: (view: AppView) => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Background Anime Patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-500 rounded-full blur-[120px]"></div>
        <div className="grid grid-cols-12 gap-4 h-full w-full p-4">
           {Array.from({ length: 48 }).map((_, i) => (
             <div key={i} className="border-[0.5px] border-slate-800/30"></div>
           ))}
        </div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <div className="inline-block px-3 py-1 bg-cyan-950 text-cyan-400 text-xs font-bold tracking-widest rounded mb-6 border border-cyan-500/30">
          SEASON 03: CYBER GENESIS
        </div>
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight italic">
          STYLE BEYOND THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-rose-400 glitch-text">7TH DIMENSION</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto font-light tracking-wide">
          Minimal7 is where elite anime aesthetics meet premium streetwear. 
          Limited drops. Maximum power levels. No fillers.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button 
            onClick={() => onExplore('Shop')}
            className="w-full sm:w-auto px-10 py-4 bg-white text-slate-950 font-bold uppercase tracking-widest hover:bg-cyan-400 hover:scale-105 transition-all duration-300 rounded-sm"
          >
            Enter the Shop
          </button>
          <button 
            onClick={() => onExplore('Oracle')}
            className="w-full sm:w-auto px-10 py-4 border border-slate-700 font-bold uppercase tracking-widest hover:border-cyan-400 hover:text-cyan-400 transition-all rounded-sm"
          >
            Consult the Oracle
          </button>
        </div>

        <div className="mt-20 grid grid-cols-3 gap-8 opacity-40">
           <div className="flex flex-col items-center">
              <span className="text-3xl font-bold mono">100%</span>
              <span className="text-[10px] uppercase tracking-widest">Protagonist Energy</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-3xl font-bold mono">LVL 99</span>
              <span className="text-[10px] uppercase tracking-widest">Quality Control</span>
           </div>
           <div className="flex flex-col items-center">
              <span className="text-3xl font-bold mono">∞</span>
              <span className="text-[10px] uppercase tracking-widest">Limited Supply</span>
           </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-10 flex flex-col gap-2">
        <div className="w-1 h-20 bg-gradient-to-b from-cyan-400 to-transparent"></div>
        <span className="text-[10px] transform -rotate-90 origin-left translate-x-3 text-slate-500 font-bold tracking-widest">MINIMAL7.IN</span>
      </div>
    </div>
  );
};

export default Hero;
