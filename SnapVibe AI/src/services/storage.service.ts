import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebase";

// Creator content upload
export async function uploadImage(file: File, userId: string) {
  const fileRef = ref(
    storage,
    `uploads/${userId}/${Date.now()}-${file.name}`
  );

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
}

// Profile avatar upload
export async function uploadAvatar(file: File, userId: string) {
  const fileRef = ref(storage, `avatars/${userId}`);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return url;
}

