import { useState } from "react";
import ImageGrid from "../../components/cards/ImageGrid";

const CATEGORIES = [
  "All",
  "Dark",
  "Minimal",
  "Cyberpunk",
  "Anime",
  "Abstract",
];

export default function Wallpapers() {
  const [mode, setMode] =
    useState<"latest" | "trending" | "downloads">("trending");

  const [category, setCategory] = useState("All");
  const [filter, setFilter] =
    useState<"all" | "free" | "premium">("all");

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">

      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">

        {/* INTRO */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-indigo-400">
            Marketplace
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Premium AI Wallpapers
          </h1>

          <p className="mt-4 text-slate-300">
            Discover creator-made premium visuals starting from ₹10.
            Or generate your own instantly.
          </p>
        </div>

        {/* MODE SWITCH */}
        <div className="mb-6 flex gap-2 flex-wrap">
          {(["latest", "trending", "downloads"] as const).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                mode === m
                  ? "bg-indigo-500 text-white"
                  : "border border-white/20 text-slate-300 hover:bg-white/10"
              }`}
            >
              {m === "latest"
                ? "Latest"
                : m === "trending"
                ? "Trending"
                : "Most Downloaded"}
            </button>
          ))}
        </div>

        {/* CATEGORY FILTER */}
        <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`whitespace-nowrap rounded-full px-4 py-2 text-sm transition ${
                category === cat
                  ? "bg-white text-black"
                  : "bg-white/10 text-slate-300 hover:bg-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* FREE / PREMIUM FILTER */}
        <div className="mb-12 flex gap-3">
          {(["all", "free", "premium"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-xl px-4 py-2 text-sm transition ${
                filter === f
                  ? "bg-indigo-500 text-white"
                  : "border border-white/20 text-slate-300 hover:bg-white/10"
              }`}
            >
              {f === "all"
                ? "All"
                : f === "free"
                ? "Free"
                : "Premium"}
            </button>
          ))}
        </div>

        {/* GRID */}
        <ImageGrid
          mode={mode}
          category={category}
          filter={filter}
        />

        {/* MINI CONVERSION BLOCK */}
        <div className="mt-24 rounded-3xl bg-white/5 p-10 text-center backdrop-blur">
          <h3 className="text-2xl font-semibold">
            Can’t find what you like?
          </h3>

          <p className="mt-3 text-slate-300">
            Generate your own personalized wallpaper in seconds.
          </p>

          <button className="mt-6 rounded-xl bg-indigo-500 px-8 py-3 text-sm font-semibold hover:bg-indigo-600 transition">
            Generate with AI →
          </button>
        </div>
      </div>
    </section>
  );
}