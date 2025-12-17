import { Link, useNavigate } from "react-router";
import home from "../assets/home.jpg.png";

const Header = ({ onLogout, isLoggedIn, role = null, showBanner = false }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <>
      <nav className="w-full bg-slate-100 shadow-lg px-6 py-4 flex justify-between items-center sticky top-0 z-50">
        <Link
          to="/"
          className="text-4xl font-bold text-pink-600 hover:text-pink-700"
        >
          Beauty Hub
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/products"
            className="text-lg font-medium hover:text-pink-600 transition"
          >
            Products
          </Link>
          <Link
            to="/orders"
            className="text-lg font-medium hover:text-pink-600 transition"
          >
            Orders
          </Link>
          <Link
            to="/cart"
            className="text-lg font-medium hover:text-pink-600 transition"
          >
            Cart
          </Link>
          {isLoggedIn && role === "admin" && (
            <Link
              to="/admin"
              className="text-lg font-medium hover:text-pink-600 transition"
            >
              Admin
            </Link>
          )}
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-pink-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-500 transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="bg-pink-400 text-white px-6 py-2 rounded-lg font-medium hover:bg-pink-500 transition inline-block"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      {showBanner && (
        <section className="w-full overflow-hidden">
          <img
            src={home}
            alt="Beauty Hub Banner"
            className="w-full h-100 object-cover"
          />
        </section>
      )}
    </>
  );
};

export default Header;
