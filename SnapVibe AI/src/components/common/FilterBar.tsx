type Filter = "trending" | "latest" | "free" | "paid";

type Props = {
  active: Filter;
  onChange: (filter: Filter) => void;
};

export default function FilterBar({ active, onChange }: Props) {
  const filters: Filter[] = ["trending", "latest", "free", "paid"];

  return (
    <div className="mb-6 flex gap-3">
      {filters.map((f) => (
        <button
          key={f}
          onClick={() => onChange(f)}
          className={`rounded-full px-4 py-1 text-sm capitalize ${
            active === f
              ? "bg-black text-white"
              : "border hover:bg-gray-100"
          }`}
        >
          {f}
        </button>
      ))}
    </div>
  );
}
