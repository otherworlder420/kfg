import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, MapPin, TrainFront } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { useApp } from "@/context/AppContext";

gsap.registerPlugin(ScrollTrigger);

const PROCESS_DETAILS = [
  {
    number: 0,
    title: "Paddy Receiving",
    description: "We select only high-purity paddy from our trusted contract farming partners across ~2,500 hectares. Every batch is weighed, tested, and traced back to the cooperative and fields that grew it.",
    image: "/images/process/paddy-receiving.jpg",
    equipment: "Weighbridge, Moisture Meter",
    specs: { "Daily Capacity": "1,500+ MT", "Traceability": "100%", "Contract Farms": "~2,500 ha" },
    quality: "Only high-purity paddy from certified cooperatives and fields enters our facility",
  },
  {
    number: 1,
    title: "Paddy Drying",
    description: "All receiving paddy are sent to the dryers to obtain optimal moisture levels for milling and/or short-term storage. Quality starts with properly dried paddy.",
    image: "/images/process/drying.jpg",
    equipment: "Continuous Flow Dryers, Batch Dryers",
    specs: { "Target Moisture": "14%", "Temperature": "50-60\u00B0C", "Duration": "18-20 hours" },
    quality: "Uniform moisture distribution prevents cracking during milling",
  },
  {
    number: 2,
    title: "Husking & Cleaning",
    description: "Dried paddy go through cleaning, de-stoning and de-husking to remove husks, impurities and foreign matters, yielding nutritious brown rice.",
    image: "/images/process/husking.jpg",
    equipment: "Vibro Separators, De-stoners, Rubber Roll Huskers",
    specs: { "Husking Ratio": "85-90%", "De-stoning": ">99% purity", "Capacity": "800+ MT/day" },
    quality: "Gentle husking preserves grain integrity, minimizing broken grains",
  },
  {
    number: 3,
    title: "Rice Whitening",
    description: "Husked brown rice are whitened with Buhler UltraWhite whitening machine, carefully removing the bran layer while preserving grain integrity.",
    image: "/images/process/whitening.jpg",
    equipment: "Buhler UltraWhite Whitening Machine",
    specs: { "Milling Degree": "Well-milled", "Bran Removal": ">95%", "Capacity": "600+ MT/day" },
    quality: "Multi-pass abrasive milling ensures uniform whiteness without excessive breakage",
  },
  {
    number: 4,
    title: "Rice Polishing",
    description: "White rice goes through Satake polishing machines to remove other particles, giving the rice a shinier appearance and premium finish.",
    image: "/images/process/polishing.jpg",
    equipment: "Satake Water Jet Polishers, Mist Polishers",
    specs: { "Polishing": "4-5 Passes", "Gloss Level": "High", "Capacity": "600+ MT/day" },
    quality: "Water polishing creates a pearl-like sheen preferred in premium markets",
  },
  {
    number: 5,
    title: "Color Sorting & Grading",
    description: "A critical stage where foreign materials, immature grains, red streak, yellow and light yellow kernels get sorted and rejected before grading and packaging.",
    image: "/images/process/sorting.jpg",
    equipment: "Buhler Sortex Color Sorters, Graders",
    specs: { "Sorting Accuracy": ">99.9%", "Rejection": "<0.5% good grain", "Capacity": "500+ MT/day" },
    quality: "AI Sorting Technology removes even microscopic defects, plastic, metals and glasses foreign materials.",
  },
  {
    number: 6,
    title: "Quality Control",
    description: "Our QC team checks rice quality at every stage of production — moisture, grain length, whiteness, and aroma — ensuring every batch meets the exact specifications our customers expect.",
    image: "/images/process/quality-control.jpg",
    equipment: "Lab Testing Equipment, Moisture Analyzers",
    specs: { "Analysis Methods": "By AI Scanner and Human", "Grain Analysis": "100%", "Traceability": "Complete" },
    quality: "We use AI grain scanner and analyzer to help speed up inspection and accuracy. Every batch is tested before moving to packaging — zero exceptions.",
  },
  {
    number: 7,
    title: "Packaging",
    description: "Flexible packaging options from 0.5kg retail pouches to 50kg export sacks and jumbo bags. Whatever your market needs, we pack it with care and precision.",
    image: "/images/process/packaging.jpg",
    equipment: "Automatic Weighers, Vacuum Sealers, Stitching Machines",
    specs: { "Pack Sizes": "0.5kg to 1 tonne and Loose Bulk", "Formats": "PP, PE, Jute", "Speed": "20+ bags/min" },
    quality: "Accurate weight control and sealed freshness in every bag",
  },
  {
    number: 8,
    title: "Metal Detection",
    description: "Every single bag passes through our metal detection system. It's our final safety check — because quality means nothing without trust.",
    image: "/images/process/metal-detector.jpg",
    equipment: "Inline Metal Detectors",
    specs: { "Sensitivity": "Fe 0.8mm", "Non-Fe": "1.0mm", "Detection": "100%" },
    quality: "Every bag scanned — no exceptions, no compromises",
  },
  {
    number: 9,
    title: "Master Carton",
    description: "Small retail packs are master-packed into sealed carton boxes, ready for supermarket shelves around the world. Neat, secure, and shelf-ready.",
    image: "/images/process/carton-sealer.jpg",
    equipment: "Carton Erectors, Tape Sealers",
    specs: { "Packs per Carton": "10-24", "Sealing": "Hot melt tape", "Labeling": "Barcode + info" },
    quality: "Export-grade cartons that protect product integrity in transit",
  },
  {
    number: 10,
    title: "Container Loading",
    description: "Finished goods are loaded directly into shipping containers at our facility. We lay out carton papers, silica gels, and plastic cover at the back of the container to protect the rice during transit.",
    image: "/images/process/container-loading.jpg",
    equipment: "Forklifts, Loading Ramps",
    specs: { "Container Types": "20ft, 40ft", "Loading": "FCL only", "Daily Capacity": "4-6 TEU" },
    quality: "Careful loading prevents damage — every container is sealed on-site",
  },
  {
    number: 11,
    title: "Lift to Train",
    description: "Containers are lifted onto railway flatcars right at our facility. No trucking, no delays — just a smooth transfer from mill to rail.",
    image: "/images/process/container-train.jpg",
    equipment: "Gantry Cranes, Railway Siding",
    specs: { "Transfer Time": "<30 min", "Rail Gauge": "1,000mm", "Capacity": "2-3 containers" },
    quality: "Direct mill-to-rail transfer eliminates handling damage risk",
  },
  {
    number: 12,
    title: "Rail to Seaport",
    description: "Our railway-connected logistics carry containers directly to Cambodia's deep seaport. From paddies to port — a seamless supply chain you can count on.",
    image: "/images/process/train-seaport.jpg",
    equipment: "National Railway, Sihanoukville Port Line",
    specs: { "Transit Time": "8-12 hours", "Destination": "Sihanoukville", "Track": "Fully paved" },
    quality: "Reliable scheduling and direct port delivery — no middlemen",
  },
];

