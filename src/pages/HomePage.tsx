import HeroSection from "@/sections/HeroSection";
import AboutUsSection from "@/sections/AboutUsSection";
import ProductLineupSection from "@/sections/ProductLineupSection";
import SustainableFarmingSection from "@/sections/SustainableFarmingSection";
import MillingProcessSection from "@/sections/MillingProcessSection";
import CTASection from "@/sections/CTASection";
import CSRSection from "@/sections/CSRSection";
import GlobalReachSection from "@/sections/GlobalReachSection";
import NewsSection from "@/sections/NewsSection";
import QualityAssuranceSection from "@/sections/QualityAssuranceSection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutUsSection />
      <ProductLineupSection />
      <MillingProcessSection />
      <QualityAssuranceSection />
      <GlobalReachSection />
      <SustainableFarmingSection />
      <CSRSection />
      <NewsSection />
      <CTASection />
    </>
  );
}
