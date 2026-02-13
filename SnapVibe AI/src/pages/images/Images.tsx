import { useState, useEffect } from "react";
import ImageGrid from "../../components/cards/ImageGrid";
import Skeleton from "../../components/common/Skeleton";

export default function Images() {
  const [mode, setMode] =
    useState<"latest" | "trending" | "downloads">(
      "trending"
    );

  const [loadingStats, setLoadingStats] =
    useState(true);

  const [stats, setStats] = useState({
    images: 0,
    creators: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoadingStats(true);

      // 🔥 Replace with real Firestore later
      await new Promise((res) =>
        setTimeout(res, 800)
      );

      setStats({
        images: 12450,
        creators: 5200,
      });

      setLoadingStats(false);
    };

    fetchStats();
  }, []);

  return (
    <section className="relative bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-16">

        {/* HEADER */}
        <div className="mb-12">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            AI Images
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Explore high-quality AI-generated images created by the community —
            free to download or unlock premium visuals to support creators.
          </p>
        </div>

        {/* ---------------- STATS BAR ---------------- */}
        {loadingStats ? (
          <div className="mb-10 flex flex-wrap gap-6 rounded-2xl bg-white p-5 shadow-sm">
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
            <Skeleton className="h-10 w-24 rounded-md" />
          </div>
        ) : (
          <div className="mb-10 flex flex-wrap items-center gap-6 rounded-2xl bg-white p-5 shadow-sm">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {stats.images.toLocaleString()}+
              </p>
              <p className="text-xs text-slate-500">
                Images available
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {stats.creators.toLocaleString()}+
              </p>
              <p className="text-xs text-slate-500">
                Creators
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Updated
              </p>
              <p className="text-xs text-slate-500">
                Daily
              </p>
            </div>
          </div>
        )}

        {/* MODE SWITCH */}
        <div className="mb-6 flex gap-2">
          {(["latest", "trending", "downloads"] as const).map(
            (m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  mode === m
                    ? "bg-black text-white"
                    : "border border-slate-300 text-slate-600 hover:bg-slate-100"
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

        {/* IMAGE GRID (Already Has Skeleton Inside) */}
        <ImageGrid mode={mode} />

        {/* LOAD MORE */}
        <div className="mt-10 flex justify-center">
          <button className="rounded-xl border px-8 py-3 text-sm font-medium hover:bg-slate-100 transition">
            Load more images
          </button>
        </div>
      </div>
    </section>
  );
}
