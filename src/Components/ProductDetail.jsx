import Products from "./Products";
import { useEffect, useState } from "react";
import { API_BASE } from "../api";

const ProductDetail = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${API_BASE}/products`);
      const data = await response.json();
      setProducts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <Products products={products} />
    </div>
  );
};

export default ProductDetail;
