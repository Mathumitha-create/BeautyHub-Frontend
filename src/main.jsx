import { createRoot } from "react-dom/client";
import { Toaster, toast } from "react-hot-toast";
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router";
import "./index.css";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Products from "./Components/Products";
import ProductDetail from "./Components/ProductDetail";
import Cart from "./Components/Cart";
import Orders from "./Components/Orders";
import Login from "./Components/Login";
import Admin from "./Components/Admin";
import Footer from "./Components/Footer";

const AppRouter = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem("isLoggedIn") === "true"
  );
  const [role, setRole] = useState(sessionStorage.getItem("role"));
  const location = useLocation();

  const handleLogin = (userRole) => {
    setIsLoggedIn(true);
    setRole(userRole);
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("role", userRole);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole(null);
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    toast.success("Logged out successfully");
  };

  const ProtectedOrdersRoute = () => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    return loggedIn ? <Orders /> : <Navigate to="/login" />;
  };

  const ProtectedAdminRoute = () => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const userRole = sessionStorage.getItem("role");
    return loggedIn && userRole === "admin" ? <Admin /> : <Navigate to="/" />;
  };

  return (
    <>
      <Header
        onLogout={handleLogout}
        isLoggedIn={isLoggedIn}
        role={role}
        showBanner={location.pathname === "/"}
      />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<ProtectedOrdersRoute />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin" element={<ProtectedAdminRoute />} />
      </Routes>
      <Footer />
    </>
  );
};

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AppRouter />
  </BrowserRouter>
);
