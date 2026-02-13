export default function NoticeBanner() {
  return (
    <div className="sticky z-50 top-16">
      <div className="absolute w-full bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-sm text-amber-900">
        🚧 <strong>✨ We’re Just Getting Started</strong> This platform is in active development.
        New features and improvements are coming soon — 
        <span className="font-medium">thanks for exploring early!</span>
      </div>
    </div>
  );
}
