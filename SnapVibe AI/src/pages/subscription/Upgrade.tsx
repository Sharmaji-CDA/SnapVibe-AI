import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../services/firebase";
import { useState } from "react";

export default function Upgrade() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  const plan = params.get("plan");
  const type = params.get("type");
  const imageId = params.get("imageId");

  const UPI_ID = "yourupi@upi";
  const WHATSAPP = "91XXXXXXXXXX";

  if (!user) {
    navigate("/login");
    return null;
  }

  const whatsappMessage = encodeURIComponent(
    `Hi, I have paid for ${type} ${plan} plan.\nEmail: ${user.email}\nUID: ${user.uid}`
  );

  const handlePaymentConfirmation = async () => {
    try {
      setSubmitting(true);

      await addDoc(collection(db, "upgrade_requests"), {
        uid: user.uid,
        email: user.email,
        plan: plan || null,
        imageId: imageId || null,
        requestType: imageId ? "image_purchase" : "subscription",
        accountType: type,
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Payment request submitted. We will activate shortly.");
      navigate("/");

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-6">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-lg space-y-6">

        <h1 className="text-2xl font-bold text-center">
          Upgrade to {plan}
        </h1>

        <h1 className="text-2xl font-bold text-center">
          {imageId ? "Buy Premium Image" : `Upgrade to ${plan}`}
        </h1>

        <div className="text-center">
          <p className="text-sm text-gray-500">
            Pay via UPI
          </p>
          <p className="font-semibold text-lg mt-2">
            {UPI_ID}
          </p>
        </div>

        <a
          href={`https://wa.me/${WHATSAPP}?text=${whatsappMessage}`}
          target="_blank"
          className="block w-full text-center bg-green-500 text-white py-3 rounded-xl"
        >
          Confirm on WhatsApp
        </a>

        <button
          onClick={handlePaymentConfirmation}
          disabled={submitting}
          className="w-full border py-3 rounded-xl"
        >
          {submitting ? "Submitting..." : "I’ve Paid – Submit Request"}
        </button>

        <p className="text-xs text-gray-400 text-center">
          Activation within 5–10 minutes after verification.
        </p>
      </div>
    </div>
  );
}