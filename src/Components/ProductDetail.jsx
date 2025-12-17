import Products from "./Products";
import { useEffect, useState } from "react";

const ProductDetail = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/products");
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
