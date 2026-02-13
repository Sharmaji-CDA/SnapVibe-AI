import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export default function CTASection() {
  const { user, profile, loading } = useAuth();

  const getPrimaryCTA = () => {
    if (loading) return null;

    if (!user) {
      return {
        to: "/register",
        text: "Get Started Free →",
      };
    }

    if (profile?.accountType === "creator") {
      return {
        to: "/dashboard",
        text: "Go to Dashboard →",
      };
    }

    return {
      to: "/generate",
      text: "Generate First Visual →",
    };
  };

  const cta = getPrimaryCTA();

  return (
    <section className="relative overflow-hidden bg-black py-24 text-white">
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        <h2 className="mb-6 text-4xl font-extrabold sm:text-5xl">
          Create stunning AI visuals in seconds
        </h2>

        <p className="mx-auto mb-10 max-w-2xl text-sm text-slate-300 sm:text-base">
          Join thousands of creators discovering AI-powered visuals.
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
            to="/gallery"
            className="rounded-xl border border-white/30 px-10 py-4 text-sm font-medium transition hover:bg-white/10"
          >
            Explore Gallery
          </Link>
        </div>
      </div>
    </section>
  );
}