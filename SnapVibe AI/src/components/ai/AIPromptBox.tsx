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
    if (!prompt.trim() || loading) return;
    onSubmit(prompt);
  };

  return (
    <div className="space-y-3">
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-300 p-3"
      />

      <button
        onClick={handleSubmit}
        disabled={loading || !prompt.trim()}
        className={`w-full rounded-xl py-3 text-white ${
          loading ? "bg-gray-400" : "bg-black"
        }`}
      >
        {loading ? "Generating..." : buttonText}
      </button>
    </div>
  );
}
