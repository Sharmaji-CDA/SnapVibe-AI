import { useState } from "react";
import Button from "../../components/common/Button";

export default function Contact() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.message
    ) {
      setError("Please fill all fields.");
      return;
    }

    setError("");
    setLoading(true);

    // 🔥 Replace with real backend later
    await new Promise((res) =>
      setTimeout(res, 1000)
    );

    setLoading(false);
    setSuccess(true);

    setForm({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <section className="relative bg-gradient-to-b from-white to-slate-100 py-24">
      <div className="mx-auto max-w-5xl px-6">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Contact Us
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Have a question, feedback, or partnership idea?
            We’d love to hear from you.
          </p>
        </div>

        {/* CARD */}
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-10 shadow-lg transition">

          {success ? (
            <div className="text-center">
              <h2 className="text-xl font-semibold text-green-600">
                Message Sent Successfully 🎉
              </h2>
              <p className="mt-3 text-sm text-slate-500">
                We usually respond within 24 hours.
              </p>

              <button
                onClick={() => setSuccess(false)}
                className="mt-6 text-sm font-medium text-indigo-600 hover:underline"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {error && (
                <div className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                  {error}
                </div>
              )}

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us how we can help you..."
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:outline-none transition"
                />
              </div>

              <Button
                label={
                  loading
                    ? "Sending..."
                    : "Send Message"
                }
                fullWidth
                disabled={loading}
              />

              <p className="pt-2 text-center text-xs text-slate-500">
                We usually respond within 24 hours.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
