import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="mb-2 text-4xl font-bold">404</h1>
      <p className="mb-6 text-gray-600">Page not found</p>
      <Link to="/" className="rounded-lg bg-black px-4 py-2 text-white">
        Go Home
      </Link>
    </div>
  );
}
