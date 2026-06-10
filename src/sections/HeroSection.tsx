import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ArrowDown, Play } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HERO } from "@/data/content";
import ScrollDownIndicator from "@/components/ScrollDownIndicator";

export default function HeroSection() {
  const { openVideoModal } = useApp();
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !contentRef.current) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      tl.fromTo(".hero-label", { opacity: 0 }, { opacity: 1, duration: 0.6 }, 0.2)
        .fromTo(".hero-line", { scaleX: 0 }, { scaleX: 1, duration: 0.4 }, 0.3)
        .fromTo(".hero-title", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1.0 }, 0.5)
        .fromTo(".hero-desc", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.7)
        .fromTo(".hero-btn", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.15 }, 0.9)
        .fromTo(".hero-indicator", { opacity: 0 }, { opacity: 1, duration: 0.4 }, 1.5);
    }, contentRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToProducts = () => {
    const el = document.getElementById("products");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video autoPlay muted loop playsInline className="w-full h-full object-cover" poster="/images/hero-background.jpg">
          <source src={HERO.video} type="video/mp4" />
        </video>
      </div>

      {/* Fresh morning overlay */}
      <div className="absolute inset-0 z-[1]" style={{ background: "linear-gradient(135deg, rgba(10, 25, 10, 0.55) 0%, rgba(15, 35, 15, 0.45) 50%, rgba(10, 30, 10, 0.60) 100%)" }} />

      {/* Content */}
      <div ref={contentRef} className="relative z-[3] max-w-[900px] mx-auto text-center page-padding py-20">
        <div className="hero-label mb-6" style={{ opacity: reducedMotion ? 1 : undefined }}>
          <div className="hero-line w-10 h-px bg-cream-100/40 mx-auto mb-4" style={{ transform: reducedMotion ? "scaleX(1)" : "scaleX(0)", transformOrigin: "center" }} />
          <p className="label-premium text-cream-100/70 text-sm">{HERO.label}</p>
        </div>

        <h1 className="hero-title font-display text-5xl sm:text-6xl md:text-7xl text-cream-100 leading-[1.05] text-shadow-soft" style={{ opacity: reducedMotion ? 1 : undefined }}>
          {HERO.title}
        </h1>

        <p className="hero-desc mt-8 text-lg text-cream-100/85 max-w-[640px] mx-auto leading-relaxed font-light" style={{ opacity: reducedMotion ? 1 : undefined }}>
          {HERO.description}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button onClick={scrollToProducts} className="hero-btn flex items-center gap-2 bg-cream-100 text-dark-700 font-medium text-sm px-8 py-3.5 rounded-pill hover:bg-gold-100 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300" style={{ opacity: reducedMotion ? 1 : undefined }}>
            {HERO.primaryCta} <ArrowDown size={16} />
          </button>
          <button onClick={openVideoModal} className="hero-btn flex items-center gap-2 bg-transparent text-cream-100 font-medium text-sm px-8 py-3.5 rounded-pill border-[1.5px] border-cream-100/60 hover:bg-cream-100 hover:text-dark-700 transition-all duration-300" style={{ opacity: reducedMotion ? 1 : undefined }}>
            <Play size={16} /> {HERO.secondaryCta}
          </button>
        </div>
      </div>

      <div className="hero-indicator absolute bottom-0 left-0 right-0 z-[3]" style={{ opacity: reducedMotion ? 1 : 0 }}>
        <ScrollDownIndicator />
      </div>
    </section>
  );
}
