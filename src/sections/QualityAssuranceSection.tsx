import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { QUALITY_SECTION, CERTIFICATIONS } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import CertificationItem from "@/components/CertificationItem";
import { SectionDecoration } from "@/components/GoldDecorations";

gsap.registerPlugin(ScrollTrigger);

export default function QualityAssuranceSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const certsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Header
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: headerRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Certifications stagger
      if (certsRef.current) {
        gsap.fromTo(
          certsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: certsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Quote block
      if (quoteRef.current) {
        gsap.fromTo(
          quoteRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: quoteRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} className="bg-cream-100 py-24 md:py-32 relative">
      <SectionDecoration variant="rice" />
      <div className="container-main page-padding max-w-[1000px] mx-auto text-center relative z-10">
        {/* Header */}
        <div ref={headerRef}>
          <SectionLabel label={QUALITY_SECTION.label} />
          <h2 className="font-display text-3xl md:text-4xl font-medium text-dark-800 mt-4">
            {QUALITY_SECTION.title}
          </h2>
          <p className="text-base text-dark-700 mt-6 max-w-[600px] mx-auto leading-relaxed font-light">
            {QUALITY_SECTION.description}
          </p>
        </div>

        {/* Certifications Grid */}
        <div
          ref={certsRef}
          className="flex flex-wrap justify-center gap-10 md:gap-16 mt-16"
        >
          {CERTIFICATIONS.map((cert, idx) => (
            <CertificationItem key={idx} icon={cert.icon} label={cert.label} />
          ))}
        </div>

        {/* Quality Promise Quote */}
        <div
          ref={quoteRef}
          className="mt-16 bg-cream-200 rounded-xl p-8 md:p-10"
        >
          <p className="font-display text-lg md:text-xl text-dark-800 italic leading-relaxed max-w-[700px] mx-auto">
            &ldquo;{QUALITY_SECTION.quote}&rdquo;
          </p>
          <p className="text-sm font-medium text-dark-600 mt-6">
            {QUALITY_SECTION.attribution}
          </p>
        </div>
      </div>
    </section>
  );
}
