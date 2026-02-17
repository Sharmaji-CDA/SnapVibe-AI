import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  getDocs,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";

export type PaymentStatus = "pending" | "confirmed";

/* -------------------------------------------------- */
/* CREATE SALE */
/* -------------------------------------------------- */
export async function createSale(data: {
  imageId: string;
  buyerId: string;
  creatorId: string;
  price: number;
  commissionPercent: number;
}) {
  // 🔒 Prevent duplicate purchase
  const existing = query(
    collection(db, "sales"),
    where("imageId", "==", data.imageId),
    where("buyerId", "==", data.buyerId),
    where("paymentStatus", "==", "confirmed"),
    limit(1)
  );

  const snapshot = await getDocs(existing);

  if (!snapshot.empty) {
    throw new Error("You already purchased this image.");
  }

  const platformShare = (data.price * data.commissionPercent) / 100;
  const creatorShare = data.price - platformShare;

  const docRef = await addDoc(collection(db, "sales"), {
    ...data,
    platformShare,
    creatorShare,
    paymentMethod: "upi",
    paymentStatus: "pending",
    createdAt: serverTimestamp(),
  });

  return docRef.id; // 🔥 return sale ID (important)
}

/* -------------------------------------------------- */
/* CONFIRM SALE (ADMIN USE) */
/* -------------------------------------------------- */
export async function confirmSale(saleId: string) {
  await updateDoc(doc(db, "sales", saleId), {
    paymentStatus: "confirmed",
  });
}

/* -------------------------------------------------- */
/* CHECK IF USER PURCHASED */
/* -------------------------------------------------- */
export async function hasUserPurchasedImage(
  buyerId: string,
  imageId: string
) {
  const q = query(
    collection(db, "sales"),
    where("buyerId", "==", buyerId),
    where("imageId", "==", imageId),
    where("paymentStatus", "==", "confirmed"),
    limit(1)
  );

  const snapshot = await getDocs(q);
  return !snapshot.empty;
}

/* -------------------------------------------------- */
/* CREATOR SALES */
/* -------------------------------------------------- */
export async function getSalesByCreator(creatorId: string) {
  const q = query(
    collection(db, "sales"),
    where("creatorId", "==", creatorId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/* -------------------------------------------------- */
/* BUYER PURCHASE HISTORY */
/* -------------------------------------------------- */
export async function getSalesByBuyer(buyerId: string) {
  const q = query(
    collection(db, "sales"),
    where("buyerId", "==", buyerId)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}
