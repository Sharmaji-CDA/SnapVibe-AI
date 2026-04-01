import { useEffect, useState } from "react";
import ImageCard from "./AssetCard";
import Skeleton from "../ui/Skeleton";
import type { ImageItem } from "../../types/asset.type";
import ImagePreviewModal from "../modals/ImagePreviewModal";
import { getUserLikes } from "../../services/likes/like.service";

import { useAuth } from "../../contexts/auth/useAuth";

// ✅ IMPORT SERVICES
import { toggleLike } from "../../services/likes/like.service";
import { toggleFollow } from "../../services/follows/follow.service";
import { recordDownload } from "../../services/downloads/download.service";

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

  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState<ImageItem | null>(null);

  const [likedImages, setLikedImages] = useState<string[]>([]);

  /* ================= FETCH ================= */

  useEffect(() => {
    const loadLikes = async () => {
      if (!user) return;

      try {
        const likes = await getUserLikes(user.uid);
        setLikedImages(likes.map((l) => l.imageId));
      } catch (err) {
        console.error(err);
      }
    };

    loadLikes();
  }, [user]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      try {
        const { getAssets } = await import(
          "../../services/assets/asset.query"
        );

        const res = await getAssets(mode);

        let filtered = res.data;

        if (filter === "free") {
          filtered = filtered.filter((i) => !i.price);
        }

        if (filter === "premium") {
          filtered = filtered.filter((i) => i.price);
        }

        setImages(filtered);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [mode, category, filter]);

  /* ================= LIKE ================= */

  const handleLike = async (image: ImageItem) => {
    if (!user) return;

    try {
      const res = await toggleLike(user.uid, image.id);

      setLikedImages((prev) =>
        res.liked
          ? Array.from(new Set([...prev, image.id]))
          : prev.filter((id) => id !== image.id)
      );

      // ✅ update modal instantly
      setSelectedImage((prev) =>
        prev && prev.id === image.id
          ? {
              ...prev,
              likes: res.liked
                ? (prev.likes || 0) + 1
                : Math.max((prev.likes || 0) - 1, 0),
            }
          : prev
      );

    } catch (err) {
      console.error(err);
    }
  };

  /* ================= FOLLOW ================= */

  const handleFollow = async (creatorId: string) => {
    if (!user) return;

    try {
      await toggleFollow(user.uid, creatorId);
    } catch (err) {
      console.error(err);
    }
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = async (image: ImageItem) => {
    if (!user) return;

    try {
      await recordDownload(image.id, user.uid);

      // ✅ update modal count
      setSelectedImage((prev) =>
        prev && prev.id === image.id
          ? {
              ...prev,
              downloads: (prev.downloads || 0) + 1,
            }
          : prev
      );

      const link = document.createElement("a");
      link.href = image.imagePath;
      link.download = image.title || "image";
      link.click();

    } catch (err) {
      console.error(err);
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[9/14] rounded-xl" />
        ))}
      </div>
    );
  }

  /* ================= EMPTY ================= */

  if (!images.length) {
    return (
      <div className="py-20 text-center text-slate-400">
        No templates found.
      </div>
    );
  }

  /* ================= UI ================= */

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">

        {images.map((img) => (
          <div
            key={img.id}
            onClick={() => setSelectedImage(img)}
          >
            <ImageCard
              id={img.id}
              imageUrl={img.imagePath}
              title={img.title}
              price={img.price ?? undefined}
              creatorId={img.creatorId}
              creatorName={img.creatorName}
              creatorAvatar={img.creatorAvatar}
              likes={img.likes || 0}
              downloads={img.downloads || 0}
            />
          </div>
        ))}

      </div>

      {/* ================= MODAL ================= */}

      {selectedImage && (
        <ImagePreviewModal
          image={{...selectedImage,
                  price: selectedImage.price ?? undefined, }}
          onClose={() => setSelectedImage(null)}

          onLike={(img) => {
            handleLike(img as ImageItem);
          }}
          onDownload={(img) => {
            handleDownload(img as ImageItem);
          }}
          onFollow={handleFollow}

          isLiked={likedImages.includes(selectedImage.id)}
        />
      )}
    </>
  );
}