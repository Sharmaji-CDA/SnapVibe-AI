import { useState } from "react";
import { useAuth } from "../../contexts/auth/useAuth";
import { submitFeedback } from "../../services/feedback/feedback.service";

type Props = {
  onClose: () => void;
};

export default function FeedbackModal({ onClose }: Props) {
  const { user, profile } = useAuth();

  const [message, setMessage] = useState("");
  const [type, setType] = useState<"bug" | "feature" | "general">("general");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!message.trim()) {
      setError("Please enter your feedback");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await submitFeedback({
        userId: user?.uid || "",
        email: profile?.email || "",
        message,
        type,
      });

      setSuccess(true);
      setMessage("");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="bg-white w-full max-w-md rounded-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        {!success ? (
          <>
            <h2 className="text-lg text-gray-900 font-semibold mb-4">
              Give Feedback
            </h2>

            {/* TYPE */}
            <div className="flex gap-2 mb-4">
              {["general", "bug", "feature"].map((t) => (
                <button
                  key={t}
                  onClick={() => setType(t as any)}
                  className={`px-3 py-1 text-xs rounded-full ${
                    type === t
                      ? "bg-black text-white"
                      : "bg-gray-400"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* MESSAGE */}
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you think..."
              className="w-full border border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-lg px-3 py-2 text-sm mb-3"
              rows={4}
            />

            {/* ERROR */}
            {error && (
              <p className="text-xs text-red-500 mb-3">{error}</p>
            )}

            {/* ACTIONS */}
            <div className="flex justify-end gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-600 text-gray-900 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={loading}
                className="px-4 py-2 text-sm bg-black text-white rounded-lg"
              >
                {loading ? "Sending..." : "Submit"}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-6">
            <h3 className="font-semibold text-lg mb-2">
              Thank you! 🎉
            </h3>
            <p className="text-sm text-gray-500">
              Your feedback helps us improve.
            </p>

            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-black text-white rounded-lg text-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}