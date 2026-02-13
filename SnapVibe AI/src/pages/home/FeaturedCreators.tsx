import { useEffect, useState } from "react";

type Creator = {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  bio: string;
  tags: string[];
};


export default function FeaturedCreators() {

  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Simulated API call
    setTimeout(() => {
      setCreators([
        {
          id: "1",
          name: "Neon Studio",
          avatar: "https://i.pravatar.cc/150?img=12",
          followers: 12000,
          bio: "Cyberpunk & neon AI wallpapers",
          tags: ["Cyberpunk", "Neon", "Dark"],
        },
        {
          id: "2",
          name: "PixelMind AI",
          avatar: "https://i.pravatar.cc/150?img=32",
          followers: 8000,
          bio: "Minimal & abstract AI art",
          tags: ["Minimal", "Abstract"],
        },
        {
          id: "3",
          name: "DarkForge",
          avatar: "https://i.pravatar.cc/150?img=45",
          followers: 5000,
          bio: "Fantasy & cinematic visuals",
          tags: ["Fantasy", "Dark"],
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  const formatFollowers = (num: number) =>
    num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

  return (
    <section className="bg-slate-50 py-16">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Featured Creators
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Discover top creators shaping the AI visual space
            </p>
          </div>

          <button className="hidden sm:inline-flex rounded-xl border px-5 py-2 text-sm font-medium hover:bg-slate-100">
            View all creators →
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl bg-white p-6 shadow-sm"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-slate-200" />
                    <div className="flex-1">
                      <div className="mb-2 h-4 w-24 bg-slate-200 rounded" />
                      <div className="h-3 w-16 bg-slate-200 rounded" />
                    </div>
                  </div>
                  <div className="mb-4 h-3 w-full bg-slate-200 rounded" />
                  <div className="mb-6 flex gap-2">
                    <div className="h-6 w-16 rounded-full bg-slate-200" />
                    <div className="h-6 w-16 rounded-full bg-slate-200" />
                  </div>
                  <div className="h-10 w-full rounded-xl bg-slate-200" />
                </div>
              ))
            : creators.map((c) => (
                <div
                  key={c.id}
                  className="group relative rounded-3xl bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-center gap-4">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="h-14 w-14 rounded-full ring-2 ring-indigo-400 transition group-hover:scale-105"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {c.name}
                      </h3>
                      <p className="text-sm text-slate-500">
                        {formatFollowers(c.followers)} followers
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="mb-4 text-sm text-slate-600">
                    {c.bio}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-600 transition hover:bg-indigo-100 hover:text-indigo-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className="w-full rounded-xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">
                    View Profile
                  </button>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
}
