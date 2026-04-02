import { useEffect, useState } from "react";
import Skeleton from "../../components/ui/Skeleton";
import {
  Plus,
  Download,
  Copy,
  Eye,
  ThumbsUp,
  Share,
  ThumbsDown,
  MessageCircleCheck,
  Send,
} from "lucide-react";
import { useAuth } from "../../contexts/auth/useAuth";
import { generateAI } from "../../services/ai.service";
import { getUserProfile } from "../../services/user/user.service";
import FeedbackModal from "../../components/modals/FeedbackModal";

export default function HeroSection() {

  const { user } = useAuth();

  // const [ setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [textResult, setTextResult] = useState<string | null>(null);

  const [displayText, setDisplayText] = useState("");
  const [copied, setCopied] = useState(false);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [, setLimitReached] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [openFeedback, setOpenFeedback] = useState(false);
  const MAX_LIMIT = 5; // 🔥 change anytime

  /* 🔥 SUGGESTIONS */
  const suggestions = [
    "Anime girl portrait",
    "Cyberpunk city at night",
    "Futuristic fashion outfit",
    "Minimal UI dashboard design",
    "Realistic lion in jungle",
  ];

  /* 🔥 LOAD PROFILE */
  useEffect(() => {
    const loadProfile = async () => {
      if (!user?.uid) return;

      try {
        const data = await getUserProfile(user.uid);
        setProfile(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadProfile();
  }, [user]);


  /* ---------------- LOAD ---------------- */
  useEffect(() => {
    // const timer = setTimeout(() => setLoading(false), 400);
    // return () => clearTimeout(timer);
  }, []);

  /* ---------------- SCROLL RESET ---------------- */
  useEffect(() => {
    const el = document.getElementById("resultBox");
    if (el) el.scrollTop = 0;
  }, [displayText]);

  /* ---------------- TYPING EFFECT ---------------- */
  useEffect(() => {
    if (!textResult) return;

    let i = 0;
    setDisplayText("");

    const interval = setInterval(() => {
      setDisplayText((prev) => prev + textResult[i]);
      i++;
      if (i >= textResult.length) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [textResult]);

  /* ---------------- GENERATE ---------------- */
  const handleGenerate = async () => {
    if (!search.trim() || !user?.uid) return;

    try {
      // 🔥 LIMIT CHECK
      if ((profile.aiImageUsed || 0) >= MAX_LIMIT) {
        setLimitReached(true);
        alert("Daily generation limit reached 🚫");
        return;
      }
      if (!user?.uid) {
        throw new Error("User not logged in");
      }

      if (!search.trim()) {
        throw new Error("Please enter something");
      }

      setGenerating(true);
      setResult(null);
      setTextResult(null);

      const data = await generateAI(search, user.uid);
      console.log("AI RESPONSE:", data);

      // ✅ validate response
      if (!data || typeof data !== "object") {
        throw new Error("Invalid AI response");
      }

      // ✅ IMAGE
      if (data.type === "image") {
        if (!data.imageUrl) {
          throw new Error("Image not generated");
        }
        setResult(data.imageUrl);
      } else if (data.type === "text") {
        if (!data.text) {
          throw new Error("No text generated");
        }
        setTextResult(data.text);
      } else {
        throw new Error("Unsupported response type");
      }
      // 🔥 increment usage locally
      profile.aiImageUsed = (profile.aiImageUsed || 0) + 1;

    } catch (err: any) {
      console.error("AI ERROR:", err);
      alert( err?.message || "Something went wrong. Try again." );
    } finally {
      setGenerating(false);
    }
  };

  /* ---------------- DRAG DROP ---------------- */
  const handleDrop = (e: any) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFilePreview(url);
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  /* ---------------- ENTER KEY ---------------- */
  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleGenerate();
    }
  };

  /* ---------------- FILE UPLOAD ---------------- */
  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setFilePreview(url);
  };

  /* ---------------- ACTIONS ---------------- */
  const handleCopy = async () => {
    const content = result || textResult || "";
    await navigator.clipboard.writeText(content);

    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleDownload = () => {
    if (!result) return;
    const a = document.createElement("a");
    a.href = result;
    a.download = "snapvibe-ai.png";
    a.click();
  };

  const handleDownloadText = () => {
    if (!textResult) return;

    const blob = new Blob([textResult], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "snapvibe-ai.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleLike = () => alert("👍 Liked");
  const handleDislike = () => alert("👎 Disliked");

  const handleShare = async () => {
    const content = result || textResult || "";

    if (navigator.share) {
      await navigator.share({ text: content });
    } else {
      await navigator.clipboard.writeText(content);
      alert("Copied for sharing!");
    }
  };

  return (
    <section className="bg-slate-950 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 h-[400px] w-[344px] -translate-x-1/2 rounded-full bg-pink-500/20 blur-[120px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-yellow-500/20 blur-[120px]" />
        </div>

        {/* HERO HEADER */}
        <div className="text-center mb-10">
          <div className="inline-block mb-4 rounded-full bg-gradient-to-r from-pink-500 to-yellow-400 px-4 py-1 text-xs font-semibold text-black shadow-lg">
            🚀 CreatorVibe AI
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Turn Ideas Into Stunning
            <span className="block bg-gradient-to-r from-pink-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              AI Creations Instantly
            </span>
          </h1>

          <p className="mt-5 text-slate-400 max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
            Generate images, code, and content in seconds. Just type your idea and let AI do the magic.
          </p>
        </div>

        {/* INPUT */}
        <div onDrop={handleDrop} onDragOver={handleDragOver} className="max-w-3xl text-center mx-auto mb-8">
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 shadow-xl">

            <label className="cursor-pointer bg-white/10 p-2 rounded-xl hover:bg-white/20 transition">
              <Plus size={18} />
              <input type="file" hidden onChange={handleFileChange} />
            </label>

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Describe anything..."
              className="flex-1 bg-transparent outline-none"
            />

            <button
              onClick={handleGenerate}
              className="flex items-center bg-gradient-to-r from-pink-500 to-yellow-400 px-4 py-2 rounded-lg text-black font-semibold"
            >
              <Send size={14} />
            </button>
          </div>

          {/* 🔥 SUGGESTIONS */}
          <div className="flex flex-wrap gap-2 mt-3 justify-center">
            {suggestions.map((item) => (
              <button
                key={item}
                onClick={() => setSearch(item)}
                className="text-xs bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition"
              >
                {item}
              </button>
            ))}
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Drag & drop image here
          </p>
        </div>

        {/* RESULT */}
        {(generating || result || textResult || filePreview) && (
          <div className="max-w-3xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 p-4 sm:p-6 rounded-3xl shadow-2xl">

            {generating && <Skeleton className="h-[300px]" />}

            {/* IMAGE */}
            {result && (
              <>
                <img
                  src={result}
                  onClick={() => setPreviewOpen(true)}
                  className="w-full max-w-md mx-auto rounded-xl cursor-pointer hover:scale-105 transition"
                />

                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={() => setPreviewOpen(true)} className="bg-white/10 px-3 py-2 rounded-lg"><Eye size={14} /></button>
                  <button onClick={handleDownload} className="bg-white/10 px-3 py-2 rounded-lg"><Download size={14} /></button>
                  <button onClick={handleCopy} className="bg-white/10 px-3 py-2 rounded-lg">
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <button onClick={handleCopy} className="bg-white/10 px-3 py-2 rounded-lg"><Copy size={14} /></button>
                  <button onClick={handleLike} className="bg-white/10 px-3 py-2 rounded-lg"><ThumbsUp size={14} /></button>
                  <button onClick={handleDislike} className="bg-white/10 px-3 py-2 rounded-lg"><ThumbsDown size={14} /></button>
                  <button onClick={handleShare} className="bg-white/10 px-3 py-2 rounded-lg"><Share size={14} /></button>
                </div>
              </>
            )}

            {/* TEXT */}
            {textResult && (
              <>
                <div
                  id="resultBox"
                  className="h-[260px] overflow-y-auto bg-slate-900/80 border border-white/10 p-4 rounded-2xl text-sm leading-relaxed"
                >
                  {displayText}
                </div>

                <div className="flex justify-end gap-2 mt-2">
                  <button onClick={handleDownloadText} className="bg-white/10 px-3 py-2 rounded-lg"><Download size={14} /></button>
                  <button onClick={handleCopy} className="bg-white/10 px-3 py-2 rounded-lg">
                    {copied ? "Copied ✓" : "Copy"}
                  </button>
                </div>

                <div className="flex gap-2 mt-4 flex-wrap">
                  <button onClick={handleCopy} className="bg-white/10 px-3 py-2 rounded-lg"><Copy size={14} /></button>
                  <button onClick={handleLike} className="bg-white/10 px-3 py-2 rounded-lg"><ThumbsUp size={14} /></button>
                  <button onClick={handleDislike} className="bg-white/10 px-3 py-2 rounded-lg"><ThumbsDown size={14} /></button>
                  <button onClick={handleShare} className="bg-white/10 px-3 py-2 rounded-lg"><Share size={14} /></button>
                </div>
              </>
            )}

            {/* UPLOAD PREVIEW */}
            {filePreview && (
              <img src={filePreview} className="max-w-[300px] mt-4 rounded-xl" />
            )}
          </div>
        )}

      </div>

      {/* PREVIEW */}
      {previewOpen && result && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewOpen(false)}
        >
          <img src={result} className="max-w-[95%] max-h-[90vh] rounded-xl" />
        </div>
      )}

      <div className="fixed bottom-8 right-6 z-50 flex flex-col gap-3">

        {/* 🟢 WHATSAPP */}
        <div className="group relative">

          {/* TOOLTIP */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
            WhatsApp
          </span>

          <button
            onClick={() =>
              window.open(
                "https://wa.me/91XXXXXXXXXX", // 🔥 replace with your number
                "_blank"
              )
            }
            className="bg-green-500 p-3 rounded-full shadow-lg hover:bg-green-600 transition"
          >
            {/* You can use any icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="white"
              viewBox="0 0 24 24"
            >
              <path d="M20.52 3.48A11.76 11.76 0 0012 .25C5.52.25.25 5.52.25 12c0 2.12.55 4.18 1.6 6L.25 23.75l5.95-1.56A11.7 11.7 0 0012 23.75c6.48 0 11.75-5.27 11.75-11.75 0-3.14-1.22-6.1-3.23-8.52zM12 21.5c-1.8 0-3.55-.47-5.1-1.36l-.36-.21-3.53.93.94-3.44-.23-.36A9.47 9.47 0 012.5 12c0-5.24 4.26-9.5 9.5-9.5 2.54 0 4.93.99 6.73 2.77A9.46 9.46 0 0121.5 12c0 5.24-4.26 9.5-9.5 9.5zm5.16-7.19c-.28-.14-1.66-.82-1.92-.91-.26-.1-.45-.14-.64.14-.19.28-.73.91-.9 1.1-.17.19-.33.21-.61.07-.28-.14-1.2-.44-2.28-1.4-.84-.75-1.4-1.68-1.57-1.96-.17-.28-.02-.43.13-.57.13-.13.28-.33.42-.5.14-.17.19-.28.28-.47.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.12-.23-.55-.47-.47-.64-.48h-.55c-.19 0-.5.07-.76.36-.26.28-1 1-1 2.43 0 1.43 1.02 2.81 1.16 3 .14.19 2 3.05 4.84 4.27.68.29 1.2.46 1.6.59.67.21 1.28.18 1.76.11.54-.08 1.66-.68 1.9-1.34.24-.66.24-1.23.17-1.34-.07-.11-.26-.18-.54-.32z" />
            </svg>
          </button>
        </div>

        <div className="group relative">
          {/* TOOLTIP */}
          <span className="absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white text-xs px-3 py-1 rounded-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
            Feedback
          </span>
          {/* BUTTON */}
          <button
            aria-label="Feedback"
            onClick={() => setOpenFeedback(true)}
            className="bg-indigo-500 backdrop-blur p-3 rounded-full shadow-lg hover:bg-indigo-600 transition"
          >
            <MessageCircleCheck size={18} />
          </button>
        </div>
      </div>
      
      {openFeedback && (
        <FeedbackModal
          onClose={() => setOpenFeedback(false)}
        />
      )}
    </section>
  );
}