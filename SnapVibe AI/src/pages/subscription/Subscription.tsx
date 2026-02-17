import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Skeleton from "../../components/common/Skeleton";
import { fetchPlansByAccountType } from "../../services/subscription.service";
import { useAuth } from "../../context/useAuth";
import { useNavigate } from "react-router-dom";

type AccountType = "user" | "creator";

type Plan = {
  id: string;
  price: number;
  features: string[];
};

export default function Subscription() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  // 🔥 Primary monetization focus
  const [activeTab, setActiveTab] =
    useState<AccountType>("creator");

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      const data = await fetchPlansByAccountType(activeTab);
      setPlans(data);
      setLoading(false);
    };

    loadPlans();
  }, [activeTab]);

  const handleUpgrade = (planId: string) => {
    if (!user) {
      navigate(`/login?redirect=/upgrade?plan=${planId}&type=${activeTab}`);
      return;
    }

    navigate(`/upgrade?plan=${planId}&type=${activeTab}`);
  };

  const isUserOnThisTab =
    profile?.accountType === activeTab;

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-100 py-14">
      <div className="mx-auto max-w-6xl px-6">

        {/* ---------------- HEADER ---------------- */}
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-indigo-500 mb-3">
            Pricing
          </p>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Grow with SnapVibe<span className="text-indigo-500">AI</span>
          </h1>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            {activeTab === "creator"
              ? "Sell AI wallpapers and earn from every download. You keep most of the revenue."
              : "Unlock premium visuals, remove limits, and enjoy watermark-free downloads."}
          </p>
        </div>

        {/* ---------------- TABS ---------------- */}
        <div className="mb-10 flex justify-center">
          <div className="grid w-[360px] grid-cols-2 gap-2 rounded-full bg-slate-200/40 p-1">

            {(["creator", "user"] as AccountType[]).map((type) => {
              const isActive = activeTab === type;

              return (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`rounded-full py-2 text-sm font-medium transition-all ${
                    isActive
                      ? "bg-black text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {type === "creator"
                    ? "Creator Plans"
                    : "User Plans"}
                </button>
              );
            })}
          </div>
        </div>

        {/* ---------------- SKELETON ---------------- */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="rounded-3xl bg-white p-8 shadow-sm">
                <Skeleton className="h-6 w-24 mb-6 rounded-md" />
                <Skeleton className="h-10 w-32 mb-6 rounded-md" />
                <Skeleton className="h-12 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => {
              const isCurrent =
                isUserOnThisTab &&
                profile?.plan === plan.id;

              const isPopular =
                activeTab === "creator"
                  ? plan.id === "pro"
                  : plan.id === "standard";

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                    isCurrent
                      ? "bg-black text-white shadow-2xl"
                      : "bg-white text-slate-900 shadow-sm hover:shadow-xl hover:-translate-y-1"
                  }`}
                >
                  {isPopular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-4 py-1 rounded-full">
                      Most Popular
                    </div>
                  )}

                  <div>
                    <h2 className="text-xl font-bold capitalize">
                      {plan.id}
                    </h2>

                    <p className="my-6 text-4xl font-extrabold">
                      {plan.price === 0
                        ? "Free"
                        : `₹${plan.price}`}
                      {plan.price !== 0 && (
                        <span className={`ml-2 text-base ${
                          isCurrent
                            ? "text-slate-300"
                            : "text-slate-400"
                        }`}>
                          / month
                        </span>
                      )}
                    </p>

                    <ul className="mb-8 space-y-2 text-sm">
                      {plan.features.map((feature, i) => (
                        <li key={i}>✓ {feature}</li>
                      ))}
                    </ul>

                    {/* 🔥 Commission clarity for creators */}
                    {activeTab === "creator" && (
                      <div className="mb-6 text-xs text-slate-500">
                        {plan.id === "go" &&
                          "Platform commission: 20% per sale"}
                        {plan.id === "pro" &&
                          "Platform fee: 10% per sale"}
                      </div>
                    )}
                  </div>

                  <Button
                    label={
                      isCurrent
                        ? "Current Plan"
                        : plan.price === 0
                        ? "Start Free"
                        : "Upgrade Now"
                    }
                    fullWidth
                    disabled={isCurrent}
                    onClick={() =>
                      handleUpgrade(plan.id)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}

        {/* ---------------- FOOTNOTE ---------------- */}
        <div className="mt-12 text-center text-xs text-slate-500">
          Secure manual UPI payments • Fast activation • Cancel anytime
        </div>

      </div>
    </section>
  );
}