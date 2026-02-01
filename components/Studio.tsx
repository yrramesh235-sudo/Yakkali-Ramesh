
import React, { useState } from 'react';
import { generateDesignConcept } from '../services/geminiService';

const Studio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      const img = await generateDesignConcept(prompt);
      setGeneratedImage(img);
    } catch (error) {
      console.error(error);
      alert("Failed to access the design core. Try again, hero.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black italic mb-4 tracking-tighter uppercase glitch-text">The Design Lab</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Unleash your inner creator. Input a theme or vibe, and our AI core will manifest a unique Minimal7 design concept just for you.
        </p>
      </div>

      <div className="anime-card-gradient border border-slate-800 rounded-2xl p-8 mb-8">
        <div className="mb-6">
          <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Design Prompt</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. Cyberpunk samurai with neon pink accents"
              className="flex-grow bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-cyan-500 focus:outline-none transition-colors"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="bg-cyan-500 hover:bg-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold px-8 py-3 rounded-lg uppercase tracking-widest transition-all"
            >
              {isGenerating ? 'Synthesizing...' : 'Create'}
            </button>
          </div>
        </div>

        <div className="aspect-square w-full max-w-md mx-auto relative border-2 border-slate-800 rounded-xl overflow-hidden bg-slate-900 flex items-center justify-center">
          {isGenerating ? (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              <span className="text-xs font-bold text-slate-500 animate-pulse uppercase tracking-widest">Generating Pattern...</span>
            </div>
          ) : generatedImage ? (
            <img src={generatedImage} alt="Generated Design" className="w-full h-full object-cover" />
          ) : (
            <div className="text-center px-10">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-slate-800 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-slate-600 text-sm mono uppercase tracking-widest">Input parameters to begin creation cycle</p>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
         <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
            <h4 className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1">PRO TIP</h4>
            <p className="text-xs text-slate-400">Use words like "Holographic", "Tech-stencil", or "Retro-manga" for better results.</p>
         </div>
         <div className="p-4 rounded-lg bg-slate-900/50 border border-slate-800">
            <h4 className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-1">COMING SOON</h4>
            <p className="text-xs text-slate-400">Soon you'll be able to print these designs on-demand. Join the waitlist.</p>
         </div>
      </div>
    </div>
  );
};

export default Studio;
