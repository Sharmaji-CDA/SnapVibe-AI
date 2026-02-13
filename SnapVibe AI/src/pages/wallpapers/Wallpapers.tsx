import { useState } from "react";
import ImageGrid from "../../components/cards/ImageGrid";

export default function Wallpapers() {
  const [mode, setMode] =
    useState<"latest" | "trending" | "downloads">(
      "trending"
    );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      {/* Subtle glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24">

        {/* INTRO */}
        <div className="mb-20 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-indigo-400">
            Wallpapers
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Premium AI Wallpapers
          </h1>

          <p className="mt-4 text-slate-300">
            High-resolution AI-generated wallpapers crafted for mobile,
            desktop, and ultra-wide screens.
          </p>
        </div>

        {/* MODE SWITCH */}
        <div className="mb-10 flex gap-2">
          {(["latest", "trending", "downloads"] as const).map(
            (m) => (
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
            )
          )}
        </div>

        {/* GRID */}
        <ImageGrid mode={mode} />

        {/* LOAD MORE */}
        <div className="mt-20 flex flex-col items-center gap-4">
          <button className="rounded-xl bg-indigo-500 px-10 py-4 text-sm font-semibold text-white hover:bg-indigo-600 transition">
            Load more wallpapers
          </button>

          <p className="text-xs text-slate-400">
            Optimized for all screen sizes
          </p>
        </div>
      </div>
    </section>
  );
}
