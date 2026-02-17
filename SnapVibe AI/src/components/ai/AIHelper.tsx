export default function AIHelper({
  loading,
  error,
  children,
}: {
  loading: boolean;
  error: string;
  children: React.ReactNode;
}) {
  if (loading) {
    return (
      <div className="space-y-4 text-center">
        <div className="h-64 w-full animate-pulse rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300" />
        <p className="text-sm text-gray-500 animate-pulse">
          ✨ Generating your AI masterpiece...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
        <p className="font-medium">Something went wrong</p>
        <p className="mt-1">{error}</p>
      </div>
    );
  }

  return <>{children}</>;
}
