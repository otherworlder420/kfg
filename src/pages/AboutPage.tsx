import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Award, Users, Leaf, TrendingUp, ArrowRight, Target, Eye, Heart } from "lucide-react";
import { COMPANY } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import { useApp } from "@/context/AppContext";
import CertificateLightbox from "@/components/CertificateLightbox";

gsap.registerPlugin(ScrollTrigger);

const TIMELINE = [
  { year: "1994", title: "Founded", description: "Khmer Foods Group started as a small family rice trading business in Kampong Speu Province, Cambodia." },
  { year: "1999", title: "First Mill", description: "Established our first rice milling facility, upgrading from trading to full processing capabilities." },
  { year: "2009", title: "First Export", description: "Shipped our first container of Phka Rumduol Jasmine Rice to international markets." },
  { year: "2012", title: "World's Best Rice", description: "Phka Rumduol Jasmine Rice won the first World's Best Rice award at the TRT World Rice Conference." },
  { year: "2015", title: "Certifications", description: "Achieved ISO 22000, HACCP, and BRCGS certifications, meeting global food safety standards." },
  { year: "2018", title: "3rd World's Best Rice & Battambang Mill", description: "Won the World's Best Rice award for the third time and completed a rice mill plant in Battambang Province capable of drying paddy 750 MT/day." },
  { year: "2019", title: "Kampong Speu Mill & HACCP", description: "Completed a large scale rice milling plant and export facility in Kampong Speu Province (drying 400 MT/day, milling 500 MT/day) and achieved HACCP certification." },
  { year: "2022", title: "5th World's Best Rice & ISO 9001 Certification", description: "Claimed the World's Best Rice title for a fifth time and achieved ISO 9001:2015 Quality Management System certification.", certificateImage: "/images/certificates/iso-9001.jpeg" },
  { year: "2024", title: "6th World's Best Rice & ISO 22000 Certification", description: "Won the World's Best Rice award for the sixth time and achieved ISO 22000 Food Safety certification.", certificateImage: "/images/certificates/iso-22000.jpeg" },
  { year: "2025", title: "7th World's Best Rice & BRCGS Grade A Certification", description: "Won the World's Best Rice award for the seventh time — the most awarded Cambodian rice company in history — and achieved BRCGS Grade A certification covering the complete process from paddy to packaged rice.", certificateImage: "/images/certificates/brcgs-grade-a.png" },
  { year: "2026", title: "SRP Certification & 3,000MT Chilled Silos", description: "Achieved Sustainable Rice Platform (SRP) certification and completed 3,000MT chilled silos storage dedicated for Phka Rumduol Jasmine Rice.", certificateImage: "/images/certificates/srp.jpeg" },
];

const VALUES = [
  { icon: Target, title: "Mission", description: "To bring Cambodia's finest rice to tables worldwide while uplifting farming communities through fair trade and sustainable agriculture." },
  { icon: Eye, title: "Vision", description: "To become the most trusted name in premium rice exports, recognized globally for quality, integrity, and innovation." },
  { icon: Heart, title: "Values", description: "Quality first, farmer partnerships, food safety, traceability, and continuous improvement drive everything we do." },
];

