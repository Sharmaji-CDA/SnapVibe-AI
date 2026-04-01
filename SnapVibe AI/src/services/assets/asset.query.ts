import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  doc,
  getDoc,
  Query,
  QueryDocumentSnapshot,
  type DocumentData,
} from "firebase/firestore";

import { db } from "../../firebase/firebase";
import type { ImageItem } from "../../types/asset.type";

const PAGE_SIZE = 20;

/* ================= MAP ================= */

const mapDocToAsset = (
  snap: QueryDocumentSnapshot<DocumentData>
): ImageItem => {
  const data = snap.data();

  return {
    id: snap.id,

    title: data.title ?? "",
    imagePath: data.imagePath ?? "/fallback.png",

    creatorId: data.creatorId ?? "",
    creatorName: data.creatorName ?? "Unknown Creator",
    creatorAvatar: data.creatorAvatar ?? "",

    category: data.category ?? "",
    source: data.source ?? "",
    prompt: data.prompt ?? "",
    tags: Array.isArray(data.tags) ? data.tags : [],

    likes: data.likes ?? 0,
    downloads: data.downloads ?? 0,
    views: data.views ?? 0,
    score: data.score ?? 0,

    price: data.price ?? null,

    status: data.status ?? "approved",
    isFeatured: data.isFeatured ?? false,

    createdAt: data.createdAt || null,
    updatedAt: data.updatedAt || null,
  };
};

/* ================= GET LIST ================= */

export async function getAssets(
  mode: "latest" | "trending" | "downloads",
  lastDoc?: QueryDocumentSnapshot<DocumentData>
): Promise<{
  data: ImageItem[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> {
  try {
    let baseQuery: Query<DocumentData>;

    if (mode === "trending") {
      baseQuery = query(
        collection(db, "images"),
        where("status", "==", "approved"),
        orderBy("score", "desc"),
        limit(PAGE_SIZE)
      );
    } else if (mode === "downloads") {
      baseQuery = query(
        collection(db, "images"),
        where("status", "==", "approved"),
        orderBy("downloads", "desc"),
        limit(PAGE_SIZE)
      );
    } else {
      baseQuery = query(
        collection(db, "images"),
        where("status", "==", "approved"),
        orderBy("createdAt", "desc"),
        limit(PAGE_SIZE)
      );
    }

    const finalQuery = lastDoc
      ? query(baseQuery, startAfter(lastDoc))
      : baseQuery;

    const snapshot = await getDocs(finalQuery);

    return {
      data: snapshot.docs.map(mapDocToAsset),
      lastDoc: snapshot.docs.length
        ? snapshot.docs[snapshot.docs.length - 1]
        : null,
    };

  } catch (error) {
    console.error("getAssets error:", error);
    return { data: [], lastDoc: null };
  }
}

/* ================= GET BY CREATOR ================= */

export async function getAssetsByCreator(
  creatorId: string
): Promise<ImageItem[]> {
  try {
    const q = query(
      collection(db, "images"),
      where("creatorId", "==", creatorId),
      where("status", "==", "approved"),
      orderBy("createdAt", "desc"),
      limit(PAGE_SIZE)
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(mapDocToAsset);

  } catch (error) {
    console.error("getAssetsByCreator error:", error);
    return [];
  }
}

/* ================= GET SINGLE ================= */

export async function getAssetById(
  imageId: string
): Promise<ImageItem | null> {
  try {
    const ref = doc(db, "images", imageId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    return mapDocToAsset(
      snap as unknown as QueryDocumentSnapshot<DocumentData>
    );

  } catch (error) {
    console.error("getAssetById error:", error);
    return null;
  }
}