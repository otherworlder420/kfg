import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { CSR_SECTION } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

export default function CSRSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".csr-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-200 py-24 md:py-32">
      <div className="container-main page-padding">
        {/* Header */}
        <div className="csr-reveal text-center mb-16">
          <SectionLabel label={CSR_SECTION.label} />
          <h2 className="font-display text-3xl md:text-4xl font-medium text-dark-800 mt-4">
            {CSR_SECTION.title}
          </h2>
          <p className="text-base text-dark-600 mt-4 max-w-[700px] mx-auto leading-relaxed font-light">
            {CSR_SECTION.description}
          </p>
        </div>

        {/* Partnership Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {CSR_SECTION.partnerships.map((p) => (
            <div
              key={p.name}
              className="csr-reveal bg-cream-100 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-600"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-gold-400" />
                  <span className="text-xs text-gold-400 font-medium">{p.since}</span>
                </div>
                <h3 className="font-display text-xl font-medium text-dark-800">
                  {p.name}
                </h3>
                <p className="text-sm text-dark-600 mt-3 leading-relaxed font-light">
                  {p.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Commitments */}
        <div className="csr-reveal bg-dark-900 rounded-xl p-8 md:p-12">
          <h3 className="font-display text-2xl text-white text-center mb-8">
            Our Commitments
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CSR_SECTION.commitments.map((c, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold-400/20 flex items-center justify-center shrink-0">
                  <Heart size={14} className="text-gold-400" />
                </div>
                <p className="text-cream-100/80 text-sm leading-relaxed font-light">{c}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
