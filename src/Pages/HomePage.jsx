import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api";
import productsFallback from "../data/products";
import { motion, AnimatePresence } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';
import { Search, Sparkles, TrendingUp, ChevronRight, AlertCircle, CheckCircle2, Loader2, Info } from "lucide-react";
import Card from "../Components/Card";

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

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function HomePage() {
  const [products, setProducts] = useState(productsFallback);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Hottest");
  const [searchQuery, setSearchQuery] = useState("");
  const [agentMessage, setAgentMessage] = useState("");
  const [showInsights, setShowInsights] = useState(false);

  const navigate = useNavigate();

  const handleError = useCallback((msg, details = "") => {
    const fullMessage = `${msg} ${details ? `Details: ${details}` : ''}`;
    setError(fullMessage);
    setAgentMessage(`❌ ${fullMessage}`);
    setLoading(false);
  }, []);

  const fetchQueryStatus = useCallback(async (queryId) => {
    try {
      const statusResponse = await api.get(`/v1/queries/${queryId}`);
      const statusData = statusResponse.data;

      if (statusData.status?.phase === 'done') {
        const finalMessage = statusData.status?.responses?.[0]?.content 
                            ?? "AI returned an empty response, but completed successfully.";
        setError(null);
        setAgentMessage(finalMessage);
        setLoading(false);
        setShowInsights(true);
      } else if (statusData.status?.phase === 'failed' || statusData.status?.phase === 'error') {
        const failureDetails = statusData.status?.responses?.[0]?.content 
                            ?? statusData.status?.conditions?.[0]?.message 
                            ?? "No specific details provided.";
        handleError("AI query processing failed.", failureDetails);
      } else {
        setTimeout(() => fetchQueryStatus(queryId), 5000);
      }
    } catch (err) {
      const errorDetails = err.response?.data?.detail || err.message;
      handleError("Network error while checking status.", errorDetails);
    }
  }, [handleError]);

  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;

    setError(null);
    setLoading(true);
    setShowInsights(false);
    setAgentMessage(`⏳ Analyzing the best tech deals for "${searchQuery}"...`);

    try {
      const queryId = uuidv4();
      await api.post("/v1/queries", {
          type: 'user',
          name: queryId,
          input: searchQuery,
          targets: [{ type: 'team', name: 'test-team' }],
        }
      );
      await sleep(1000);
      fetchQueryStatus(queryId);
    } catch (err) {
      const errorDetails = err.response?.data?.detail || err.message;
      handleError("Search request failed.", errorDetails);
    }
  };

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

  return (
    <div className="min-h-screen bg-surface-950 text-white pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-full bg-brand-primary/10 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-4xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-white/10 mb-8"
          >
            <TrendingUp size={16} className="text-brand-secondary" />
            <span className="text-sm font-bold tracking-wide uppercase">Black Friday Deals Live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-6 tracking-tight leading-none"
          >
            Smart Tech. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Premium Deals.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Experience the next generation of deal hunting. Our AI agents browse the web to find your perfect tech match at the lowest price.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative max-w-2xl mx-auto group"
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-primary to-brand-secondary rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center bg-surface-900 border border-white/10 rounded-2xl p-2 pl-6 focus-within:border-brand-primary/50 transition-all">
              <Search className="text-gray-500" size={20} />
              <input
                type="text"
                placeholder="What tech are you looking for today?"
                className="bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 w-full px-4 text-lg outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                disabled={loading}
              />
              <button
                onClick={handleAiSearch}
                disabled={loading}
                className="bg-brand-primary hover:bg-brand-primary/90 disabled:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all flex items-center gap-2 shadow-xl shadow-brand-primary/20"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Sparkles size={20} />}
                <span>{loading ? 'Analyzing...' : 'Find Deals'}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* AI Insights Toast/Panel */}
      <AnimatePresence>
        {(agentMessage || showInsights) && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="max-w-4xl mx-auto px-6 mb-12"
          >
            <div className={`relative glass border p-8 rounded-3xl overflow-hidden ${
              error ? 'border-red-500/30' : 'border-brand-primary/30'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-3xl -z-10" />
              <div className="flex items-start gap-6">
                <div className={`p-4 rounded-2xl ${
                  error ? 'bg-red-500/10' : 'bg-brand-primary/10'
                }`}>
                  {loading ? <Loader2 className="text-brand-primary animate-spin" size={24} /> : 
                   error ? <AlertCircle className="text-red-500" size={24} /> : 
                   <Sparkles className="text-brand-primary" size={24} />}
                </div>
                <div>
                  <h4 className="text-lg font-black mb-2 flex items-center gap-2">
                    DealPulse AI Insight
                    {!loading && !error && <CheckCircle2 className="text-brand-secondary" size={16} />}
                  </h4>
                  <p className="text-gray-300 leading-relaxed font-light whitespace-pre-line">
                    {agentMessage}
                  </p>
                  {showInsights && !loading && (
                    <div className="mt-4 flex items-center gap-2 text-xs text-brand-primary font-bold uppercase tracking-widest">
                      <Info size={14} />
                      Verified by Real-time Web Crawler
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Discovery Area */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all border ${
                  selectedCategory === cat
                    ? "bg-brand-primary border-brand-primary shadow-lg shadow-brand-primary/20 text-white"
                    : "glass border-white/5 text-gray-400 hover:text-white hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 bg-surface-900 border border-white/5 rounded-2xl p-1">
            <span className="pl-4 text-xs font-bold text-gray-500 uppercase tracking-widest">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-sm font-bold border-none focus:ring-0 text-white pr-8 outline-none cursor-pointer"
            >
              <option value="Hottest" className="bg-surface-900">Hottest</option>
              <option value="Cheapest" className="bg-surface-900">Cheapest</option>
              <option value="% Discount" className="bg-surface-900">% Discount</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {sortedProducts.map((product) => (
              <motion.div
                key={product.id || uuidv4()}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card 
                  product={product} 
                  onClick={() => navigate(`/product/${product.id}`)} 
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </div>
  );
}

export default HomePage;