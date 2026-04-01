import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateAI } from "../../services/ai.service";
import AIPromptBox from "../../components/ai/AIPromptBox";
import { useAuth } from "../../contexts/auth/useAuth";

type Message = {
  role: "user" | "ai";
  type: "text" | "image";
  content: string;
};

export default function AIGenerate() {
  const { user, profile, refreshProfile } = useAuth();
  const navigate = useNavigate();

  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastPrompt, setLastPrompt] = useState("");
  const [progressText, setProgressText] = useState("");

  const bottomRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* ---------------- PLAN LIMIT ---------------- */

  const plan = profile?.subscription || "free";
  const role = profile?.role || "user";

  const isTrialActive = (() => {
    if (!profile?.trialEndsAt?.seconds) return false;

    const now = Date.now();
    const trialEnd = profile.trialEndsAt.seconds * 1000;

    return now < trialEnd;
  })();

  const imageLimit = (() => {
    if (!profile) return 0;

    // 🔥 CREATOR (highest priority)
    if (role === "creator") return 1000;

    // 🔥 TRIAL USERS → treat like premium
    if (isTrialActive) return 500;

    // 🔥 PLAN BASED
    switch (plan) {
      case "premium":
        return 500;
      case "basic":
        return 30;
      case "free":
      default:
        return 5;
    }
  })();

  const imageUsed = profile?.aiImageUsed || 0;

  const isImagePrompt = (prompt: string) => {
    const p = prompt.toLowerCase();
    return (
      p.includes("image") ||
      p.includes("photo") ||
      p.includes("picture") ||
      p.includes("draw")
    );
  };

  /* ---------------- STREAM TEXT ---------------- */
  const streamText = async (text: string) => {
    let current = "";

    setMessages((prev) => [
      ...prev,
      { role: "ai", type: "text", content: "" },
    ]);

    for (let i = 0; i < text.length; i++) {
      current += text[i];

      await new Promise((res) => setTimeout(res, 8));

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "ai",
          type: "text",
          content: current,
        };
        return updated;
      });
    }
  };

  /* ---------------- GENERATE ---------------- */
  const handleGenerate = async (prompt: string) => {
    if (loading) return;

    if (!user) {
      navigate("/register");
      return;
    }

    if (!profile) return;

    const isImage = isImagePrompt(prompt);

    // ✅ ONLY IMAGE LIMIT CHECK
    if (isImage && imageUsed >= imageLimit) {
      setError(
        `⚡ You’ve used ${imageUsed}/${imageLimit} images. Upgrade to generate more 🚀`
      );
      return;
    }

    try {
      setLoading(true);
      setError("");
      setLastPrompt(prompt);
      setProgressText("Thinking...");

      // user message
      setMessages((prev) => [
        ...prev,
        { role: "user", type: "text", content: prompt },
      ]);

      const result = await generateAI(prompt, user.uid);

      if (result.type === "text" && result.text) {
        await streamText(result.text);
      }

      if (result.type === "image" && result.imageUrl) {
        setMessages((prev) => [
          ...prev,
          { role: "ai", type: "image", content: result.imageUrl || "" },
        ]);
      }

      setProgressText("");
      await refreshProfile();

    } catch (e: any) {
      setError(e.message || "Failed to generate");
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- DOWNLOAD ---------------- */
  const handleDownload = (imageUrl: string) => {
    if (!imageUrl) return;

    // 🔥 backend already controls watermark
    if (plan === "free" || plan === "basic") {
      navigate("/subscription");
      return;
    }

    const link = document.createElement("a");
    link.href = imageUrl;
    link.download = "ai-image.png";
    link.click();
  };

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-slate-900 py-10 flex flex-col h-screen">
      <div className="mx-auto w-full max-w-2xl flex flex-col flex-1">
        {/* HEADER */}
        <div className="px-2 pt-6">
          <h1 className="text-xl font-bold text-white">AI Generator</h1>
          <p className="text-sm text-gray-400">
            Chat, generate images, code & more
          </p>
        </div>

        {/* USAGE */}
        {profile && (
          <div className="mt-2 px-2 text-sm text-gray-400">
            {imageUsed} / {imageLimit} images used
          </div>
        )}

        {plan === "free" && (
          <p className="text-xs px-2 mt-1 text-yellow-500">
            Free plan: 5 images/day. Upgrade for more 🚀
          </p>
        )}

        {/* CHAT */}
        <div className="flex-1 overflow-y-auto space-y-4 px-4 py-6">

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-black text-white"
                    : "bg-gray-100 text-black"
                }`}
              >
                {/* TEXT */}
                {msg.type === "text" && (
                  <p className="whitespace-pre-wrap">
                    {msg.content}
                  </p>
                )}

                {/* IMAGE */}
                {msg.type === "image" && (
                  <div className="space-y-2">
                    <img src={msg.content} className="rounded-lg" />

                    <button
                      onClick={() => handleDownload(msg.content)}
                      className="text-xs px-3 py-1 bg-black text-white rounded"
                    >
                      Download
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-sm text-gray-400 italic">
              {progressText || "AI is typing..."}
            </p>
          )}

          <div ref={bottomRef} />
        </div>

        {/* INPUT */}
        <div className="mt-2">
          <AIPromptBox
            onSubmit={handleGenerate}
            placeholder="Ask anything..."
            loading={loading}
          />
        </div>

        {/* RETRY */}
        {error && lastPrompt && (
          <button
            onClick={() => handleGenerate(lastPrompt)}
            className="mt-2 text-sm border border-white bg-black text-white px-3 py-1 rounded"
          >
            Retry
          </button>
        )}
      </div>

    </div>
  );
}