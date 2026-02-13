import { useEffect, useState } from "react";
import ThemeCard from "../../components/cards/ThemeCard";
import Skeleton from "../../components/common/Skeleton";

type Theme = {
  title: string;
  color: string;
  desc: string;
  popular?: boolean;
  premium?: boolean;
};

export default function Themes() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);

      // 🔥 Replace with Firestore later
      await new Promise((res) =>
        setTimeout(res, 800)
      );

      setThemes([
        {
          title: "Dark Mode",
          color: "#0f172a",
          desc:
            "Perfect for night viewing and focused work",
          popular: true,
        },
        {
          title: "Minimal",
          color: "#f8fafc",
          desc:
            "Clean, distraction-free interface",
        },
        {
          title: "Neon",
          color: "#22d3ee",
          desc:
            "Bold, futuristic creative vibe",
          premium: true,
        },
      ]);

      setLoading(false);
    };

    fetchThemes();
  }, []);

  return (
    <section className="relative bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* HEADER */}
        <div className="mb-16 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-indigo-500">
            Personalization
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Themes
          </h1>

          <p className="mt-4 text-slate-600">
            Customize the look and feel of{" "}
            <span className="font-bold text-indigo-600">
              SnapVibe AI
            </span>{" "}
            to match your style.
          </p>
        </div>

        {/* META INFO */}
        {!loading && (
          <div className="mb-12 flex flex-wrap gap-6 text-sm text-slate-500">
            <span>
              <strong className="text-slate-900">
                {themes.length}
              </strong>{" "}
              available themes
            </span>
            <span>More coming soon</span>
          </div>
        )}

        {/* ---------------- SKELETON ---------------- */}
        {loading ? (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="rounded-2xl bg-white p-6 shadow-sm"
                >
                  <Skeleton className="h-32 w-full rounded-xl mb-6" />
                  <Skeleton className="h-5 w-32 mb-3 rounded-md" />
                  <Skeleton className="h-4 w-full rounded-md" />
                </div>
              )
            )}
          </div>
        ) : (
          /* ---------------- THEMES GRID ---------------- */
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme) => (
              <ThemeCard
                key={theme.title}
                title={theme.title}
                previewColor={theme.color}
                description={theme.desc}
                popular={theme.popular}
                premium={theme.premium}
              />
            ))}
          </div>
        )}

        {/* FOOTNOTE */}
        {!loading && (
          <div className="mt-20 rounded-2xl bg-white p-6 text-sm text-slate-600 shadow-sm">
            🎨 Themes apply instantly and can be changed anytime.
            Some premium themes may require an active subscription.
          </div>
        )}
      </div>
    </section>
  );
}
