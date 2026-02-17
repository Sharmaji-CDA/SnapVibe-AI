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

import { getDownloadURL, ref } from "firebase/storage";

import { db, storage } from "./firebase";
import type { ImageItem } from "../types/image.type";

/* -------------------------------- */
/* SAVE IMAGE METADATA */
/* -------------------------------- */

export async function saveImageMetadata(data: {
  title: string;
  imageUrl: string; // 🔥 This is storage path (ai/xxx.png)
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  category?: string;
  source: string;
  prompt?: string;
  price?: number | null;
}) {
  await addDoc(collection(db, "images"), {
    ...data,
    likes: 0,
    downloads: 0,
    likedBy: [],
    createdAt: Timestamp.now(),
    status: "pending",
    isFeatured: false,
  });
}

/* -------------------------------- */
/* LIKE */
/* -------------------------------- */

export async function toggleLikeImage(
  imageId: string,
  userId: string,
  alreadyLiked: boolean
) {
  const refDoc = doc(db, "images", imageId);

  await updateDoc(refDoc, {
    likes: increment(alreadyLiked ? -1 : 1),
    likedBy: alreadyLiked
      ? arrayRemove(userId)
      : arrayUnion(userId),
  });
}

/* -------------------------------- */
/* HELPER TO RESOLVE STORAGE URL */
/* -------------------------------- */

async function resolveImageUrl(data: any) {
  let resolvedUrl = data.imageUrl;

  try {
    resolvedUrl = await getDownloadURL(
      ref(storage, data.imageUrl)
    );
  } catch (error) {
    console.error("Storage fetch error:", error);
  }

  return resolvedUrl;
}

/* -------------------------------- */
/* GET IMAGES BY MODE */
/* -------------------------------- */

export async function getImagesByMode(
  mode: "latest" | "trending" | "downloads"
): Promise<ImageItem[]> {
  let q;

  if (mode === "trending") {
    q = query(
      collection(db, "images"),
      where("status", "==", "approved"),
      orderBy("likes", "desc")
    );
  } else if (mode === "downloads") {
    q = query(
      collection(db, "images"),
      where("status", "==", "approved"),
      orderBy("downloads", "desc")
    );
  } else {
    q = query(
      collection(db, "images"),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc")
    );
  }

  const snapshot = await getDocs(q);

  return await Promise.all(
    snapshot.docs.map(async (docItem) => {
      const data = docItem.data();

      const resolvedUrl = await resolveImageUrl(data);

      return {
        id: docItem.id,
        ...(data as Omit<ImageItem, "id">),
        imageUrl: resolvedUrl,
      };
    })
  );
}

/* -------------------------------- */
/* GET BY CREATOR */
/* -------------------------------- */

export async function getImagesByCreator(
  creatorId: string
): Promise<ImageItem[]> {
  const q = query(
    collection(db, "images"),
    where("creatorId", "==", creatorId),
    orderBy("createdAt", "desc")
  );

  const snapshot = await getDocs(q);

  return await Promise.all(
    snapshot.docs.map(async (docItem) => {
      const data = docItem.data();

      const resolvedUrl = await resolveImageUrl(data);

      return {
        id: docItem.id,
        ...(data as Omit<ImageItem, "id">),
        imageUrl: resolvedUrl,
      };
    })
  );
}

/* -------------------------------- */
/* DOWNLOAD COUNT */
/* -------------------------------- */

export async function incrementDownload(imageId: string) {
  const refDoc = doc(db, "images", imageId);

  await updateDoc(refDoc, {
    downloads: increment(1),
  });
}