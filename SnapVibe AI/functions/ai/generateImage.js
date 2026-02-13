"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = void 0;
const admin = __importStar(require("firebase-admin"));
const https_1 = require("firebase-functions/v2/https");
const params_1 = require("firebase-functions/params");
const openai_1 = __importDefault(require("openai"));
admin.initializeApp();
/* ---------------- SECRET ---------------- */
const OPENAI_API_KEY = (0, params_1.defineSecret)("WORD_KEY123OPEN_YES");
/* ---------------- FUNCTION ---------------- */
exports.generateImage = (0, https_1.onRequest)({ secrets: [OPENAI_API_KEY] }, async (req, res) => {
    try {
        const { prompt, uid } = req.body;
        if (!prompt || !uid) {
            res.status(400).json({ error: "Missing prompt or uid" });
            return;
        }
        /* -------- USER CHECK -------- */
        const userRef = admin.firestore().doc(`users/${uid}`);
        const userSnap = await userRef.get();
        if (!userSnap.exists) {
            res.status(403).json({ error: "User not found" });
            return;
        }
        const user = userSnap.data();
        const plan = user.plan || "basic";
        const aiUsed = user.aiUsed || 0;
        /* -------- PLAN LIMIT -------- */
        if (plan === "basic" && aiUsed >= 2) {
            res.status(403).json({
                error: "Free AI limit reached. Upgrade required.",
            });
            return;
        }
        /* -------- OPENAI CLIENT -------- */
        const openai = new openai_1.default({
            apiKey: OPENAI_API_KEY.value(),
        });
        /* -------- GENERATE IMAGE -------- */
        const result = await openai.images.generate({
            model: "gpt-image-1",
            prompt,
            size: "1024x1024",
        });
        const imageUrl = result.data && result.data.length > 0
            ? result.data[0].url
            : null;
        if (!imageUrl) {
            res.status(500).json({ error: "Image generation failed" });
            return;
        }
        /* -------- SAVE IMAGE -------- */
        await admin.firestore().collection("images").add({
            imageUrl,
            title: prompt,
            prompt,
            source: "ai",
            createdBy: "ai",
            creatorName: "SnapVibe AI",
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            likes: 0,
            downloads: 0,
        });
        /* -------- UPDATE USAGE -------- */
        await userRef.update({
            aiUsed: aiUsed + 1,
        });
        res.json({ imageUrl });
        return;
    }
    catch (err) {
        console.error("AI ERROR:", err);
        res.status(500).json({ error: "AI generation failed" });
        return;
    }
});
//# sourceMappingURL=generateImage.js.map