import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";

// Pages
import Wallpapers from "../pages/wallpapers/Wallpapers";
import Images from "../pages/images/Images";
import Subscription from "../pages/subscription/Subscription";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import CreatorDashboard from "../pages/profile/CreatorDashboard";
import UserProfile from "../pages/profile/UserProfile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivacyPolicy from "../pages/privacy-policy/PrivacyPolicy";
import Support from "../pages/support/Support";
import TermsAndConditions from "../pages/terms-condition/TermsAndCondition";
import RefundPolicy from "../pages/refund-policy/RefundPolicy";
import AIGenerate from "../pages/ai/AIGenerate";
import CreatorRoute from "../routes/CreatorRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";
import Template from "../pages/template/Template";

const Home = lazy(() => import("../pages/home/Home"));
// const Gallery = lazy(() => import("../pages/gallery/Gallery"));
const Upload = lazy(() => import("../pages/upload/Upload"));
const Upgrade = lazy(() => import("../pages/subscription/Payment"));

export default function AppRoutes() {
  return (
    <>
      <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/gallery" element={<Gallery />} /> */}
          <Route path="/upgrade" element={<ProtectedRoute><Upgrade /></ProtectedRoute>} />
          <Route path="/upload" element={<CreatorRoute><Upload /></CreatorRoute>} />

          <Route path="/wallpapers" element={<Wallpapers />} />
          <Route path="/images" element={<Images />} />
          <Route path="/template" element={<Template />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/ai/generate" element={<AIGenerate />} />
          <Route path="/creator/dashboard" element={<CreatorRoute><CreatorDashboard /></CreatorRoute>} />
          
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms-condition" element={<TermsAndConditions />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />

          <Route path="/profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
          <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
          <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
          <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
          {/* <Route path="/*" element={<NotFound />} /> */}
        </Routes>
      </Suspense>
    </>
  );
}
