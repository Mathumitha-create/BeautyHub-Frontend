import { useRef } from "react";
import { useNavigate } from "react-router";
import ProductForm from "./ProductForm";

const Admin = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const recentOrders = [
    {
      id: "#1024",
      customer: "Mathumitha",
      total: 1299,
      status: "Delivered",
      date: "2025-12-10",
    },
    {
      id: "#1023",
      customer: "Priyanks",
      total: 899,
      status: "In Transit",
      date: "2025-12-09",
    },
    {
      id: "#1022",
      customer: "Niranjana",
      total: 1799,
      status: "Processing",
      date: "2025-12-08",
    },
    {
      id: "#1021",
      customer: "Dharshini",
      total: 499,
      status: "Cancelled",
      date: "2025-12-07",
    },
  ];

  const statusPill = (s) => {
    const map = {
      Delivered: "bg-green-100 text-green-700",
      "In Transit": "bg-blue-100 text-blue-700",
      Processing: "bg-yellow-100 text-yellow-700",
      Cancelled: "bg-red-100 text-red-700",
    };
    return map[s] || "bg-gray-100 text-gray-700";
  };

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="w-full px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-pink-50 to-violet-50 border border-pink-200 rounded-2xl px-6 py-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800">
              Admin Dashboard
            </h1>
            <p className="text-gray-600 mt-1">
              Manage products, monitor orders and track revenue
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-white text-gray-700"
            >
              View Orders
            </button>
            <button
              onClick={scrollToForm}
              className="px-4 py-2 rounded-lg bg-pink-600 text-white hover:bg-pink-700"
            >
              + Add Product
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Total Orders</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">24</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Revenue</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">₹45,000</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Avg. Order</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">₹1,875</p>
            <p className="mt-1 text-sm text-gray-500">Last 7 days</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-gray-500">Products</p>
            </div>
            <p className="mt-3 text-3xl font-bold text-gray-900">36</p>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Recent Orders
          </h3>
          <div className="divide-y">
            {recentOrders.map((o) => (
              <div
                key={o.id}
                className="py-3 flex items-center justify-between"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {o.id} · {o.customer}
                  </p>
                  <p className="text-sm text-gray-500">{o.date}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-gray-900">
                    ₹{o.total}
                  </span>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${statusPill(
                      o.status
                    )}`}
                  >
                    {o.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Product Management */}
        <div
          ref={formRef}
          className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Add / Edit Product
            </h3>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-sm text-pink-600 hover:underline"
            >
              Back to top
            </button>
          </div>
          <ProductForm />
        </div>
      </div>
    </div>
  );
};

export default Admin;
