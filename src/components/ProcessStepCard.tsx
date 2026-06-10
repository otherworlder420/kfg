import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface ProcessStepCardProps {
  step: string;
  title: string;
  description: string;
  image: string;
}

export default function ProcessStepCard({ step, title, description, image }: ProcessStepCardProps) {
  const stepRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !stepRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        stepRef.current,
        { opacity: 0, scale: 0.5 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: stepRef.current,
            start: "top 85%",
            once: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div className="bg-cream-100 rounded-xl shadow-card overflow-hidden flex flex-col border-b-[3px] border-gold-400 hover:-translate-y-1 hover:shadow-card-hover transition-all duration-400">
      {/* Process Image */}
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-600"
          loading="lazy"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col items-center text-center flex-1">
        <span
          ref={stepRef}
          className="text-xs font-medium uppercase tracking-[0.15em] text-gold-400"
        >
          {step}
        </span>
        <h3 className="font-display text-xl font-medium text-dark-800 mt-2">
          {title}
        </h3>
        <p className="text-sm text-dark-600 mt-3 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
