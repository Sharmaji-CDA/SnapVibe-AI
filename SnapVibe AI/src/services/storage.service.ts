import { ref, uploadBytes } from "firebase/storage";
import { storage } from "./firebase";

// Creator content upload
export async function uploadImage(file: File, userId: string) {
  const filePath = `uploads/${userId}/${Date.now()}-${file.name}`;
  const fileRef = ref(storage, filePath);

  await uploadBytes(fileRef, file);

  return filePath; // 🔥 RETURN PATH ONLY
}

// Profile avatar upload
export async function uploadAvatar(file: File, userId: string) {
  const filePath = `avatars/${userId}`;
  const fileRef = ref(storage, filePath);

  await uploadBytes(fileRef, file);

  return filePath; // 🔥 RETURN PATH ONLY
}