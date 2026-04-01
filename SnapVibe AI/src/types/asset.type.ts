import { Timestamp } from "firebase/firestore";

export type ImageStatus = "pending" | "approved" | "rejected";

export interface ImageItem {
  id: string;

  title: string;

  // Storage
  imagePath: string;
  thumbnailPath?: string;

  // Creator
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;

  // Content
  category?: string;
  source?: string;
  prompt?: string;
  tags?: string[];

  // Engagement
  likes: number;
  downloads: number;
  views: number;

  // Trending
  score: number;

  // Monetization
  price?: number | null;

  // Moderation
  status: ImageStatus;
  isFeatured?: boolean;
  isDeleted?: boolean;
  isPremium?: boolean;

  // System
  createdAt: Timestamp | null;
  updatedAt?: Timestamp | null;
}