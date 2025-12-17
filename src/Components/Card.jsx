const Card = ({ product, onAddToCart }) => {
  return (
    <div className="p-4  ">
      <div className="bg-white border border-gray-200 justify-start flex-row rounded-xl p-10 w-80 shadow-lg hover:shadow-2xl transition">
        <img
          src={product.image}
          alt="product"
          className="w-full h-70 object-cover rounded-lg mb-4"
        />
        <h3 className="text-center text-xl font-bold font-serif text-gray-800 mb-2">
          {product.Name}
        </h3>
        <p className="text-gray-600 text-sm mb-2">
          Category: {product.Category}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-black">
            ₹{product.SellingPrice}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{product.OriginalPrice}
          </span>
        </div>
        <button
          onClick={onAddToCart}
          className="w-full bg-pink-400 text-white hover:bg-violet-700 py-2 rounded-lg transition font-medium"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};
export default Card;
