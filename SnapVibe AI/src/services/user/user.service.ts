import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import type { UserProfile } from "../../types/user.type";
import type { SubscriptionPlan } from "../../types/subscription.type";

/* ================= HELPER ================= */

const getUserRefSafe = async (uid: string) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    throw new Error("User not found");
  }

  return ref;
};

/* ================= ENSURE USER ================= */

export const ensureUserDoc = async (uid: string, email: string) => {
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      const username = email ? email.split("@")[0] : "user";

      await setDoc(userRef, {
        uid,
        email,

        displayName: username,
        username,
        photoPath: "",
        bio: "",
        emailVerified: false,

        role: "user",
        subscription: "free",

        // ✅ FIXED USAGE
        aiImageUsed: 0,
        aiTextUsed: 0,
        followersCount: 0,
        followingCount: 0,

        uploadsToday: 0,
        totalUploads: 0,
        downloadsCount: 0,

        isActive: true,
        isBanned: false,
        warningCount: 0,

        // ✅ PLAN SYSTEM
        trialEndsAt: null,
        planStartedAt: null,

        // ✅ RESET TRACKING
        lastAIReset: serverTimestamp(),

        lastLogin: serverTimestamp(),

        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/* ================= GET USER ================= */

export const getUserProfile = async (
  uid: string
): Promise<UserProfile | null> => {
  try {
    const snap = await getDoc(doc(db, "users", uid));

    if (!snap.exists()) return null;

    const data = snap.data() as UserProfile;

    // 🔥 MONTHLY RESET LOGIC
    if (data.lastAIReset && "toDate" in data.lastAIReset) {
      const lastReset = data.lastAIReset.toDate();
      const now = new Date();

      const isNewMonth =
        now.getMonth() !== lastReset.getMonth() ||
        now.getFullYear() !== lastReset.getFullYear();

      if (isNewMonth) {
        await updateDoc(doc(db, "users", uid), {
          aiTextUsed: 0,
          lastAIReset: serverTimestamp(),
        });

        data.aiTextUsed = 0;
      }
    }

    return {
      ...data,
      followersCount: data.followersCount ?? 0,
      followingCount: data.followingCount ?? 0,
      downloadsCount: data.downloadsCount ?? 0,
      aiTextUsed: data.aiTextUsed ?? 0,
      aiImageUsed: data.aiImageUsed ?? 0,
    };
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/* ================= UPDATE PROFILE ================= */

export const updateUserProfileData = async (
  uid: string,
  data: {
    displayName?: string;
    username?: string;
    bio?: string;
    photoPath?: string;
  }
) => {
  try {
    const ref = await getUserRefSafe(uid);

    await updateDoc(ref, {
      ...(data || {}),
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/* ================= UPDATE SUBSCRIPTION ================= */

export const updateUserSubscription = async (
  uid: string,
  plan: SubscriptionPlan
) => {
  try {
    const ref = await getUserRefSafe(uid);

    const isTrial = plan !== "free";

    await updateDoc(ref, {
      subscription: plan,

      // 🎁 TRIAL LOGIC
      trialEndsAt: isTrial
        ? Timestamp.fromDate(
            new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
          )
        : null,

      planStartedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/* ================= UPDATE LAST LOGIN ================= */

export const updateLastLogin = async (uid: string) => {
  try {
    const ref = await getUserRefSafe(uid);

    await updateDoc(ref, {
      lastLogin: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};

/* ================= UPGRADE TO CREATOR ================= */

export const upgradeToCreator = async (uid: string) => {
  try {
    const ref = await getUserRefSafe(uid);

    await updateDoc(ref, {
      role: "creator",
      subscription: "pro",
      planStartedAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
};