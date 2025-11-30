// src/Pages/ProductPage.jsx
import { useParams } from "react-router-dom";
import products from "../data/products";
import { motion } from "framer-motion";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return (
      <div className="p-6 mt-20 text-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <motion.div className="p-6 mt-20 bg-gray-50 min-h-screen flex justify-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md p-6">
        <div className="flex gap-6 flex-col md:flex-row">
          <img src={product.img} alt={product.name} className="rounded-xl w-full md:w-1/2 object-cover shadow-sm" />
          <div className="md:flex-1">
            <h1 className="text-2xl font-bold mb-1">{product.name}</h1>
            <p className="text-gray-600 mb-3">{product.brand}</p>

            <div className="flex gap-2 flex-wrap mb-4 text-gray-500 text-sm">
              {(product.specs || []).map((s, i) => <span key={i} className="bg-gray-100 px-2 py-1 rounded-md">{s}</span>)}
            </div>

            <p className="text-2xl font-bold mb-2">${product.price}</p>
            {product.oldPrice && <p className="text-gray-400 line-through mb-4">${product.oldPrice}</p>}

            <p className="mb-4 text-gray-700">Category: <span className="font-medium">{product.category}</span></p>
            <p className="text-gray-700">⭐ {product.rating} ({product.reviews.toLocaleString()} reviews)</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
