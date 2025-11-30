// src/Pages/HomePage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api"; // your axios instance
import productsFallback from "../data/products";
import { motion } from "framer-motion";

const categories = [
  "All Products",
  "Laptops",
  "Phones",
  "Headphones",
  "Tablets",
  "Smartwatches",
  "Cameras",
  "Gaming",
];

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Hottest");
  const [searchQuery, setSearchQuery] = useState("");
  const [agentMessage, setAgentMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setError(null);
        const response = await api.post("/"); // leave your base URL as-is
        // server may return { products: [...] } or an array — normalize:
        const data = response?.data?.products ?? response?.data ?? [];
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
        setError("Ark Dashboard API unreachable — using demo data.");
        setProducts(productsFallback);
        setAgentMessage("Using demo data because the backend couldn't be reached.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // FILTER + SORT
  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Hottest") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "Cheapest") return (a.price || 0) - (b.price || 0);
    if (sortBy === "% Discount") {
      const ad = ((a.oldPrice || a.price) - (a.price || 0)) / (a.oldPrice || a.price || 1);
      const bd = ((b.oldPrice || b.price) - (b.price || 0)) / (b.oldPrice || b.price || 1);
      return bd - ad;
    }
    return 0;
  });

  // DYNAMIC MESSAGE
  useEffect(() => {
    const generate = () => {
      if (!sortedProducts.length) return "I couldn't find any products matching your filters.";
      const top = sortedProducts[0];
      const discount = Math.round(((top.oldPrice || top.price) - (top.price || 0)) / (top.oldPrice || top.price || 1) * 100);
      return `✨ Top pick: ${top.name}\n• ${top.rating || "N/A"}⭐ • $${top.price} (was $${top.oldPrice || "—"}) • ${discount}% off`;
    };
    setAgentMessage(generate());
  }, [selectedCategory, sortBy, searchQuery, products]);

  const handleSearch = () => {
    const found = products.find((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setAgentMessage((prev) => prev); // keep current message
    if (found) navigate(`/product/${found.id}`);
    else setAgentMessage(`No results for "${searchQuery}". Try another name.`);
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-50 min-h-screen mt-20 flex items-center justify-center">
        <div className="flex items-center gap-4 text-gray-600 text-lg">
          <span className="loading loading-dots loading-xl"></span>
          <span>Fetching products from backend</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20">
      {error && (
        <motion.div className="max-w-3xl mx-auto bg-yellow-50 border border-yellow-300 text-yellow-900 p-4 rounded-xl mb-6"
          initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}>
          {error}
        </motion.div>
      )}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold mb-2">
            Discover Amazing <span className="text-blue-400">Tech Deals</span>
          </h2>
          <p className="text-gray-600 mb-4">Search for any tech product and let our AI assistant curate the best deals</p>

          <div className="flex justify-center gap-2 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search for tech deals..."
              className="grow p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button onClick={handleSearch} className="bg-blue-400 hover:bg-teal-600 text-white px-6 rounded-r-lg font-semibold">
              Find Deals
            </button>
          </div>
        </div>

        {/* AI message */}
        {agentMessage && (
          <motion.div className="max-w-3xl mx-auto bg-white shadow-md p-4 rounded-xl mb-8 border border-gray-200 whitespace-pre-line"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-gray-800 leading-relaxed">{agentMessage}</p>
          </motion.div>
        )}

        {/* categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${selectedCategory === cat ? "bg-blue-400 text-white" : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-300"}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* sort */}
        <div className="flex items-center gap-4 mb-6 justify-center text-gray-700 font-medium">
          <span>Sort by:</span>
          {["Hottest", "Cheapest", "% Discount"].map((option) => (
            <button key={option} onClick={() => setSortBy(option)} className={`px-3 py-1 rounded-lg font-medium transition ${sortBy === option ? "bg-red-100 text-red-600" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}>
              {option}
            </button>
          ))}
        </div>

        {/* grid */}
        <motion.div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {sortedProducts.map((product) => (
            <motion.div key={product.id} className="bg-white rounded-2xl shadow-sm p-4 flex flex-col" whileHover={{ scale: 1.03, y: -6 }}>
              <img src={product.img} alt={product.name} className="rounded-xl mb-4 object-cover h-40 w-full" />
              <div className="flex justify-between items-center text-sm text-gray-500 mb-1"><span>{product.brand}</span><span>{product.category}</span></div>
              <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
              <div className="flex items-center gap-2 text-teal-500 mb-2"><span>⭐ {product.rating}</span><span className="text-gray-400 text-sm">({product.reviews?.toLocaleString() || 0} reviews)</span></div>
              <div className="flex gap-2 flex-wrap mb-2 text-gray-500 text-xs">{(product.specs || []).map((spec, i) => <span key={i} className="bg-gray-100 px-2 py-1 rounded-md">{spec}</span>)}</div>

              <div className="flex justify-between items-center mt-auto">
                <div>
                  <p className="font-bold text-lg">${product.price}</p>
                  {product.oldPrice && <p className="text-gray-400 line-through text-sm">${product.oldPrice}</p>}
                </div>
                <button onClick={() => navigate(`/product/${product.id}`)} className="bg-blue-200 text-blue-600 px-3 py-1 rounded-lg font-semibold hover:bg-blue-300">Details</button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {sortedProducts.length === 0 && <div className="text-center py-12 text-gray-500">No products found matching your criteria.</div>}
      </motion.div>
    </div>
  );
}