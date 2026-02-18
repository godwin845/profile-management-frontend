import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, ArrowRight } from "lucide-react";
import axios from "axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");                                                                                                           
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);

    try {
      const response = await axios.post(
        "https://profile-management-backend-2jxo.onrender.com/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      const { token, user } = response.data;

      // Save token (and optionally user data)
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      navigate("/profile");
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-8">
        {/* Hero Section */}
        <div className="text-center">
          <div className="mx-auto h-20 w-20 lg:h-24 lg:w-24 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center shadow-2xl mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-4xl lg:text-5xl font-black bg-linear-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent mb-4">
            Welcome Back
          </h1>
          <p className="text-xl text-slate-600 font-medium">Sign in to your Profile Management account</p>
        </div>

        {/* Login Form */}
        <div className="backdrop-blur-xl border border-white/30 dark:border-slate-700/50 rounded-3xl shadow-2xl p-8 lg:p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-14 px-4 pl-12 bg-white/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-lg placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-14 px-4 pl-12 pr-12 bg-white/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl text-lg placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/50 rounded-xl transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-300 focus:ring-indigo-500 text-indigo-600 shadow-sm" />
                <span className="text-sm text-slate-700 font-medium">Remember me</span>
              </label>
              <a href="#" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">Forgot Password?</a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-14 bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3 group"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Social Login */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/50 backdrop-blur-sm text-slate-600 font-medium rounded-xl py-1">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {["Google", "GitHub", "LinkedIn"].map((provider) => (
              <button
                key={provider}
                className="group h-14 bg-white/50 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center space-x-3 text-sm font-semibold text-slate-700 hover:text-slate-900"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">{/* Provider icon */}</svg>
                <span>{provider}</span>
              </button>
            ))}
          </div>

          {/* Register Link */}
          <div className="text-center pt-6">
            <p className="text-sm text-slate-600">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
                Sign up here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;