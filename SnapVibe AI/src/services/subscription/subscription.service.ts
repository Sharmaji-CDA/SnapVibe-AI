import {
  collection,
  getDocs,
  query,
  orderBy,
  where,
  doc,
  getDoc,
  addDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import type { SubscriptionPlan } from "../../types/subscription.type";

/* ================= TYPES ================= */

export type AccountType = "user" | "creator";

export interface Plan {
  id: string;
  name: SubscriptionPlan;
  accountType: AccountType;
  price: number;
  features: string[];
  isActive: boolean;

  // only for creator
  revenuePercentage?: number;
}

/* ================= FETCH PLANS ================= */

export const fetchPlansByAccountType = async (
  accountType: AccountType
): Promise<Plan[]> => {
  try {
    const q = query(
      collection(db, "plans"),
      where("accountType", "==", accountType),
      where("isActive", "==", true),
      orderBy("price", "asc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((docItem) => {
      const data = docItem.data();

      return {
        id: docItem.id,
        name: data.name,
        accountType: data.accountType,
        price: typeof data.price === "number" ? data.price : 0,
        features: Array.isArray(data.features) ? data.features : [],
        isActive: data.isActive ?? false,

        // ✅ only for creator plans
        revenuePercentage:
          data.accountType === "creator"
            ? data.revenuePercentage ?? 0
            : undefined,
      };
    });

  } catch (error) {
    console.error("Failed to fetch plans:", error);
    return [];
  }
};

/* ================= GET CURRENT SUBSCRIPTION ================= */

export const getUserSubscription = async (uid: string) => {
  try {
    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) return null;

    const data = snap.data();

    return {
      plan: data.subscription || "free",
      trialEndsAt: data.trialEndsAt || null,
      planStartedAt: data.planStartedAt || null,
    };

  } catch (error) {
    console.error("Error fetching subscription:", error);
    return null;
  }
};

/* ================= CREATE SUBSCRIPTION ================= */

export const createSubscriptionRecord = async (
  uid: string,
  plan: SubscriptionPlan,
  price: number,
  accountType: AccountType
) => {
  try {
    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 30);

    await addDoc(collection(db, "subscriptions"), {
      userId: uid,
      accountType,

      plan,
      billingCycle: "monthly",

      status: "active",
      isActive: true,

      startDate: Timestamp.fromDate(start),
      endDate: Timestamp.fromDate(end),

      isTrial: false,

      amount: price,
      currency: "INR",

      createdAt: serverTimestamp(),
    });

  } catch (error) {
    console.error("Failed to create subscription:", error);
  }
};

/* ================= UPGRADE PLAN ================= */

export const upgradeUserPlan = async (
  uid: string,
  plan: SubscriptionPlan,
  price: number
) => {
  try {
    if (!uid) throw new Error("Invalid user");
    if (!price || price < 0) throw new Error("Invalid price");

    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      throw new Error("User not found");
    }

    const userData = snap.data();

    const isPaidPlan = plan !== "free";

    // 🔥 update user
    await setDoc(
      userRef,
      {
        subscription: plan,
        planStartedAt: serverTimestamp(),
        updatedAt: serverTimestamp(),

        trialEndsAt: isPaidPlan
          ? Timestamp.fromDate(
              new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
            )
          : null,
      },
      { merge: true }
    );

    // ✅ only create subscription for paid plans
    if (isPaidPlan) {
      await createSubscriptionRecord(
        uid,
        plan,
        price,
        userData.role === "creator" ? "creator" : "user"
      );
    }

    return true;

  } catch (error: any) {
    console.error("Upgrade failed:", error);
    throw new Error(error.message);
  }
};

/* ================= CHECK TRIAL ================= */

export const isTrialActive = (trialEndsAt: any) => {
  try {
    if (!trialEndsAt || typeof trialEndsAt.toDate !== "function") return false;

    return new Date() < trialEndsAt.toDate();

  } catch {
    return false;
  }
};