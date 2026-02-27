import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Skeleton from "../../components/common/Skeleton";
import {
  getImagesByMode,
  incrementDownload,
  toggleLikeImage,
} from "../../services/image.service";
import type { ImageItem } from "../../types/image.type";
import ImagePreviewModal from "../../components/common/ImagePriewModal";
import ImageCard from "../../components/cards/ImageCard";
import { useAuth } from "../../context/useAuth";
import Modal from "../../components/common/Modal";

export default function TrendingSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] =
    useState<ImageItem | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImages = async () => {
      setLoading(true);
      const data = await getImagesByMode("trending");
      setImages(data);
      setLoading(false);
    };

    loadImages();
  }, []);

  /* ---------------- LIKE ---------------- */
  const handleLike = async (img: ImageItem) => {
    if (!user) {
      navigate("/login");
      return;
    }

    const alreadyLiked =
      img.likedBy?.includes(user.uid) ?? false;

    // Optimistic UI
    setImages((prev) =>
      prev.map((i) =>
        i.id === img.id
          ? {
              ...i,
              likes: i.likes + (alreadyLiked ? -1 : 1),
              likedBy: alreadyLiked
                ? i.likedBy?.filter(
                    (id) => id !== user.uid
                  )
                : [...(i.likedBy || []), user.uid],
            }
          : i
      )
    );

    await toggleLikeImage(img.id, user.uid, alreadyLiked);
  };

  /* ---------------- DOWNLOAD / BUY ---------------- */
  const handleDownload = async (img: ImageItem) => {
    // 🔒 If paid image → go to buy page
    if (img.price && img.price > 0) {
      if (!user) {
        navigate("/login");
        return;
      }

      navigate(`/buy/${img.id}`);
      return;
    }

    // Free image
    setImages((prev) =>
      prev.map((i) =>
        i.id === img.id
          ? { ...i, downloads: i.downloads + 1 }
          : i
      )
    );

    await incrementDownload(img.id);
    window.open(img.imageUrl, "_blank");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 py-14">

      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[300px] w-[90vw] max-w-[600px] -translate-x-1/2 rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <h2 className="text-3xl font-bold text-white">
              🔥 Trending Premium Wallpapers
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Most downloaded creator designs • Starting from ₹10
            </p>
          </div>

          <button
            onClick={() => navigate("/gallery?mode=trending")}
            className="rounded-xl border border-white/20 bg-white/5 px-6 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
          >
            Explore All →
          </button>
        </div>

        {/* CONTENT */}
        {loading ? (
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="aspect-[9/16] rounded-2xl" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <p className="text-center text-slate-400">
            No trending visuals yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:gap-8 sm:grid-cols-3 lg:grid-cols-4">

            {images.slice(0, 8).map((img) => (
              <div
                key={img.id}
                className="group relative cursor-pointer"
                onClick={() => setSelectedImage(img)}
              >

                <div className="relative overflow-hidden rounded-2xl shadow-xl transition duration-300 group-hover:scale-[1.03]">

                  {/* IMAGE CARD */}
                  <ImageCard
                    {...img}
                    price={img.price ?? undefined}
                    isLiked={
                      user
                        ? img.likedBy?.includes(user.uid) ?? false
                        : false
                    }
                    onLike={(e?: any) => {
                      e?.stopPropagation();
                      handleLike(img);
                    }}
                    onDownload={(e?: any) => {
                      e?.stopPropagation();
                      handleDownload(img);
                    }}
                  />

                  {/* HOVER BUY BUTTON */}
                  {typeof img.price === "number" && img.price > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition group-hover:opacity-100">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(img);
                        }}
                        className="rounded-xl bg-white px-6 py-2 text-sm font-semibold text-black hover:bg-slate-200 transition"
                      >
                        Buy Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* VIEW MORE */}
        {!loading && images.length > 8 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => navigate("/gallery?mode=trending")}
              className="rounded-xl bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-slate-200 transition"
            >
              View More Trending →
            </button>
          </div>
        )}

      </div>

      {/* MODAL */}
      {selectedImage && (
        <Modal open={selectedImage !== null} onClose={() => setSelectedImage(null)}>

          <ImagePreviewModal
            image={selectedImage}
            isLiked={
              user
                ? selectedImage.likedBy?.includes(user.uid) ?? false
                : false
            }
            onClose={() => setSelectedImage(null)}
            onLike={() => handleLike(selectedImage)}
            onDownload={() => handleDownload(selectedImage)}
          />
        </Modal>
      )}
    </section>
  );
}