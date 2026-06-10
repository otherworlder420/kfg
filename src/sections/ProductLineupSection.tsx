import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { PRODUCT_SECTION, PRODUCTS } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import ProductCard from "@/components/ProductCard";

gsap.registerPlugin(ScrollTrigger);

export default function ProductLineupSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Header animation - fromTo ensures elements always end visible
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

      // Grid cards stagger - fromTo ensures elements always end visible
      if (gridRef.current) {
        gsap.fromTo(
          gridRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            stagger: 0.1,
            scrollTrigger: {
              trigger: gridRef.current,
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
    <section ref={sectionRef} id="products" className="bg-cream-100 pt-8 md:pt-12 pb-24 md:pb-32 relative">
      <div className="container-main page-padding relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <SectionLabel label={PRODUCT_SECTION.label} />
          <h2 className="font-display text-3xl md:text-4xl font-medium text-dark-800 mt-4 max-w-[500px] mx-auto">
            {PRODUCT_SECTION.title}
          </h2>
          <p className="text-base text-dark-700 mt-6 max-w-[600px] mx-auto leading-relaxed font-light">
            {PRODUCT_SECTION.description}
          </p>
        </div>

        {/* Product Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
