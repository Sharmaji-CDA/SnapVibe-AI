import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Skeleton from "../../components/common/Skeleton";

export default function HeroSection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // Adjust duration if needed

    return () => clearTimeout(timer);
  }, []);

  const previews = [
    { bg: "from-indigo-500 to-purple-500", type: "Wallpaper" },
    { bg: "from-rose-500 to-orange-500", type: "Poster" },
    { bg: "from-cyan-500 to-blue-500", type: "Image" },
    { bg: "from-emerald-500 to-teal-500", type: "Wallpaper" },
    { bg: "from-fuchsia-500 to-pink-500", type: "Theme" },
    { bg: "from-yellow-500 to-amber-500", type: "Poster" },
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-purple-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-28">

        {/* Badge */}
        {loading ? (
          <Skeleton className="mx-auto mb-6 h-6 w-56 rounded-full" />
        ) : (
          <div className="mx-auto mb-6 w-fit rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs text-slate-300 backdrop-blur">
            ✨ AI-Powered Creative Platform
          </div>
        )}

        {/* Heading */}
        {loading ? (
          <div className="mx-auto mb-6 max-w-4xl space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-3/4 mx-auto" />
          </div>
        ) : (
          <h1 className="mx-auto mb-6 max-w-4xl text-center text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Discover & Create
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {" "}
              AI Wallpapers, Images & Themes
            </span>
          </h1>
        )}

        {/* Subtitle */}
        {loading ? (
          <div className="mx-auto mb-10 max-w-2xl space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6 mx-auto" />
          </div>
        ) : (
          <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-slate-400">
            Generate stunning AI visuals, explore trending designs, and support
            creators — all in one modern platform.
          </p>
        )}

        {/* Search Bar */}
        {loading ? (
          <Skeleton className="mx-auto mb-14 h-14 max-w-2xl rounded-2xl" />
        ) : (
          <div className="mx-auto mb-14 max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <span className="text-slate-400">🔍</span>
              <input
                type="text"
                value={search}
                placeholder="Search wallpapers, images, themes…"
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    navigate(`/gallery?search=${encodeURIComponent(search)}`);
                  }
                }}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
              />
              <Link
                to={`/gallery?search=${encodeURIComponent(search)}`}
                className="rounded-xl border border-white/20 bg-white/5 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Search
              </Link>
            </div>
          </div>
        )}

        {/* Preview Grid */}
        {loading ? (
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[4/5] rounded-2xl" />
            ))}
          </div>
        ) : (
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 sm:grid-cols-3">
            {previews.map((item, i) => (
              <Link
                key={i}
                to={`/gallery?category=${item.type}`}
                className={`aspect-[4/5] rounded-2xl bg-gradient-to-br ${item.bg} opacity-90 shadow-lg transition hover:scale-[1.03]`}
              />
            ))}
          </div>
        )}

        {/* CTA */}
        {loading ? (
          <div className="mt-16 flex justify-center gap-4">
            <Skeleton className="h-12 w-40 rounded-xl" />
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              to="/ai/generate"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Generate with AI
            </Link>
            <Link
              to="/gallery"
              className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              Explore Gallery
            </Link>
          </div>
        )}

        {/* Trust */}
        {!loading && (
          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <div>
              <span className="font-semibold text-white">10k+</span> AI Visuals
            </div>
            <div>
              <span className="font-semibold text-white">5k+</span> Creators
            </div>
            <div>
              <span className="font-semibold text-white">Free</span> to Start
            </div>
          </div>
        )}
      </div>
    </section>
  );
}