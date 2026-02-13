import { useEffect, useState } from "react";
import ImageCard from "../../components/cards/ImageCard";
import type { ImageItem } from "../../types/image.type";
import {
  getImagesByCreator,
  toggleLikeImage,
  incrementDownload,
} from "../../services/image.service";
import ImagePreviewModal from "../../components/common/ImagePriewModal";
import { useAuth } from "../../context/useAuth";

export default function UserProfile() {
  const { user } = useAuth();
  const [images, setImages] = useState<ImageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    getImagesByCreator(user.uid)
      .then(setImages)
      .finally(() => setLoading(false));
  }, [user]);

  const handleLike = async (img: ImageItem) => {
    if (!user) return;

    const alreadyLiked = img.likedBy?.includes(user.uid) ?? false;

    setImages((prev) =>
      prev.map((i) =>
        i.id === img.id
          ? {
              ...i,
              likes: i.likes + (alreadyLiked ? -1 : 1),
              likedBy: alreadyLiked
                ? i.likedBy?.filter((id) => id !== user.uid)
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

  if (!user) return null;

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Loading profile...
      </div>
    );
  }

  const totalDownloads = images.reduce(
    (sum, img) => sum + img.downloads,
    0
  );

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-20">

        {/* PROFILE HEADER */}
        <div className="mb-16 rounded-3xl bg-white p-8 shadow-sm">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

            {/* Identity */}
            <div className="flex items-center gap-6">
              <img
                src={
                  user.photoURL ||
                  `https://ui-avatars.com/api/?name=${user.displayName}`
                }
                className="h-24 w-24 rounded-full ring-4 ring-indigo-400"
                alt="profile"
              />

              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  {user.displayName || "User"}
                </h1>
                <p className="text-sm text-slate-500">
                  {user.email}
                </p>
                <p className="mt-2 text-sm text-slate-600">
                  AI creator on SnapVibe AI
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="rounded-xl bg-black px-6 py-3 text-sm font-semibold text-white">
                Edit Profile
              </button>
              <button
                onClick={() => (window.location.href = "/creator/dashboard")}
                className="rounded-xl border px-6 py-3 text-sm font-medium"
              >
                Creator Dashboard
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xl font-bold">{images.length}</p>
              <p className="text-xs text-slate-500">Uploads</p>
            </div>
            <div>
              <p className="text-xl font-bold">—</p>
              <p className="text-xs text-slate-500">Followers</p>
            </div>
            <div>
              <p className="text-xl font-bold">{totalDownloads}</p>
              <p className="text-xs text-slate-500">Downloads</p>
            </div>
          </div>
        </div>

        {/* UPLOADS GRID */}
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {images.map((img) => (
            <div key={img.id} onClick={() => setSelectedImage(img)}>
              <ImageCard
                {...img}
                price={img.price ?? undefined}
                isLiked={
                  user ? img.likedBy?.includes(user.uid) ?? false : false
                }
                onLike={() => handleLike(img)}
                onDownload={() => handleDownload(img)}
              />
            </div>
          ))}
        </div>

        {selectedImage && (
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
        )}
      </div>
    </section>
  );
}
