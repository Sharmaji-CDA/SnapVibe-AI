import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

export async function uploadImageFile(
  file: File,
  type: "ai" | "creator"
): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`;

  const folder = type === "ai" ? "ai" : "uploads";

  const storageRef = ref(storage, `${folder}/${fileName}`);

  await uploadBytes(storageRef, file);

  return `${folder}/${fileName}`;
}