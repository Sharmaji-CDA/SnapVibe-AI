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

  subscriptionStatus?: "active" | "expired" | "cancelled";
  subscriptionStart?: any;
  subscriptionEnd?: any;
  billingCycle?: "monthly";

  aiUsed: number;
  uploadsToday: number;
  totalUploads: number;
  createdAt: any;
  lastAIReset?: any;

  displayName?: string;
  bio?: string;
  photoURL?: string;
  updatedAt?: any;
};

/* ---------------- ENSURE USER DOC ---------------- */

export const ensureUserDoc = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      accountType: "user",
      plan: "basic",

      subscriptionStatus: "expired",
      billingCycle: "monthly",

      aiUsed: 0,
      uploadsToday: 0,
      totalUploads: 0,
      lastAIReset: new Date(),

      displayName: "",
      bio: "",
      photoURL: "",

      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }
};

/* ---------------- GET PROFILE ---------------- */

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  const snap = await getDoc(doc(db, "users", uid));
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

/* ---------------- UPDATE PROFILE DATA ---------------- */

export const updateUserProfileData = async (
  uid: string,
  data: {
    displayName?: string;
    bio?: string;
    photoURL?: string;
  }
) => {
  await updateDoc(doc(db, "users", uid), {
    ...data,
    updatedAt: serverTimestamp(),
  });
};

/* ---------------- UPDATE PLAN ONLY ---------------- */

export const updatePlan = async (
  uid: string,
  accountType: AccountType,
  plan: string
) => {
  await updateDoc(doc(db, "users", uid), {
    accountType,
    plan,
    updatedAt: serverTimestamp(),
  });
};

/* ---------------- UPDATE SUBSCRIPTION (SAFE SWITCH) ---------------- */

export const updateUserSubscription = async (
  uid: string,
  accountType: AccountType,
  plan: string
) => {
  await updateDoc(doc(db, "users", uid), {
    accountType,
    plan,
    updatedAt: serverTimestamp(),
  });
};

/* ---------------- ACTIVATE PAID SUBSCRIPTION ---------------- */

export const activateSubscription = async (
  uid: string,
  accountType: AccountType,
  plan: string
) => {
  const oneMonth = 30 * 24 * 60 * 60 * 1000;

  await updateDoc(doc(db, "users", uid), {
    accountType,
    plan,
    subscriptionStatus: "active",
    subscriptionStart: serverTimestamp(),
    subscriptionEnd: new Date(Date.now() + oneMonth),
    billingCycle: "monthly",
    updatedAt: serverTimestamp(),
  });
};

/* ---------------- FORCE DOWNGRADE (EXPIRE) ---------------- */

export const expireSubscription = async (uid: string) => {
  await updateDoc(doc(db, "users", uid), {
    subscriptionStatus: "expired",
    plan: "basic",
    accountType: "user",
    updatedAt: serverTimestamp(),
  });
};
