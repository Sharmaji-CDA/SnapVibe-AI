import HeroSection from "./HeroSection";
import TrendingSection from "./TrendingSection";
import CategoriesSection from "./CategoriesSection";
import FeaturedCreators from "./FeaturedCreators";
import HowItWorks from "./HowItWorks";
import CTASection from "./CTASectioon";
import NoticeBanner from "./NoticeBanner";

export default function Home() {
  return (
    <>
      <NoticeBanner />
      <HeroSection />
      <TrendingSection />
      {/* <ImageGrid /> */}
      <CategoriesSection />
      <FeaturedCreators />
      <HowItWorks />
      <CTASection />
    </>
  );
}
