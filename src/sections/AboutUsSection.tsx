import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ABOUT_SECTION } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0, duration: 1.0, ease: "power2.out",
            scrollTrigger: { trigger: imageRef.current, start: "top 85%", once: true },
          }
        );
      }

      // Text stagger
      if (textRef.current) {
        gsap.fromTo(
          textRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: { trigger: textRef.current, start: "top 85%", once: true },
          }
        );
      }

      // Stats counter animation
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: { trigger: statsRef.current, start: "top 90%", once: true },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section ref={sectionRef} id="about" className="bg-cream-100 pt-24 md:pt-32 pb-8 md:pb-12">
      <div className="container-main page-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div ref={imageRef} className="relative">
            <div className="rounded-xl overflow-hidden shadow-card">
              <picture>
                <source srcSet="/images/family-heritage.webp" type="image/webp" />
                <img
                  src={ABOUT_SECTION.image}
                  alt="Khmer Foods Group heritage"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                  width="900"
                  height="663"
                  decoding="async"
                />
              </picture>
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-gold-400 rounded-xl -z-10 hidden lg:block" />
          </div>

          {/* Text Content */}
          <div ref={textRef}>
            <SectionLabel label={ABOUT_SECTION.label} />
            <h2 className="font-display text-3xl md:text-4xl font-medium text-dark-800 mt-4 leading-tight">
              {ABOUT_SECTION.title}
            </h2>

            <div className="mt-6 space-y-4">
              {ABOUT_SECTION.paragraphs.map((p, i) => (
                <p key={i} className="text-dark-600 leading-relaxed font-light">
                  {p}
                </p>
              ))}
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="mt-8 grid grid-cols-4 gap-4 border-t border-dark-200 pt-8"
            >
              {ABOUT_SECTION.stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-display text-2xl md:text-3xl font-medium text-gold-400">
                    {stat.value}
                  </p>
                  <p className="text-xs text-dark-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
