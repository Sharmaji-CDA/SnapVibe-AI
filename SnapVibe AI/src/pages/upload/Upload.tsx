import Button from "../../components/common/Button";
import AIPromptBox from "../../components/ai/AIPromptBox";
import { useState } from "react";
import { uploadImage } from "../../services/storage.service";
import { saveImageMetadata } from "../../services/image.service";
import { useAuth } from "../../context/useAuth";


type UserPlan = "free" | "standard" | "pro";
const userPlan: UserPlan = "standard"; // mock (later from auth)

export default function Upload() {

  const { user } = useAuth();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handlePublish = async () => {
    if (!file || !user) return;

    setLoading(true);
    setSuccess("");

    try {
      // 1. Upload file to Storage
      const imageUrl = await uploadImage(file, user.uid);

      // 2. Save metadata to Firestore
      await saveImageMetadata({
        title,
        imageUrl,
        creatorId: user.uid,
        creatorName: user.displayName || "Creator",
        price: null, // free for now
      });

      setSuccess("Content published successfully!");
      setFile(null);
      setTitle("");
      setDescription("");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /* 🔒 UPGRADE GATE */
  if (userPlan === "free") {
    return (
      <section className="bg-slate-50">
        <div className="mx-auto max-w-2xl px-6 py-28 text-center">
          <div className="rounded-3xl bg-white p-10 shadow-sm">
            <p className="mb-3 text-xs uppercase tracking-widest text-indigo-500">
              Creator Access
            </p>

            <h2 className="mb-4 text-3xl font-extrabold text-slate-900">
              Unlock Creator Uploads
            </h2>

            <p className="mb-8 text-slate-600">
              Upgrade your plan to start uploading AI-generated visuals,
              earn from downloads, and grow your creator profile.
            </p>

            <Button label="View Plans" />
          </div>
        </div>
      </section>
    );
  }

  /* 🎨 CREATOR STUDIO */
  return (
    <section className="relative bg-slate-50">
      <div className="mx-auto max-w-5xl px-6 py-20">

        {/* HEADER */}
        <div className="mb-14 max-w-3xl">
          <p className="mb-3 text-xs uppercase tracking-widest text-indigo-500">
            Creator Studio
          </p>

          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Upload New Content
          </h1>

          <p className="mt-4 text-slate-600">
            Share your AI-generated wallpapers, images, or themes with the
            community and start earning from premium downloads.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-3">
          {/* LEFT: UPLOAD FORM */}
          <div className="lg:col-span-2 rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-6 text-xl font-semibold text-slate-900">
              Content Details
            </h2>

            <div className="space-y-5">
              {/* FILE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Upload file
                </label>
                <input
                  type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="block w-full cursor-pointer rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-600 file:mr-4 file:rounded-lg file:border-0 file:bg-slate-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
                />
              </div>

              {/* TITLE */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Title
                </label>
                <input
                  value={title} onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Neon Cyber City"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
                />
              </div>

              {/* DESCRIPTION */}
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Description
                </label>
                <textarea
                  rows={4} value={description} onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your visual style, mood, or use case"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
                />
              </div>

              {/* ACTION */}
              <div className="pt-4">
                <Button label={loading ? "Publishing..." : "Publish Content"} onClick={handlePublish} disabled={loading} fullWidth />
                {success && (
                  <p className="mt-4 text-sm text-green-600">{success}</p>
                )}
              </div>
            </div>
          </div>

          {/* RIGHT: AI ASSIST */}
          <div className="rounded-3xl bg-white p-8 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold text-slate-900">
              AI Assistant
            </h2>

            <p className="mb-6 text-sm text-slate-600">
              Use AI to generate better titles, descriptions, or style ideas
              for your upload.
            </p>

            <AIPromptBox onSubmit={function (prompt: string): void {
              throw new Error("Function not implemented.");
            } } />

            <div className="mt-6 rounded-xl bg-slate-50 p-4 text-xs text-slate-500">
              💡 Tip: AI-optimized content gets more views and downloads.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
