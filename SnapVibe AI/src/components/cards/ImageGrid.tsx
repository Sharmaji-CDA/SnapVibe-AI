import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import Skeleton from "../common/Skeleton";
import {
  toggleLikeImage,
  incrementDownload,
  getImagesByMode,
} from "../../services/image.service";
import type { ImageItem } from "../../types/image.type";
import ImagePreviewModal from "../common/ImagePriewModal";
import { useAuth } from "../../context/useAuth";

type Mode = "latest" | "trending" | "downloads";

type Props = {
  mode: Mode;
};

export default function ImageGrid({ mode }: Props) {
  const { user } = useAuth();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState<ImageItem | null>(null);

  useEffect(() => {
    setLoading(true);

    getImagesByMode(mode)
      .then(setImages)
      .finally(() => setLoading(false));
  }, [mode]);

  const handleLike = async (img: ImageItem) => {
    if (!user) return;

    const alreadyLiked =
      img.likedBy?.includes(user.uid) ?? false;

    // 🔥 Optimistic UI
    setImages((prev) =>
      prev.map((i) =>
        i.id === img.id
          ? {
              ...i,
              likes:
                i.likes + (alreadyLiked ? -1 : 1),
              likedBy: alreadyLiked
                ? i.likedBy?.filter(
                    (id) => id !== user.uid
                  )
                : [...(i.likedBy || []), user.uid],
            }
          : i
      )
    );

    await toggleLikeImage(
      img.id,
      user.uid,
      alreadyLiked
    );
  };

  const handleDownload = async (
    img: ImageItem
  ) => {
    setImages((prev) =>
      prev.map((i) =>
        i.id === img.id
          ? {
              ...i,
              downloads: i.downloads + 1,
            }
          : i
      )
    );

    await incrementDownload(img.id);
    window.open(img.imageUrl, "_blank");
  };

  const titleMap: Record<
    Mode,
    { title: string; desc: string }
  > = {
    latest: {
      title: "Latest Uploads",
      desc: "Fresh AI visuals from creators",
    },
    trending: {
      title: "Trending Now",
      desc:
        "Most loved AI visuals by the community",
    },
    downloads: {
      title: "Most Downloaded",
      desc:
        "Top downloaded visuals right now",
    },
  };

  /* ---------------- SKELETON ---------------- */
  if (loading) {
    return (
      <section className="relative mx-auto max-w-7xl px-6 py-14">
        <div className="mb-10">
          <Skeleton className="h-8 w-56 mb-3 rounded-md bg-slate-800" />
          <Skeleton className="h-4 w-80 rounded-md bg-slate-800" />
        </div>

        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map(
            (_, i) => (
              <Skeleton
                key={i}
                className="aspect-[4/5] rounded-2xl bg-slate-800 animate-pulse"
              />
            )
          )}
        </div>
      </section>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (!images.length) {
    return (
      <div className="py-20 text-center text-slate-400">
        No uploads yet.
      </div>
    );
  }

  return (
    <section className="relative mx-auto max-w-7xl px-6 py-14">
      {/* Header */}
      <div className="mb-10 flex items-center justify-between">
        <div>
          <h2 className={`text-3xl font-bold tracking-tight ${mode === "latest" ? "text-slate-500" : mode === "trending" ? "text-slate-500" : "text-slate-300"}`}>
            {titleMap[mode].title}
          </h2>
          <p className="mt-1 text-sm text-slate-400">
            {titleMap[mode].desc}
          </p>
        </div>

        <button className="hidden sm:inline-flex rounded-xl border border-white/20 px-4 py-2 text-sm font-medium text-white hover:bg-white/10 transition">
          View all →
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((img) => (
          <div
            key={img.id}
            onClick={() =>
              setSelectedImage(img)
            }
          >
            <ImageCard
              {...img}
              isLiked={
                user
                  ? img.likedBy?.includes(
                      user.uid
                    ) ?? false
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
              creatorAvatar={img.creatorAvatar}
              creatorName={img.creatorName}
              price={20}
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedImage && (
        <ImagePreviewModal
          image={selectedImage}
          isLiked={
            user
              ? selectedImage.likedBy?.includes(
                  user.uid
                ) ?? false
              : false
          }
          onClose={() =>
            setSelectedImage(null)
          }
          onLike={() =>
            handleLike(selectedImage)
          }
          onDownload={() =>
            handleDownload(selectedImage)
          }
        />
      )}
    </section>
  );
}
