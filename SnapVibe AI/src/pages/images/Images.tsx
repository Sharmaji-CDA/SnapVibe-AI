import { useState } from "react";
import ImageGrid from "../../components/cards/ImageGrid";

export default function Images() {
  const [mode, setMode] =
    useState<"latest" | "trending" | "downloads">(
      "trending"
    );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">

      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        {/* ---------------- HEADER ---------------- */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-indigo-400">
            Marketplace
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Discover AI-Created Premium Images
          </h1>

          <p className="mt-4 text-slate-300">
            Browse trending visuals, support independent creators,
            and unlock exclusive designs starting from ₹10.
          </p>
        </div>

        {/* ---------------- MODE SWITCH ---------------- */}
        <div className="mb-4 flex flex-wrap gap-3">
          {(["latest", "trending", "downloads"] as const).map(
            (m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
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
            )
          )}
        </div>

        {/* Price anchor + support message */}
        <p className="mb-10 text-xs text-slate-400">
          Premium images starting from ₹10 • Every purchase directly supports creators
        </p>

        {/* ---------------- IMAGE GRID ---------------- */}
        <ImageGrid mode={mode} />

        {/* ---------------- LOAD MORE ---------------- */}
        <div className="mt-16 flex flex-col items-center gap-4">
          <button className="rounded-xl bg-indigo-500 px-10 py-4 text-sm font-semibold text-white transition hover:bg-indigo-600 hover:scale-105">
            Explore More Premium Images →
          </button>

          <p className="text-xs text-slate-500">
            Updated daily with fresh AI visuals
          </p>
        </div>
      </div>
    </section>
  );
}