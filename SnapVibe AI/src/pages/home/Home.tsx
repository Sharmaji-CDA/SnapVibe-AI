import HeroSection from "./HeroSection";
import TrendingSection from "./TrendingSection";
// import CategoriesSection from "./CategoriesSection";
import FeaturedCreators from "./FeaturedCreators";
import HowItWorks from "./HowItWorks";
import CTASection from "./CTASectioon";
import NoticeBanner from "./NoticeBanner";
import FeedSection from "./FeedSection";

export default function Home() {
  return (
    <>
      <NoticeBanner />
      {/* 🔥 HERO */}
      <HeroSection />
      {/* 🔥 MAIN ACTION (MOST IMPORTANT) */}
      <TrendingSection />

      {/* 🔥 ENGAGEMENT (Pinterest Feed) */}
      <FeedSection />
      
      {/* SUPPORT SECTIONS */}
      {/* <CategoriesSection /> */}
      <HowItWorks />
      <FeaturedCreators />
      
      {/* 🔥 FINAL CTA */}
      <CTASection />
    </>
  );
}
