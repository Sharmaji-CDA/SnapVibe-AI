import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export type AccountType = "user" | "creator";

export type UserPlan = "basic" | "standard" | "premium";
export type CreatorPlan = "go" | "pro";

export type SubscriptionPlan =
  | { accountType: "user"; plan: UserPlan }
  | { accountType: "creator"; plan: CreatorPlan };

export type UserProfile = {
  accountType: AccountType;
  plan: string;
  aiUsed: number;
  uploadsToday: number;
  totalUploads: number;
  createdAt: any;
};

/**
 * Ensure Firestore user doc exists
 */
export const ensureUserDoc = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      accountType: "user",
      plan: "basic",
      aiUsed: 0,
      uploadsToday: 0,
      totalUploads: 0,
      createdAt: serverTimestamp(),
    });
  }
};

/**
 * Get user profile
 */
export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

export const updatePlan = async (
  uid: string,
  accountType: "user" | "creator",
  plan: string
) => {
  await updateDoc(doc(db, "users", uid), {
    accountType,
    plan,
  });
};

/**
 * Update role + plan
 */
export const updateUserSubscription = async (
  uid: string,
  accountType: AccountType,
  plan: string
) => {
  await updateDoc(doc(db, "users", uid), {
    accountType,
    plan,
  });
};
