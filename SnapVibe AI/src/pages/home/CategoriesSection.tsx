import { useEffect, useState } from "react";

export default function CategoriesSection() {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCategories([
        "Wallpapers",
        "Minimal",
        "Dark",
        "Cyberpunk",
        "Anime",
        "Abstract",
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <section className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold tracking-tight text-slate-200">
          Explore by Style
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Find visuals that match your mood and aesthetic
        </p>
      </div>

      {/* Skeleton */}
      {loading ? (
        <div className="flex flex-wrap gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-9 w-24 animate-pulse rounded-full bg-slate-700"
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-200
                ${
                  active === cat
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg"
                    : "border border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:-translate-y-[2px]"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
