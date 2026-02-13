import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../context/useAuth"; // ✅ FIXED

export default function PublicRoute({
  children,
}: {
  children: ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or loading spinner
  }

  // If user is already logged in, block access
  if (user) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
