import { useState } from "react";

const steps = [
  {
    id: "1",
    title: "Discover",
    desc: "Explore trending AI wallpapers and themes curated by creators.",
    icon: "🔍",
    actionText: "Browse Trending",
  },
  {
    id: "2",
    title: "Generate",
    desc: "Describe what you want and let AI create stunning visuals instantly.",
    icon: "✨",
    actionText: "Start Generating",
  },
  {
    id: "3",
    title: "Download",
    desc: "Download free content or unlock premium visuals.",
    icon: "⬇️",
    actionText: "Get Your Visual",
  },
];

export default function HowItWorks() {
  const [active, setActive] = useState("1");

  const currentStep = steps.find((s) => s.id === active);

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900">
            How SnapVibe AI Works
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-slate-500">
            Simple. Fast. Creative. Click a step to explore.
          </p>
        </div>

        {/* Interactive Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`cursor-pointer rounded-3xl p-8 text-center transition-all duration-300
                ${
                  active === s.id
                    ? "bg-black text-white shadow-2xl scale-105"
                    : "bg-white shadow-sm hover:-translate-y-2 hover:shadow-xl"
                }`}
            >
              <div className="mb-5 text-3xl">{s.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">
                {s.title}
              </h3>
              <p
                className={`text-sm ${
                  active === s.id ? "text-slate-200" : "text-slate-600"
                }`}
              >
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Conversion Section */}
        <div className="mt-20 text-center">
          <h3 className="text-xl font-semibold text-slate-900">
            Ready to {currentStep?.title}?
          </h3>

          <button className="mt-6 rounded-xl bg-black px-8 py-4 text-sm font-semibold text-white transition hover:bg-slate-800 hover:scale-105">
            {currentStep?.actionText}
          </button>

          <p className="mt-4 text-xs text-slate-400">
            No credit card required • Free downloads available
          </p>
        </div>
      </div>
    </section>
  );
}
