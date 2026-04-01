import { useMemo } from "react";
import { useAuth } from "../../contexts/auth/useAuth";

export default function CreatorDashboard() {
  const { profile } = useAuth();
  const isPro = profile?.subscription === "pro";

  const stats = useMemo(() => ({
    earnings: 12450,
    downloads: 320,
    likes: 890,
    views: 12400,
  }), []);

  const topImages = [
    { id: 1, title: "AI Portrait", downloads: 120 },
    { id: 2, title: "Fantasy Castle", downloads: 95 },
    { id: 3, title: "Cyber Girl", downloads: 80 },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white px-4 sm:px-6 py-6">

      {/* HEADER */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-xl sm:text-3xl font-bold">
          Creator Dashboard
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Track your performance & grow your content
        </p>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <StatCard title="Earnings" value={`₹${stats.earnings}`} />
        <StatCard title="Downloads" value={stats.downloads} />
        <StatCard title="Likes" value={stats.likes} />
        <StatCard title="Views" value={stats.views} />
      </div>

      {/* 🔥 CHART */}
      <div className="bg-white/5 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm text-slate-400 mb-3">
          Performance (Last 7 days)
        </p>

        <div className="h-40 sm:h-32 flex items-end gap-2">
          {[20, 40, 35, 60, 55, 70, 90].map((v, i) => (
            <div
              key={i}
              className="flex-1 bg-indigo-500 rounded"
              style={{ height: `${v}%` }}
            />
          ))}
        </div>
      </div>

      {/* 🔥 TOP IMAGES */}
      <div className="bg-white/5 rounded-xl p-3 sm:p-4 mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm text-slate-400 mb-3">
          Top Performing Images
        </p>

        <div className="space-y-2 sm:space-y-3">
          {topImages.map((img) => (
            <div
              key={img.id}
              className="flex justify-between items-center bg-white/5 p-2 sm:p-3 rounded-lg"
            >
              <p className="text-xs sm:text-sm truncate">
                {img.title}
              </p>
              <span className="text-xs text-slate-400">
                ⬇ {img.downloads}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 PRO */}
      {isPro ? <ProAnalytics /> : <LockedPro />}

    </div>
  );
}

/* ---------------- STAT CARD ---------------- */
function StatCard({ title, value }: any) {
  return (
    <div className="bg-white/5 p-3 sm:p-4 rounded-xl">
      <p className="text-[10px] sm:text-xs text-slate-400">
        {title}
      </p>
      <h2 className="text-sm sm:text-lg font-semibold mt-1">
        {value}
      </h2>
    </div>
  );
}

/* ---------------- PRO ---------------- */
function ProAnalytics() {
  return (
    <div className="space-y-6">

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <ProCard title="Growth" value="+12%" />
        <ProCard title="Conversion" value="3.4%" />
        <ProCard title="Engagement" value="+8%" />
        <ProCard title="Revenue" value="+₹2.3k" />
      </div>

      <div className="bg-indigo-500/10 border border-indigo-500/30 p-3 sm:p-4 rounded-xl">
        <p className="text-sm font-medium mb-2">
          🤖 AI Insights
        </p>
        <ul className="text-xs sm:text-sm text-slate-300 space-y-1">
          <li>• Fantasy content is trending 🔥</li>
          <li>• Best upload time: 6PM - 9PM</li>
          <li>• Portrait style performs 2x better</li>
        </ul>
      </div>

    </div>
  );
}

/* ---------------- PRO CARD ---------------- */
function ProCard({ title, value }: any) {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-3 sm:p-4 rounded-xl">
      <p className="text-[10px] sm:text-xs">{title}</p>
      <h2 className="text-sm sm:text-lg font-semibold mt-1">
        {value}
      </h2>
    </div>
  );
}

/* ---------------- LOCKED ---------------- */
function LockedPro() {
  return (
    <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-xl text-center">

      <p className="text-sm mb-2">
        🔒 Unlock advanced analytics with PRO
      </p>

      <p className="text-xs text-slate-400 mb-4">
        Get insights, growth tracking, and revenue analytics
      </p>

      <button className="w-full sm:w-auto bg-yellow-400 text-black px-5 py-2 rounded-full text-sm font-semibold">
        Upgrade to PRO
      </button>

    </div>
  );
}