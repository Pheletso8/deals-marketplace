import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Mock product data
const products = [
  {
    id: 1,
    name: "MacBook Air M3",
    brand: "Apple",
    category: "Laptop",
    rating: 4.9,
    reviews: 2340,
    specs: ["256GB SSD", "8GB RAM"],
    price: 999,
    oldPrice: 1199,
    tags: ["Hot"],
    img: "https://via.placeholder.com/300x200?text=MacBook+Air+M3",
  },
  {
    id: 2,
    name: "PS5 Console",
    brand: "Sony",
    category: "Gaming",
    rating: 4.9,
    reviews: 23456,
    specs: ["825GB SSD", "16GB GDDR6"],
    price: 449,
    oldPrice: 499,
    tags: ["Hot"],
    img: "https://via.placeholder.com/300x200?text=PS5+Console",
  },
  {
    id: 3,
    name: "iPhone 15 Pro",
    brand: "Apple",
    category: "Phone",
    rating: 4.8,
    reviews: 5621,
    specs: ["128GB", "8GB RAM"],
    price: 899,
    oldPrice: 999,
    tags: ["Hot"],
    img: "https://via.placeholder.com/300x200?text=iPhone+15+Pro",
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    brand: "Apple",
    category: "Smartwatch",
    rating: 4.8,
    reviews: 4532,
    specs: [],
    price: 349,
    oldPrice: 399,
    tags: ["Hot"],
    img: "https://via.placeholder.com/300x200?text=Apple+Watch+Series+9",
  },
];

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
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [sortBy, setSortBy] = useState("Hottest");
  const [searchQuery, setSearchQuery] = useState("");
  const [llmSuggestion, setLlmSuggestion] = useState("");

  const navigate = useNavigate();

  const filteredProducts =
    selectedCategory === "All Products"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (sortBy === "Hottest") return b.rating - a.rating;
    if (sortBy === "Cheapest") return a.price - b.price;
    if (sortBy === "% Discount")
      return (b.oldPrice - b.price) / b.oldPrice - (a.oldPrice - a.price) / a.oldPrice;
    return 0;
  });

  const handleSearch = () => {
    const product = products.find((p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (product) {
      // Simulate LLM suggestion
      setLlmSuggestion(
        `Based on your requirements, we recommend the ${product.name} (${product.specs.join(
          ", "
        )}) as the best choice.`
      );
      navigate(`/product/${product.id}`);
    } else {
      alert("No matching product found.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen mt-20">
      {/* Search */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold mb-2">
          Discover Amazing <span className="text-teal-500">Tech Deals</span>
        </h2>
        <p className="text-gray-600 mb-4">
          Search for any tech product and let us find the best deals for you
        </p>
        <div className="flex justify-center gap-2 max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Search for tech deals..."
            className="grow p-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-teal-500 hover:bg-teal-600 text-white px-6 rounded-r-lg font-semibold"
          >
            Find Deals
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === cat
                ? "bg-teal-500 text-white"
                : "bg-white border border-gray-300 text-gray-700 hover:bg-teal-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Sort options */}
      <div className="flex items-center gap-4 mb-6 justify-center text-gray-700 font-medium">
        <span>Sort by:</span>
        {["Hottest", "Cheapest", "% Discount"].map((option) => (
          <button
            key={option}
            onClick={() => setSortBy(option)}
            className={`px-3 py-1 rounded-lg font-medium transition ${
              sortBy === option
                ? "bg-red-100 text-red-600"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-2xl shadow-sm p-4 flex flex-col"
          >
            <img
              src={product.img}
              alt={product.name}
              className="rounded-xl mb-4 object-cover h-40 w-full"
            />
            <div className="flex justify-between items-center text-sm text-gray-500 mb-1">
              <span>{product.brand}</span>
              <span>{product.category}</span>
            </div>
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <div className="flex items-center gap-2 text-teal-500 mb-2">
              <span>⭐ {product.rating}</span>
              <span className="text-gray-400 text-sm">
                ({product.reviews.toLocaleString()} reviews)
              </span>
            </div>
            <div className="flex gap-2 flex-wrap mb-2 text-gray-500 text-xs">
              {product.specs.map((spec, i) => (
                <span key={i} className="bg-gray-100 px-2 py-1 rounded-md">
                  {spec}
                </span>
              ))}
            </div>
            <div className="flex justify-between items-center mt-auto">
              <div>
                <p className="font-bold text-lg">${product.price}</p>
                {product.oldPrice && (
                  <p className="text-gray-400 line-through text-sm">
                    ${product.oldPrice}
                  </p>
                )}
              </div>
              <button
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-teal-100 text-teal-600 px-3 py-1 rounded-lg font-semibold hover:bg-teal-200"
              >
                Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* LLM Suggestion */}
      {llmSuggestion && (
        <div className="mt-4 p-4 bg-gray-900 text-green-400 rounded-lg font-mono text-sm">
          <p>{llmSuggestion}</p>
        </div>
      )}
    </div>
  );
}


