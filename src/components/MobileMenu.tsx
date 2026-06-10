import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { X, Phone, MessageCircle, ChevronUp } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { COMPANY, NAV_LINKS } from "@/data/content";

export default function MobileMenu() {
  const { closeMobileMenu, openQuoteModal } = useApp();
  const [showChatOptions, setShowChatOptions] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
      if (linksRef.current) {
        gsap.fromTo(linksRef.current.children, { x: 50, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: "power2.out" });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[110] bg-dark-900 flex flex-col page-padding overflow-y-auto">
      <div className="flex justify-end pt-5">
        <button onClick={closeMobileMenu} className="p-2 text-cream-100 hover:text-gold-400 transition-colors" aria-label="Close menu">
          <X size={28} />
        </button>
      </div>

      <div ref={linksRef} className="flex flex-col gap-6 mt-12">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            onClick={closeMobileMenu}
            className={`text-2xl font-display transition-colors duration-300 ${location.pathname === link.href ? "text-gold-400" : "text-cream-100 hover:text-gold-400"}`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="flex flex-col gap-4 mt-12">
        <button onClick={() => { closeMobileMenu(); openQuoteModal(); }} className="bg-gold-400 text-white text-center text-base font-medium py-3.5 rounded-pill hover:bg-gold-600 transition-colors duration-300">
          Send Inquiry
        </button>
        <button
          onClick={() => setShowChatOptions(!showChatOptions)}
          className="flex items-center justify-center gap-2 text-cream-100 text-center text-base font-medium py-3.5 rounded-pill border-[1.5px] border-cream-100/30 hover:border-cream-100 hover:bg-cream-100/10 transition-all duration-300"
        >
          <MessageCircle size={16} />
          Let's Chat
          <ChevronUp size={14} className={`transition-transform duration-300 ${showChatOptions ? "rotate-0" : "rotate-180"}`} />
        </button>

        {/* Chat options */}
        {showChatOptions && (
          <div className="bg-cream-100/5 rounded-xl border border-cream-100/10 overflow-hidden">
            <a
              href="https://wa.link/lb6b03"
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3.5 text-cream-100 hover:bg-cream-100/10 transition-colors border-b border-cream-100/10"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#25D366"/>
              </svg>
              <span className="text-sm font-medium">WhatsApp</span>
            </a>
            <div className="px-4 py-3">
              <div className="flex items-center gap-3 text-cream-100">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="shrink-0">
                  <path d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 01.213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 00.167-.054l1.903-1.114a.864.864 0 01.717-.098 10.16 10.16 0 002.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178A1.17 1.17 0 014.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 01-1.162 1.178 1.17 1.17 0 01-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 01.598.082l1.584.926a.272.272 0 00.14.047c.134 0 .24-.111.24-.247 0-.06-.023-.12-.038-.177l-.327-1.233a.582.582 0 01-.023-.156.49.49 0 01.201-.398C23.024 18.48 24 16.82 24 14.98c0-3.21-2.931-5.837-6.656-6.088V8.89c-.135-.01-.27-.03-.407-.03zm-2.53 3.274c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.97-.982zm4.844 0c.535 0 .969.44.969.982a.976.976 0 01-.969.983.976.976 0 01-.969-.983c0-.542.434-.982.969-.982z" fill="#07C160"/>
                </svg>
                <span className="text-sm font-medium">WeChat</span>
              </div>
              <p className="text-xs text-dark-300 mt-1.5 pl-8">Scan QR code to add us</p>
              <div className="mt-2 ml-8 w-32 h-32 rounded-lg overflow-hidden border border-dark-200">
                <img src="/images/wechat-qr.jpg" alt="WeChat QR Code" className="w-full h-full object-cover" />
              </div>
            </div>
            <a
              href={`tel:${COMPANY.phone}`}
              onClick={closeMobileMenu}
              className="flex items-center gap-3 px-4 py-3.5 text-cream-100 hover:bg-cream-100/10 transition-colors border-t border-cream-100/10"
            >
              <Phone size={16} className="shrink-0" />
              <span className="text-sm font-medium">Call Us</span>
              <span className="text-xs text-dark-300 ml-auto">{COMPANY.phone}</span>
            </a>
          </div>
        )}
      </div>

      <div className="mt-auto pb-8">
        <p className="text-dark-300 text-sm">{COMPANY.email}</p>
        <p className="text-dark-300 text-sm mt-1">{COMPANY.phone}</p>
      </div>
    </div>
  );
}
