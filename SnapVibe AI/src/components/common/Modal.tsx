type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-lg rounded-xl bg-white p-6">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}
