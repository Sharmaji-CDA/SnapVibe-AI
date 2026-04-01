import { useEffect, useState } from "react";
import { getAssets } from "../../services/assets/asset.query";
import Skeleton from "../../components/ui/Skeleton";
import ImageCard from "../../components/asset/AssetCard";

type FilterType = "all" | "free" | "premium";

const ITEMS_PER_PAGE = 12;

export default function Explore() {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<FilterType>("all");
  const [page, setPage] = useState(1);

  /* ---------------- FETCH ---------------- */
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await getAssets("latest");

        let data = res.data || [];

        if (filter === "free") {
          data = data.filter((i: any) => !i.price);
        }

        if (filter === "premium") {
          data = data.filter((i: any) => i.price);
        }

        setImages(data);
        setPage(1); // reset page when filter changes
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [filter]);

  /* ---------------- PAGINATION ---------------- */
  const totalPages = Math.ceil(images.length / ITEMS_PER_PAGE);

  const paginatedImages = images.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <section className="bg-slate-950 min-h-screen text-white py-10">

      {/* 🔥 BANNER */}
      <div className="max-w-6xl mx-auto mb-8"> 
        <h1 className="text-3xl sm:text-4xl font-bold"> Explore AI Creations </h1> 
        <p className="text-slate-400 mt-2 text-sm"> Discover trending, premium and free AI-generated images </p> 
      </div>

      <div className="px-4 sm:px-6 py-10">

        {/* FILTER */}
        <div className="max-w-6xl mx-auto flex gap-2 mb-6 flex-wrap">
          {["all", "free", "premium"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as FilterType)}
              className={`px-4 py-1 rounded-full text-sm ${filter === f
                  ? "bg-white text-black"
                  : "bg-white/10 text-white"
                }`}
            >
              {f.toUpperCase()}
            </button>
          ))}
        </div>

        {/* GRID */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

          {loading &&
            Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="h-[220px] rounded-xl" />
            ))}

          {!loading &&
            paginatedImages.map((img) => (
              <ImageCard
                key={img.id}
                {...img}
                imageUrl={img.imagePath}
                price={img.price}
                onLike={() => { }}
                onDownload={() => window.open(img.imagePath)}
              />
            ))}
        </div>

        {/* EMPTY */}
        {!loading && images.length === 0 && (
          <div className="text-center text-slate-400 mt-20">
            No images found
          </div>
        )}

        {/* 🔥 PAGINATION */}
        {!loading && totalPages > 1 && (
          <div className="flex justify-center mt-10 gap-2 flex-wrap">

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="px-3 py-1 bg-white/10 rounded disabled:opacity-30"
            >
              Prev
            </button>

            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-3 py-1 rounded ${page === i + 1
                    ? "bg-white text-black"
                    : "bg-white/10"
                  }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="px-3 py-1 bg-white/10 rounded disabled:opacity-30"
            >
              Next
            </button>

          </div>
        )}

      </div>
    </section>
  );
}