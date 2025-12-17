import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart: expect { items: [{ product: { _id, Name, SellingPrice, image }, quantity }] }
    fetch("http://localhost:3000/cart", { credentials: "include" })
      .then(async (res) => {
        if (res.status === 401) {
          navigate("/login");
          return { items: [] };
        }
        if (!res.ok) throw new Error("Failed to load cart");
        return res.json();
      })
      .then((data) => {
        const items = data?.items || [];
        // normalize to render shape (supports both nested 'product' or flattened fields)
        const normalized = items.map((ci) => ({
          id: ci.productId || ci.product?._id || ci.product, // support flattened and populated
          name: ci.name || ci.product?.Name || "",
          price: (ci.price ?? ci.product?.SellingPrice) || 0,
          image: ci.image || ci.product?.image || "",
          quantity: ci.quantity || 1,
        }));
        setCartItems(normalized);
      })
      .catch((e) => console.log(e.message || "Failed to load cart"));
  }, [navigate]);

  const removeItem = (id) => {
    fetch(`http://localhost:3000/cart/${id}`, {
      method: "DELETE",
      credentials: "include",
    })
      .then(() => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
      })
      .catch(() => console.log("Failed to remove item"));
  };

  const updateQty = (id, newQty) => {
    if (newQty <= 0) return removeItem(id);
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    try {
      const res = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => "Checkout failed");
        throw new Error(msg || "Checkout failed");
      }
      await res.json();
      // clear cart in UI and go to orders page
      setCartItems([]);
      navigate("/orders");
    } catch (e) {
      alert(e.message || "Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Shopping Cart</h1>

      {/* Cart Items */}
      <div className="max-w-4xl mx-auto">
        {cartItems.length === 0 && (
          <p className="text-center text-gray-500">Your cart is empty</p>
        )}

        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 p-4 mb-4 bg-white shadow rounded"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 object-cover rounded"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.name}</h2>
              <p className="text-pink-600 font-bold">₹{item.price}</p>

              <div className="flex items-center gap-3 mt-3">
                <button
                  className="px-3 py-1 bg-gray-200 rounded"
                  onClick={() => updateQty(item.id, item.quantity - 1)}
                >
                  -
                </button>

                <p className="font-medium">{item.quantity}</p>

                <button
                  className="px-3 py-1 bg-gray-200 rounded"
                  onClick={() => updateQty(item.id, item.quantity + 1)}
                >
                  +
                </button>

                <button
                  className="ml-auto px-4 py-1 bg-red-500 text-white rounded"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}

        {cartItems.length > 0 && (
          <div className="bg-white p-6 shadow rounded mt-6 max-w-sm ml-auto">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Tax (10%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total</span>
              <span className="text-pink-600">₹{total.toFixed(2)}</span>
            </div>

            <button
              className="w-full bg-pink-600 text-white py-2 rounded mb-2"
              onClick={handleCheckout}
            >
              Checkout
            </button>
            <button
              className="w-full border border-pink-600 text-pink-600 py-2 rounded"
              onClick={() => navigate("/products")}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
