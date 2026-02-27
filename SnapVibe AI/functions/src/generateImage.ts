import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import fetch from "node-fetch";

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

      // 🔐 USER CHECK
      const userRef = admin.firestore().doc(`users/${uid}`);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        res.status(403).json({ error: "User not found" });
        return;
      }

      const user = userSnap.data()!;
      const plan = user.plan || "basic";
      const aiUsed = user.aiUsed || 0;

      // 🎯 FREE LIMIT
      if (plan === "basic" && aiUsed >= 3) {
        res.status(403).json({
          error: "Free AI limit reached. Upgrade required.",
        });
        return;
      }

      // 🤖 CALL HUGGING FACE
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
            options: { wait_for_model: true },
          }),
        }
      );

      const contentType = hfResponse.headers.get("content-type") || "";

      if (!hfResponse.ok || contentType.includes("application/json")) {
        const errorJson = await hfResponse.json();
        console.error("HF ERROR:", errorJson);
        res.status(500).json({
          error: "AI model is warming up. Try again.",
          details: errorJson,
        });
        return;
      }

      const imageBuffer = Buffer.from(await hfResponse.arrayBuffer());

      // 🔥 Convert to Base64 for frontend preview
      const base64Image = imageBuffer.toString("base64");
      const imageDataUrl = `data:image/png;base64,${base64Image}`;

      // 🔢 Update usage
      await userRef.update({
        aiUsed: aiUsed + 1,
      });

      // ✅ Send preview image
      res.json({
        imageUrl: imageDataUrl,
      });

    } catch (err) {
      console.error("AI ERROR:", err);
      res.status(500).json({ error: "AI generation failed" });
    }
  }
);