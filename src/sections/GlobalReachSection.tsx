import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { GLOBAL_SECTION, STATISTICS } from "@/data/content";
import StatItem from "@/components/StatItem";
import WorldMapSVG from "@/components/WorldMapSVG";

gsap.registerPlugin(ScrollTrigger);

export default function GlobalReachSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Stats stagger
      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.15,
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              once: true,
            },
          }
        );
      }

      // Info block
      if (infoRef.current) {
        gsap.fromTo(
          infoRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: infoRef.current,
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
    <section
      ref={sectionRef}
      id="global"
      className="relative py-32 md:py-40 overflow-hidden"
    >
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/global-logistics-poster.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/videos/global-logistics.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-dark-950/80" />

      {/* World Map (decorative) */}
      <div className="absolute inset-0 z-[2] flex items-center justify-center">
        <WorldMapSVG />
      </div>

      {/* Content */}
      <div className="container-main page-padding relative z-[3]">
        {/* Statistics Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12"
        >
          {STATISTICS.map((stat, idx) => (
            <StatItem
              key={idx}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              decimals={stat.value % 1 !== 0 ? 1 : 0}
            />
          ))}
        </div>

        {/* Destination Info */}
        <div ref={infoRef} className="text-center mt-20">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-white/60">
            {GLOBAL_SECTION.label}
          </p>
          <h3 className="font-display text-3xl md:text-4xl font-medium text-white mt-4">
            {GLOBAL_SECTION.title}
          </h3>
          <p className="text-base text-white/70 mt-6 max-w-[600px] mx-auto leading-relaxed font-light">
            {GLOBAL_SECTION.description}
          </p>
          <Link
            to="/global-reach"
            className="inline-flex items-center gap-2 mt-8 text-gold-400 font-medium text-sm link-underline hover:text-gold-500 transition-colors"
          >
            {GLOBAL_SECTION.ctaText}
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
