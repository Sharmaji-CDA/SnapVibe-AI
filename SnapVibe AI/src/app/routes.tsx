import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import PublicRoute from "../routes/PublicRoute";

// Pages
import Home from "../pages/home/Home";
import Wallpapers from "../pages/wallpapers/Wallpapers";
import Images from "../pages/images/Images";
import Themes from "../pages/themes/Themes";
import Subscription from "../pages/subscription/Subscription";
import Upload from "../pages/upload/Upload";
import About from "../pages/about/About";
import Contact from "../pages/contact/Contact";
import NotFound from "../pages/not-found/NotFound";
import CreatorDashboard from "../pages/profile/CreatorDashboard";
import UserProfile from "../pages/profile/UserProfile";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivacyPolicy from "../pages/privacy-policy/PrivacyPolicy";
import Support from "../pages/support/Support";
import TermsAndConditions from "../pages/terms-condition/TermsAndCondition";
import RefundPolicy from "../pages/refund-policy/RefundPolicy";
import Gallery from "../pages/gallery/Gallery";
import AIGenerate from "../pages/ai/AIGenerate";
import CreatorRoute from "../routes/CreatorRoute";
import ForgotPassword from "../pages/auth/ForgotPassword";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wallpapers" element={<Wallpapers />} />
        <Route path="/images" element={<Images />} />
        <Route path="/themes" element={<Themes />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/ai/generate" element={<AIGenerate />} />
        <Route path="/creator/dashboard" element={<CreatorRoute><CreatorDashboard /></CreatorRoute>} />
        <Route path="/upload" element={<CreatorRoute><Upload /></CreatorRoute>} />
        
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
        <Route path="/*" element={<NotFound />} />
      </Routes>
  );
}
