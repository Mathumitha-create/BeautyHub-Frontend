import { useState } from "react";
import ProductList from "./ProductList";

const Admin = () => {
  const email = sessionStorage.getItem("email");

  return (
    <div className="w-full px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 bg-pink-100 border border-pink-300 rounded-lg p-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Panel</h1>
          

        

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Total Orders
            </h3>
            <p className="text-3xl font-bold text-pink-600">24</p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Total Revenue
            </h3>
            <p className="text-3xl font-bold text-pink-600">₹45,000</p>
          </div>
        </div>

        

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <ProductList />
        </div>
      </div>
    </div>
  );
};

export default Admin;
