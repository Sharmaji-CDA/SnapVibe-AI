import { useState } from "react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    id: "1",
    title: "Explore Marketplace",
    desc: "Discover trending AI wallpapers from talented creators.",
    icon: "🔥",
    actionText: "Browse Wallpapers",
    actionLink: "/gallery",
  },
  {
    id: "2",
    title: "Generate with AI",
    desc: "Create your own personalized mobile wallpaper in seconds.",
    icon: "✨",
    actionText: "Generate Now",
    actionLink: "/ai/generate",
  },
  {
    id: "3",
    title: "Sell & Earn",
    desc: "Upload your AI creations and earn from every download.",
    icon: "💰",
    actionText: "Become Creator",
    actionLink: "/subscription?type=creator",
  },
];

export default function HowItWorks() {
  const navigate = useNavigate();
  const [active, setActive] = useState("1");

  const currentStep = steps.find((s) => s.id === active);

  return (
    <section className="bg-slate-950 py-20 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold text-white">
            How SnapVibe<span className="text-indigo-500">AI</span> Works
          </h2>
          <p className="mt-3 text-sm text-slate-400">
            Create. Discover. Earn.
          </p>
        </div>

        {/* Steps */}
        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.id}
              onClick={() => setActive(s.id)}
              className={`cursor-pointer rounded-3xl p-8 text-center transition-all duration-300 border
                ${
                  active === s.id
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-xl scale-105"
                    : "bg-slate-900 text-slate-300 border-slate-800 hover:border-indigo-500"
                }`}
            >
              <div className="mb-5 text-3xl">{s.icon}</div>
              <h3 className="mb-2 text-lg font-semibold">
                {s.title}
              </h3>
              <p className="text-sm">
                {s.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate(currentStep?.actionLink || "/")}
            className="rounded-xl px-8 py-4 text-sm font-semibold text-white hover:bg-slate-200 transition"
          >
            {currentStep?.actionText}
          </button>

          <p className="mt-4 text-xs text-slate-500">
            Start free • Upgrade anytime
          </p>
        </div>

      </div>
    </section>
  );
}
