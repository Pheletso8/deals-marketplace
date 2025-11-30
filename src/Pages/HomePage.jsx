// src/Pages/HomePage.jsx
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Services/api"; // axios instance
import productsFallback from "../data/products";
import { motion } from "framer-motion";
import { v4 as uuidv4 } from 'uuid';

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

// Helper function to create a delay/sleep (in milliseconds)
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

function HomePage() {
  const [products, setProducts] = useState(productsFallback);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Hottest");
  const [searchQuery, setSearchQuery] = useState("");
  const [agentMessage, setAgentMessage] = useState("Enter a search term above to get AI recommendations!");

  const navigate = useNavigate();

  // Improved error handler for explicit messages
  const handleError = useCallback((msg, details = "") => {
    const fullMessage = `${msg} ${details ? `Details: ${details}` : ''}`;
    console.error(fullMessage);
    setError(fullMessage);
    setAgentMessage(`❌ Error: ${fullMessage}`);
    setLoading(false);
  }, []);

  const fetchQueryStatus = useCallback(async (queryId) => {
    try {
      const statusResponse = await api.get(`/v1/queries/${queryId}`);
      const statusData = statusResponse.data;

      if (statusData.status === 'completed') {
        // SUCCESS PATH: Clear message, display final AI explanation
        const finalMessage = statusData?.response?.response || "AI returned an empty response, but completed successfully.";
        setError(null);
        setAgentMessage(`✅ Success: ${finalMessage}`);
        setLoading(false);

      } else if (statusData.status === 'failed' || statusData.status === 'error') {
          // FAILURE PATH: Agent/backend crashed or reported failure
          const failureDetails = statusData?.response?.error_detail || "No specific details provided.";
          handleError("Ark query processing failed on the server. Agents crashed.", failureDetails);
      } else {
        // POLLING PATH: Not done yet, continue polling
        setTimeout(() => fetchQueryStatus(queryId), 2000);
      }
    } catch (err) {
      // NETWORK ERROR DURING POLLING PATH: Request itself failed (like the 500 error you saw)
      const errorDetails = err.response?.data?.detail || err.message;
      handleError("Network error while checking query status. Backend might be down.", errorDetails);
    }
  }, [handleError]);


  // This function handles the dynamic AI search request
  const handleAiSearch = async () => {
    if (!searchQuery.trim()) return;

    setError(null);
    setLoading(true);
    setAgentMessage(`⏳ AI is processing your query: "${searchQuery}"...`);

    try {
      const queryId = uuidv4();

      // Step 1: Send the initial request with the DYNAMIC input
      await api.post("/v1/queries", {
          type: 'user',
          name: queryId,
          input: searchQuery,
          targets: [{
            type: 'team',
            name: 'test-team',
          }],
        }
      );

      // Add a small delay to mitigate initial race condition
      await sleep(500);

      // Step 2: Start polling for the result using the same ID
      fetchQueryStatus(queryId);

    } catch (err) {
      // NETWORK ERROR ON INITIAL POST PATH: Request failed immediately
      const errorDetails = err.response?.data?.detail || err.message;
      handleError("Initial API request failed. Check network or API endpoint.", errorDetails);
    }
  };


  // *** The initial useEffect is now empty/removed ***
  useEffect(() => {
    // No automatic fetching happens on page load.
  }, []);


  // FILTER + SORT (Applies to the static product grid)
  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "Hottest") return (b.rating || 0) - (a.rating || 0);
    if (sortBy === "Cheapest") return (a.price || 0) - (b.price || 0);
    if (sortBy === "% Discount") {
      const ad =
        ((a.oldPrice || a.price) - (a.price || 0)) /
        (a.oldPrice || a.price || 1);
      const bd =
        ((b.oldPrice || b.price) - (b.price || 0)) /
        (b.oldPrice || b.price || 1);
      return bd - ad;
    }
    return 0;
  });

  // Limit the products array to just the first 3 items for display
  const limitedProducts = sortedProducts.slice(0, 3);

  // Removed confusing local message generation useEffect

  const handleSearchClick = () => {
    handleAiSearch();
  };


  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20">
      {/* This error alert window is now dynamically styled to show good or bad status */}
      {error && (
        <motion.div
          className="max-w-3xl mx-auto bg-red-50 border border-red-500 text-red-900 p-4 rounded-xl mb-6"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {error}
        </motion.div>
      )}
      {/* We keep the main agent message window for the final response */}

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold animate-pulse p-4 border m-2 border-gray-300">
            Black friday is here! 🎁
          </h1>
          <h2 className="text-3xl font-bold mb-2">
            Discover Amazing{" "}
            <span className="text-blue-400">Tech Deals</span>
          </h2>
          <p className="text-gray-600 mb-4">
            Search for any tech product and let our AI assistant curate the
            best deals
          </p>

          <div className="flex justify-center gap-2 max-w-lg mx-auto">
            <input
              type="text"
              placeholder="Search for tech deals..."
              className="grow p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSearchClick();
              }}
              disabled={loading}
            />
            <button
              onClick={handleSearchClick}
              className="bg-blue-400 hover:bg-teal-600 text-white px-6 rounded-r-lg font-semibold flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Find Deals'}
            </button>
          </div>
        </div>

        {/* This is the LLM output window, just below the search input */}
        {/* We use a dynamic style here too for visual confirmation of status */}
        {agentMessage && (
          <motion.div
            className={`max-w-3xl mx-auto shadow-md p-4 rounded-xl mb-8 border ${
                agentMessage.startsWith('❌ Error:') || agentMessage.includes('failed') ? 'bg-red-100 border-red-500 text-red-800' :
                agentMessage.startsWith('✅ Success:') ? 'bg-green-100 border-green-500 text-green-800' : 'bg-white border-gray-200 text-gray-800'
            } whitespace-pre-line`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="leading-relaxed">{agentMessage}</p>
          </motion.div>
        )}

        {/* categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? "bg-blue-400 text-white"
                  : "bg-white border border-gray-300 text-gray-700 hover:bg-blue-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div className="flex justify-end mb-4 max-w-7xl mx-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
          >
            <option value="Hottest">Hottest</option>
            <option value="Cheapest">Cheapest</option>
            <option value="% Discount">% Discount</option>
          </select>
        </div>

        {/* product grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 max-w-7xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {limitedProducts.map((product) => (
            <motion.div
              key={product.id || uuidv4()}
              className="bg-white p-4 rounded-xl shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col h-full"
              onClick={() => navigate(`/product/${product.id || 'fallback-id'}`)}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
                <img
                    src={product.imageUrl || 'via.placeholder.com'}
                    alt={product.name}
                    className="w-full h-48 object-cover mb-4 rounded-lg"
                />
                <h3 className="text-lg font-semibold mb-2 text-gray-800">{product.name}</h3>
                {/* The corrected description logic */}
                <p className="text-sm text-gray-500 mb-4 grow">
                    {product.description?.substring(0, 100) || 'No description available.'}
                    {product.description && product.description.length > 100 ? '...' : ''}
                </p>
                <div className="flex justify-between items-center mt-auto">
                    <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                    {product.oldPrice && (
                    <p className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</p>
                    )}
                    <span className="text-sm font-medium text-yellow-500">
                    ⭐ {product.rating.toFixed(1)}
                    </span>
                </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HomePage;