import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase/firebase";

export const submitFeedback = async ({
  userId,
  email,
  message,
  type,
}: {
  userId: string;
  email: string;
  message: string;
  type: "bug" | "feature" | "general";
}) => {
  if (!userId) throw new Error("User not authenticated");
  if (!message.trim()) throw new Error("Message required");

  return await addDoc(collection(db, "feedbacks"), {
    userId,
    email: email?.toLowerCase() || "",
    message: message.trim(),
    type,
    status: "new",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
    userAgent: navigator.userAgent,
  });
};