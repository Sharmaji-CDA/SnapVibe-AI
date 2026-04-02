import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

type FAQItem = {
  question: string;
  answer: string;
  category: string;
};

const FAQS: FAQItem[] = [
  {
    category: "General",
    question: "What is CreatorVibe?",
    answer:
      "CreatorVibe is an AI-powered platform where users can generate content and creators can publish and share their work.",
  },
  {
    category: "General",
    question: "Is CreatorVibe free to use?",
    answer:
      "Yes, basic features are free. Premium tools and creator content may require a subscription.",
  },
  {
    category: "AI",
    question: "How does AI content generation work?",
    answer:
      "Simply enter your prompt, customize settings, and our AI generates content instantly based on your input.",
  },
  {
    category: "AI",
    question: "Can I use AI-generated content commercially?",
    answer:
      "Usage depends on your plan and content type. Please review our terms before using content commercially.",
  },
  {
    category: "Creator",
    question: "How do creators earn on CreatorVibe?",
    answer:
      "Creators can earn through premium content, subscriptions, and engagement on their published work.",
  },
  {
    category: "Creator",
    question: "How do I become a creator?",
    answer:
      "Sign up and start publishing content from your dashboard. No separate application is required.",
  },
  {
    category: "Account",
    question: "How do I edit my profile?",
    answer:
      "Go to your profile settings and update your information anytime.",
  },
  {
    category: "Account",
    question: "How do I reset my password?",
    answer:
      "Use the 'Forgot Password' option on the login page to reset your password securely.",
  },
  {
    category: "Billing",
    question: "How do I cancel my subscription?",
    answer:
      "You can cancel anytime from your account settings. Access remains active until the billing cycle ends.",
  },
];

const categories = ["All", "General", "AI", "Creator", "Account", "Billing"];

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = FAQS.filter((item) => {
    const matchCategory =
      activeCategory === "All" || item.category === activeCategory;

    const matchSearch =
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white px-4 sm:px-6 py-14">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
          Help Center
        </h1>
        <p className="text-slate-400 mt-2 text-sm">
          Find answers and support for CreatorVibe
        </p>
      </div>

      {/* SEARCH */}
      <div className="max-w-2xl mx-auto mb-6 relative">
        <Search size={16} className="absolute left-3 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* CATEGORY */}
      <div className="flex justify-center flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 text-sm rounded-full transition ${
              activeCategory === cat
                ? "bg-white text-black"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto space-y-4">
        {filtered.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={index}
              className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left"
              >
                <span className="text-sm font-medium">
                  {faq.question}
                </span>

                <ChevronDown
                  size={18}
                  className={`transition ${isOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`px-5 overflow-hidden transition-all duration-300 ${
                  isOpen ? "max-h-40 pb-4" : "max-h-0"
                }`}
              >
                <p className="text-sm text-slate-400">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <p className="text-center text-slate-400 mt-10">
          No results found
        </p>
      )}

      {/* CTA */}
      <div className="text-center mt-16">
        <p className="text-slate-400 text-sm mb-3">
          Still have questions?
        </p>

        <button
          onClick={() => navigate("/contact")}
          className="px-6 py-2 bg-indigo-600 rounded-full text-sm hover:opacity-90 transition"
        >
          Contact Support
        </button>
      </div>
    </section>
  );
}