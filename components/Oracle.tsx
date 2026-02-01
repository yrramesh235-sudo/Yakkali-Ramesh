
import React, { useState } from 'react';
import { getStylingAdvice } from '../services/geminiService';

const Oracle: React.FC = () => {
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    try {
      const advice = await getStylingAdvice(query);
      setResponse(advice || "The Oracle is silent. Try again later.");
    } catch (error) {
      console.error(error);
      setResponse("Power levels are fluctuating. Connection lost.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-3xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-black italic mb-4 tracking-tighter uppercase text-rose-500">The Stylist Oracle</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          Need a fit for the upcoming anime convention or a date in the city? Ask the Oracle for protagonist-level styling advice.
        </p>
      </div>

      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-rose-500 to-cyan-500 rounded-2xl blur opacity-25"></div>
        <div className="relative bg-slate-950 border border-slate-800 rounded-2xl p-8">
          <div className="space-y-6">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">Your Style Quest</label>
              <textarea 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="How do I dress like a mysterious side character with techwear vibes?"
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-rose-500 focus:outline-none transition-colors h-32 resize-none"
              />
            </div>
            <button 
              onClick={handleAsk}
              disabled={isLoading || !query}
              className="w-full bg-rose-600 hover:bg-rose-500 disabled:opacity-50 text-white font-bold py-4 rounded-lg uppercase tracking-widest transition-all shadow-lg"
            >
              {isLoading ? 'Consulting the Spirits...' : 'Invoke the Oracle'}
            </button>
          </div>

          {(response || isLoading) && (
            <div className="mt-8 pt-8 border-t border-slate-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <h4 className="text-[10px] font-bold text-rose-500 uppercase tracking-widest mb-4">Oracle's Revelation</h4>
              {isLoading ? (
                <div className="space-y-3">
                  <div className="h-4 bg-slate-900 rounded animate-pulse w-full"></div>
                  <div className="h-4 bg-slate-900 rounded animate-pulse w-5/6"></div>
                  <div className="h-4 bg-slate-900 rounded animate-pulse w-4/6"></div>
                </div>
              ) : (
                <div className="prose prose-invert prose-slate max-w-none">
                  <p className="text-slate-300 italic leading-relaxed whitespace-pre-wrap">
                    {response}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Oracle;
