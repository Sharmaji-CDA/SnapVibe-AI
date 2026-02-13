export type ImageItem = {
  id: string;
  title: string;
  imageUrl: string;
  creatorId: string;
  creatorName: string;
  creatorAvatar?: string;
  
  category?: string;
  source: string;
  prompt?: string;
  likes: number;
  downloads: number;
  likedBy?: string[];
  price?: number | null;
};
