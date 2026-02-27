// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../../context/useAuth";

type Props = {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  downloads: number;
  price?: number;
  creatorName: string;
  creatorAvatar?: string;

  isLiked?: boolean;
  onLike: () => void;
  onDownload: () => void;
};

export default function ImageCard({
  imageUrl,
  title,
  likes,
  downloads,
  price,
  creatorName,
  creatorAvatar,
  isLiked = false,
  onLike,
  onDownload,
}: Props) {
  // const { user } = useAuth();
  // const navigate = useNavigate();
  const isPremium = price && price > 0;

  // const handleBuy = (imageId: string) => {
  //   if (!user) {
  //     navigate(`/login?redirect=/upgrade?imageId=${imageId}`);
  //     return;
  //   }

  //   navigate(`/upgrade?imageId=${imageId}`);
  // };

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-slate-900 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl">

      {/* IMAGE */}
      <div className="relative aspect-[9/14] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* PREMIUM STRIP */}
        {isPremium && (
          <div className="absolute top-0 left-0 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-black text-xs font-semibold text-center py-1 tracking-wide">
            PREMIUM • ₹{price}
          </div>
        )}

        {/* Hover Content */}
        <div className="absolute bottom-0 w-full p-4 opacity-0 transition duration-300 group-hover:opacity-100">
          <div className="flex items-center gap-2">
            <img
              src={
                creatorAvatar ||
                `https://ui-avatars.com/api/?name=${creatorName}&background=111827&color=fff`
              }
              alt={creatorName}
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="font-medium text-black">{creatorName}</span>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onLike();
              }}
              className={`flex items-center gap-1 transition ${
                isLiked
                  ? "text-red-400"
                  : "hover:text-white"
              }`}
            >
              ❤️ {likes}
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onDownload();
              }}
              className="flex items-center gap-1 hover:text-white transition"
            >
              ⬇ {downloads}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}