import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

interface StatItemProps {
  value: number;
  suffix: string;
  label: string;
  decimals?: number;
}

export default function StatItem({ value, suffix, label, decimals = 0 }: StatItemProps) {
  const numberRef = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || !numberRef.current) return;

    const ctx = gsap.context(() => {
      const obj = { value: 0 };
      gsap.to(obj, {
        value,
        duration: 2,
        ease: "power1.out",
        snap: decimals === 0 ? { value: 1 } : undefined,
        scrollTrigger: {
          trigger: numberRef.current,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (numberRef.current) {
            const display = decimals > 0 ? obj.value.toFixed(decimals) : Math.round(obj.value).toString();
            numberRef.current.textContent = display + suffix;
          }
        },
      });
    });

    return () => ctx.revert();
  }, [value, suffix, decimals, reducedMotion]);

  return (
    <div className="text-center">
      <span
        ref={numberRef}
        className="font-display text-5xl md:text-6xl text-gold-400"
      >
        {reducedMotion ? `${value}${suffix}` : `0${suffix}`}
      </span>
      <div className="w-8 h-0.5 bg-gold-400 mx-auto mt-3 mb-2" />
      <span className="text-xs font-medium uppercase tracking-[0.1em] text-white/60">
        {label}
      </span>
    </div>
  );
}
