import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  query,
  orderBy,
  limit,
  onSnapshot,
  where,
} from "firebase/firestore";

import type { ImageItem } from "../../types/asset.type";
import { db } from "../../firebase/firebase";
import Skeleton from "../../components/ui/Skeleton";
import ImagePreviewModal from "../../components/modals/ImagePreviewModal";
import { toggleLike } from "../../services/likes/like.service";
import { toggleFollow } from "../../services/follows/follow.service";
import { recordDownload } from "../../services/downloads/download.service";
import { getUserLikes } from "../../services/likes/like.service";
import { isFollowing } from "../../services/follows/follow.service";

import {
  // Sparkles,
  // Lock,
  Eye,
  Heart,
  Download,
  UserPlus,
} from "lucide-react";
import { useAuth } from "../../contexts/auth/useAuth";

export default function FeedSection() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [images, setImages] = useState<ImageItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [followingCreators, setFollowingCreators] = useState<string[]>([]);

  /* ---------------- REAL-TIME FEED ---------------- */
  useEffect(() => {
    const q = query(
      collection(db, "images"),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc"),
      limit(20)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ImageItem, "id">),
      }));

      setImages(data);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []); 


  useEffect(() => {
    if (!user || images.length === 0) return;

    const loadLikes = async () => {
      try {
        const likes = await getUserLikes(user.uid);
        setLikedImages(likes.map((l) => l.imageId));
      } catch (err) {
        console.error(err);
      }
    };

    loadLikes();

    const loadFollows = async () => {
      try {
        const results = await Promise.all(
          images.map((img) =>
            img.creatorId
              ? isFollowing(user.uid, img.creatorId)
              : false
          )
        );

        const followed = images
          .filter((_, i) => results[i])
          .map((img) => img.creatorId)
          .filter(Boolean);

        setFollowingCreators(followed);
      } catch (err) {
        console.error(err);
      }
    };

    loadFollows();
  }, [user, images]);

  /* ---------------- ACTIONS ---------------- */

  // const handleGenerateSimilar = (img: ImageItem) => {
  //   if (!img.prompt) return;
  //   navigate(`/ai/generate?prompt=${encodeURIComponent(img.prompt)}`);
  // };

  // const handleBuy = (img: ImageItem) => {
  //   navigate(`/buy/${img.id}`);
  // };

  const handleOpenImage = (img: ImageItem) => {
    setSelectedImage(img);
  };

  const handleLike = async (img: ImageItem) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const res = await toggleLike(user.uid, img.id);

      // ✅ update liked state
      setLikedImages((prev) =>
        res.liked
          ? [...prev, img.id]
          : prev.filter((id) => id !== img.id)
      );

      // ✅ update UI instantly (IMPORTANT)
      setImages((prev) =>
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

  const handleFollow = async (creatorId?: string) => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (!creatorId) return;

    try {
      const res = await toggleFollow(user.uid, creatorId);

      setFollowingCreators((prev) => {
        if (res.following) {
          return prev.includes(creatorId)
            ? prev
            : [...prev, creatorId];
        } else {
          return prev.filter((id) => id !== creatorId);
        }
      });
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

      // only update UI if not duplicate
      if (!res?.duplicate) {
        setImages((prev) =>
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

      // download file
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


  /* ---------------- UI ---------------- */

  return (
    <section className="bg-slate-900 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">

        {/* HEADER */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-white">
            Discover & Remix AI Creations
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Real-time designs generated by creators like you
          </p>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-[260px] rounded-2xl" />
            ))}
          </div>
        ) : images.length === 0 ? (
          <p className="text-center text-slate-400">
            No AI creations yet.
          </p>
        ) : (
          <>
            {/* GRID (ONLY 6 ITEMS) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">

              {images.slice(0, 6).map((img) => {
                const isPremium =
                  typeof img.price === "number" && img.price > 0;

                const imageSrc =
                  img.imagePath ||
                  (img as any).imageUrl ||
                  "/fallback.png";

                return (
                  <div
                    key={img.id}
                    className="relative rounded-2xl overflow-hidden bg-black group cursor-pointer"
                    onClick={() => handleOpenImage(img)}
                  >

                    {/* IMAGE */}
                    <img
                      src={imageSrc}
                      className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* GRADIENT */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

                    {/* PREMIUM */}
                    {isPremium && (
                      <div className="absolute top-2 left-2 z-30">
                        <span className="bg-yellow-400 text-black text-[10px] px-2 py-1 rounded-full font-bold">
                          ₹{img.price}
                        </span>
                      </div>
                    )}

                    {/* FLOATING ICONS */}
                    <div className="absolute top-2 right-2 flex flex-col gap-2 z-30">

                      {/* VIEW */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenImage(img);
                        }}
                        className="bg-black/60 backdrop-blur p-2 rounded-full hover:scale-110 transition"
                      >
                        <Eye size={14} className="text-white" />
                      </button>

                      {/* LIKE */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleLike(img);
                        }}
                        className="bg-black/60 backdrop-blur p-2 rounded-full hover:scale-110 transition"
                      >
                        <Heart size={14} className="text-white" />
                      </button>

                      {/* DOWNLOAD */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(img);
                        }}
                        className="bg-black/60 backdrop-blur p-2 rounded-full hover:scale-110 transition"
                      >
                        <Download size={14} className="text-white" />
                      </button>

                      {/* FOLLOW */}
                      {(() => {
                        const isFollowingUser =
                          img.creatorId && followingCreators.includes(img.creatorId);

                        return (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFollow(img.creatorId);
                            }}
                            className={`mt-2 px-2 py-1 rounded-full flex items-center gap-1 text-[10px] transition-all duration-300 hover:scale-105 ${
                              isFollowingUser
                                ? "bg-green-400 text-black"
                                : "bg-white text-black"
                            }`}
                          >
                            <UserPlus size={12} />
                            {/* <span>
                              {isFollowingUser ? "Following" : "Follow"}
                            </span> */}
                          </button>
                        );
                      })()}
                    </div>

                    {/* CREATOR */}
                    <div className="absolute bottom-2 left-2 flex items-center gap-2 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                      <img
                        src={
                          img.creatorAvatar ||
                          `https://ui-avatars.com/api/?name=${img.creatorName || "User"}`
                        }
                        className="h-7 w-7 rounded-full border border-white"
                      />
                      <span className="text-xs text-white font-medium">
                        {img.creatorName || "Unknown"}
                      </span>
                    </div>

                    {/* STATS */}
                    <div className="absolute bottom-2 right-2 text-xs text-white z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100">
                      ❤️ {img.likes || 0} · ⬇ {img.downloads || 0}
                    </div>
                  </div>
                );
              })}

            </div>

            {/* VIEW MORE */}
            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                onClick={() => navigate("/explore")}
                className="px-6 py-3 rounded-xl border border-white/20 backdrop-blur text-white font-semibold hover:opacity-90"
              >
                View More
              </button>

              {/* CTA */}
              {!loading && images.length > 0 && (
                <div className="text-center">
                  <button 
                    onClick={() => navigate("/subscription")}
                    className="rounded-xl bg-gradient-to-r from-pink-500 to-yellow-400 px-6 py-3 text-sm font-semibold text-black hover:opacity-90"
                  >
                    ✨ Upgrade for Unlimited Access
                  </button>
                </div>
              )}
            </div>
          </>
        )}

      </div>
      {selectedImage && (
        <ImagePreviewModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
          onLike={(img) => handleLike(img)}
          isLiked={likedImages.includes(selectedImage.id)}
          onFollow={(creatorId) => handleFollow(creatorId)}
          onDownload={(img) => handleDownload(img)} // connect later
        />
      )}
    </section>
  );
}