import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import type { ImageItem } from "../../types/image.type";

type Props = {
  image: ImageItem;
  onClose: () => void;
  onLike: () => void;
  isLiked: boolean;
};

export default function ImagePreviewModal({
  image,
  onClose,
  onLike,
  isLiked,
}: Props) {
  const { user } = useAuth();
  const navigate = useNavigate();

  // ESC to close
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  /* ---------------- DOWNLOAD FUNCTION ---------------- */
  const handleDownload = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(image.imageUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${image.title.replace(/\s+/g, "-")}.jpg`;

      document.body.appendChild(link);
      link.click();

      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur">
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

                {image.price && (
                  <span className="rounded-xl border border-white/20 px-4 py-1 text-sm">
                    ₹{image.price}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-10 flex gap-4">
              <button
                onClick={handleDownload}
                className="flex-1 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-600 transition"
              >
                {image.price ? "Buy & Download" : "Download"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}