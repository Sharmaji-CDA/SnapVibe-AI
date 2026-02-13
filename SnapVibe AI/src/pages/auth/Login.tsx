import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import { useAuth } from "../../context/useAuth";

export default function Login() {
  const { login, user, profile, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔁 Redirect after login + profile load
  useEffect(() => {
    if (!authLoading && user && profile) {
      if (profile.accountType === "creator") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [user, profile, authLoading, navigate]);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await login(email, password);
      // Don't navigate here — let useEffect handle it
    } catch (err: any) {
      // Clean error message
      if (err.code === "auth/invalid-credential") {
        setError("Invalid email or password");
      } else if (err.code === "auth/user-not-found") {
        setError("User not found");
      } else {
        setError("Login failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="w-full max-w-md">
        {/* Brand */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            SnapVibe<span className="text-indigo-500">AI</span>
          </h1>
          <p className="mt-2 text-sm text-slate-500">
            Welcome back. Sign in to continue.
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <h2 className="mb-6 text-xl font-semibold text-slate-900">
            Login to your account
          </h2>

          {error && (
            <p className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* Email */}
          <div className="mb-4">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="you@example.com"
              className="w-full rounded-xl border text-black border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="••••••••"
              className="w-full rounded-xl text-black border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none"
            />
          </div>

          <Button
            label={loading ? "Logging in..." : "Login"}
            fullWidth
            onClick={handleLogin}
            disabled={loading}
          />

          <div className="mt-6 flex items-center justify-between text-sm">
            <Link to="/forgot-password" className="text-indigo-500 hover:underline">
              Forgot password?
            </Link>
            <Link
              to="/register"
              className="text-slate-500 hover:text-slate-700"
            >
              Create account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
