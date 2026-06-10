import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import { COMPANY } from "@/data/content";
import { useApp } from "@/context/AppContext";

const footerColumns = [
  {
    title: "Our Family",
    links: [
      { label: "Home", href: "/" },
      { label: "Our Story", href: "/about" },
      { label: "Our Process", href: "/process" },
    ],
  },
  {
    title: "Our Rice",
    links: [
      { label: "Rice Varieties", href: "/rice-varieties" },
      { label: "Global Reach", href: "/global-reach" },
      { label: "Quality", href: "/about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "News", href: "/news" },
      { label: "Get in Touch", href: "/contact" },
      { label: "Request a Quote", href: "#", action: "quote" as const },
    ],
  },
];

export default function Footer() {
  const { openQuoteModal } = useApp();

  return (
    <footer id="contact" className="bg-dark-900 text-cream-100">
      <div className="container-main page-padding pt-16 pb-8">
        {/* Top Row */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-8">
          {/* Logo & Story */}
          <div className="max-w-xs">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center gap-3">
                <img src={COMPANY.logoWhite} alt={`${COMPANY.name} logo`} className="h-12 w-auto" />
                <div className="w-px h-8 bg-dark-600" />
                <img src="/images/brcgs-logo.png" alt="BRCGS Certified" className="h-9 w-auto opacity-80" />
              </div>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed">{COMPANY.tagline}</p>
            <p className="text-gold-400 text-xs mt-3 italic">{COMPANY.subTagline}</p>
          </div>

          {/* Navigation Columns */}
          <div className="flex flex-wrap gap-12 lg:gap-16">
            {footerColumns.map((col) => (
              <div key={col.title} className="flex flex-col gap-3">
                <p className="text-xs font-medium uppercase tracking-[0.15em] text-dark-400 mb-1">{col.title}</p>
                {col.links.map((link) =>
                  link.action === "quote" ? (
                    <button key={link.label} onClick={openQuoteModal} className="text-dark-300 text-sm hover:text-cream-100 transition-colors duration-300 text-left">{link.label}</button>
                  ) : (
                    <Link key={link.label} to={link.href} className="text-dark-300 text-sm hover:text-cream-100 transition-colors duration-300">{link.label}</Link>
                  )
                )}
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="max-w-xs">
            <p className="text-gold-400 text-xs font-medium uppercase tracking-[0.1em] mb-4">Get in Touch</p>
            <div className="flex flex-col gap-3">
              <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-dark-300 text-sm hover:text-cream-100 transition-colors duration-300">
                <Mail size={14} /> {COMPANY.email}
              </a>
              <a href={`tel:${COMPANY.phone}`} className="flex items-center gap-2 text-dark-300 text-sm hover:text-cream-100 transition-colors duration-300">
                <Phone size={14} /> {COMPANY.phone}
              </a>
              <div className="flex items-start gap-2 text-dark-300 text-sm">
                <MapPin size={14} className="mt-0.5 shrink-0" /> {COMPANY.address}
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-dark-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-dark-500 text-xs">&copy; {COMPANY.year} {COMPANY.fullName}. All Rights Reserved.</p>
            <div className="flex items-center gap-6">
              <a href="https://kh.linkedin.com/company/khmer-foods-group" target="_blank" rel="noopener noreferrer" className="text-dark-400 text-xs hover:text-cream-100 transition-colors duration-300">LinkedIn</a>
              <a href="https://www.facebook.com/khmerfood.com.kh/" target="_blank" rel="noopener noreferrer" className="text-dark-400 text-xs hover:text-cream-100 transition-colors duration-300">Facebook</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-dark-500 text-xs hover:text-dark-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="text-dark-500 text-xs hover:text-dark-400 transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
