import { useEffect, useState } from "react";
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

const FILTERS = ["Today", "This Week", "This Month"] as const;

export default function TrendingSection() {
  const { user } = useAuth();
  const [active, setActive] =
    useState<(typeof FILTERS)[number]>("Today");

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

  const handleLike = async (img: ImageItem) => {
    if (!user) return;

    const alreadyLiked =
      img.likedBy?.includes(user.uid) ?? false;

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

  const handleDownload = async (img: ImageItem) => {
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
    <section className="relative mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-200">
            Trending Visuals
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Most popular AI creations right now
          </p>
        </div>

        {/* Filters */}
        <div className="flex gap-2">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActive(filter)}
              className={`rounded-full px-4 py-1.5 text-sm transition ${
                active === filter
                  ? "bg-black text-white"
                  : "border text-slate-600 hover:bg-slate-50"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Skeleton */}
      {loading ? (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton
              key={i}
              className="aspect-[4/5] rounded-2xl"
            />
          ))}
        </div>
      ) : images.length === 0 ? (
        <p className="text-center text-slate-500">
          No trending visuals yet.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
            >
              <ImageCard
                {...img}
                price={20}
                isLiked={
                  user
                    ? img.likedBy?.includes(user.uid) ??
                      false
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
            </div>
          ))}
        </div>
      )}

      {/* View More */}
      {!loading && images.length > 0 && (
        <div className="mt-12 text-center">
          <button className="rounded-xl border px-6 py-3 text-sm font-medium hover:bg-slate-50">
            View all trending →
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <ImagePreviewModal
          image={selectedImage}
          isLiked={
            user
              ? selectedImage.likedBy?.includes(user.uid) ??
                false
              : false
          }
          onClose={() => setSelectedImage(null)}
          onLike={() => handleLike(selectedImage)}
          onDownload={() =>
            handleDownload(selectedImage)
          }
        />
      )}
    </section>
  );
}
