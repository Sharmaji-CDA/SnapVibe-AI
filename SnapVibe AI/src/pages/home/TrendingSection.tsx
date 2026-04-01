import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import {
//   collection,
//   query,
//   orderBy,
//   limit,
//   onSnapshot,
// } from "firebase/firestore";

import Skeleton from "../../components/ui/Skeleton";
import type { ImageItem } from "../../types/asset.type";
import ImagePreviewModal from "../../components/modals/ImagePreviewModal";
import { Sparkles } from "lucide-react";

// import { db } from "../../firebase/firebase";
import { useAuth } from "../../contexts/auth/useAuth";
import { toggleLike } from "../../services/likes/like.service";
import { toggleFollow } from "../../services/follows/follow.service";
import { recordDownload } from "../../services/downloads/download.service";
import { getUserLikes } from "../../services/likes/like.service";
import { getAssets } from "../../services/assets/asset.query";

// ✅ SWIPER
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

export default function TrendingSection() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [latestImages, setLatestImages] = useState<ImageItem[]>([]);
  const [, setTopDownloads] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [likedImages, setLikedImages] = useState<string[]>([]);

  /* ---------------- FETCH TRENDING ---------------- */
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);

      try {
        const latestRes = await getAssets("latest");
        const downloadRes = await getAssets("downloads");

        setLatestImages(latestRes.data.slice(0, 6)); // show 6
        setTopDownloads(downloadRes.data.slice(0, 6));

      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    loadData();
  }, []);

  /* ---------------- LOAD USER LIKES ---------------- */
  useEffect(() => {
    if (!user) return;

    const loadLikes = async () => {
      try {
        const likes = await getUserLikes(user.uid);
        setLikedImages(likes.map((l) => l.imageId));
      } catch (err) {
        console.error(err);
      }
    };

    loadLikes();
  }, [user]);

  /* ---------------- ACTIONS ---------------- */

  const handleLike = async (img: ImageItem) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await toggleLike(user.uid, img.id);

      setLikedImages((prev) =>
        res.liked
          ? [...prev, img.id]
          : prev.filter((id) => id !== img.id)
      );

      setLatestImages((prev) =>
        prev.map((item) =>
          item.id === img.id
            ? {
                ...item,
                likes: res.liked
                  ? (item.likes || 0) + 1
                  : Math.max((item.likes || 0) - 1, 0),
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleDownload = async (img: ImageItem) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await recordDownload(img.id, user.uid);

      if (!res?.duplicate) {
        setLatestImages((prev) =>
          prev.map((item) =>
            item.id === img.id
              ? {
                  ...item,
                  downloads: (item.downloads || 0) + 1,
                }
              : item
          )
        );
      }

      const response = await fetch(img.imagePath);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${img.title}.jpg`;
      link.click();

      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  const handleFollow = async (creatorId?: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!creatorId) return;

    try {
      await toggleFollow(user.uid, creatorId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleGenerateSimilar = (img: ImageItem) => {
    if (!img.prompt) return;
    navigate(`/ai/generate?prompt=${encodeURIComponent(img.prompt)}`);
  };

  /* ---------------- UI ---------------- */

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
          <div className="flex gap-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton
                key={i}
                className="h-[260px] w-[180px] rounded-2xl"
              />
            ))}
          </div>
        ) : latestImages.length === 0 ? (
          <p className="text-center text-slate-400">
            No trending visuals yet.
          </p>
        ) : (
          <Swiper
            spaceBetween={16}
            slidesPerView={2}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
              1280: { slidesPerView: 5 },
            }}
          >
            {latestImages.map((img) => (
              <SwiperSlide key={img.id}>
                <div
                  className="cursor-pointer group"
                  onClick={() => setSelectedImage(img)}
                >
                  <div className="relative overflow-hidden rounded-2xl shadow-lg">

                    <img
                      src={img.imagePath}
                      className="h-[260px] sm:h-[300px] w-full object-cover transition group-hover:scale-105"
                    />

                    <div className="absolute top-2 left-2 bg-black/60 text-xs px-2 py-1 rounded-md text-white">
                      Trending
                    </div>

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

                  {/* <p className="mt-2 text-xs text-slate-300 line-clamp-2">
                    {img.prompt || "AI generated visual"}
                  </p> */}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* MODAL */}
      {selectedImage && (
        <ImagePreviewModal
          image={{...selectedImage,
                  price: selectedImage.price ?? undefined, }}
          onClose={() => setSelectedImage(null)}
          onLike={(img) => handleLike(img as ImageItem)}
          isLiked={likedImages.includes(selectedImage.id)}
          onFollow={(creatorId) => handleFollow(creatorId)}
          onDownload={(img) => handleDownload(img as ImageItem)}
        />
      )}
    </section>
  );
}