import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, CheckCircle2 } from "lucide-react";
import Card from "../Components/Card";

const categories = ["Laptops", "Phones", "Headphones", "Tablets", "Smartwatches", "Cameras", "Gaming"];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();

  const filtered = products.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-6 bg-surface-950 min-h-screen pt-32 pb-20">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-6 text-brand-primary">
            <LayoutGrid size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Collections</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            Browse by <span className="text-brand-primary">Category</span>
          </h2>
          <p className="text-gray-400 font-light max-w-xl mx-auto">
            Discover premium tech across our curated collections, all verified for quality and price authenticity.
          </p>
        </motion.div>

        <div className="flex flex-wrap gap-3 justify-center mb-16">
          {categories.map((c) => (
            <button 
              key={c} 
              onClick={() => setSelectedCategory(c)} 
              className={`px-8 py-3 rounded-full transition-all font-bold text-sm border flex items-center gap-2 ${
                selectedCategory === c 
                ? "bg-brand-primary border-brand-primary text-white shadow-xl shadow-brand-primary/20" 
                : "glass border-white/5 text-gray-400 hover:text-white hover:border-white/10"
              }`}
            >
              {selectedCategory === c && <CheckCircle2 size={16} />}
              {c}
            </button>
          ))}
        </div>

        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filtered.map((p) => (
              <motion.div 
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  product={p} 
                  onClick={() => navigate(`/product/${p.id}`)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}