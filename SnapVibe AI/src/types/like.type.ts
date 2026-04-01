import { Timestamp } from "firebase/firestore";

export interface Like {
  id: string;

  // Relations
  userId: string;
  imageId: string;

  // Optional (future use)
  creatorId: string;

  // System
  createdAt: Timestamp;
  updatedAt: Timestamp;
}