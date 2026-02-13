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
      <div className="animate-pulse space-y-3">
        <div className="h-64 w-full rounded-xl bg-gray-200" />
        <p className="text-sm text-gray-500">Generating image...</p>
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  return <>{children}</>;
}
