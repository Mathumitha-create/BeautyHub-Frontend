import { useState } from "react";
import { useNavigate } from "react-router";
import Card from "./Card";

// Presentational component: expects a `products` prop (array)
const Products = ({ products = [] }) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleAddToCart = async (product) => {
    try {
      const res = await fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product._id || product.id,
          quantity: 1,
        }),
      });

      if (res.status === 401) {
        alert("Your session has expired. Please log in again.");
        navigate("/login");
        return;
      }

      if (!res.ok) {
        const msg = await res.text().catch(() => "Failed to add to cart");
        throw new Error(msg || "Failed to add to cart");
      }

      await res.json();
      navigate("/cart");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to add to cart");
    }
  };
  const categories = ["All", "Skincare", "Makeup"];
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.Category === selectedCategory);

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          All Products
        </h1>

        <div className="flex justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 rounded-lg font-medium transition ${
                selectedCategory === cat
                  ? "bg-pink-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <Card
              key={product.id}
              product={product}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
