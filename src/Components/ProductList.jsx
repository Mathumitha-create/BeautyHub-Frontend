import { useState } from "react";
import Card from "./Card";
import ProductForm from "./ProductForm";

const ProductList = () => {
  const initialProducts = [
    {
      Name: "Moisturizing Cream",
      SellingPrice: 500,
      OriginalPrice: 900,
      image:
        "https://i.pinimg.com/736x/30/a1/8a/30a18aeee6e0a2dc3a15971c77251887.jpg",
      Category: "Skincare",
    },
    {
      Name: "Face Oil",
      SellingPrice: 600,
      OriginalPrice: 1000,
      image:
        "https://i.pinimg.com/736x/fb/8e/1d/fb8e1d0a9a7481db8c9b193e984abc7f.jpg",
      Category: "Makeup",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const role = sessionStorage.getItem("role");

  const addProduct = (newProduct) => setProducts([...products, newProduct]);

  return (
    <div className="px-10 py-10">
      <h2 className="text-3xl text-center mb-6">All Products</h2>

      <div className="flex flex-wrap gap-6 justify-center">
        {products.map((p, i) => (
          <Card key={i} product={p} />
        ))}
      </div>

      {role === "admin" && <ProductForm addProduct={addProduct} />}
    </div>
  );
};

export default ProductList;
