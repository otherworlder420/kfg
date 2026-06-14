import { Helmet } from "react-helmet-async";
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
      <Helmet>
        <title>Khmer Foods Group | Cambodian Rice Miller & Global Exporter Since 1994</title>
        <meta name="description" content="Three generations of Cambodian rice heritage. Premium rice miller & exporter of Phka Rumduol, SKO, SRO jasmine rice. BRCGS, ISO 22000, HACCP certified." />
        <link rel="canonical" href="https://khmerfoods.com/" />
      </Helmet>
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
