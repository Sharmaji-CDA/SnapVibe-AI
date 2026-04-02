import { useEffect, useState } from "react";
import Skeleton from "../../components/ui/Skeleton";

function CreatorSkeletonCard() {
  return (
    <div className="rounded-2xl border bg-white p-6 text-center shadow-lg">
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
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-5xl">

        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-800">
            About <span className="text-indigo-600">CreatorVibe</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-500">
            A next-generation platform where AI tools empower creators and users to create, share, and discover content.
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-10 text-center text-slate-600">

          <p className="text-lg">
            <span className="font-semibold text-indigo-500">CreatorVibe</span> is
            a hybrid platform that combines powerful AI generation tools with a
            creator-driven ecosystem. Whether you're a creator publishing content
            or a user exploring ideas, CreatorVibe gives you the tools to bring
            your creativity to life.
          </p>

          {/* Feature Grid */}
          <div className="grid gap-8 pt-8 sm:grid-cols-2">

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                🤖 AI-Powered Creation
              </h3>
              <p>
                Generate high-quality content instantly using advanced AI tools
                designed for speed, creativity, and flexibility.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                🎨 Creator Ecosystem
              </h3>
              <p>
                Creators can publish, showcase, and monetize their work while
                building an audience within the platform.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                🔍 Content Discovery
              </h3>
              <p>
                Users can explore trending, high-quality content curated from
                creators across the platform.
              </p>
            </div>

            <div className="rounded-2xl border bg-white p-6 shadow-sm">
              <h3 className="mb-2 text-xl font-semibold text-slate-800">
                💡 Built for Everyone
              </h3>
              <p>
                Whether you're a beginner or professional, CreatorVibe is designed
                to make content creation simple and powerful.
              </p>
            </div>

          </div>
        </div>

        {/* Meet the Creators */}
        <div className="pt-16">
          <div className="mb-10 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-800">
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
                <div className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-lg transition">
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

                <div className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-lg transition">
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

                <div className="rounded-2xl border bg-white p-6 text-center shadow-sm hover:shadow-lg transition">
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

      </div>
    </section>
  );
}