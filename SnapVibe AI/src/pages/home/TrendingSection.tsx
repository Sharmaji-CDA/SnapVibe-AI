import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/ui/Skeleton";
import type { ImageItem } from "../../types/asset.type";
// import { useAuth } from "../../contexts/auth/useAuth";
import ImagePreviewModal from "../../components/modals/ImagePreviewModal";
import { Sparkles } from "lucide-react";

export default function TrendingSection() {
  // const { user } = useAuth();
  const navigate = useNavigate();

  const [images,] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] =
    useState<ImageItem | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);

      // 🔥 connect API
      // const data = await getAssets("trending");
      // setImages(data);

      setLoading(false);
    };

    loadImages();
  }, []);

  const handleGenerateSimilar = (img: ImageItem) => {
    if (!img.prompt) return;
    navigate(`/ai/generate?prompt=${encodeURIComponent(img.prompt)}`);
  };

  return (
    <section className="bg-slate-950 py-16">

      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              🔥 Trending Now
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Top AI creations people love
            </p>
          </div>

          <button
            onClick={() => navigate("/gallery?mode=trending")}
            className="text-sm text-white hover:underline"
          >
            View all →
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="flex gap-4 overflow-hidden">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[260px] w-[180px] rounded-2xl"
              />
            ))}
          </div>
        ) : images.length === 0 ? (
          <p className="text-center text-slate-400">
            No trending visuals yet.
          </p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">

            {images.slice(0, 10).map((img) => (
              <div
                key={img.id}
                className="min-w-[180px] sm:min-w-[220px] cursor-pointer group"
                onClick={() => setSelectedImage(img)}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-lg">

                  {/* IMAGE */}
                  <img
                    src={img.imagePath}
                    alt=""
                    className="h-[260px] sm:h-[300px] w-full object-cover transition group-hover:scale-105"
                  />

                  {/* TOP BADGE */}
                  <div className="absolute top-2 left-2 bg-black/60 text-xs px-2 py-1 rounded-md text-white">
                    Trending
                  </div>

                  {/* BOTTOM ACTION */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleGenerateSimilar(img);
                    }}
                    className="absolute bottom-2 left-2 right-2 flex items-center justify-center gap-1 bg-white text-black text-xs py-1 rounded-lg opacity-0 group-hover:opacity-100 transition"
                  >
                    <Sparkles size={12} />
                    Generate Similar
                  </button>
                </div>

                {/* TITLE */}
                <p className="mt-2 text-xs text-slate-300 line-clamp-2">
                  {img.prompt || "AI generated visual"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      {selectedImage && (
        <ImagePreviewModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onLike={() => {}}
          isLiked={false}
        />
      )}
    </section>
  );
}