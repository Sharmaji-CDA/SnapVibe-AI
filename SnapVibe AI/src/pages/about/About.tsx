import { useEffect, useState } from "react";
import Skeleton from "../../components/common/Skeleton";

function CreatorSkeletonCard() {
  return (
    <div className="rounded-2xl border bg-white p-6 text-center shadow-sm">
      <Skeleton className="mx-auto h-24 w-24 rounded-full" />
      <Skeleton className="mx-auto mt-4 h-5 w-32" />
      <Skeleton className="mx-auto mt-2 h-4 w-24" />

      <div className="mt-3 space-y-2">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="mx-auto h-3 w-4/5" />
      </div>
    </div>
  );
}

export default function About() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // simulate API delay

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-300">
          About <span className="text-indigo-600">SnapVibe AI</span>
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
          A modern platform where AI creativity meets a fair creator economy.
        </p>
      </div>

      {/* Main Content */}
      <div className="space-y-10 text-slate-400">
        <p className="text-lg">
          <span className="font-semibold text-indigo-400">SnapVibe AI</span> is a
          creative discovery platform built for designers, creators, and
          everyday users who want stunning, AI-powered visuals.
        </p>

        {/* Feature Grid */}
        <div className="grid gap-8 pt-8 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🎨 AI-Powered Creativity
            </h3>
            <p>
              Discover visually striking AI-generated images crafted by talented creators.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🤝 Fair Creator Economy
            </h3>
            <p>
              We prioritize creators by building a platform that values their work.
            </p>
          </div>
        </div>
      </div>

      {/* Meet the Creators */}
      <div className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-300">
            Meet the Creators
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {loading ? (
            <>
              <CreatorSkeletonCard />
              <CreatorSkeletonCard />
              <CreatorSkeletonCard />
            </>
          ) : (
            <>
              {/* Real Creator Cards */}
              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md">
                <img
                  src="https://i.pravatar.cc/150?img=32"
                  alt="Creator avatar"
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold text-slate-800">
                  Alex Morgan
                </h3>
                <p className="text-sm text-slate-500">AI Visual Artist</p>
              </div>

              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md">
                <img
                  src="https://i.pravatar.cc/150?img=47"
                  alt="Creator avatar"
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold text-slate-800">
                  Sophia Lee
                </h3>
                <p className="text-sm text-slate-500">Creative Technologist</p>
              </div>

              <div className="rounded-2xl border bg-white p-6 text-center shadow-sm transition hover:shadow-md">
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Creator avatar"
                  className="mx-auto h-24 w-24 rounded-full object-cover"
                />
                <h3 className="mt-4 text-xl font-semibold text-slate-800">
                  Daniel Reyes
                </h3>
                <p className="text-sm text-slate-500">AI Designer</p>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
