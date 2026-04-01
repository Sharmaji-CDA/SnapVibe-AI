import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAssets } from "../../services/assets/asset.query";

export default function Templates() {
  const [templates, setTemplates] = useState<any[]>([]);
  const [category, setCategory] = useState("All");
  const navigate = useNavigate();

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const load = async () => {
      const res = await getAssets("latest");

      // 🔥 only templates
      const onlyTemplates = res.data.filter(
        (i: any) => i.type === "template"
      );

      setTemplates(onlyTemplates);
    };

    load();
  }, []);

  /* ---------------- CATEGORY FILTER ---------------- */
  const categories = [
    "All",
    "Social Media",
    "Marketing",
    "Business",
    "Festival",
  ];

  const filtered =
    category === "All"
      ? templates
      : templates.filter((t) => t.category === category);

  return (
    <section className="bg-slate-950 text-white min-h-screen px-4 py-10">

      {/* HERO */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold">
          Design Templates
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Ready-to-use templates created by creators
        </p>
      </div>

      {/* CATEGORY */}
      <div className="max-w-6xl mx-auto flex gap-2 flex-wrap mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-4 py-1 rounded-full text-sm ${
              category === cat
                ? "bg-white text-black"
                : "bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">

        {filtered.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => navigate(`/template/${t.id}`)}
          >

            {/* IMAGE */}
            <div className="relative">
              <img
                src={t.imagePath}
                className="w-full h-48 object-cover"
              />

              {/* PREMIUM */}
              {t.price && (
                <div className="absolute top-2 left-2 bg-black text-white text-xs px-2 py-1 rounded">
                  Premium
                </div>
              )}
            </div>

            {/* CONTENT */}
            <div className="p-3 text-black">
              <p className="text-sm font-medium line-clamp-1">
                {t.title}
              </p>

              {/* ACTION */}
              <button className="mt-2 w-full text-xs bg-black text-white py-1 rounded">
                Use Template
              </button>
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}