import * as admin from "firebase-admin";
import { onRequest } from "firebase-functions/v2/https";
import { defineSecret } from "firebase-functions/params";
import { createCanvas, loadImage } from "canvas";
import fetch from "node-fetch"; // ✅ REQUIRED

admin.initializeApp();

/* ---------------- SECRETS ---------------- */
const HF_API_KEY = defineSecret("HUGGINGFACE_API_KEY");
const OPENROUTER_API_KEY = defineSecret("OPENROUTER_API_KEY");

/* ---------------- WATERMARK ---------------- */
const addWatermarkBuffer = async (buffer: Buffer): Promise<Buffer> => {
  try {
    const img = await loadImage(buffer);

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext("2d");

    ctx.drawImage(img, 0, 0);

    const fontSize = Math.floor(img.width / 18);
    ctx.font = `${fontSize}px sans-serif`;

    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.textAlign = "right";

    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 4;

    ctx.fillText(
      "SnapVibe AI",
      img.width - 20,
      img.height - 20
    );

    return canvas.toBuffer("image/png"); // ✅ consistent format
  } catch (err) {
    console.error("❌ Watermark failed:", err);
    return buffer; // fallback
  }
};

/* ---------------- TYPE DETECTION ---------------- */
const detectType = (prompt: string): string => {
  const p = prompt.toLowerCase();

  if (p.includes("image") || p.includes("photo") || p.includes("draw")) return "image";
  if (p.includes("code") || p.includes("javascript") || p.includes("react")) return "code";
  if (p.includes("translate")) return "translate";
  if (p.includes("explain")) return "explain";

  return "text";
};

/* ---------------- FETCH WITH TIMEOUT ---------------- */
const fetchWithTimeout = async (url: string, options: any, timeout = 60000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  try {
    return await fetch(url, { ...options, signal: controller.signal });
  } finally {
    clearTimeout(id);
  }
};

/* ---------------- RETRY ---------------- */
const callHFWithRetry = async (url: string, options: any, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    const res = await fetchWithTimeout(url, options);

    const contentType = res.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      const data = await res.json() as any;

      if (data?.error?.toLowerCase()?.includes("loading")) {
        console.log(`Model loading... retry ${i + 1}`);
        await new Promise((r) => setTimeout(r, 3000));
        continue;
      }

      return { res, data };
    }

    return { res };
  }

  throw new Error("Model failed after retries");
};

/* ================= MAIN FUNCTION ================= */

export const generateAI = onRequest(
  {
    secrets: [HF_API_KEY, OPENROUTER_API_KEY],
    cors: true,
    timeoutSeconds: 300,
  },
  async (req, res): Promise<void> => {
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

      const type = detectType(prompt);
      const isImage = type === "image";

      /* ---------------- USER ---------------- */
      const userRef = admin.firestore().doc(`users/${uid}`);
      const userSnap = await userRef.get();

      if (!userSnap.exists) {
        res.status(403).json({ error: "User not found" });
        return;
      }

      const user = userSnap.data()!;
      const subscription = user.subscription || "free";
      const role = user.role || "user";

      const imageUsed = user.aiImageUsed || 0;
      const textUsed = user.aiTextUsed || 0;

      /* ---------------- LIMITS ---------------- */
      if (subscription === "free" && isImage && imageUsed >= 15) {
        res.status(403).json({ error: "Free image limit reached" });
        return;
      }

      /* ================= IMAGE ================= */
      if (isImage) {
        const { res: hfResponse } = await callHFWithRetry(
          "https://router.huggingface.co/hf-inference/models/stabilityai/stable-diffusion-xl-base-1.0",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${HF_API_KEY.value()}`,
              "Content-Type": "application/json",
              Accept: "image/png",
            },
            body: JSON.stringify({ inputs: prompt }),
          }
        );

        const contentType = hfResponse.headers.get("content-type") || "";

        if (!contentType.startsWith("image")) {
          throw new Error("Invalid image response");
        }

        const arrayBuffer = await hfResponse.arrayBuffer();
        let imageBuffer: Buffer = Buffer.from(new Uint8Array(arrayBuffer));

        if (!imageBuffer || imageBuffer.length === 0) {
          throw new Error("Invalid image buffer");
        }

        /* 🔥 WATERMARK LOGIC */
        const isPaidUser =
          subscription === "standard" || subscription === "premium";

        const shouldWatermark =
          role !== "creator" && !isPaidUser;

        if (shouldWatermark) {
          imageBuffer = await addWatermarkBuffer(imageBuffer);
        }

        /* ---------------- STORAGE ---------------- */
        const bucket = admin.storage().bucket();
        const fileName = `ai/${uid}/${Date.now()}.png`;

        await bucket.file(fileName).save(imageBuffer, {
          metadata: {
            contentType: "image/png",
            cacheControl: "public, max-age=31536000",
          },
        });

        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(fileName)}?alt=media`;

        /* ---------------- FIRESTORE ---------------- */
        await admin.firestore().collection("images").add({
          title: prompt, // or generate better title
          imagePath: imageUrl, // ✅ IMPORTANT FIX
          creatorId: uid,
          creatorName: user.name || "User",   // ✅ ADD
          creatorAvatar: user.avatar || "",   // ✅ ADD

          prompt,
          hasWatermark: shouldWatermark,
          isPremium: role === "creator" ? false : subscription !== "free",
          downloads: 0,
          likes: 0,
          views: 0,
          score: 0,
          price: null,
          status: "approved", // ✅ CRITICAL FIX
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        await userRef.update({
          aiImageUsed: imageUsed + 1,
        });

        res.json({ type: "image", imageUrl });
        return;
      }

      /* ================= TEXT ================= */
      const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY.value()}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "meta-llama/llama-3-8b-instruct",
          messages: [{ role: "user", content: prompt }],
        }),
      });

      const data = await aiRes.json() as any;

      if (!aiRes.ok) {
        throw new Error(data?.error?.message || "AI failed");
      }

      const text =
        data?.choices?.[0]?.message?.content?.trim() ||
        "No response";

      await admin.firestore().collection("ai_generations").add({
        prompt,
        output: text,
        uid,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      await userRef.update({
        aiTextUsed: textUsed + 1,
      });

      res.json({ type: "text", text });

    } catch (err: any) {
      console.error("AI ERROR:", err);

      res.status(500).json({
        error: err.message || "AI generation failed",
      });
    }
  }
);