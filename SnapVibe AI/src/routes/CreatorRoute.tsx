import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import type { JSX } from "react";

export default function CreatorRoute({
  children,
}: {
  children: JSX.Element;
}) {
  const { user, profile, loading } = useAuth();

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">
        Checking access...
      </div>
    );
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not creator
  if (profile?.accountType !== "creator") {
    return <Navigate to="/subscription" replace />;
  }

  return children;
}
