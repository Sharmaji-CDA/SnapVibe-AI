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
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />

        {/* Premium Ribbon */}
        {isPremium && (
          <div className="absolute left-3 top-3 rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white shadow-lg">
            Premium
          </div>
        )}

        {/* Price Badge (Always Visible) */}
        <div className="absolute right-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {isPremium ? `₹${price}` : "Free"}
        </div>

        {/* Gradient Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {/* Hover Content */}
        <div className="absolute bottom-0 w-full p-4 opacity-0 transition duration-300 group-hover:opacity-100">
          <h3 className="mb-3 text-sm font-semibold text-white line-clamp-1">
            {title}
          </h3>

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

      {/* CREATOR FOOTER (Always Visible) */}
      <div className="flex items-center gap-3 p-3">
        <img
          src={
            creatorAvatar ||
            `https://ui-avatars.com/api/?name=${creatorName}&background=111827&color=fff`
          }
          alt={creatorName}
          className="h-8 w-8 rounded-full"
        />

        <div className="flex flex-col">
          <span className="text-xs font-medium text-white line-clamp-1">
            {creatorName}
          </span>
          <span className="text-[11px] text-slate-400">
            Creator
          </span>
        </div>
      </div>
    </div>
  );
}