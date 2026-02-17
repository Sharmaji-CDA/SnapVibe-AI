import { useEffect, useState } from "react";

export default function NoticeBanner() {
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down → collapse
        setVisible(false);
      } else {
        // Scrolling up → expand
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="sticky top-16 z-50 overflow-hidden">
      <div
        className={`transition-all duration-300 ease-in-out ${
          visible ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="w-full bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-900">
          🚧 <strong>✨ We’re Just Getting Started</strong> This platform is in active development.
          New features are coming soon —
          <span className="font-medium"> thanks for exploring early!</span>
        </div>
      </div>
    </div>
  );
}
