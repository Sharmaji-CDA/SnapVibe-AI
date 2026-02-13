import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  Timestamp,
  doc,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import type { ImageItem } from "../types/image.type";

// --- existing functions stay as-is ---

export async function saveImageMetadata(data: {
  title: string;
  imageUrl: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  price?: number | null;
}) {
  await addDoc(collection(db, "images"), {
    ...data,
    likes: 0,
    downloads: 0,
    likedBy: [],
    createdAt: Timestamp.now(),
  });
}

export async function toggleLikeImage(
  imageId: string,
  userId: string,
  alreadyLiked: boolean
) {
  const ref = doc(db, "images", imageId);

  await updateDoc(ref, {
    likes: increment(alreadyLiked ? -1 : 1),
    likedBy: alreadyLiked
      ? arrayRemove(userId)
      : arrayUnion(userId),
  });
}

export async function getLatestImages(): Promise<ImageItem[]> { 
  const q = query(collection(db, "images"), orderBy("createdAt", "desc")); 
  const snapshot = await getDocs(q); 
  return snapshot.docs.map((doc) => ({ 
    id: doc.id, ...(doc.data() as Omit<ImageItem, "id">), 
  })); 
}

export async function getImagesByMode(
  mode: "latest" | "trending" | "downloads"
): Promise<ImageItem[]> {
  let q;

  if (mode === "trending") {
    q = query(collection(db, "images"), orderBy("likes", "desc"));
  } else if (mode === "downloads") {
    q = query(collection(db, "images"), orderBy("downloads", "desc"));
  } else {
    q = query(collection(db, "images"), orderBy("createdAt", "desc"));
  }

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ImageItem, "id">),
  }));
}

export async function getImagesByCreator(creatorId: string) {
  const q = query(
    collection(db, "images"),
    where("creatorId", "==", creatorId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ImageItem, "id">),
  }));
}



export async function incrementDownload(imageId: string) {
  const ref = doc(db, "images", imageId);
  await updateDoc(ref, {
    downloads: increment(1),
  });
}

export async function getTrendingImages(): Promise<ImageItem[]> {
  const q = query(
    collection(db, "images"),
    orderBy("likes", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ImageItem, "id">),
  }));
}

export async function getMostDownloadedImages(): Promise<ImageItem[]> {
  const q = query(
    collection(db, "images"),
    orderBy("downloads", "desc")
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<ImageItem, "id">),
  }));
}

