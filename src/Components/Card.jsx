import { Star, ChevronRight } from "lucide-react";

export default function Card({ product, onClick }) {
  if (!product) return null;

  const discount = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div 
      className="group relative glass border border-white/10 rounded-3xl overflow-hidden hover:border-brand-primary/50 transition-all duration-500 cursor-pointer flex flex-col h-full bg-surface-900/40"
      onClick={onClick}
    >
      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-brand-primary text-white text-xs font-bold rounded-full shadow-lg shadow-brand-primary/20">
          -{discount}% OFF
        </div>
      )}

      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.img || product.imageUrl || "/api/placeholder/400/300"}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-950/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col grow">
        <div className="flex justify-between items-start mb-2">
          <span className="text-xs font-medium text-brand-primary uppercase tracking-wider">{product.category}</span>
          <div className="flex items-center gap-1 text-brand-accent">
            <Star size={14} fill="currentColor" />
            <span className="text-xs font-bold">{product.rating}</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-brand-primary transition-colors line-clamp-1">
          {product.name}
        </h3>
        
        <p className="text-sm text-gray-400 mb-6 line-clamp-2 grow font-light leading-relaxed">
          {product.description || "Premium performance and sleek design, perfect for your modern lifestyle."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-2xl font-black text-white">${product.price}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-500 line-through">${product.oldPrice}</span>
            )}
          </div>
          
          <button className="p-3 bg-white/5 group-hover:bg-brand-primary text-white rounded-2xl transition-all duration-300">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}


