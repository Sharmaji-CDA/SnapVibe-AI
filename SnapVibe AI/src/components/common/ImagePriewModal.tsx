import { useEffect } from "react";
import type { ImageItem } from "../../types/image.type";

type Props = {
  image: ImageItem;
  onClose: () => void;
  onLike: () => void;
  onDownload: () => void;
  isLiked: boolean;
};

export default function ImagePreviewModal({
  image,
  onClose,
  onLike,
  onDownload,
  isLiked,
}: Props) {
  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur">
      {/* Overlay */}
      <div
        className="absolute inset-0"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 mx-auto w-full max-w-4xl overflow-hidden rounded-3xl bg-slate-900 shadow-2xl">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/70 hover:text-white"
        >
          ✕
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-black">
            <img
              src={image.imageUrl}
              alt={image.title}
              className="h-full w-full object-contain"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-between p-8 text-white">
            <div>
              <h2 className="text-2xl font-bold">
                {image.title}
              </h2>

              <p className="mt-2 text-sm text-slate-300">
                by {image.creatorName}
              </p>

              <div className="mt-6 flex items-center gap-6 text-sm">
                <button
                  onClick={onLike}
                  className={`transition ${
                    isLiked ? "text-red-400" : "hover:text-white"
                  }`}
                >
                  ❤️ {image.likes}
                </button>

                <span>⬇ {image.downloads}</span>

                {/* {image.price && (
                  <span className="flex items-center rounded-xl border border-white/20 px-5 text-sm">
                    ₹{image.price}
                  </span>
                )} */}
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={onDownload}
                className="flex-1 rounded-xl px-6 py-3 text-sm font-semibold text-white hover:bg-slate-200 transition"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
