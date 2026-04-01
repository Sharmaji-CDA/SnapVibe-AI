import { Download, Heart, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/auth/useAuth";

type Props = {
  image: {
    id: string;
    imagePath: string;
    title: string;
    price?: number;
    creatorId: string;
    creatorName: string;
    creatorAvatar?: string;
  };
  onClose: () => void;
  onLike: (image: Props["image"]) => void;
  isLiked: boolean;
  onFollow: (creatorId: string) => void;
  onDownload: (image: Props["image"]) => void;
};

export default function ImagePreviewModal({
  image,
  onClose,
  onLike,
  isLiked,
  onFollow,
  onDownload,
}: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loadingImg, setLoadingImg] = useState(true);

  const isPremium =
    typeof image.price === "number" && image.price > 0;

  /* ESC + LOCK */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handler);

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl p-4"
        onClick={(e) => e.stopPropagation()}
      >

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white text-xl z-30"
        >
          ✕
        </button>

        {/* IMAGE WRAPPER */}
        <div className="relative group rounded-xl overflow-hidden">

          {/* LOADING */}
          {loadingImg && (
            <div className="absolute inset-0 flex items-center justify-center text-white text-sm">
              Loading...
            </div>
          )}

          {/* IMAGE */}
          <img
            src={image.imagePath}
            alt={image.title}
            onLoad={() => setLoadingImg(false)}
            className={`w-full max-h-[80vh] object-contain transition ${
              loadingImg ? "opacity-0" : "opacity-100"
            }`}
          />

          {/* HOVER OVERLAY */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex flex-col justify-between p-4">

            {/* TOP ACTIONS */}
            <div className="flex justify-end gap-3">

              {/* LIKE */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onLike(image);
                }}
                className="bg-black/60 backdrop-blur p-2 rounded-full"
              >
                <Heart
                  size={18}
                  className={isLiked ? "text-red-500 fill-red-500" : "text-white"}
                />
              </button>

              {/* DOWNLOAD */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDownload(image);
                }}
                className="bg-black/60 backdrop-blur p-2 rounded-full"
              >
                <Download size={18} className="text-white" />
              </button>
            </div>

            {/* BOTTOM SECTION */}
            <div className="flex justify-between items-end">

              {/* CREATOR */}
              <div className="flex items-center gap-2">
                <img
                  src={
                    image.creatorAvatar ||
                    `https://ui-avatars.com/api/?name=${image.creatorName}`
                  }
                  className="h-8 w-8 rounded-full border border-white"
                />
                <span className="text-white text-sm font-medium">
                  {image.creatorName}
                </span>
              </div>

              {/* FOLLOW */}
              <button
                onClick={(e) => {
                  e.stopPropagation();

                  if (!user) {
                    navigate("/login");
                    return;
                  }

                  if (image.creatorId) {
                    onFollow(image.creatorId);
                  }
                }}
                className="bg-white text-black px-3 py-1 rounded-full text-xs font-semibold"
              >
                <UserPlus size={14} />
              </button>
            </div>
          </div>

          {/* PRICE BADGE */}
          {isPremium && (
            <div className="absolute top-3 left-3 bg-yellow-400 text-black text-xs px-3 py-1 rounded-full font-bold">
              ₹{image.price}
            </div>
          )}
        </div>

        {/* CTA BUTTON */}
        <div className="mt-4 text-center">
          <button
            onClick={() => onDownload(image)}
            className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-600"
          >
            {isPremium ? `Buy ₹${image.price}` : "Download"}
          </button>
        </div>
      </div>
    </div>
  );
}