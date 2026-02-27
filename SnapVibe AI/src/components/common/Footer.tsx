export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-10 text-sm text-slate-600">
          {/* Brand */}
          <div>
              <img src="/snap-logo.webp" alt="SnapVibe AI" className="h-9 w-auto mb-3" />
            {/* <h3 className="mb-2 text-lg font-semibold text-slate-900">
              SnapVibe<span className="text-indigo-500">AI</span>
            </h3> */}
            <p className="text-sm text-slate-500">
              Discover, generate, and download premium AI-powered wallpapers,
              images, and themes.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="mb-3 text-base sm:text-lg font-semibold text-slate-900">Explore</h4>
            <ul className="space-y-2">
              <li><a className="block hover:text-indigo-500 transition py-1" href="/wallpapers">Wallpapers</a></li>
              <li><a className="block hover:text-indigo-500 transition py-1" href="/images">Images</a></li>
              <li><a className="block hover:text-indigo-500 transition py-1" href="/themes">Themes</a></li>
              <li><a className="block hover:text-indigo-500 transition py-1" href="/trending">Trending</a></li>
              <li><a className="block hover:text-indigo-500 transition py-1" href="/gallery">Gallery</a></li>
            </ul>
          </div>

          {/* Creators */}
          <div>
            <h4 className="mb-3 text-sm sm:text-base font-semibold text-slate-900">Creators</h4>
            <ul className="space-y-2">
              <li><a className="hover:text-indigo-500" href="/upload">Upload</a></li>
              <li><a className="hover:text-indigo-500" href="/creator/dashboard">Creator Program</a></li>
              <li><a className="hover:text-indigo-500" href="/subscription">Subscriptions</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-3 text-sm sm:text-base font-semibold text-slate-900">Company</h4>
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
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t pt-6 text-xs text-slate-500 text-center sm:text-left">
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
