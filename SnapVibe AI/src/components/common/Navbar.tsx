import { Link, NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../context/useAuth";

export default function Navbar() {
  const { user, profile, logout, loading } = useAuth();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- CLOSE DROPDOWN OUTSIDE CLICK ---------------- */
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
    `relative block py-2 px-1 transition ${
      isActive
        ? "text-indigo-400 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:w-full after:bg-[#bae1e7] after:rounded-full"
        : "text-slate-300 hover:text-white"
    }`;

  const displayName = profile?.displayName || user?.displayName || "User";
  const avatarUrl =
    profile?.photoURL ||
    user?.photoURL ||
    `https://ui-avatars.com/api/?name=${displayName}&background=6366f1&color=fff`;

  /* ---------------- LOADING STATE ---------------- */
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
    <header className="sticky top-0 z-100 bg-slate-900 border-b border-white/10">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">

          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-white">
            SnapVibe<span className="text-indigo-500">AI</span>
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
          {user ? (
            <div className="flex items-center gap-4">

              {/* Avatar */}
              <button
                onClick={() => setOpen(!open)}
                className="flex items-center gap-2"
              >
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
                      <img
                        src={avatarUrl}
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <p className="text-white font-semibold">
                          {displayName}
                        </p>
                        <p className="text-xs text-slate-400">
                          {user.email}
                        </p>
                        {profile?.accountType === "creator" && (
                          <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-indigo-600 text-white rounded-full">
                            Creator
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="mt-5 space-y-3 text-sm">
                      <Link to="/profile" className="block text-slate-300 hover:text-white">
                        Profile
                      </Link>

                      {profile?.accountType === "creator" && (
                        <Link to="/dashboard" className="block text-slate-300 hover:text-white">
                          Dashboard
                        </Link>
                      )}
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
                  className="bg-slate-800 px-4 py-2 rounded-lg text-sm font-semibold text-white"
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

      {/* ---------------- MOBILE SLIDE MENU ---------------- */}
      <div
        className={`fixed inset-0 z-50 transition ${
          mobileOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/60 transition-opacity ${
            mobileOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide Panel */}
        <div
          className={`absolute left-0 top-0 h-full w-80 bg-slate-900 p-6 transform transition-transform ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* If Logged In */}
          {user ? (
            <>
              <div className="mb-8">
                <img
                  src={avatarUrl}
                  className="h-14 w-14 rounded-full mb-3"
                />
                <p className="text-white font-semibold">
                  {displayName}
                </p>
                <p className="text-xs text-slate-400">
                  {user.email}
                </p>

                {profile?.accountType === "creator" && (
                  <span className="inline-block mt-2 px-3 py-1 text-xs bg-indigo-600 text-white rounded-full">
                    Creator Account
                  </span>
                )}
              </div>

              <div className="space-y-4 text-sm">
                <NavLink to="/wallpapers" className={navClass}>Wallpapers</NavLink>
                <NavLink to="/images" className={navClass}>Images</NavLink>
                <NavLink to="/themes" className={navClass}>Themes</NavLink>
                <NavLink to="/subscription" className={navClass}>Subscription</NavLink>

                {profile?.accountType === "creator" && (
                  <NavLink to="/dashboard" className={navClass}>Dashboard</NavLink>
                )}
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
                <NavLink to="/wallpapers" className={navClass}>Wallpapers</NavLink>
                <NavLink to="/images" className={navClass}>Images</NavLink>
                <NavLink to="/themes" className={navClass}>Themes</NavLink>
                <NavLink to="/subscription" className={navClass}>Subscription</NavLink>
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
                  className="block w-full py-3 text-center rounded-xl text-white"
                >
                  Get Started
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}