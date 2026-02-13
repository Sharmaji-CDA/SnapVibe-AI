import { useRef, useState } from "react";
import { generateAIImage } from "../../services/ai.service";
import AIPromptBox from "../../components/ai/AIPromptBox";
import AIHelper from "../../components/ai/AIHelper";


const STORAGE_USAGE_KEY = "ai_usage_count";
const STORAGE_HISTORY_KEY = "ai_prompt_history";

export default function AIGenerate() {

    const MAX_USAGE = 5;

    const [usageCount, setUsageCount] = useState<number>(() => {
        return Number(localStorage.getItem(STORAGE_USAGE_KEY)) || 0;
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [lastPrompt, setLastPrompt] = useState("");
    const [promptHistory, setPromptHistory] = useState<string[]>(() => {
    const stored = localStorage.getItem(STORAGE_HISTORY_KEY);
        return stored ? JSON.parse(stored) : [];
    });
    const [progressText, setProgressText] = useState("");

    // ✅ FIX: keep timeout refs to avoid memory leaks
    const progressTimers = useRef<number[]>([]);

    const PROMPT_TEMPLATES = [
        {
            label: "Logo",
            prompt: "Create a modern minimalist logo for a tech startup",
        },
        {
            label: "Poster",
            prompt: "Design a cinematic movie poster with dramatic lighting",
        },
        {
            label: "Product",
            prompt: "High-quality product photo on a clean background",
        },
    ];

    const clearProgressTimers = () => {
        progressTimers.current.forEach(clearTimeout);
        progressTimers.current = [];
    };

    const handleGenerate = async (prompt: string) => {
        if (loading) return; // ✅ FIX: block double clicks

        if (usageCount >= MAX_USAGE) {
            setError("Daily AI limit reached. Try again tomorrow.");
            return;
        }
        try {
        setLoading(true);
        setError("");
        setLastPrompt(prompt);
        setProgressText("Understanding prompt...");
        clearProgressTimers();

        // ✅ FIX: controlled streaming simulation
        progressTimers.current.push(
            window.setTimeout(() => setProgressText("Generating image..."), 700),
            window.setTimeout(() => setProgressText("Finalizing output..."), 1400)
        );

        const result = await generateAIImage(prompt);
        setImageUrl(result.imageUrl);
        setProgressText("");

        // ✅ FIX: increment usage ONLY on success
        setUsageCount((c) => { 
            const next = c + 1;
            localStorage.setItem(STORAGE_USAGE_KEY, String(next));
            return next;
        });

        setPromptHistory((prev) => {
            const next = [prompt, ...prev.filter((p) => p !== prompt)].slice(0, 5);
            localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(next));
            return next;
        });

        } catch (e: any) {
        if (e.message.includes("warming")) {
            setError("⏳ AI is warming up. Please wait a few seconds.");
        } else if (e.message.includes("limit")) {
            setError("🚫 You’ve reached the limit. Try again later.");
        } else {
            setError(e.message || "Failed to generate image");
        } 
        } finally {
            clearProgressTimers();
            setLoading(false);
        }
    };

    const handleDownload = () => {
        if (!imageUrl) return;
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "ai-image.png";
            link.click();
    };

    const handleShare = async () => {
        if (!imageUrl) return;

        try {
            await navigator.share({
            title: "AI Generated Image",
            text: "Check out this AI-generated image!",
            url: imageUrl,
            });
        } catch {
            alert("Sharing not supported on this device");
        }
    };


  return (
    <div className="mx-auto max-w-xl py-20 px-6">
      <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm space-y-6">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-gray-900">AI Image Generator</h1>
          <p className="text-sm text-gray-500">
            Turn ideas into visuals in seconds
          </p>
        </div>

        {/* ✅ FIX: Usage Counter */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span>
            Daily usage
          </span>
          <span className="font-medium text-gray-700">
            {usageCount} / {MAX_USAGE}
          </span>
        </div>

        <hr className="border-gray-200" />

        {/* ✅ FIX: Prompt Templates (WAS MISSING) */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">
            Quick ideas
          </p>

          <div className="flex flex-wrap gap-2">
            {PROMPT_TEMPLATES.map((t) => (
              <button
                key={t.label}
                disabled={loading}
                onClick={() => handleGenerate(t.prompt)}
                className="rounded-full bg-gray-100 px-4 py-1 text-sm hover:bg-gray-200 transition disabled:opacity-50"
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* 1️⃣ Prompt Input */}
        <AIPromptBox
          onSubmit={handleGenerate}
          placeholder="Describe the image you want..."
          buttonText="Generate Image"
          loading={loading}
        />

        {/* 4️⃣ Prompt History (PUT HERE – below AIPromptBox) */}
        {promptHistory.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
              Recent prompts
            </p>
            <div className="flex flex-wrap gap-2">
              {promptHistory.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleGenerate(p)}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 2️⃣ Result / Loading / Error */}
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
            <div className="space-y-2">
              <img
                src={imageUrl}
                className="rounded-xl border"
              />
              <p className="text-xs text-gray-400">
                Generated by AI • High quality
              </p>
            </div>
          )}

          {imageUrl && (
          <div className="mt-4 flex gap-3">
              <button
              onClick={handleDownload}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
              >
              Download
              </button>

              <button
              onClick={handleShare}
              className="rounded-lg border px-4 py-2 text-sm hover:bg-gray-50 transition"
              >
              Share
              </button>
          </div>
          )}
        </AIHelper>

        {/* 3️⃣ Retry Button (PUT HERE – BELOW AIHelper) */}
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