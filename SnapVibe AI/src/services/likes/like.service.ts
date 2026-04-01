import {
  collection,
  getDocs,
  query,
  where,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  orderBy,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import { incrementLike } from "../assets/asset.action";

/* ================= CHECK ================= */

export const getUserLikes = async (userId: string) => {
  const q = query(
    collection(db, "likes"),
    where("userId", "==", userId),
    orderBy("createdAt", "desc")
  );


  const snapshot = await getDocs(q);

  return snapshot.docs.map((docItem) => {
    const data = docItem.data();

    return {
      id: docItem.id,
      userId: data.userId,
      imageId: data.imageId,
      creatorId: data.creatorId ?? "",
      createdAt: data.createdAt,
    };
  });
};

export const isLiked = async (userId: string, imageId: string) => {
  const likeRef = doc(db, "likes", `${userId}_${imageId}`);
  const snap = await getDoc(likeRef);
  
  return snap.exists();
};

/* ================= TOGGLE ================= */

export const toggleLike = async (userId: string, imageId: string) => {
  const likeId = `${userId}_${imageId}`;
  const likeRef = doc(db, "likes", likeId);

  const existing = await getDoc(likeRef);


  if (existing.exists()) {
    // UNLIKE
    await deleteDoc(likeRef);
    await incrementLike(imageId, -1);

    return { liked: false };

  } else {
    // fetch image
    const imageRef = doc(db, "images", imageId);
    const imageSnap = await getDoc(imageRef);

    if (!imageSnap.exists()) {
      throw new Error("Image not found");
    }

    const creatorId = imageSnap.data().creatorId || "";

    // LIKE
    await setDoc(likeRef, {
      userId,
      imageId,
      creatorId,
      createdAt: serverTimestamp(),
    });

    await incrementLike(imageId, 1);

    return { liked: true };
  }
};