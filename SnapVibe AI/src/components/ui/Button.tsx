type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "custom";
  fullWidth?: boolean;
};

export default function Button({
  label,
  onClick,
  variant = "primary",
  fullWidth,
}: ButtonProps) {
  const base =
    "rounded-lg px-4 py-2 text-sm font-medium transition";

  const styles =
    variant === "primary"
      ? "bg-indigo-600 border border-indigo-600 text-white hover:bg-indigo-700"
      : "border border-white hover:bg-slate-600";

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles} ${fullWidth ? "w-full" : ""}`}
    >
      {label}
    </button>
  );
}
