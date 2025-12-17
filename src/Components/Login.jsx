import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-hot-toast";
import { API_BASE } from "../api";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || "Login failed");
      }
      const token = data.token;
      const apiRole = data.role || role;
      sessionStorage.setItem("token", token);
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("isLoggedIn", "true");
      sessionStorage.setItem("role", apiRole);
      onLogin(apiRole);
      toast.success("Login successful");
      navigate(apiRole === "admin" ? "/admin" : "/");
    } catch (err) {
      setError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center px-6 py-12 bg-gray-50">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Login
        </h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Login As
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent outline-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-2 rounded-lg font-medium hover:bg-pink-700 transition mt-6"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