const STANDARDS = [
  { label: "ISO 22000", desc: "Food Safety Management" },
  { label: "ISO 9001", desc: "Quality Management" },
  { label: "HACCP", desc: "Hazard Analysis Critical Control Points" },
  { label: "BRCGS", desc: "Global Food Safety Standard" },
  { label: "GMP", desc: "Good Manufacturing Practice" },
  { label: "HALAL", desc: "Islamic Food Standard" },
];

export default function ProcessPage() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { openQuoteModal } = useApp();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const steps = document.querySelectorAll(".process-step");
      steps.forEach((step) => {
        gsap.fromTo(step, { opacity: 0, y: 40 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: step, start: "top 85%", once: true },
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
          <img src="/images/process/whitening.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-800/70" />
        <div className="container-main page-padding relative z-10">
          <SectionLabel label="Our Facility" light />
          <h1 className="font-display text-4xl md:text-5xl text-white mt-4">Our Infrastructure</h1>
          <p className="text-cream-100/70 mt-4 max-w-2xl leading-relaxed font-light">
            Two rice mills in Battambang and Kampong Speu province, each with private railway sidings 
            built into our warehouses and connected directly to Cambodia's deep seaport.
          </p>
        </div>
      </div>

      {/* Rice Mills & Railway Network */}
      <section className="bg-cream-200 py-16">
        <div className="container-main page-padding">
          <div className="text-center mb-12">
            <SectionLabel label="Infrastructure" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">Two Mills, One Seamless Network</h2>
            <p className="text-dark-600 mt-4 max-w-3xl mx-auto font-light">
              Our two rice mills are strategically located in Cambodia's key rice-growing regions and are linked by a dedicated railway network.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Battambang Mill */}
            <div className="bg-cream-100 rounded-xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-gold-400" size={24} />
                <h3 className="font-display text-xl font-medium text-dark-800">Battambang Rice Mill</h3>
              </div>
              <p className="text-dark-600 font-light mb-4">
                Located in Battambang province, in the heart of Cambodia's northwestern rice bowl.
              </p>
              <a
                href="https://maps.app.goo.gl/iYj3MJ8LZFSsC54eA"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gold-400 hover:underline"
              >
                View on Google Maps <ArrowRight size={14} />
              </a>
            </div>

            {/* Kampong Speu Mill */}
            <div className="bg-cream-100 rounded-xl p-8 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="text-gold-400" size={24} />
                <h3 className="font-display text-xl font-medium text-dark-800">Kampong Speu Rice Mill</h3>
              </div>
              <p className="text-dark-600 font-light mb-4">
                Located in Kampong Speu province, with direct access to the national railway line and seaport connection.
              </p>
              <a
                href="https://maps.app.goo.gl/6mzU837Chiu1Nn9a8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gold-400 hover:underline"
              >
                View on Google Maps <ArrowRight size={14} />
              </a>
            </div>
          </div>

          <div className="bg-dark-900 rounded-xl p-8 text-center">
            <TrainFront size={48} className="text-gold-400 mx-auto mb-4" />
            <h3 className="font-display text-2xl text-white mb-4">Private Railway Sidings</h3>
            <p className="text-cream-100/70 max-w-3xl mx-auto font-light leading-relaxed">
              Both mills feature private railway sidings built directly into our warehouses, connecting the two facilities together and linking them directly to Cambodia's deep seaport. This integrated rail infrastructure enables us to export huge volumes efficiently — up to <strong className="text-white">300 containers per week</strong>.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-cream-100 py-16">
        <div className="container-main page-padding">
          <div className="text-center mb-12">
            <SectionLabel label="Milling Process" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">Our Process Flow</h2>
            <p className="text-dark-600 mt-4 max-w-2xl mx-auto font-light">
              Our milling lines are equipped with Buhler and Satake machinery, featuring state-of-the-art
              technology from paddy intake to container export. 13 steps from farm to port.
            </p>
          </div>
          <div className="relative">
            {/* Center line - desktop only */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gold-100 -translate-x-1/2" />

            {PROCESS_DETAILS.map((step, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={step.number}
                  className={`process-step relative grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 last:mb-0 items-center`}
                >
                  {/* Image */}
                  <div className={`${isLeft ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="rounded-xl overflow-hidden shadow-card group">
                      <img
                        src={step.image}
                        alt={step.title}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-600"
                        loading="lazy"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`${isLeft ? "lg:order-2 lg:pl-12" : "lg:order-1 lg:pr-12"}`}>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="w-16 h-12 rounded-full bg-gold-400 flex items-center justify-center text-white text-xs font-medium uppercase tracking-wider shrink-0">
                        Step {step.number}
                      </span>
                      <div>
                        <h2 className="font-display text-2xl font-medium text-dark-800">{step.title}</h2>
                        <p className="text-xs text-dark-400">{step.equipment}</p>
                      </div>
                    </div>
                    <p className="text-dark-600 leading-relaxed font-light">{step.description}</p>

                    {/* Specs */}
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {Object.entries(step.specs).map(([key, value]) => (
                        <div key={key} className="bg-cream-200 rounded-lg p-3 text-center">
                          <p className="text-xs text-dark-400">{key}</p>
                          <p className="text-sm font-medium text-dark-800">{value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Quality Note */}
                    <div className="mt-4 flex items-start gap-3 bg-cream-100 border border-gold-100 rounded-lg p-4">
                      <CheckCircle size={18} className="text-gold-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-dark-700">{step.quality}</p>
                    </div>
                  </div>

                  {/* Center dot - desktop */}
                  <div className="hidden lg:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-gold-400 border-4 border-white shadow-lg" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="bg-cream-200 py-16">
        <div className="container-main page-padding">
          <div className="text-center mb-12">
            <SectionLabel label="Certifications" />
            <h2 className="font-display text-3xl font-medium text-dark-800 mt-4">Quality Standards & Certifications</h2>
            <p className="text-dark-600 mt-4 max-w-2xl mx-auto font-light">
              Our facilities maintain the highest international standards, ensuring every grain meets global food safety requirements.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {STANDARDS.map((s) => (
              <div key={s.label} className="bg-cream-100 rounded-xl p-6 text-center shadow-card">
                <CheckCircle size={32} className="text-gold-400 mx-auto mb-3" />
                <p className="font-medium text-dark-800 text-sm">{s.label}</p>
                <p className="text-xs text-dark-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-dark-900 py-16">
        <div className="container-main page-padding text-center">
          <h2 className="font-display text-3xl text-white">See Our Process in Action</h2>
          <p className="text-cream-100/70 mt-4 max-w-lg mx-auto font-light">
            Schedule a virtual or in-person facility tour with our team to see how we process Cambodia's finest rice.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <button
              onClick={openQuoteModal}
              className="bg-gold-400 text-white font-medium px-8 py-3.5 rounded-pill hover:bg-gold-600 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            >
              Request a Facility Tour <ArrowRight size={16} />
            </button>
            <Link
              to="/contact"
              className="border-[1.5px] border-white text-white font-medium px-8 py-3.5 rounded-pill hover:bg-cream-100 hover:text-dark-800 transition-all duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
