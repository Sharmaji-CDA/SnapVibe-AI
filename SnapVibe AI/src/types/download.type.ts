import { Timestamp } from "firebase/firestore";

export interface Download {
  id: string;

  // Relations
  userId: string;
  imageId: string;

  // Optional future use
  creatorId: string;

  // Analytics
  createdAt: Timestamp;
  updatedAt: Timestamp;
}