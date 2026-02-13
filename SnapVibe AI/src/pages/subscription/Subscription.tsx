import { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import Skeleton from "../../components/common/Skeleton";
import { updateUserSubscription } from "../../services/user.service";
import { fetchPlansByAccountType } from "../../services/subscription.service";
import { useAuth } from "../../context/useAuth";

type AccountType = "user" | "creator";

type Plan = {
  id: string;
  price: number;
  features: string[];
};

export default function Subscription() {
  const { user, profile } = useAuth();

  // 🔹 UI state (controlled only by user interaction)
  const [activeTab, setActiveTab] =
    useState<AccountType>("user");

  // 🔹 Server state
  const [currentPlan, setCurrentPlan] =
    useState<string>("basic");

  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- LOAD PLANS ---------------- */
  useEffect(() => {
    const loadPlans = async () => {
      setLoading(true);
      const data =
        await fetchPlansByAccountType(activeTab);
      setPlans(data);
      setLoading(false);
    };

    loadPlans();
  }, [activeTab]);

  /* ---------------- SYNC PROFILE (ONLY PLAN) ---------------- */
  useEffect(() => {
    if (profile) {
      setCurrentPlan(profile.plan);
    }
  }, [profile?.plan]);

  /* ---------------- UPGRADE ---------------- */
  const handleUpgrade = async (planId: string) => {
    if (!user) return;

    await updateUserSubscription(
      user.uid,
      activeTab,
      planId
    );

    setCurrentPlan(planId);
  };

  const isUserOnThisTab =
    profile?.accountType === activeTab;

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-100 py-20">
      <div className="mx-auto max-w-6xl px-6">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-indigo-500 mb-3">
            Pricing
          </p>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Simple, transparent pricing
          </h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Choose the perfect plan for your needs.
          </p>
        </div>

        {/* ---------------- TABS ---------------- */}
        <div className="mb-16 flex justify-center">
          <div className="grid w-[340px] grid-cols-2 gap-2 rounded-full p-1">

            {(["user", "creator"] as AccountType[]).map((type) => {
              const isActive = activeTab === type;

              return (
                <button
                  key={type}
                  onClick={() => setActiveTab(type)}
                  className={`rounded-full py-2 text-sm font-medium transition-all duration-300 ${
                    isActive
                      ? "bg-black text-white shadow-md"
                      : "text-slate-600 hover:bg-slate-300/40"
                  }`}
                >
                  {type === "user"
                    ? "User Plans"
                    : "Creator Plans"}
                </button>
              );
            })}
          </div>
        </div>


        {/* ---------------- SKELETON ---------------- */}
        {loading ? (
          <div className="grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map(
              (_, i) => (
                <div
                  key={i}
                  className="rounded-3xl bg-white p-8 shadow-sm"
                >
                  <Skeleton className="h-6 w-24 mb-6 rounded-md" />
                  <Skeleton className="h-10 w-32 mb-6 rounded-md" />
                  <div className="space-y-3 mb-8">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-4/5 rounded-md" />
                    <Skeleton className="h-4 w-3/5 rounded-md" />
                  </div>
                  <Skeleton className="h-12 w-full rounded-xl" />
                </div>
              )
            )}
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-3">
            {plans.map((plan) => {
              const isCurrent =
                isUserOnThisTab &&
                currentPlan === plan.id;

              const isPopular =
                activeTab === "user"
                  ? plan.id === "standard"
                  : plan.id === "pro";

              return (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                    isCurrent
                      ? "bg-black text-white ring-2 ring-indigo-500 shadow-2xl"
                      : "bg-white text-slate-900 shadow-sm hover:-translate-y-1 hover:shadow-xl"
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

                    <p className="my-6 text-5xl font-extrabold tracking-tight">
                      {plan.price === 0
                        ? "Free"
                        : `₹${plan.price}`}
                      {plan.price !== 0 && (
                        <span className="ml-2 text-base font-medium text-slate-400">
                          / month
                        </span>
                      )}
                    </p>

                    <ul className="mb-8 space-y-3 text-sm">
                      {plan.features.map(
                        (feature, i) => (
                          <li key={i}>
                            ✓ {feature}
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  <Button
                    label={
                      isCurrent
                        ? "Current Plan"
                        : profile?.accountType !==
                          activeTab
                        ? "Switch Plan"
                        : "Upgrade"
                    }
                    fullWidth
                    disabled={!user || isCurrent}
                    onClick={() =>
                      handleUpgrade(plan.id)
                    }
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}