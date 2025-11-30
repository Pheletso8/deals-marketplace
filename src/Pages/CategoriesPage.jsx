// src/Pages/CategoriesPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import products from "../data/products";
import { motion } from "framer-motion";

const categories = ["Laptops", "Phones", "Headphones", "Tablets", "Smartwatches", "Cameras", "Gaming"];

export default function CategoriesPage() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const navigate = useNavigate();

  const filtered = products.filter((p) => p.category === selectedCategory);

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20">
      <motion.h2 className="text-3xl font-bold mb-6 text-center" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
        Browse by <span className="text-teal-500">Category</span>
      </motion.h2>

      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((c) => (
          <button key={c} onClick={() => setSelectedCategory(c)} className={`px-4 py-2 rounded-lg transition font-medium ${selectedCategory === c ? "bg-teal-500 text-white shadow" : "bg-white border border-gray-300 hover:bg-teal-100"}`}>
            {c}
          </button>
        ))}
      </div>

      <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        {filtered.map((p) => (
          <motion.div key={p.id} className="bg-white rounded-2xl shadow-md p-4 flex flex-col hover:shadow-xl hover:-translate-y-1 transition" whileHover={{ scale: 1.02 }}>
            <img src={p.img} alt={p.name} className="rounded-xl object-cover h-40 w-full mb-4" />
            <h3 className="font-semibold text-lg">{p.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{p.brand}</p>
            <button onClick={() => navigate(`/product/${p.id}`)} className="bg-teal-100 hover:bg-teal-200 text-teal-700 px-3 py-1 rounded-lg font-semibold mt-auto">Details</button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}