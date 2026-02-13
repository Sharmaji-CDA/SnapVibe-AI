import Modal from "../common/Modal";
import Button from "../common/Button";
import type { ImageItem } from "../../types/image.type";

type Props = {
  open: boolean;
  onClose: () => void;
  image: ImageItem

  isLiked: boolean;
  onLike: () => void | Promise<void>;
  onDownload: () => void | Promise<void>;
};

export default function ImagePreviewModal({ open, onClose, image }: Props) {

  const isFree = image.source === "ai" || image.price === 0 || image.price == null;
  const handleDownload = () => {
    
    if (image.source === "ai") {
      download(image.imageUrl, image.title);
      return;
    }

    if (!isFree) {
      alert("Payment required before download");
      return;
    }

    download(image.imageUrl, image.title);
  };

  const download = (url: string, name: string) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
  };

  return (
    <Modal open={open} onClose={onClose}>
      {image.source === "creator" && (
        <div>
          <img src={image.imageUrl} alt={image.title} className="mb-4 rounded-lg" />
    
          <h2 className="mb-2 text-xl font-bold">{image.title}</h2>
    
          {isFree ? (
            <Button label="Download Free" onClick={handleDownload}  fullWidth />
          ) : (
            <Button
              label={`Unlock for ₹${image.price}`}
              onClick={() => alert("Integrate Razorpay")}
              fullWidth
            />
          )}
        </div>
      )}
    </Modal>
  );
}
