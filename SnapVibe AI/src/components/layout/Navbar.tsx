import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";

export default function Navbar() {
  const { user, profile, logout, loading } = useAuth();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- EFFECTS ---------------- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "auto";

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
  }, [open, mobileOpen]);

  const navClass = ({ isActive }: { isActive: boolean }) =>
    `relative block py-2 px-1 transition ${
      isActive
        ? "text-indigo-400 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-indigo-400 after:rounded-full"
        : "text-slate-300 hover:text-white"
    }`;

  const displayName = profile?.displayName || user?.displayName || "User";

  const avatarUrl =
    profile?.photoPath ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${displayName}&background=6366f1&color=fff`;

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-white/10">
        <div className="h-16 flex items-center justify-between px-6 max-w-7xl mx-auto">
          <div className="h-6 w-32 bg-slate-700 animate-pulse rounded" />
          <div className="h-8 w-20 bg-slate-700 animate-pulse rounded" />
        </div>
      </header>
    );
  }

  return (
    <>
      <header className="sticky top-0 z-50 bg-slate-900 border-b border-white/10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">

            {/* LOGO */}
            <Link to="/" className="flex items-center gap-2">
              <img src="/snap-logo.webp" className="h-9" />
            </Link>

            {/* DESKTOP NAV */}
            <nav className="hidden md:flex items-center gap-8 text-sm">

              <NavLink to="/explore" className={navClass}>
                Explore
              </NavLink>

              <NavLink to="/template" className={navClass}>
                Templates
              </NavLink>

              <NavLink to="/subscription" className={navClass}>
                Pricing
              </NavLink>

              {/* 🔥 MAIN CTA */}
              <Link
                to="/generate"
                className="ml-4 px-5 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
              >
                Generate ✨
              </Link>
            </nav>

            {/* RIGHT SIDE */}
            {user ? (
              <div className="flex items-center gap-4">

                {/* Avatar */}
                <button onClick={() => setOpen(!open)}>
                  <img
                    src={avatarUrl}
                    className="h-9 w-9 rounded-full ring-2 ring-indigo-500"
                  />
                </button>

                {/* Dropdown */}
                {open && (
                  <div
                    ref={dropdownRef}
                    className="absolute right-6 top-16 w-72 rounded-2xl bg-slate-900 border border-white/10 shadow-xl"
                  >
                    <div className="p-5">
                      <div className="flex items-center gap-3">
                        <img src={avatarUrl} className="h-12 w-12 rounded-full" />
                        <div>
                          <p className="text-white font-semibold">{displayName}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                      </div>

                      <div className="mt-5 space-y-3 text-sm">
                        <Link to="/profile" className="block text-slate-300 hover:text-white">
                          Profile
                        </Link>

                        {profile?.role === "creator" && (
                          <Link to="/dashboard" className="block text-slate-300 hover:text-white">
                            Dashboard
                          </Link>
                        )}

                        <Link to="/subscription" className="block text-slate-300 hover:text-white">
                          Subscription
                        </Link>
                      </div>

                      <div className="mt-5 pt-4 border-t border-white/10">
                        <button
                          onClick={logout}
                          className="text-red-400 hover:text-red-500 text-sm"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Mobile Toggle */}
                <button
                  onClick={() => setMobileOpen(true)}
                  className="md:hidden text-white text-xl"
                >
                  ☰
                </button>
              </div>
            ) : (
              <div className="flex items-center">

                <div className="hidden md:flex items-center gap-4">
                  <Link to="/login" className="text-sm text-slate-300 hover:text-white">
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="px-4 py-2 rounded-lg bg-white text-black font-semibold hover:opacity-90 transition"
                  >
                    Get Started
                  </Link>
                </div>

                <button
                  onClick={() => setMobileOpen(true)}
                  className="md:hidden text-white text-xl"
                >
                  ☰
                </button>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        <div
          className={`fixed inset-0 z-[9999] transition-all duration-300 ${
            mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          {/* Overlay */}
          <div
            className={`absolute inset-0 bg-black/70 duration-300 ${
              mobileOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => setMobileOpen(false)}
          />

          {/* Panel */}
          <div
            className={`absolute left-0 top-0 h-full w-[80%] max-w-xs bg-slate-900 p-6 transform transition-transform duration-300 ${
              mobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {user ? (
              <>
                <div className="mb-8">
                  <img src={avatarUrl} className="h-14 w-14 rounded-full mb-3" />
                  <p className="text-white font-semibold">{displayName}</p>
                  <p className="text-xs text-slate-400">{user.email}</p>
                </div>

                <div className="space-y-4 text-sm">
                  <NavLink to="/explore" className={navClass}>Explore</NavLink>
                  <NavLink to="/templates" className={navClass}>Templates</NavLink>
                  <NavLink to="/subscription" className={navClass}>Pricing</NavLink>

                  <Link
                    to="/generate"
                    className="block text-center py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold"
                  >
                    Generate ✨
                  </Link>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <button
                    onClick={logout}
                    className="w-full py-3 bg-red-500 rounded-xl text-white"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <h2 className="text-white text-xl font-bold mb-8">
                  SnapVibe<span className="text-indigo-500">AI</span>
                </h2>

                <div className="space-y-4 text-sm">
                  <NavLink to="/explore" className={navClass}>Explore</NavLink>
                  <NavLink to="/templates" className={navClass}>Templates</NavLink>
                  <NavLink to="/pricing" className={navClass}>Pricing</NavLink>

                  <Link
                    to="/generate"
                    className="block text-center py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-semibold"
                  >
                    Generate ✨
                  </Link>
                </div>

                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <Link
                    to="/login"
                    className="block w-full py-3 text-center border border-white/20 rounded-xl text-white"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="block w-full py-3 text-center rounded-xl bg-white text-black font-semibold"
                  >
                    Get Started
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        {/* 🔥 FLOATING CTA */}
        <div className="fixed bottom-6 right-4 z-50">
          <Link
            to="/generate"
            className="px-5 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
          >
            ✨ Create
          </Link>
        </div>
      </header>

    </>
  );
}