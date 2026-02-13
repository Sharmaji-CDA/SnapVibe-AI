export default function About() {
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
          everyday users who want stunning, AI-powered visuals. From wallpapers
          and illustrations to unique themes, SnapVibe helps you find visuals
          that inspire.
        </p>

        <p className="text-lg">
          We believe AI should empower creativity — not replace it. That’s why
          SnapVibe AI is designed to celebrate originality, giving creators a
          platform to share their work while ensuring users get high-quality,
          curated content.
        </p>

        {/* Feature Grid */}
        <div className="grid gap-8 pt-8 sm:grid-cols-2">
          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🎨 AI-Powered Creativity
            </h3>
            <p>
              Discover visually striking AI-generated images crafted by talented
              creators across the globe.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🤝 Fair Creator Economy
            </h3>
            <p>
              We prioritize creators by building a platform that values their
              work and supports sustainable earnings.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🚀 Premium Experience
            </h3>
            <p>
              Clean design, fast performance, and curated collections — all
              crafted for a smooth, premium browsing experience.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <h3 className="mb-2 text-xl font-semibold text-slate-800">
              🌍 Built for Everyone
            </h3>
            <p>
              Whether you’re a creator, designer, or casual user, SnapVibe AI
              adapts to your creative needs.
            </p>
          </div>
        </div>

        {/* Closing */}
        <p className="pt-8 text-lg">
          SnapVibe AI is more than just an image platform — it’s a growing
          creative ecosystem. We’re building the future of visual discovery,
          where technology and creativity move forward together.
        </p>
      </div>

      {/* Meet the Creators */}
      <div className="pt-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-300">
            Meet the Creators
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-slate-500">
            Talented artists and AI creators from around the world bringing ideas to
            life through <span className="font-semibold text-indigo-400">SnapVibe AI</span>.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* Creator Card */}
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
            <p className="mt-3 text-sm text-slate-600">
              Focused on cinematic AI wallpapers and surreal digital landscapes.
            </p>
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
            <p className="mt-3 text-sm text-slate-600">
              Blending art and AI to create modern, minimal visual themes.
            </p>
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
            <p className="mt-3 text-sm text-slate-600">
              Passionate about generative art, abstract visuals, and creative tools.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
