import {
  doc,
  getDoc,
  updateDoc,
  increment,
  Timestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

/* ================= SAFE FETCH ================= */

const getAssetData = async (id: string) => {
  const ref = doc(db, "images", id);
  const snap = await getDoc(ref);

  if (!snap.exists()) throw new Error("Asset not found");

  return { ref, data: snap.data() };
};

/* ================= SCORE ================= */

export const calculateScore = (data: any) => {
  return (
    (data.downloads ?? 0) * 3 +
    (data.likes ?? 0) * 2 +
    (data.views ?? 0) * 0.5
  );
};

/* ================= VIEW ================= */

export const incrementView = async (imageId: string) => {
  try {
    const { ref, data } = await getAssetData(imageId);

    const newViews = Math.max((data.views ?? 0) + 1, 0);

    const score = calculateScore({
      ...data,
      views: newViews,
    });

    await updateDoc(ref, {
      views: increment(1),
      score,
      updatedAt: Timestamp.now(),
    });

  } catch (error) {
    console.error("incrementView error:", error);
  }
};

/* ================= LIKE ================= */

export const incrementLike = async (
  imageId: string,
  value: number // +1 or -1
) => {
  try {
    const { ref, data } = await getAssetData(imageId);

    const newLikes = Math.max((data.likes ?? 0) + value, 0);

    const score = calculateScore({
      ...data,
      likes: newLikes,
    });

    await updateDoc(ref, {
      likes: increment(value),
      score,
      updatedAt: Timestamp.now(),
    });

  } catch (error) {
    console.error("incrementLike error:", error);
  }
};

export const incrementDownload = async (imageId: string) => {
  try {
    const { ref, data } = await getAssetData(imageId);

    const newDownloads = Math.max((data.downloads ?? 0) + 1, 0);

    const score = calculateScore({
      ...data,
      downloads: newDownloads,
    });

    await updateDoc(ref, {
      downloads: increment(1),
      score,
      updatedAt: Timestamp.now(),
    });

  } catch (error) {
    console.error("incrementDownload error:", error);
  }
};