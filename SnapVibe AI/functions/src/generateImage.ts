import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import fetch from "node-fetch";
import { v4 as uuid } from "uuid";

admin.initializeApp();

const HF_API_KEY = defineSecret("HUGGINGFACE_API_KEY");

export const generateImageHF = onRequest(
  {
    secrets: [HF_API_KEY],
    cors: true,
    timeoutSeconds: 120,
  },
  async (req, res) => {
    try {
      if (req.method !== "POST") {
        res.status(405).json({ error: "Only POST allowed" });
        return;
      }

      const { prompt, uid } = req.body || {};

      if (!prompt || !uid) {
        res.status(400).json({ error: "Missing prompt or uid" });
        return;
      }

      /* 🔐 USER CHECK */
      const userRef = admin.firestore().doc(`users/${uid}`);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        res.status(403).json({ error: "User not found" });
        return;
      }

      const user = userSnap.data()!;
      const plan = user.plan || "basic";
      const aiUsed = user.aiUsed || 0;

      /* 🎯 FREE LIMIT */
      if (plan === "basic" && aiUsed >= 3) {
        res.status(403).json({
          error: "Free AI limit reached. Upgrade required.",
        });
        return;
      }

      /* 🤖 CALL HUGGING FACE */
      const hfResponse = await fetch(
        "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${HF_API_KEY.value()}`,
            "Content-Type": "application/json",
            Accept: "image/png",
          },
          body: JSON.stringify({
            inputs: prompt,
            options: {
              wait_for_model: true, // 🔥 IMPORTANT
            },
          }),
        }
      );

      /* 🧠 HANDLE JSON ERRORS */
      const contentType = hfResponse.headers.get("content-type") || "";

      if (!hfResponse.ok || contentType.includes("application/json")) {
        const errorJson = await hfResponse.json();
        console.error("HF ERROR:", errorJson);
        res.status(500).json({ error: "AI model is warming up. Try again in a few seconds.", details: errorJson, });
        return;
      }

      const imageBuffer = Buffer.from(await hfResponse.arrayBuffer());

      /* ☁️ UPLOAD TO STORAGE */
      const fileId = `ai/${uuid()}.png`;
      const bucket = admin.storage().bucket();
      const file = bucket.file(fileId);

      await file.save(imageBuffer, {
        contentType: "image/png",
        public: true,
      });

      const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileId}`;

      /* 🧾 SAVE TO FIRESTORE */
      await admin.firestore().collection("images").add({
        imageUrl,
        title: prompt,
        prompt,
        source: "ai",
        createdBy: "ai",
        creatorName: "SnapVibe AI",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        likedBy: [],
        feature: false,
        downloads: 0,
        price: 0,
      });

      /* 🔢 UPDATE USAGE */
      await userRef.update({
        aiUsed: aiUsed + 1,
      });

      res.json({ imageUrl });
      return;

    } catch (err) {
      console.error("AI ERROR:", err);
      res.status(500).json({ error: "AI generation failed" });
      return;
    }
  }
);