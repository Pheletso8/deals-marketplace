import { useParams, useNavigate } from "react-router-dom";
import products from "../data/products";
import { motion } from "framer-motion";
import { Star, ArrowLeft, ShoppingBag, ShieldCheck, Zap, Globe } from "lucide-react";

export default function ProductPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => String(p.id) === String(id));


  if (!product) {
    return (
      <div className="min-h-screen bg-surface-950 flex items-center justify-center text-center px-6">
        <div className="glass p-12 rounded-3xl border border-white/10">
          <p className="text-gray-400 text-xl font-light mb-6">Product not found in our elite collection.</p>
          <button 
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-brand-primary text-white rounded-full font-bold shadow-lg shadow-brand-primary/20"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-950 pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-500 hover:text-white mb-12 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold text-sm tracking-widest uppercase">Back to Collection</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Product Image */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-brand-primary/10 blur-3xl rounded-full -z-10" />
            <div className="glass p-4 rounded-[2rem] border border-white/10 shadow-2xl overflow-hidden aspect-square">
              <img 
                src={product.img} 
                alt={product.name} 
                className="w-full h-full object-cover rounded-[1.5rem]" 
              />
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-brand-primary/20 text-brand-primary text-xs font-black rounded-full uppercase tracking-tighter">
                {product.brand}
              </span>
              <div className="flex items-center gap-1 text-brand-accent">
                <Star size={16} fill="currentColor" />
                <span className="text-sm font-bold">{product.rating}</span>
                <span className="text-gray-500 font-medium text-xs ml-1">({product.reviews.toLocaleString()} verified reviews)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">{product.name}</h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-4xl font-black text-white">${product.price}</span>
              {product.oldPrice && (
                <span className="text-xl text-gray-600 line-through font-light">${product.oldPrice}</span>
              )}
            </div>

            <p className="text-gray-400 text-lg font-light leading-relaxed mb-10 border-l-2 border-brand-primary/30 pl-6">
              Experience unparalleled performance and industry-leading design with the {product.name}. 
              Crafted for those who demand the absolute best in tech excellence.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {(product.specs || []).map((s, i) => (
                <div key={i} className="glass p-4 rounded-2xl border border-white/5 flex items-center gap-3">
                  <div className="p-2 bg-brand-primary/10 rounded-lg">
                    <Zap size={16} className="text-brand-primary" />
                  </div>
                  <span className="text-sm font-bold text-gray-300">{s}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex-1 bg-brand-primary hover:bg-brand-primary/90 text-white py-5 rounded-2xl font-black text-lg transition-all shadow-xl shadow-brand-primary/30 flex items-center justify-center gap-3 group">
                <ShoppingBag size={24} className="group-hover:scale-110 transition-transform" />
                Buy Now
              </button>
              <button className="flex-1 glass border-white/10 hover:border-white/20 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3">
                <ShieldCheck size={24} />
                Warranty Included
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-white/5 flex items-center gap-12 text-gray-500 text-xs font-bold uppercase tracking-widest">
              <div className="flex items-center gap-2">
                <Globe size={16} />
                Global Shipping
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} />
                Secure Payment
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