const ACHIEVEMENTS = [
  { icon: Award, value: "7x", label: "World's Best Rice Winner" },
  { icon: Users, value: "150-200", label: "Employees" },
  { icon: Leaf, value: "~2,500", label: "Hectares Contract Farming" },
  { icon: TrendingUp, value: "10%+", label: "of Cambodian Rice Total Export" },
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openQuoteModal } = useApp();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const certificateImages = TIMELINE
    .filter((item) => item.certificateImage)
    .map((item) => ({ src: item.certificateImage!, title: item.title }));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, x: i % 2 === 0 ? -30 : 30 }, {
          opacity: 1, x: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: item, start: "top 85%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-[72px]" ref={sectionRef}>
      {/* Hero */}
      <div className="relative bg-dark-900 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero-background.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-800/70" />
        <div className="container-main page-padding relative z-10">
          <SectionLabel label="Our Story" light />
          <h1 className="font-display text-4xl md:text-5xl text-white mt-4">About Khmer Foods Group</h1>
          <p className="text-cream-100/70 mt-4 max-w-2xl leading-relaxed font-light">
            {COMPANY.tagline}
          </p>
        </div>
      </div>

      {/* Company Overview */}
      <section className="bg-cream-100 py-16">
        <div className="container-main page-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionLabel label="Who We Are" />
              <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">
                Three Decades of Rice Excellence
              </h2>
              <p className="text-dark-600 mt-4 leading-relaxed font-light">
                Founded in 1994, Khmer Foods Group Co., Ltd. has grown from a small family rice trading business 
                into one of Cambodia's leading rice millers and exporters. Located in Kampong Speu Province, 
                we operate state-of-the-art milling facilities equipped with Buhler and Satake machinery.
              </p>
              <p className="text-dark-600 mt-4 leading-relaxed font-light">
                Through direct partnerships with farmers via contract farming covering ~2,500 hectares, 
                we ensure a sustainable supply of high-purity paddy while promoting responsible 
                socio-economic development in rural Cambodia.
              </p>
              <p className="text-dark-600 mt-4 leading-relaxed font-light">
                Our flagship Phka Rumduol Jasmine Rice has been awarded World's Best Rice 7 (seven) times 
                at the TRT World Rice Conference (2012, 2013, 2014, 2018, 2022, 2024, 2025), cementing 
                Cambodia's position as a premium rice origin.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-card">
              <img
                src="/images/process/drying.jpg"
                alt="Khmer Foods Group rice processing facility"
                className="w-full aspect-[4/3] object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="bg-cream-200 py-16">
        <div className="container-main page-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {ACHIEVEMENTS.map((a) => (
              <div key={a.label} className="text-center">
                <a.icon size={36} className="text-gold-400 mx-auto mb-3" />
                <p className="font-display text-4xl text-dark-800">{a.value}</p>
                <p className="text-sm text-dark-500 mt-1">{a.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="bg-cream-100 py-16">
        <div className="container-main page-padding">
          <div className="text-center mb-12">
            <SectionLabel label="Our Principles" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">What Drives Us</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="bg-cream-200 rounded-xl p-8 text-center">
                <div className="w-14 h-14 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-4">
                  <v.icon size={28} className="text-gold-400" />
                </div>
                <h3 className="font-display text-xl font-medium text-dark-800 mb-3">{v.title}</h3>
                <p className="text-dark-600 text-sm leading-relaxed font-light">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream-200 py-16">
        <div className="container-main page-padding">
          <div className="text-center mb-12">
            <SectionLabel label="Our Journey" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">30 Years of Growth</h2>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-gold-100 lg:-translate-x-1/2" />
            {TIMELINE.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div key={item.year} className={`timeline-item relative flex items-start gap-6 mb-10 last:mb-0 ${isLeft ? "lg:flex-row" : "lg:flex-row-reverse"}`}>
                  <div className={`hidden lg:block flex-1 ${isLeft ? "text-right pr-8" : "text-left pl-8"}`}>
                    <span className="text-gold-400 font-display text-3xl font-medium">{item.year}</span>
                    <h3 className="font-display text-xl font-medium text-dark-800 mt-1">{item.title}</h3>
                    <p className="text-dark-600 text-sm mt-2 font-light">{item.description}</p>
                    {item.certificateImage && (
                      <button
                        onClick={() => {
                          const index = certificateImages.findIndex((img) => img.src === item.certificateImage);
                          setLightboxIndex(index >= 0 ? index : 0);
                          setLightboxOpen(true);
                        }}
                        className={`inline-block mt-3 group text-left ${isLeft ? "ml-auto" : "mr-auto"}`}
                      >
                        <img
                          src={item.certificateImage}
                          alt={`${item.title} certificate`}
                          className="w-40 h-auto rounded-lg border border-dark-200 shadow-sm group-hover:shadow-md group-hover:border-gold-400 transition-all duration-300"
                        />
                        <span className="block text-xs text-gold-500 mt-1 group-hover:underline">View certificate</span>
                      </button>
                    )}
                  </div>
                  <div className="absolute left-6 lg:left-1/2 w-4 h-4 rounded-full bg-gold-400 border-4 border-white shadow -translate-x-1/2 mt-2" />
                  <div className="lg:hidden pl-10">
                    <span className="text-gold-400 font-display text-2xl font-medium">{item.year}</span>
                    <h3 className="font-display text-lg font-medium text-dark-800 mt-1">{item.title}</h3>
                    <p className="text-dark-600 text-sm mt-1 font-light">{item.description}</p>
                    {item.certificateImage && (
                      <button
                        onClick={() => {
                          const index = certificateImages.findIndex((img) => img.src === item.certificateImage);
                          setLightboxIndex(index >= 0 ? index : 0);
                          setLightboxOpen(true);
                        }}
                        className="inline-block mt-3 group text-left"
                      >
                        <img
                          src={item.certificateImage}
                          alt={`${item.title} certificate`}
                          className="w-32 h-auto rounded-lg border border-dark-200 shadow-sm group-hover:shadow-md group-hover:border-gold-400 transition-all duration-300"
                        />
                        <span className="block text-xs text-gold-500 mt-1 group-hover:underline">View certificate</span>
                      </button>
                    )}
                  </div>
                  <div className="hidden lg:block flex-1" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications Strip */}
      <section className="bg-dark-900 py-12">
        <div className="container-main page-padding">
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {["ISO 22000", "ISO 9001", "HACCP", "BRCGS", "GMP", "HALAL", "FDA Registered"].map((cert) => (
              <div key={cert} className="text-center">
                <p className="text-gold-400 font-medium text-sm">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-cream-100 py-16">
        <div className="container-main page-padding text-center">
          <h2 className="font-display text-3xl text-dark-800">Partner With Us</h2>
          <p className="text-dark-600 mt-4 max-w-lg mx-auto font-light">
            Join our global network of distributors and importers. We are committed to building 
            long-term partnerships based on quality, trust, and mutual growth.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={openQuoteModal}
              className="bg-gold-400 text-white font-medium px-8 py-3.5 rounded-pill hover:bg-gold-600 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            >
              Request a Quote <ArrowRight size={16} />
            </button>
            <Link
              to="/contact"
              className="border-[1.5px] border-dark-800 text-dark-800 font-medium px-8 py-3.5 rounded-pill hover:bg-dark-800 hover:text-cream-100 transition-all duration-300"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Certificate Lightbox */}
      <CertificateLightbox
        images={certificateImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
