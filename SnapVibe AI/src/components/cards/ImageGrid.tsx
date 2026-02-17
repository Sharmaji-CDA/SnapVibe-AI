import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  category?: string;
  filter?: "all" | "free" | "premium";
};

export default function ImageGrid({
  mode,
  category = "All",
  filter = "all",
}: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState<ImageItem | null>(null);

  useEffect(() => {
    setLoading(true);

    getImagesByMode(mode)
      .then((data) => {
        let filtered = data;

        // Category filter
        if (category !== "All") {
          filtered = filtered.filter(
            (img) => img.category === category
          );
        }

        // Free / Premium filter
        if (filter === "free") {
          filtered = filtered.filter(
            (img) => !img.price || img.price === 0
          );
        }

        if (filter === "premium") {
          filtered = filtered.filter(
            (img) => img.price && img.price > 0
          );
        }

        setImages(filtered);
      })
      .finally(() => setLoading(false));
  }, [mode, category, filter]);

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

    await toggleLikeImage(
      img.id,
      user.uid,
      alreadyLiked
    );
  };

  /* ---------------- DOWNLOAD / BUY ---------------- */
  const handleDownload = async (
    img: ImageItem
  ) => {
    // If premium image → go to buy page
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

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton
            key={i}
            className="aspect-[4/5] rounded-2xl bg-slate-800"
          />
        ))}
      </div>
    );
  }

  /* ---------------- EMPTY ---------------- */
  if (!images.length) {
    return (
      <div className="py-20 text-center text-slate-400">
        No wallpapers found.
      </div>
    );
  }

  return (
    <>
      {/* GRID */}
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
              price={img.price ?? undefined}
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
            />
          </div>
        ))}
      </div>

      {/* MODAL */}
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
    </>
  );
}
