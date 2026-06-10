import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check, Sprout, Users, MapPin, TrendingUp } from "lucide-react";
import { FARMING_SECTION } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import { SectionDecoration } from "@/components/GoldDecorations";

gsap.registerPlugin(ScrollTrigger);

export default function SustainableFarmingSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".farm-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-100 py-24 md:py-32 relative">
      <SectionDecoration variant="farm" />
      <div className="container-main page-padding relative z-10">
        {/* Header */}
        <div className="farm-reveal text-center mb-16">
          <SectionLabel label={FARMING_SECTION.label} />
          <h2 className="font-display text-3xl md:text-4xl font-medium text-dark-800 mt-4 max-w-[600px] mx-auto">
            {FARMING_SECTION.title}
          </h2>
          <p className="text-base text-dark-600 mt-4 max-w-[700px] mx-auto leading-relaxed font-light">
            {FARMING_SECTION.description}
          </p>
        </div>

        {/* Stats Bar */}
        <div className="farm-reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { icon: MapPin, value: FARMING_SECTION.stats.area, label: FARMING_SECTION.stats.areaLabel },
            { icon: TrendingUp, value: FARMING_SECTION.stats.yield, label: FARMING_SECTION.stats.yieldLabel },
            { icon: Sprout, value: FARMING_SECTION.stats.crops, label: "Varieties Cultivated" },
            { icon: Users, value: "Kampong Thom", label: "Province Location" },
          ].map((stat) => (
            <div key={stat.label} className="bg-cream-200 rounded-xl p-6 text-center">
              <stat.icon size={24} className="text-gold-400 mx-auto mb-2" />
              <p className="font-display text-2xl text-dark-800">{stat.value}</p>
              <p className="text-xs text-dark-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Main Content: Image + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Images */}
          <div className="farm-reveal space-y-4">
            <div className="rounded-xl overflow-hidden shadow-card">
              <img
                src={FARMING_SECTION.image}
                alt="Cambodian farmers in rice paddies"
                className="w-full aspect-[16/9] object-cover"
                loading="lazy"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl overflow-hidden shadow-card">
                <img
                  src={FARMING_SECTION.farmerHandsImage}
                  alt="Farmer holding rice stalks"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
              <div className="rounded-xl overflow-hidden shadow-card">
                <img
                  src={FARMING_SECTION.aerialImage}
                  alt="Aerial view of contract farming land"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Obligations & Benefits */}
          <div className="farm-reveal space-y-8">
            {/* KFG Obligations */}
            <div>
              <h3 className="font-display text-xl font-medium text-dark-800 mb-4">
                What KFG Provides
              </h3>
              <div className="space-y-3">
                {FARMING_SECTION.kfgObligations.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-gold-400" />
                    </div>
                    <span className="text-sm text-dark-600 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Farmer Obligations */}
            <div>
              <h3 className="font-display text-xl font-medium text-dark-800 mb-4">
                Farmer Commitments
              </h3>
              <div className="space-y-3">
                {FARMING_SECTION.farmerObligations.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={12} className="text-gold-400" />
                    </div>
                    <span className="text-sm text-dark-600 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Community Benefits */}
            <div className="bg-cream-100 border border-gold-100 rounded-xl p-6">
              <h3 className="font-display text-lg font-medium text-dark-800 mb-3">
                Community Impact
              </h3>
              <div className="space-y-2">
                {FARMING_SECTION.benefits.map((item, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-gold-400 mt-2 shrink-0" />
                    <span className="text-sm text-dark-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
