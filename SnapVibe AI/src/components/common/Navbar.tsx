import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, profile, logout, loading } = useAuth();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // ✅ Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative pb-1 transition ${
      isActive
        ? "text-white after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:rounded-full after:bg-indigo-400"
        : "text-slate-300 hover:text-white"
    }`;

  const displayName = user?.displayName || "User";
  const avatarUrl =
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${displayName}&background=6366f1&color=fff`;

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">

            {/* Logo */}
            <Link to="/" className="text-xl font-bold text-white">
              <img
                src="/src/assets/images/logo.png"
                alt="SnapVibeAI Logo"
                className="h-8 w-8 inline-block mr-2"
              />
              SnapVibe<span className="text-indigo-400">AI</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex gap-8 text-sm">
              <NavLink to="/wallpapers" className={navClass}>
                Wallpapers
              </NavLink>
              <NavLink to="/images" className={navClass}>
                Images
              </NavLink>
              <NavLink to="/themes" className={navClass}>
                Themes
              </NavLink>
              <NavLink to="/subscription" className={navClass}>
                Subscription
              </NavLink>
            </nav>

            {/* Right Side */}
            {!loading && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setOpen(!open)}
                  className="flex items-center gap-3 rounded-full bg-white/10 px-3 py-1.5 backdrop-blur hover:bg-white/20 transition"
                >
                  <img
                    src={avatarUrl}
                    alt="User avatar"
                    className="h-9 w-9 rounded-full ring-2 ring-indigo-400"
                  />
                  <span className="hidden sm:block text-sm text-white">
                    {displayName}
                  </span>
                </button>

                {open && (
                  <div className="absolute right-0 mt-4 w-80 rounded-2xl bg-slate-900/95 backdrop-blur border border-white/10 shadow-2xl">
                    
                    {/* User Card */}
                    <div className="flex items-center gap-4 px-6 py-5">
                      <img
                        src={avatarUrl}
                        alt="User avatar"
                        className="h-12 w-12 rounded-full ring-2 ring-indigo-400"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {displayName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {user.email}
                        </p>
                        {profile && (
                          <p className="text-xs text-indigo-300 mt-1">
                            {profile.accountType === "creator"
                              ? "Creator Account"
                              : "User Account"}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="h-px bg-white/10" />

                    {/* Menu */}
                    <div className="py-3 text-sm">
                      <Link
                        to="/profile"
                        className="block px-6 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        👤 Profile
                      </Link>

                      {profile?.accountType === "creator" && (
                        <Link
                          to="/dashboard"
                          className="block px-6 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
                          onClick={() => setOpen(false)}
                        >
                          📊 Dashboard
                        </Link>
                      )}

                      <Link
                        to="/contact"
                        className="block px-6 py-2 text-slate-300 hover:bg-white/10 hover:text-white"
                        onClick={() => setOpen(false)}
                      >
                        🛠 Support
                      </Link>
                    </div>

                    <div className="h-px bg-white/10" />

                    <button
                      className="w-full px-6 py-3 text-left text-sm text-red-400 hover:bg-red-500/10"
                      onClick={async () => {
                        setOpen(false);
                        await logout();
                      }}
                    >
                      🚪 Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="rounded-lg bg-blue-200 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-100"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          {mobileOpen && (
            <div className="md:hidden bg-slate-900 border-t border-white/10">
              <div className="px-6 py-5 space-y-4 text-sm">
                <NavLink to="/wallpapers" className={navClass}>
                  Wallpapers
                </NavLink>
                <NavLink to="/images" className={navClass}>
                  Images
                </NavLink>
                <NavLink to="/themes" className={navClass}>
                  Themes
                </NavLink>

                {user ? (
                  <button
                    onClick={logout}
                    className="w-full text-left pt-4 border-t border-white/10 text-red-400"
                  >
                    Logout
                  </button>
                ) : (
                  <>
                    <NavLink to="/login" className={navClass}>
                      Login
                    </NavLink>
                    <NavLink to="/register" className={navClass}>
                      Register
                    </NavLink>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
