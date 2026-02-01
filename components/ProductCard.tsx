
import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="group relative flex flex-col anime-card-gradient border border-slate-800 rounded-lg overflow-hidden hover:border-cyan-500/50 transition-all duration-500">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
        />
        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-cyan-400 border border-cyan-500/30">
          PL: {product.powerLevel}
        </div>
        {product.category === 'Limited' && (
          <div className="absolute top-3 left-3 bg-rose-600 text-white text-[10px] font-black px-2 py-1 rounded uppercase tracking-tighter">
            Limited Drop
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold tracking-tight group-hover:text-cyan-400 transition-colors uppercase leading-none">
            {product.name}
          </h3>
          <span className="text-lg font-bold mono text-cyan-400">${product.price}</span>
        </div>
        
        <p className="text-xs text-slate-400 line-clamp-2 mb-4 font-light">
          {product.description}
        </p>

        <div className="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex gap-1">
            {product.tags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[9px] uppercase tracking-widest text-slate-500 border border-slate-800 px-1.5 py-0.5 rounded">
                #{tag}
              </span>
            ))}
          </div>
          <button 
            onClick={() => onAddToCart(product)}
            className="px-4 py-2 bg-slate-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all rounded"
          >
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
