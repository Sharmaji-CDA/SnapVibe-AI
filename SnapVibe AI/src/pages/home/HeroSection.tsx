import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/common/Skeleton";

export default function HeroSection() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800); // 🔥 Faster loading feel

    return () => clearTimeout(timer);
  }, []);

  const handleGenerate = () => {
    const trimmed = search.trim();
    if (!trimmed) return;

    navigate(`/ai/generate?prompt=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-yellow-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 py-14 text-center">

        {!loading && (
          <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-4 py-1 text-xs font-semibold text-black">
            🎨 Holi Special – Personalized AI Wallpapers
          </div>
        )}

        {loading ? (
          <Skeleton className="mx-auto mb-6 h-12 w-3/4 rounded-md" />
        ) : (
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-white md:text-6xl">
            Create Stunning
            <span className="bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              {" "}AI Mobile Wallpapers
            </span>
            <br />
            in Seconds 🇮🇳
          </h1>
        )}

        {loading ? (
          <Skeleton className="mx-auto mb-8 h-4 w-2/3 rounded-md" />
        ) : (
          <p className="mx-auto mb-6 max-w-2xl text-lg text-slate-400">
            Generate beautiful 9:16 wallpapers for your phone.
            No design skills needed.
          </p>
        )}

        {/* 🔥 Stronger Urgency Line */}
        {!loading && (
          <p className="mb-8 text-sm text-yellow-400">
            Start free — 3 generations today
          </p>
        )}

        {/* AI Prompt */}
        {loading ? (
          <Skeleton className="mx-auto h-14 max-w-2xl rounded-2xl" />
        ) : (
          <div className="mx-auto mb-4 max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur">
              <input
                type="text"
                value={search}
                placeholder="Describe your Holi wallpaper..."
                onChange={(e) => setSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleGenerate();
                }}
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 outline-none"
              />

              <button
                disabled={!search.trim()}
                onClick={handleGenerate}
                className="rounded-xl bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-500 transition disabled:opacity-50"
              >
                Generate
              </button>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Free users get watermark • Upgrade for HD & no watermark
            </p>
          </div>
        )}

        {/* Quick Prompts */}
        {!loading && (
          <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs text-slate-400">
            {[
              "Colorful Holi splash background",
              "Holi wallpaper with my name",
              "Dark AMOLED Holi theme",
              "Minimal Holi gradient wallpaper",
            ].map((prompt, i) => (
              <button
                key={i}
                onClick={() =>
                  navigate(`/ai/generate?prompt=${encodeURIComponent(prompt)}`)
                }
                className="rounded-full border border-white/10 bg-white/5 px-4 py-2 hover:bg-white/10 transition"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        {/* Mobile Preview */}
        {!loading && (
          <div className="mt-14 flex flex-wrap justify-center gap-6">
            {[
              "https://images.unsplash.com/photo-1617854818583-09e7f077a156?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1618598348323-0b47b13d5f91?auto=format&fit=crop&w=400&q=80",
              "https://images.unsplash.com/photo-1618598348451-cc0b2b5e6c5a?auto=format&fit=crop&w=400&q=80"
            ].map((img, i) => (
              <div
                key={i}
                className="relative h-[420px] w-[220px] rounded-[32px] border-4 border-white/10 bg-black shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden transition hover:scale-105 hover:-translate-y-1"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-24 bg-black rounded-b-xl z-10" />
                <img
                  src={img}
                  alt="Mobile Wallpaper Preview"
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}

        {/* Trust */}
        {!loading && (
          <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <div>
              <span className="font-semibold text-white">Free</span> to start
            </div>
            <div>
              <span className="font-semibold text-white">Mobile Optimized</span>
            </div>
            <div>
              Made for <span className="font-semibold text-white">India 🇮🇳</span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
