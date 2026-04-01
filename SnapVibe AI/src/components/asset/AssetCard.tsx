import { Heart, Download, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";

import { toggleLike, isLiked } from "../../services/likes/like.service";
import { recordDownload } from "../../services/downloads/download.service";
import { toggleFollow, isFollowing } from "../../services/follows/follow.service";
import { incrementView } from "../../services/assets/asset.action";

import { useAuth } from "../../contexts/auth/useAuth";

type Props = {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  downloads: number;
  price?: number;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
};

export default function ImageCard({
  id,
  imageUrl,
  title,
  likes,
  downloads,
  price,
  creatorId,
  creatorName,
  creatorAvatar,
}: Props) {

  const { user } = useAuth();

  const isPremium = typeof price === "number" && price > 0;

  const [liked, setLiked] = useState(false);
  const [followed, setFollowed] = useState(false);

  const [, setLikeCount] = useState(likes);
  const [, setDownloadCount] = useState(downloads);

  const [loadingLike, setLoadingLike] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);
  const [loadingFollow, setLoadingFollow] = useState(false);

  /* ================= INIT ================= */

  useEffect(() => {
    const init = async () => {
      if (!user) return;

      try {
        const [likedRes, followRes] = await Promise.all([
          isLiked(user.uid, id),
          isFollowing(user.uid, creatorId),
        ]);

        setLiked(likedRes);
        setFollowed(followRes);

      } catch (err) {
        console.error(err);
      }
    };

    init();
  }, [user, id, creatorId]);

  /* ================= LIKE ================= */

  const handleLike = async (e: any) => {
    e.stopPropagation();
    if (!user || loadingLike) return;

    try {
      setLoadingLike(true);

      const res = await toggleLike(user.uid, id);

      setLiked(res.liked);
      setLikeCount((prev) =>
        res.liked ? prev + 1 : Math.max(prev - 1, 0)
      );

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLike(false);
    }
  };

  /* ================= DOWNLOAD ================= */

  const handleDownload = async (e: any) => {
    e.stopPropagation();
    if (!user || loadingDownload) return;

    try {
      setLoadingDownload(true);

      const res = await recordDownload(id, user.uid);

      if (!res.duplicate) {
        setDownloadCount((prev) => prev + 1);
      }

      // actual download
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = title || "image";
      link.click();

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingDownload(false);
    }
  };

  /* ================= FOLLOW ================= */

  const handleFollow = async (e: any) => {
    e.stopPropagation();
    if (!user || loadingFollow) return;

    try {
      setLoadingFollow(true);

      const res = await toggleFollow(user.uid, creatorId);

      setFollowed(res.following);

    } catch (err) {
      console.error(err);
    } finally {
      setLoadingFollow(false);
    }
  };

  /* ================= VIEW ================= */

  const handleView = async () => {
    try {
      await incrementView(id);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div
      onClick={handleView}
      className="relative w-full rounded-xl overflow-hidden bg-black group cursor-pointer"
    >

      {/* IMAGE */}
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
      />

      {/* GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent z-10" />

      {/* PREMIUM */}
      {isPremium && (
        <div className="absolute top-2 left-2 z-30">
          <span className="bg-yellow-400 text-black text-[10px] px-2 py-1 rounded-full font-bold">
            ₹{price}
          </span>
        </div>
      )}

      {/* ACTIONS */}
      <div className="absolute top-2 right-2 flex flex-col gap-2 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100">

        <button
          onClick={handleLike}
          className="backdrop-blur bg-black/60 p-2 rounded-full"
        >
          <Heart
            size={16}
            className={liked ? "text-red-500 fill-red-500" : "text-white"}
          />
        </button>

        <button
          onClick={handleDownload}
          className="backdrop-blur bg-black/60 p-2 rounded-full"
        >
          <Download size={16} className="text-white" />
        </button>
      </div>

      {/* CREATOR */}
      <div className="absolute bottom-2 left-2 flex items-center gap-2 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100">
        <img
          src={
            creatorAvatar ||
            `https://ui-avatars.com/api/?name=${creatorName}`
          }
          className="h-7 w-7 rounded-full border border-white"
        />
        <span className="text-xs text-white font-medium">
          {creatorName}
        </span>
      </div>

      {/* FOLLOW */}
      <div className="absolute bottom-2 right-2 z-30 opacity-100 md:opacity-0 md:group-hover:opacity-100">
        <button
          onClick={handleFollow}
          className={`text-[10px] px-3 py-1 rounded-full font-semibold ${
            followed ? "bg-gray-300 text-black" : "bg-white text-black"
          }`}
        >
          <UserPlus size={12} />
        </button>
      </div>

      {/* COUNTS */}
      {/* <div className="absolute bottom-0 left-0 right-0 flex justify-between text-[11px] px-3 py-1 text-white z-30">
        <span>❤️ {likeCount}</span>
        <span>⬇ {downloadCount}</span>
      </div> */}
    </div>
  );
}