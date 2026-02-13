import {
  collection,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./firebase";

export type Plan = {
  id: string;
  price: number;
  features: string[];
};

type AccountType = "user" | "creator";

const COLLECTION_MAP: Record<AccountType, string> = {
  user: "plan_user",
  creator: "plan_creator",
};

export const fetchPlansByAccountType = async (
  accountType: AccountType
): Promise<Plan[]> => {
  try {
    const collectionName = COLLECTION_MAP[accountType];

    const q = query(
      collection(db, collectionName),
      orderBy("price", "asc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        price:
          typeof data.price === "number"
            ? data.price
            : 0,
        features:
          Array.isArray(data.features)
            ? data.features
            : [],
      };
    });
  } catch (error) {
    console.error("Failed to fetch plans:", error);
    return [];
  }
};
