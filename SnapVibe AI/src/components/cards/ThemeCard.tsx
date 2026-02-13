type Props = {
  title: string;
  previewColor: string;
  description?: string;
  popular?: boolean;
  premium?: boolean;
};

export default function ThemeCard({
  title,
  previewColor,
  description,
  popular,
  premium,
}: Props) {
  return (
    <div className="group relative rounded-3xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      {/* Badges */}
      <div className="absolute right-4 top-4 flex gap-2">
        {popular && (
          <span className="rounded-full bg-black px-3 py-1 text-xs text-white">
            Popular
          </span>
        )}
        {premium && (
          <span className="rounded-full bg-indigo-500 px-3 py-1 text-xs text-white">
            Premium
          </span>
        )}
      </div>

      {/* Preview */}
      <div
        className="mb-6 h-32 rounded-2xl"
        style={{ backgroundColor: previewColor }}
      />

      {/* Content */}
      <h3 className="mb-2 text-lg font-semibold text-slate-900">
        {title}
      </h3>

      <p className="mb-6 text-sm text-slate-600">
        {description}
      </p>

      {/* Action */}
      <button className="w-full rounded-xl border px-4 py-3 text-sm font-medium transition hover:bg-slate-100">
        Apply Theme
      </button>
    </div>
  );
}
