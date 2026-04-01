import type { Timestamp } from "firebase/firestore";

export interface Feedback {
    userId: string,
  email: string,
  message: string,
  type: "bug" | "feature" | "general",
  status: "new",
  createdAt: Timestamp;
}