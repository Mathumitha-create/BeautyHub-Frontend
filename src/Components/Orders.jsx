import { useEffect, useState } from "react";
import { Link } from "react-router";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("http://localhost:3000/orders", {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to load orders");
        const data = await res.json();
        // data is array of orders from API
        setOrders(
          (Array.isArray(data) ? data : []).map((o) => ({
            id: o.id,
            date: new Date(o.date).toLocaleDateString(),
            status: o.status || "Processing",
            total: o.total,
            items: o.items || [],
          }))
        );
      } catch (e) {
        console.log(e.message || "Failed to load orders");
      }
    };
    load();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "In Transit":
        return "bg-blue-100 text-blue-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
          My Orders
        </h1>

        {orders.length > 0 ? (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="border border-gray-200 rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition"
              >
                <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Order ID</p>
                    <p className="text-lg font-bold text-gray-800">
                      #{order.id}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-500">Order Date</p>
                    <p className="text-lg font-bold text-gray-800">
                      {order.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mt-1 ${getStatusColor(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="mb-4">
                  <p className="text-gray-700 font-medium mb-2">Items:</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {order.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <hr className="my-4" />

                <div className="flex justify-between items-center">
                  <p className="text-gray-700">
                    Total:{" "}
                    <span className="font-bold text-pink-600">
                      ₹{order.total}
                    </span>
                  </p>
                  <button className="bg-pink-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-500 transition">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              You haven't placed any orders yet.
            </p>
            <Link
              to="/products"
              className="text-pink-600 font-semibold hover:underline mt-2 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
