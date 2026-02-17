import { useState } from "react";

export default function AIPromptBox({
  onSubmit,
  placeholder = "Describe what you want...",
  buttonText = "Generate",
  loading = false,
}: {
  onSubmit: (prompt: string) => void;
  placeholder?: string;
  buttonText?: string;
  loading?: boolean;
}) {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    const trimmed = prompt.trim();
    if (!trimmed || loading) return;

    onSubmit(trimmed);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder={placeholder}
          rows={4}
          className="w-full resize-none rounded-2xl border border-gray-200 bg-gray-50 p-4 text-sm focus:border-black focus:bg-white focus:outline-none transition"
        />

        <div className="absolute bottom-2 right-3 text-xs text-gray-400">
          {prompt.length} chars
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading || !prompt.trim()}
        className={`w-full rounded-2xl py-3 text-sm font-semibold text-white transition ${
          loading || !prompt.trim()
            ? "bg-gray-400"
            : "bg-black hover:bg-gray-800"
        }`}
      >
        {loading ? "Generating..." : buttonText}
      </button>
    </div>
  );
}
