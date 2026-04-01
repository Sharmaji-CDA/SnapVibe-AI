import { useRef, useState } from "react";
import { Send, Plus, X } from "lucide-react";

export default function AIPromptBox({
  onSubmit,
  placeholder = "Ask anything...",
  loading = false,
}: {
  onSubmit: (prompt: string, file?: File | null) => void;
  placeholder?: string;
  loading?: boolean;
}) {
  const [prompt, setPrompt] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ---------------- AUTO RESIZE ---------------- */
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const el = e.target;
    setPrompt(el.value);

    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };

  /* ---------------- FILE SELECT ---------------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) setFile(selected);
  };

  /* ---------------- REMOVE FILE ---------------- */
  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = () => {
    const trimmed = prompt.trim();
    if ((!trimmed && !file) || loading) return;

    onSubmit(trimmed, file);

    setPrompt("");
    setFile(null);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  /* ---------------- KEYBOARD ---------------- */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border border-gray-200 rounded-2xl bg-white px-3 py-2 shadow-sm">

      {/* PREVIEW IMAGE */}
      {file && (
        <div className="relative mb-2 w-fit">
          <img
            src={URL.createObjectURL(file)}
            className="h-16 w-16 object-cover rounded-lg border"
          />
          <button
            onClick={removeFile}
            className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
          >
            <X size={12} />
          </button>
        </div>
      )}

      <div className="flex items-end gap-2">

        {/* PLUS ICON */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 text-gray-600 bg-gray-300 rounded-lg hover:text-black"
        >
          <Plus size={18} />
        </button>

        {/* HIDDEN INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* TEXTAREA */}
        <textarea
          ref={textareaRef}
          value={prompt}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          rows={1}
          maxLength={500}
          className="flex-1 resize-none mx-2 bg-transparent text-md text-slate-700 placeholder:text-gray-400 outline-none max-h-[150px]"
        />

        {/* SEND BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading || (!prompt.trim() && !file)}
          className={`p-2 rounded-xl transition ${
            loading || (!prompt.trim() && !file)
              ? "bg-gray-800 cursor-not-allowed"
              : "bg-black hover:bg-gray-800"
          }`}
        >
          <Send size={16} className="text-white" />
        </button>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between text-xs text-gray-400 mt-1 px-1">
        <span>Enter to send • Shift + Enter for new line</span>
        <span>{prompt.length}/500</span>
      </div>
    </div>
  );
}