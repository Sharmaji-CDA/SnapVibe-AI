import ImageGrid from "../../components/cards/ImageGrid";

export default function CreatorDashboard() {
  return (
    <section className="relative bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* PAGE HEADER */}
        <div className="mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Creator Dashboard
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Track your performance, downloads, and earnings from your AI creations.
          </p>
        </div>

        {/* STATS */}
        <div className="mb-16 grid gap-8 md:grid-cols-3">
          {/* Uploads */}
          <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-md">
            <p className="mb-2 text-sm font-medium text-slate-500">
              Uploads
            </p>
            <p className="text-4xl font-bold text-slate-900">
              24
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Total visuals published
            </p>
          </div>

          {/* Downloads */}
          <div className="rounded-3xl bg-white p-8 shadow-sm transition hover:shadow-md">
            <p className="mb-2 text-sm font-medium text-slate-500">
              Downloads
            </p>
            <p className="text-4xl font-bold text-slate-900">
              1,240
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Community engagement
            </p>
          </div>

          {/* Earnings (highlighted) */}
          <div className="relative rounded-3xl bg-black p-8 text-white shadow-lg">
            <p className="mb-2 text-sm font-medium text-white/70">
              Earnings
            </p>
            <p className="text-4xl font-extrabold">
              ₹1,520
            </p>
            <p className="mt-2 text-xs text-white/70">
              Total creator earnings
            </p>

            {/* Accent */}
            <div className="absolute right-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs">
              💎 Premium
            </div>
          </div>
        </div>

        {/* MY UPLOADS HEADER */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">
            My Uploads
          </h2>

          <button onClick={() => window.location.href = "/upload"} className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
            Upload New
          </button>
        </div>

        {/* UPLOADS GRID */}
        <ImageGrid mode={"downloads"} />

      </div>
    </section>
  );
}
