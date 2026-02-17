import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function CTASection() {
  const { user, profile, loading } = useAuth();

  const getPrimaryCTA = () => {
    if (loading) return null;

    if (!user) {
      return {
        to: "/register",
        text: "Start Free Today →",
      };
    }

    if (profile?.accountType === "creator") {
      return {
        to: "/creator/dashboard",
        text: "Open Creator Dashboard →",
      };
    }

    return {
      to: "/gallery",
      text: "Explore Premium Wallpapers →",
    };
  };

  const cta = getPrimaryCTA();

  return (
    <section className="relative bg-slate-950 border-t border-slate-800 py-24 text-white">

      {/* Subtle glow (ONLY bottom CTA, not everywhere) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center">

        <h2 className="mb-6 text-4xl font-extrabold sm:text-5xl">
          Discover Premium AI Wallpapers
          <br />
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            or Start Selling Yours
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-sm text-slate-400 sm:text-base">
          Buy exclusive mobile wallpapers from creators starting at ₹10
          or generate your own with AI.
        </p>

        <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">

          {cta && (
            <Link
              to={cta.to}
              className="rounded-xl bg-white px-10 py-4 text-sm font-semibold text-black transition hover:scale-105 hover:shadow-xl"
            >
              {cta.text}
            </Link>
          )}

          <Link
            to="/subscription?type=creator"
            className="rounded-xl border border-white/30 px-10 py-4 text-sm font-medium transition hover:bg-white/10"
          >
            Become a Creator
          </Link>

        </div>

        <p className="mt-6 text-xs text-slate-500">
          No upfront cost • Earn from every download • Cancel anytime
        </p>

      </div>
    </section>
  );
}