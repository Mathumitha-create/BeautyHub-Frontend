import { Link } from "react-router";
import Card from "./Card";

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      Name: "Moisturizing Cream",
      SellingPrice: 500,
      OriginalPrice: 900,
      image:
        "https://i.pinimg.com/736x/30/a1/8a/30a18aeee6e0a2dc3a15971c77251887.jpg",
      Category: "Skincare",
    },
    {
      id: 2,
      Name: "Face Oil",
      SellingPrice: 600,
      OriginalPrice: 1000,
      image:
        "https://i.pinimg.com/736x/fb/8e/1d/fb8e1d0a9a7481db8c9b193e984abc7f.jpg",
      Category: "Skincare",
    },
    {
      id: 3,
      Name: "Lipstick",
      SellingPrice: 300,
      OriginalPrice: 500,
      image:
        "https://i.pinimg.com/1200x/c9/4a/5a/c94a5ad1a47f78cd5d31152ea2a04948.jpg",
      Category: "Makeup",
    },
  ];

  return (
    <div className="px-10 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProducts.map((p) => (
          <Card key={p.id} product={p} />
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/products">
          <button className="bg-pink-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-pink-600 transition">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
