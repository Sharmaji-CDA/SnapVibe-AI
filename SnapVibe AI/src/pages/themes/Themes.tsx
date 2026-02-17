import { useEffect, useState } from "react";
import ThemeCard from "../../components/cards/ThemeCard";
import Skeleton from "../../components/common/Skeleton";

type Theme = {
  id: string;
  title: string;
  previewColor: string;
  desc: string;
  price?: number;
  popular?: boolean;
  premium?: boolean;
};

export default function Themes() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);

      await new Promise((res) => setTimeout(res, 800));

      setThemes([
        {
          id: "1",
          title: "Dark AMOLED Pack",
          previewColor: "#0f172a",
          desc: "Ultra-dark wallpapers optimized for AMOLED screens",
          popular: true,
          price: 19,
        },
        {
          id: "2",
          title: "Minimal Light Pack",
          previewColor: "#f8fafc",
          desc: "Clean and distraction-free aesthetic wallpapers",
          price: 15,
        },
        {
          id: "3",
          title: "Neon Cyberpunk Pack",
          previewColor: "#22d3ee",
          desc: "Bold futuristic wallpapers with neon glow",
          premium: true,
          price: 29,
        },
      ]);

      setLoading(false);
    };

    fetchThemes();
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      
      {/* Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[140px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-20">

        {/* HEADER */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-indigo-400">
            Theme Packs
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Premium Mobile Theme Collections
          </h1>

          <p className="mt-4 text-slate-300">
            Curated wallpaper packs designed for mobile users.
            Download complete theme bundles starting from ₹15.
          </p>
        </div>

        {/* SKELETON */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl bg-slate-800 p-6"
              >
                <Skeleton className="h-32 w-full rounded-xl mb-6 bg-slate-700" />
                <Skeleton className="h-5 w-32 mb-3 bg-slate-700 rounded-md" />
                <Skeleton className="h-4 w-full bg-slate-700 rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.id}
                title={theme.title}
                previewColor={theme.previewColor}
                description={theme.desc}
                price={theme.price}
                popular={theme.popular}
                premium={theme.premium}
              />
            ))}
          </div>
        )}

        {/* FOOTNOTE */}
        {!loading && (
          <div className="mt-16 rounded-2xl bg-slate-800 p-6 text-sm text-slate-300">
            🎨 Theme packs include multiple wallpapers and style variations.
            Some premium packs may require purchase or creator subscription.
          </div>
        )}
      </div>
    </section>
  );
}