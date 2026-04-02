import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import { BellIcon } from "lucide-react";

type NotificationType = {
  id: number;
  text: string;
  read: boolean;
};

export default function Navbar() {
  const navigate = useNavigate();
  const { user, profile, logout, loading } = useAuth();

  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- MOCK DATA ---------------- */
  useEffect(() => {
    const data: NotificationType[] = [
      // { id: 1, text: "New message", read: false },
      // { id: 2, text: "New comment", read: false },
    ];

    setNotifications(data);
    setUnreadCount(data.filter((n) => !n.read).length);
  }, []);

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
              <img src="/creator-logo.webp" className="h-9" />
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
                {/* 🔔 NOTIFICATION */}
                <div
                  className="relative"
                  onMouseEnter={() => setShowPopup(true)}
                  onMouseLeave={() => setShowPopup(false)}
                >
                  <button
                    onClick={() => {
                      setUnreadCount(0);
                      navigate("/notifications"); // ✅ FIXED
                    }}
                    className="p-2 border bg-white/10 backdrop-blur rounded-lg hover:bg-white/20 transition relative"
                  >
                    <BellIcon size={16} />

                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-green-500 text-white text-[10px] px-1.5 rounded-full">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* POPUP */}
                  {showPopup && (
                    <div
                      className="absolute right-0 mt-2 w-72 bg-slate-900 border border-white/10 rounded-xl shadow-lg p-3 z-50"
                      onMouseEnter={() => setShowPopup(true)}
                      onMouseLeave={() => setShowPopup(false)}
                    >
                      <p className="text-sm text-white mb-2 font-semibold">
                        Notifications
                      </p>

                      {notifications.length === 0 ? (
                        <p className="text-xs text-slate-400">
                          No new notifications
                        </p>
                      ) : (
                        notifications.slice(0, 5).map((n) => (
                          <div
                            key={n.id}
                            className="text-xs text-slate-300 py-1 border-b border-white/10 last:border-none"
                          >
                            {n.text}
                          </div>
                        ))
                      )}

                      <button
                        onClick={() => {
                          setUnreadCount(0);
                          navigate("/notifications");
                        }}
                        className="mt-2 text-indigo-400 text-xs hover:underline"
                      >
                        View all
                      </button>
                    </div>
                  )}
                </div>

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
                          <p className="text-white font-semibold">
                            {displayName}
                          </p>
                          <p className="text-xs text-slate-400">
                            {user.email}
                          </p>
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

                        <Link to="/notifications" className="block text-slate-300 hover:text-white">
                          Notification
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
      </header>
    </>
  );
}