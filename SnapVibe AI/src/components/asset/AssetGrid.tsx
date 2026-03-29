import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import ImageCard from "./AssetCard";
import Skeleton from "../ui/Skeleton";
import type { ImageItem } from "../../types/asset.type";
// import { useAuth } from "../../contexts/auth/useAuth";
import ImagePreviewModal from "../modals/ImagePreviewModal";

// import {
//   incrementLike,
//   incrementDownload,
// } from "../../services/assets/asset.action";

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
  // const { user } = useAuth();
  // const navigate = useNavigate();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] =
    useState<ImageItem | null>(null);

  /* FETCH */
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

  /* LIKE */
  // const handleLike = async (id: string, liked: boolean) => {
  //   try {
  //     const value = liked ? 1 : -1;

  //     // UI update
  //     setImages((prev) =>
  //       prev.map((img) =>
  //         img.id === id
  //           ? { ...img, likes: img.likes + value }
  //           : img
  //       )
  //     );

  //     await incrementLike(id, value);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  /* DOWNLOAD */
  // const handleDownload = async (id: string) => {
  //   const img = images.find((i) => i.id === id);
  //   if (!img) return;

  //   if (img.price && img.price > 0) {
  //     navigate(`/upgrade?imageId=${id}`);
  //     return;
  //   }

  //   if (!user) {
  //     navigate("/login");
  //     return;
  //   }

  //   try {
  //     setImages((prev) =>
  //       prev.map((i) =>
  //         i.id === id
  //           ? { ...i, downloads: i.downloads + 1 }
  //           : i
  //       )
  //     );

  //     await incrementDownload(id);

  //     window.open(img.imagePath, "_blank");
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  /* LOADING */
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <Skeleton key={i} className="aspect-[9/14] rounded-xl" />
        ))}
      </div>
    );
  }

  /* EMPTY */
  if (!images.length) {
    return (
      <div className="py-20 text-center text-slate-400">
        No templates found.
      </div>
    );
  }

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
              creatorName={img.creatorName}
              creatorAvatar={img.creatorAvatar} likes={0} downloads={0}            />
          </div>
        ))}

      </div>

      {/* MODAL */}
      {selectedImage && (
        <ImagePreviewModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          isLiked={false} onLike={function (): void {
            throw new Error("Function not implemented.");
          } }        />
      )}
    </>
  );
}