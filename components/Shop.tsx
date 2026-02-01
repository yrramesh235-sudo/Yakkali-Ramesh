
import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ShopProps {
  onAddToCart: (product: Product) => void;
}

const Shop: React.FC<ShopProps> = ({ onAddToCart }) => {
  const [filter, setFilter] = useState<'All' | 'Hoodie' | 'T-Shirt' | 'Limited'>('All');

  const filteredProducts = useMemo(() => {
    if (filter === 'All') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === filter);
  }, [filter]);

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-end justify-between mb-12 gap-6">
        <div>
          <h2 className="text-4xl font-black italic mb-2 tracking-tighter uppercase">Available Drops</h2>
          <p className="text-slate-500 text-sm mono">Current stock intensity: HIGH // Synchronization complete</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {(['All', 'Hoodie', 'T-Shirt', 'Limited'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-cyan-500 text-white shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-20 border-2 border-dashed border-slate-800 rounded-xl">
           <span className="text-slate-500 uppercase tracking-widest font-bold">Error: No items found in this dimension.</span>
        </div>
      )}
    </div>
  );
};

export default Shop;
