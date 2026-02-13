type Props = {
  id: string;
  imageUrl: string;
  title: string;
  likes: number;
  downloads: number;
  price?: number;
  creatorName: string;
  creatorAvatar?: string;

  isLiked?: boolean; // For like button state
  onLike: () => void; // Like button handler
  onDownload: () => void; // Download button handler
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
  return (
    <div className="group relative cursor-pointer overflow-hidden rounded-2xl bg-slate-100 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <img
        src={imageUrl}
        alt={title}
        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      />

      {/* Gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent opacity-0 transition group-hover:opacity-100" />

      {/* Top badges */}
      <div className="absolute left-3 top-3 right-3 flex items-center justify-between opacity-0 transition group-hover:opacity-100">
        {/* Creator */}
        <div className="flex items-center gap-2">
          <img
            src={
              creatorAvatar ||
              `https://ui-avatars.com/api/?name=${creatorName}&background=111827&color=fff`
            }
            alt={creatorName}
            className="h-7 w-7 rounded-full ring-1 ring-white/30"
          />
          <span className="text-xs font-medium text-white">
            {creatorName}
          </span>
        </div>

        {/* Price / Free */}
        <div className="rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
          {price ? `₹${price}` : "Free"}
        </div>
      </div>

      {/* Bottom content */}
      <div className="absolute bottom-0 w-full p-4 opacity-0 transition group-hover:opacity-100">
        <h3 className="mb-2 text-sm font-semibold text-white line-clamp-1">
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
  );
}
