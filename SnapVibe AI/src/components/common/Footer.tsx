export default function Footer() {
  return (
    <footer className="border-t bg-white">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-10 text-sm text-slate-600 md:grid-cols-4">
          {/* Brand */}
          <div>
            <h3 className="mb-3 text-lg font-semibold text-slate-900">
              SnapVibe<span className="text-indigo-500">AI</span>
            </h3>
            <p className="text-sm text-slate-500">
              Discover, generate, and download premium AI-powered wallpapers,
              images, and themes.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-3 font-semibold text-slate-900">Explore</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-indigo-500" href="/wallpapers">Wallpapers</a></li>
              <li><a className="hover:text-indigo-500" href="/images">Images</a></li>
              <li><a className="hover:text-indigo-500" href="/themes">Themes</a></li>
              <li><a className="hover:text-indigo-500" href="/trending">Trending</a></li>
              <li><a className="hover:text-indigo-500" href="/gallery">Gallery</a></li>
            </ul>
          </div>

          {/* Creators */}
          <div>
            <h4 className="mb-3 font-semibold text-slate-900">Creators</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-indigo-500" href="/upload">Upload</a></li>
              <li><a className="hover:text-indigo-500" href="/creator/dashboard">Creator Program</a></li>
              <li><a className="hover:text-indigo-500" href="/subscription">Subscriptions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 font-semibold text-slate-900">Company</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-indigo-500" href="/about">About</a></li>
              <li><a className="hover:text-indigo-500" href="/contact">Contact</a></li>
              <li><a className="hover:text-indigo-500" href="/support">Support</a></li>
              <li><a className="hover:text-indigo-500" href="/privacy-policy">Privacy Policy</a></li>
              <li><a className="hover:text-indigo-500" href="/terms-condition">Terms & Conditions</a></li>
              <li><a className="hover:text-indigo-500" href="/refund-policy">Refund & Cancellation</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-6 text-xs text-slate-500 sm:flex-row">
          <span>
            © {new Date().getFullYear()} SnapVibe AI. All rights reserved.
          </span>
          <span>
            Made with ❤️ using AI
          </span>
        </div>
      </div>
    </footer>
  );
}
