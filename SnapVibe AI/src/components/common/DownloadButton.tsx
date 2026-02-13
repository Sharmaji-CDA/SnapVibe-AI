type Props = {
  isFree: boolean;
  price?: number;
  onDownload: () => void;
};

export default function DownloadButton({
  isFree,
  price,
  onDownload,
}: Props) {
  return (
    <button
      onClick={onDownload}
      className="w-full rounded-lg bg-black py-2 text-white"
    >
      {isFree ? "Download Free" : `Unlock for ₹${price}`}
    </button>
  );
}
