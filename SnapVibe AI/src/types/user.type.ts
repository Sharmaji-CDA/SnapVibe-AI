import type { Timestamp } from "firebase/firestore";
import type { SubscriptionPlan } from "./subscription.type";

/* ================= ROLE ================= */

export type AccountType = "user" | "creator" | "admin";

/* ================= USER ================= */

export interface UserProfile {

  /* ---------- Identity ---------- */
  uid: string;
  email: string;
  displayName: string;
  username?: string;        // ✅ added
  photoPath?: string;
  bio?: string;
  emailVerified?: boolean;  // ✅ optional but useful

  /* ---------- Role ---------- */
  role: AccountType;

  subscription: SubscriptionPlan

  /* ---------- Usage ---------- */
  followersCount?: number;
  followingCount?: number;
  aiImageUsed?: number;
  aiTextUsed?: number;
  uploadsToday?: number;
  totalUploads?: number;
  downloadsCount?: number;

  /* ---------- Moderation ---------- */
  isActive: boolean;
  isBanned: boolean;
  warningCount: number;

  trialEndsAt: Timestamp | null;
  planStartedAt: Timestamp | null;

  /* ---------- System ---------- */
  createdAt: Timestamp;
  updatedAt?: Timestamp;
  lastLogin?: Timestamp;
  lastAIReset?: Timestamp;
}