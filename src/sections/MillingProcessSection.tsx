import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { MILLING_SECTION, MILLING_STEPS } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import ProcessStepCard from "@/components/ProcessStepCard";

gsap.registerPlugin(ScrollTrigger);

export default function MillingProcessSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  const autoScrollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const currentStepRef = useRef(0);
  const isInViewRef = useRef(false);
  const isProgrammaticScrollRef = useRef(false);
  const isUserPausedRef = useRef(false);
  const reducedMotion = useReducedMotion();

  const stopAutoScroll = useCallback(() => {
    if (autoScrollTimerRef.current) {
      clearInterval(autoScrollTimerRef.current);
      autoScrollTimerRef.current = null;
    }
  }, []);

  const scrollToStep = useCallback((direction: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const firstCard = container.querySelector(".process-card") as HTMLElement;
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 344;
    const maxScroll = container.scrollWidth - container.clientWidth;

    // Mark as programmatic so onScroll won't treat this as user interaction
    isProgrammaticScrollRef.current = true;

    let targetScrollLeft: number;

    if (direction > 0) {
      if (container.scrollLeft >= maxScroll - 10) {
        currentStepRef.current = 0;
        targetScrollLeft = 0;
      } else {
        const nextStep = Math.min(currentStepRef.current + 1, MILLING_STEPS.length - 1);
        currentStepRef.current = nextStep;
        const cardLeft = nextStep * cardWidth;
        const viewportCenter = container.clientWidth / 2;
        const cardCenter = cardLeft + cardWidth / 2;
        targetScrollLeft = Math.max(0, cardCenter - viewportCenter);
      }
    } else {
      const nextStep = Math.max(currentStepRef.current - 1, 0);
      currentStepRef.current = nextStep;
      const cardLeft = nextStep * cardWidth;
      const viewportCenter = container.clientWidth / 2;
      const cardCenter = cardLeft + cardWidth / 2;
      targetScrollLeft = Math.max(0, cardCenter - viewportCenter);
    }

    container.scrollTo({ left: targetScrollLeft, behavior: "smooth" });

    // Clear programmatic flag after scroll animation completes
    setTimeout(() => {
      isProgrammaticScrollRef.current = false;
    }, 600);
  }, []);

  const startAutoScroll = useCallback(() => {
    if (isUserPausedRef.current) return;
    stopAutoScroll();
    autoScrollTimerRef.current = setInterval(() => {
      if (isInViewRef.current && !isUserPausedRef.current) {
        scrollToStep(1);
      }
    }, 5000);
  }, [stopAutoScroll, scrollToStep]);

  const handleUserInteraction = useCallback(() => {
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
    stopAutoScroll();
    isUserPausedRef.current = true;

    // Resume after 1 minute (60 seconds)
    resumeTimerRef.current = setTimeout(() => {
      isUserPausedRef.current = false;
      if (isInViewRef.current) {
        startAutoScroll();
      }
    }, 60000);
  }, [stopAutoScroll, startAutoScroll]);

  // Detect user-initiated scroll events
  const handleScroll = useCallback(() => {
    if (isProgrammaticScrollRef.current) return;

    const container = scrollContainerRef.current;
    if (container) {
      const firstCard = container.querySelector(".process-card") as HTMLElement;
      const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 344;
      currentStepRef.current = Math.round(container.scrollLeft / cardWidth);
    }

    handleUserInteraction();
  }, [handleUserInteraction]);

  // Arrow button click handler
  const handleArrowClick = useCallback((direction: number) => {
    scrollToStep(direction);
    handleUserInteraction();
  }, [scrollToStep, handleUserInteraction]);

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current.children,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 1.0, ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
          }
        );
      }

      if (scrollContainerRef.current) {
        gsap.fromTo(
          scrollContainerRef.current.querySelectorAll(".process-card"),
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: scrollContainerRef.current, start: "top 85%", once: true },
          }
        );
      }

      if (supportRef.current) {
        gsap.fromTo(
          supportRef.current,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: supportRef.current, start: "top 85%", once: true },
          }
        );
      }

      if (scrollContainerRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => { isInViewRef.current = true; isUserPausedRef.current = false; startAutoScroll(); },
          onLeave: () => { isInViewRef.current = false; isUserPausedRef.current = true; stopAutoScroll(); },
          onEnterBack: () => { isInViewRef.current = true; if (!isUserPausedRef.current) startAutoScroll(); },
          onLeaveBack: () => { isInViewRef.current = false; stopAutoScroll(); },
        });
      }
    }, sectionRef);

    return () => {
      ctx.revert();
      stopAutoScroll();
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [reducedMotion, startAutoScroll, stopAutoScroll]);

  return (
    <section ref={sectionRef} id="milling" className="bg-cream-200 py-24 md:py-32">
      <div className="container-main page-padding">
        <div ref={headerRef} className="text-center mb-16">
          <SectionLabel label={MILLING_SECTION.label} />
          <h2 className="font-display text-3xl md:text-4xl font-medium text-dark-800 mt-4 max-w-[500px] mx-auto">
            {MILLING_SECTION.title}
          </h2>
          <p className="text-base text-dark-700 mt-6 max-w-[650px] mx-auto leading-relaxed font-light">
            {MILLING_SECTION.description}
          </p>
        </div>
      </div>

      <div className="relative group">
        <button
          onClick={() => handleArrowClick(-1)}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 rounded-full bg-cream-100/90 backdrop-blur shadow-card-hover flex items-center justify-center text-dark-700 hover:bg-gold-400 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
          aria-label="Scroll left"
        >
          <ChevronLeft size={24} />
        </button>

        <div className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-10">
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-400 animate-ping opacity-75" />
          <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-gold-400" />
          <button
            onClick={() => handleArrowClick(1)}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-cream-100/90 backdrop-blur shadow-card-hover flex items-center justify-center text-dark-700 hover:bg-gold-400 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto"
            aria-label="Scroll right"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto px-6 md:px-[max(24px,calc((100vw-1400px)/2+24px))] pb-4 scrollbar-hide"
          style={{
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {MILLING_STEPS.map((step) => (
            <div
              key={step.step}
              className="process-card flex-shrink-0"
              style={{ width: "clamp(280px, 22vw, 320px)" }}
            >
              <ProcessStepCard
                step={step.step}
                title={step.title}
                description={step.description}
                image={step.image}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container-main page-padding">
        <div ref={supportRef} className="text-center mt-12">
          <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-6" />
          <p className="text-base text-dark-600 italic max-w-[700px] mx-auto leading-relaxed font-light">
            {MILLING_SECTION.supportingText}
          </p>
        </div>
      </div>
    </section>
  );
}
