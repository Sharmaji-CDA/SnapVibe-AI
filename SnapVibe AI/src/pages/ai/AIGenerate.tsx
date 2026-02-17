import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateAIImage } from "../../services/ai.service";
import AIPromptBox from "../../components/ai/AIPromptBox";
import AIHelper from "../../components/ai/AIHelper";
import { useAuth } from "../../context/useAuth";
import { updateDoc, doc, increment } from "firebase/firestore";
import { db } from "../../services/firebase";

export default function AIGenerate() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [progressText, setProgressText] = useState("");

  const progressTimers = useRef<number[]>([]);

  // 🔥 PLAN-BASED DAILY LIMIT
  const dailyLimit = (() => {
    if (!profile) return 0;

    if (profile.accountType === "creator") {
      return profile.plan === "pro" ? 500 : 50;
    }

    if (profile.plan === "premium") return 100;
    if (profile.plan === "standard") return 20;

    return 3; // basic
  })();

  const shouldWatermark =
    profile?.accountType === "user" &&
    profile?.plan === "basic";

  const clearProgressTimers = () => {
    progressTimers.current.forEach(clearTimeout);
    progressTimers.current = [];
  };

  const handleGenerate = async (prompt: string) => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (!profile) return;

    // 🔥 CHECK LIMIT
    if (profile.aiUsed >= dailyLimit) {
      setError("Daily AI limit reached. Upgrade for more generations.");
      navigate("/subscription");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setLastPrompt(prompt);
      setProgressText("Understanding prompt...");
      clearProgressTimers();

      progressTimers.current.push(
        window.setTimeout(() => setProgressText("Generating image..."), 700),
        window.setTimeout(() => setProgressText("Finalizing output..."), 1400)
      );

      const result = await generateAIImage(prompt);

      setImageUrl(result.imageUrl);
      setProgressText("");

      // 🔥 INCREMENT FIRESTORE USAGE
      await updateDoc(doc(db, "users", user.uid), {
        aiUsed: increment(1),
      });

      await refreshProfile();

    } catch (e: any) {
      setError(e.message || "Failed to generate image");
    } finally {
      clearProgressTimers();
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageUrl) return;

    if (shouldWatermark) {
      alert("Upgrade to download without watermark.");
      navigate("/subscription");
      return;
    }

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "ai-image.png";
    link.click();
  };

  return (
    <div className="mx-auto max-w-xl py-20 px-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">

        <div>
          <h1 className="text-xl font-bold text-gray-900">
            AI Image Generator
          </h1>
          <p className="text-sm text-gray-500">
            Turn ideas into visuals in seconds
          </p>
        </div>

        {/* 🔥 Usage Counter */}
        {profile && (
          <div className="flex items-center justify-between text-sm text-gray-500">
            <span>Daily usage</span>
            <span className="font-medium text-gray-700">
              {profile.aiUsed} / {dailyLimit}
            </span>
          </div>
        )}

        {profile && profile.aiUsed >= dailyLimit && (
          <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-4 text-sm">
            You've reached today's limit.
            <button
              onClick={() => navigate("/subscription")}
              className="ml-2 font-semibold underline"
            >
              Upgrade for more AI generations
            </button>
          </div>
        )}

        <AIPromptBox
          onSubmit={handleGenerate}
          placeholder="Describe the image you want..."
          buttonText="Generate Image"
          loading={loading}
        />

        <AIHelper loading={loading} error={error}>

          {!loading && !imageUrl && !error && (
            <div className="rounded-xl border border-dashed border-gray-300 p-6 text-center text-sm text-gray-500">
              Your generated image will appear here
            </div>
          )}

          {progressText && (
            <p className="text-sm text-gray-500 italic">
              {progressText}
            </p>
          )}

          {imageUrl && (
            <div className="space-y-3">
              <div className="relative">
                <img
                  src={imageUrl}
                  className="rounded-xl border"
                />

                {shouldWatermark && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white text-lg font-bold">
                    SnapVibe<span className="text-medium text-indigo-400"></span>AI
                  </div>
                )}
              </div>

              <p className="text-xs text-gray-400">
                {shouldWatermark
                  ? "Watermarked preview"
                  : "High quality image"}
              </p>

              <button
                onClick={handleDownload}
                className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
              >
                Download
              </button>

              {shouldWatermark && (
                <div className="mt-4 rounded-xl bg-yellow-50 border border-yellow-200 p-4 text-sm text-yellow-700">
                  Download without watermark + unlock 100 AI generations for just ₹99/month.
                  <button
                    onClick={() => navigate("/subscription")}
                    className="ml-2 font-semibold underline"
                  >
                    Upgrade Now
                  </button>
                </div>
              )}
            </div>
          )}
        </AIHelper>

        {error && lastPrompt && (
          <button
            onClick={() => handleGenerate(lastPrompt)}
            className="rounded-lg border px-4 py-2 text-sm"
          >
            Retry
          </button>
        )}

      </div>
    </div>
  );
}