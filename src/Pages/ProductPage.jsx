import { useParams } from "react-router-dom";

// Reuse the same product data for simplicity
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

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) return <p className="p-6">Product not found.</p>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-600 mb-2">{product.brand}</p>
      <img
        src={product.img}
        alt={product.name}
        className="my-4 w-full max-w-md rounded-xl object-cover"
      />
      <div className="flex gap-2 flex-wrap mb-2 text-gray-500 text-sm">
        {product.specs.map((spec, i) => (
          <span key={i} className="bg-gray-100 px-2 py-1 rounded-md">
            {spec}
          </span>
        ))}
      </div>
      <p className="font-bold text-xl mb-2">${product.price}</p>
      {product.oldPrice && (
        <p className="text-gray-400 line-through mb-4">${product.oldPrice}</p>
      )}
      <p className="text-gray-700">
        Category: <span className="font-medium">{product.category}</span>
      </p>
      <p className="text-gray-700">
        Rating: <span className="font-medium">⭐ {product.rating}</span> (
        {product.reviews.toLocaleString()} reviews)
      </p>
    </div>
  );
}
