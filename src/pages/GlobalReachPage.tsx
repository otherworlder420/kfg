import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe, Ship, Package, FileCheck, TrendingUp, TrendingDown, MapPin, ArrowRight } from "lucide-react";
import { STATISTICS } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import StatItem from "@/components/StatItem";
import WorldMapSVG from "@/components/WorldMapSVG";
import { useApp } from "@/context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const EXPORT_MARKETS = [
  {
    region: "Europe",
    countries: ["France", "Netherlands", "United Kingdom"],
    volume: "342,367 MT",
    growth: "+6.4% YoY",
    color: "bg-blue-500",
  },
  {
    region: "Asia",
    countries: ["China", "Malaysia", "Hong Kong", "Philippines"],
    volume: "510,498 MT",
    growth: "+104.8% YoY",
    color: "bg-emerald-500",
  },
  {
    region: "North America",
    countries: ["USA", "Canada"],
    volume: "7,201 MT",
    growth: "+20.9% YoY",
    color: "bg-amber-500",
  },
  {
    region: "Oceania",
    countries: ["Australia", "New Zealand", "New Caledonia"],
    volume: "19,376 MT",
    growth: "+12% YoY",
    color: "bg-cyan-500",
  },
  {
    region: "Africa",
    countries: ["Gabon", "C\u00F4te d'Ivoire", "Ghana", "Togo"],
    volume: "51,385 MT",
    growth: "+39% YoY",
    color: "bg-violet-500",
  },
  {
    region: "Middle East",
    countries: ["Saudi Arabia", "Turkey", "UAE", "Bahrain"],
    volume: "9,625 MT",
    growth: "-3.0% YoY",
    color: "bg-rose-500",
  },
];

const LOGISTICS = [
  {
    icon: Ship,
    title: "Sea Freight",
    description: "Full container loads (FCL) and less-than-container loads (LCL) via trusted shipping partners including Maersk, MSC, and CMA CGM.",
    features: ["20ft containers", "Bulk vessel chartering", "Port-to-port delivery"],
  },
  {
    icon: Package,
    title: "Packaging & Labeling",
    description: "Custom packaging solutions from 500g retail packs to 1-tonne jumbo bags, with private labeling and multi-language options.",
    features: ["500g to 1000kg options", "Private labeling", "Multi-language packaging"],
  },
  {
    icon: FileCheck,
    title: "Documentation",
    description: "Complete export documentation handled in-house, ensuring smooth customs clearance at destination ports.",
    features: ["Phytosanitary certificates", "Certificate of Origin", "Quality certificates"],
  },
];

const TRADE_TERMS = [
  { code: "FOB", name: "Free On Board", desc: "Seller delivers goods on board the vessel at named port of shipment." },
  { code: "CIF", name: "Cost, Insurance & Freight", desc: "Seller covers cost, insurance, and freight to destination port." },
  { code: "CFR", name: "Cost & Freight", desc: "Seller pays for carriage to destination port; buyer handles insurance." },
  { code: "EXW", name: "Ex Works", desc: "Buyer collects goods from seller's premises; minimum seller obligation." },
];

