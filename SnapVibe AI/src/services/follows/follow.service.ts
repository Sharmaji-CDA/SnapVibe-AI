import {
  deleteDoc,
  doc,
  updateDoc,
  increment,
  serverTimestamp,
  getDoc,
  setDoc,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";

/* ================= CHECK ================= */

export const isFollowing = async (
  userId: string,
  creatorId: string
) => {
  const followRef = doc(db, "follows", `${userId}_${creatorId}`);
  const snap = await getDoc(followRef);
  return snap.exists();
};

/* ================= TOGGLE ================= */

export const toggleFollow = async (
  userId: string,
  creatorId: string
) => {
  try {
    // ❌ prevent self follow
    if (userId === creatorId) {
      throw new Error("Cannot follow yourself");
    }

    const followId = `${userId}_${creatorId}`;
    const followRef = doc(db, "follows", followId);

    const existing = await getDoc(followRef);

    // ✅ creator check
    const creatorRef = doc(db, "users", creatorId);
    const creatorSnap = await getDoc(creatorRef);

    if (!creatorSnap.exists()) {
      throw new Error("Creator not found");
    }

    /* ================= UNFOLLOW ================= */
    if (existing.exists()) {
      await deleteDoc(followRef);

      // decrease creator followers
      await updateDoc(creatorRef, {
        followersCount: increment(-1),
      });

      // decrease user following
      await updateDoc(doc(db, "users", userId), {
        followingCount: increment(-1),
      });

      return { following: false };
    }

    /* ================= FOLLOW ================= */
    await setDoc(followRef, {
      userId,
      creatorId,
      createdAt: serverTimestamp(),
    });

    // increase creator followers
    await updateDoc(creatorRef, {
      followersCount: increment(1),
    });

    // increase user following
    await updateDoc(doc(db, "users", userId), {
      followingCount: increment(1),
    });

    return { following: true };

  } catch (error: any) {
    console.error("toggleFollow error:", error);
    throw new Error(error.message);
  }
};