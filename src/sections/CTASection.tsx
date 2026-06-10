import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Mail } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CTA_SECTION } from "@/data/content";

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const { openQuoteModal } = useApp();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showChatMenu, setShowChatMenu] = useState(false);
  const chatMenuRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const ctx = gsap.context(() => {
      const els = [".cta-title", ".cta-desc", ".cta-btn"];
      els.forEach((sel, i) => {
        const el = contentRef.current?.querySelectorAll(sel);
        if (el?.length) {
          gsap.fromTo(el, { opacity: 0, y: 30 }, {
            opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: i * 0.2,
            scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          });
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reducedMotion]);

  // Close chat menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (chatMenuRef.current && !chatMenuRef.current.contains(e.target as Node)) {
        setShowChatMenu(false);
      }
    };
    if (showChatMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showChatMenu]);

  return (
    <section ref={sectionRef} className="relative py-32 md:py-40 overflow-hidden bg-dark-800">
      {/* Warm texture overlay */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4972A' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

      {/* Top glow */}
      <div className="absolute top-0 left-0 right-0 h-20 pointer-events-none" style={{ boxShadow: "inset 0 40px 80px -40px rgba(212, 151, 42, 0.15)" }} />

      <div ref={contentRef} className="container-main page-padding text-center relative z-10">
        <h2 className="cta-title font-display text-3xl md:text-4xl lg:text-5xl text-cream-100 leading-tight">
          <span className="gradient-text-light">{CTA_SECTION.title}</span>
        </h2>
        <p className="cta-desc mt-6 text-lg text-cream-100/70 max-w-[600px] mx-auto leading-relaxed font-light">{CTA_SECTION.description}</p>

        <div className="flex flex-wrap items-center justify-center gap-4 mt-10">
          <button onClick={openQuoteModal} className="cta-btn flex items-center gap-2 bg-gold-400 text-white font-medium text-sm px-8 py-3.5 rounded-pill hover:bg-gold-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            {CTA_SECTION.primaryCta} <ArrowRight size={16} />
          </button>

          {/* Let's Chat with dropdown */}
          <div className="cta-btn relative" ref={chatMenuRef}>
            <button
              onClick={() => setShowChatMenu(!showChatMenu)}
              className="flex items-center gap-2 bg-transparent text-cream-100 font-medium text-sm px-8 py-3.5 rounded-pill border-[1.5px] border-cream-100/60 hover:bg-cream-100 hover:text-dark-700 transition-all duration-300"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              {CTA_SECTION.secondaryCta}
            </button>

            {showChatMenu && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 bg-cream-100 rounded-xl shadow-card-hover border border-dark-200 py-2 z-[120]">
                <a
                  href="https://wa.link/lb6b03"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setShowChatMenu(false)}
                  className="flex items-center gap-3 px-4 py-3 text-dark-700 hover:bg-cream-200 transition-colors"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
                  </svg>
                  <span className="text-sm font-medium">WhatsApp</span>
                </a>
                <div className="px-4 py-3 text-dark-700">
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
                      <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" fill="#07C160"/>
                    </svg>
                    <span className="text-sm font-medium">WeChat</span>
                  </div>
                  <p className="text-xs text-dark-400 mt-2 pl-8">Scan QR code to add us</p>
                  <div className="mt-2 ml-8 w-36 h-36 rounded-lg overflow-hidden border border-dark-200">
                    <img src="/images/wechat-qr.jpg" alt="WeChat QR Code" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href={`mailto:${CTA_SECTION.tertiaryCta ? undefined : undefined}`} className="cta-btn flex items-center gap-2 bg-transparent text-gold-400 font-medium text-sm px-8 py-3.5 rounded-pill border-[1.5px] border-gold-400/70 hover:bg-gold-400 hover:text-dark-700 transition-all duration-300">
            <Mail size={16} /> {CTA_SECTION.tertiaryCta}
          </a>
        </div>
      </div>
    </section>
  );
}