export default function GlobalReachPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openQuoteModal } = useApp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".market-card").forEach((card) => {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: card, start: "top 85%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-[72px]" ref={sectionRef}>
      <Helmet>
        <title>Global Reach & Export Markets | Khmer Foods Group</title>
        <meta name="description" content="Khmer Foods Group exports premium Cambodian rice to Europe, Asia, North America, Oceania, Africa and the Middle East. FOB, CIF, CFR, EXW trade terms available." />
        <link rel="canonical" href="https://khmerfoods.com/#/global-reach" />
      </Helmet>
      {/* Hero */}
      <div className="relative py-24 md:py-32 overflow-hidden">
        <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover" poster="/images/global-logistics-poster.jpg">
          <source src="/videos/global-logistics-720p.webm" type="video/webm" />
          <source src="/videos/global-logistics-720p.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-dark-950/75" />
        <div className="container-main page-padding relative z-10">
          <SectionLabel label="Global Presence" light />
          <h1 className="font-display text-4xl md:text-5xl text-white mt-4">Cambodian Rice Export in 2025</h1>
          <p className="text-cream-100/70 mt-4 max-w-2xl leading-relaxed font-light">
            In 2025, Cambodia exported 947,936 tonnes of rice to 82 countries, generating over $602 million
            in revenue. Khmer Foods Group is proud to be a leading contributor to this growing trade.
          </p>
        </div>
      </div>

      {/* Statistics */}
      <section className="bg-dark-900 py-16 border-t border-cream-100/10">
        <div className="container-main page-padding">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {STATISTICS.map((stat, idx) => (
              <StatItem key={idx} value={stat.value} suffix={stat.suffix} label={stat.label} decimals={stat.value % 1 !== 0 ? 1 : 0} />
            ))}
          </div>
        </div>
      </section>

      {/* Export Markets Grid */}
      <section className="bg-cream-100 py-16">
        <div className="container-main page-padding">
          <div className="text-center mb-12">
            <SectionLabel label="Destinations" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">Cambodian Rice Export in 2025</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPORT_MARKETS.map((market) => (
              <div key={market.region} className="market-card bg-cream-100 rounded-xl border border-dark-200 shadow-card p-6 hover:shadow-card-hover transition-all duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-3 h-3 rounded-full ${market.color}`} />
                  <h3 className="font-display text-xl font-medium text-dark-800">{market.region}</h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {market.countries.map((c) => (
                    <span key={c} className="inline-flex items-center gap-1 text-xs text-dark-600 bg-cream-200 px-2 py-1 rounded">
                      <MapPin size={10} /> {c}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-dark-200">
                  <div>
                    <p className="text-xs text-dark-400">Volume</p>
                    <p className="text-sm font-medium text-dark-800">{market.volume}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm font-medium ${market.growth.startsWith("-") ? "text-red-500" : "text-emerald-600"}`}>
                    {market.growth.startsWith("-") ? <TrendingDown size={14} /> : <TrendingUp size={14} />}
                    {market.growth}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* World Map Section */}
      <section className="bg-cream-200 py-16 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <WorldMapSVG />
        </div>
        <div className="container-main page-padding relative z-10">
          <div className="text-center mb-12">
            <SectionLabel label="Our Network" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">Global Distribution Network</h2>
            <p className="text-dark-600 mt-4 max-w-2xl mx-auto font-light">
              From our mills in Battambang and Kampong Speu province, Cambodia, we ship to major ports across six continents,
              with established distribution partnerships in every target market.
            </p>
          </div>
        </div>
      </section>

      {/* Logistics Services */}
      <section className="bg-cream-100 py-16">
        <div className="container-main page-padding">
          <div className="text-center mb-12">
            <SectionLabel label="Logistics" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">Shipping & Logistics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LOGISTICS.map((log) => (
              <div key={log.title} className="bg-cream-200 rounded-xl p-8">
                <log.icon size={40} className="text-gold-400 mb-4" />
                <h3 className="font-display text-xl font-medium text-dark-800 mb-3">{log.title}</h3>
                <p className="text-sm text-dark-600 leading-relaxed font-light">{log.description}</p>
                <ul className="mt-4 space-y-2">
                  {log.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-dark-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trade Terms */}
      <section className="bg-cream-200 py-16">
        <div className="container-main page-padding">
          <div className="text-center mb-12">
            <SectionLabel label="Incoterms" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">Trade Terms We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {TRADE_TERMS.map((term) => (
              <div key={term.code} className="bg-cream-100 rounded-xl p-6 shadow-card text-center">
                <span className="inline-block bg-gold-400 text-white text-lg font-bold px-4 py-2 rounded-lg">
                  {term.code}
                </span>
                <h3 className="font-medium text-dark-800 mt-4">{term.name}</h3>
                <p className="text-sm text-dark-500 mt-2 font-light">{term.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark-900 py-16">
        <div className="container-main page-padding text-center">
          <Globe size={48} className="text-gold-400 mx-auto mb-4" />
          <h2 className="font-display text-3xl text-white">Start Importing Rice with Us</h2>
          <p className="text-cream-100/70 mt-4 max-w-lg mx-auto font-light">
            Whether you're a distributor, importer, or retailer, we have the capacity, certifications, 
            and logistics network to serve your market.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={openQuoteModal}
              className="bg-gold-400 text-white font-medium px-8 py-3.5 rounded-pill hover:bg-gold-600 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            >
              Request Export Quote <ArrowRight size={16} />
            </button>
            <Link
              to="/contact"
              className="border-[1.5px] border-white text-white font-medium px-8 py-3.5 rounded-pill hover:bg-cream-100 hover:text-dark-800 transition-all duration-300"
            >
              Contact Our Export Team
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
