import { Camera, Trash2 } from "lucide-react";
import { useState } from "react";

type Props = {
  name: string;
  bio: string;
  setName: (val: string) => void;
  setBio: (val: string) => void;
  setPhotoFile: (file: File | null) => void;
  onClose: () => void;
  onSave: () => void;
};

export default function EditProfileModal({
  name,
  bio,
  setName,
  setBio,
  setPhotoFile,
  onClose,
  onSave,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const MAX_BIO = 150;

  /* ---------------- HANDLE IMAGE ---------------- */
  const handleFile = (file: File | null) => {
    if (!file) return;

    setPhotoFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /* ---------------- REMOVE PHOTO ---------------- */
  const handleRemovePhoto = () => {
    setPreview(null);
    setPhotoFile(null);
  };

  /* ---------------- SAVE ---------------- */
  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    if (bio.length > MAX_BIO) {
      setError("Bio too long");
      return;
    }

    try {
      setError("");
      setLoading(true);
      await onSave();
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const isDisabled = !name.trim() || loading;

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="bg-white w-full max-w-md rounded-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <h2 className="text-lg font-semibold mb-4">
          Edit Profile
        </h2>

        {/* IMAGE */}
        <div className="flex justify-center mb-6">
          <div className="relative h-24 w-24">

            {/* IMAGE */}
            <div className="h-24 w-24 rounded-full overflow-hidden bg-slate-200">
              {preview ? (
                <img
                  src={preview}
                  className="h-full w-full object-cover"
                />
              ) : (
                <img
                  src={`https://ui-avatars.com/api/?name=${name}`}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            {/* CAMERA ICON */}
            <button
              type="button"
              onClick={() =>
                document.getElementById("fileInput")?.click()
              }
              className="absolute top-20 -right-1 -translate-y-1/2 bg-black text-white p-2 rounded-full shadow-md hover:scale-105 transition"
            >
              <Camera size={16} />
            </button>

            {/* REMOVE ICON */}
            {(preview) && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="absolute -top-2 -left-2 bg-red-500 text-white p-1.5 rounded-full shadow-md hover:scale-105 transition"
              >
                <Trash2 size={14} />
              </button>
            )}

            {/* INPUT */}
            <input
              id="fileInput"
              type="file"
              accept="image/*"
              onChange={(e) =>
                handleFile(e.target.files?.[0] || null)
              }
              className="hidden"
            />
          </div>
        </div>

        {/* NAME */}
        <div className="mb-3">
          <label className="text-xs text-gray-500">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 focus:ring-2 focus:ring-black outline-none"
          />
        </div>

        {/* BIO */}
        <div className="mb-2">
          <label className="text-xs text-gray-500">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={MAX_BIO}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm mt-1 outline-none focus:ring-2 focus:ring-black"
            rows={3}
          />
        </div>

        {/* COUNTER */}
        <p className="text-xs text-gray-400 text-right mb-3">
          {bio.length}/{MAX_BIO}
        </p>

        {/* ERROR */}
        {error && (
          <p className="text-xs text-red-500 mb-3">{error}</p>
        )}

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">

          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border border-gray-800 text-gray-800 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={isDisabled}
            className={`px-4 py-2 text-sm rounded-lg text-white ${
              isDisabled
                ? "bg-gray-400"
                : "bg-black hover:opacity-90"
            }`}
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>
      </div>
    </div>
  );
}