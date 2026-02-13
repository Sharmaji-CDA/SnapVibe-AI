type ButtonProps = {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary";
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
      ? "bg-black text-white hover:bg-gray-800"
      : "border hover:bg-gray-100";

  return (
    <button
      onClick={onClick}
      className={`${base} ${styles} ${fullWidth ? "w-full" : ""}`}
    >
      {label}
    </button>
  );
}
