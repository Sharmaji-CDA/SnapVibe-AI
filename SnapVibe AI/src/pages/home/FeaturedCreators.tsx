import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

type Creator = {
  id: string;
  name: string;
  avatar: string;
  followers: number;
  bio: string;
  tags: string[];
};

export default function FeaturedCreators() {
  const navigate = useNavigate();
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
    }, 1000);
  }, []);

  const formatFollowers = (num: number) =>
    num >= 1000 ? `${(num / 1000).toFixed(1)}k` : num;

  return (
    <section className="bg-slate-950 py-20 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-14 text-center">
          <h2 className="text-3xl font-bold text-white">
            🌟 Top Creators
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Discover artists earning from their AI wallpapers
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse rounded-3xl bg-slate-900 p-6"
                >
                  <div className="mb-4 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-full bg-slate-800" />
                    <div className="flex-1">
                      <div className="mb-2 h-4 w-24 bg-slate-800 rounded" />
                      <div className="h-3 w-16 bg-slate-800 rounded" />
                    </div>
                  </div>
                  <div className="h-3 w-full bg-slate-800 rounded" />
                </div>
              ))
            : creators.map((c) => (
                <div
                  key={c.id}
                  className="group rounded-3xl bg-slate-900 p-6 border border-slate-800 transition hover:border-indigo-500 hover:shadow-xl"
                >
                  {/* Header */}
                  <div className="mb-4 flex items-center gap-4">
                    <img
                      src={c.avatar}
                      alt={c.name}
                      className="h-14 w-14 rounded-full ring-2 ring-indigo-500"
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {c.name}
                      </h3>
                      <p className="text-xs text-slate-400">
                        {formatFollowers(c.followers)} followers
                      </p>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="mb-4 text-sm text-slate-400">
                    {c.bio}
                  </p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {c.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    onClick={() => navigate(`/creator/${c.id}`)}
                    className="w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
                  >
                    View Creator Profile
                  </button>
                </div>
              ))}
        </div>

        {/* Become Creator CTA */}
        <div className="mt-16 text-center">
          <h3 className="text-lg font-semibold text-white">
            Want to earn from your AI designs?
          </h3>
          <p className="mt-2 text-sm text-slate-400">
            Sell your wallpapers and earn every month.
          </p>
          <button
            onClick={() => navigate("/subscription?type=creator")}
            className="mt-6 rounded-xl px-6 py-3 text-sm font-semibold text-white hover:bg-slate-200"
          >
            Become a Creator →
          </button>
        </div>

      </div>
    </section>
  );
}
