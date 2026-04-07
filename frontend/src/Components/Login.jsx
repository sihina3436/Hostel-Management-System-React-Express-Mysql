import React, { useState } from "react";
import { useLoginMutation } from "../redux/auth/authAPI.js";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/auth/authSlice.js";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowLeft } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("Please enter both email and password.");
      return;
    }

    try {
      const response = await login({ email, password }).unwrap();

      if (!response?.success) {
        setErrorMsg(response?.message || "Invalid login credentials");
        return;
      }

      const { token, student } = response.data;
      dispatch(setUser({ user: student, token }));
      navigate("/dashboard");
    } catch (error) {
      setErrorMsg(error?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute -top-32 -left-32 h-96 w-96 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left: Info */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur p-8 sm:p-10 text-white shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="inline-flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            <h1 className="mt-8 text-3xl sm:text-4xl font-bold leading-tight">
              Student Login
            </h1>
            <p className="mt-3 text-white/75 leading-relaxed">
              Sign in to access your student dashboard, view room details, and manage hostel information.
            </p>

            <div className="mt-10 space-y-3 text-sm text-white/75">
              <p>• View your room and floor details</p>
              <p>• Access bills and hostel updates</p>
              <p>• Faster support and communication</p>
            </div>

            <div className="mt-10 text-sm text-white/70">
              Admin?{" "}
              <Link to="/admin/login" className="text-emerald-300 font-semibold hover:text-emerald-200 transition">
                Go to Admin Login
              </Link>
            </div>
          </div>

          {/* Right: Form */}
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur shadow-[0_20px_60px_rgba(0,0,0,0.35)] overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-400 to-sky-400" />

            <div className="p-8 sm:p-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white">
                Welcome back
              </h2>
              <p className="mt-1 text-sm text-white/70">
                Use your email and password to continue.
              </p>

              {errorMsg && (
                <div className="mt-5 rounded-2xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-rose-200 text-sm font-semibold">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type="email"
                      className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/40
                                 pl-10 pr-4 py-3 outline-none transition
                                 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="student@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-semibold text-white/90 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" size={18} />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 text-white placeholder:text-white/40
                                 pl-10 pr-12 py-3 outline-none transition
                                 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-500/15"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      autoComplete="current-password"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 text-slate-950 py-3 font-extrabold
                             shadow-sm hover:bg-emerald-400 transition
                             disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <LogIn size={18} />
                  {isLoading ? "Signing in..." : "Sign in"}
                </button>
              </form>

              <p className="text-center text-white/70 text-sm mt-6">
                Don’t have an account?{" "}
                <Link to="/register" className="text-emerald-300 font-semibold hover:text-emerald-200 transition">
                  Create one
                </Link>
              </p>

              <p className="text-center text-white/50 text-xs mt-3">
                Need help? Contact admin.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;