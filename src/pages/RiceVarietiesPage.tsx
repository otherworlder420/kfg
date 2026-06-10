import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";

gsap.registerPlugin(ScrollTrigger);

// Extended product data with specs
interface ProductSpec {
  id: string;
  name: string;
  description: string;
  image: string;
  specs: {
    season: string;
    crop: string;
    length: string;
    color: string;
    shape: string;
    fragrance: string;
  };
  category: string;
}

const PRODUCT_SPECS: ProductSpec[] = [
  {
    id: "phka-rumduol",
    name: "Phka Rumduol Jasmine Rice",
    description: "Cambodia's premium fragrant rice. Long, glossy, translucent grains with exquisite natural aroma. Seasonal wet crop, one harvest per year. World's Best Rice winner.",
    image: "/images/products/phka-rumduol.jpg",
    specs: { season: "Wet (Dec-Jan)", crop: "1 per year", length: ">7.0 mm", color: "White", shape: "Slender", fragrance: "Natural" },
    category: "Fragrant",
  },
  {
    id: "sen-kro-oub",
    name: "Sen Kro Oub (SKO) Rice",
    description: "Premium dry-season fragrant rice. Long, soft grains with a delicate natural scent. Harvested April-May. Cambodia's signature aromatic variety for export.",
    image: "/images/products/sko-rice.jpg",
    specs: { season: "Dry (Apr-May)", crop: "1 per year", length: ">7.0 mm", color: "White", shape: "Slender", fragrance: "Natural" },
    category: "Fragrant",
  },
  {
    id: "sro-nge",
    name: "Sro Nge (SRO) Rice",
    description: "Non-seasonal fragrant white rice. 2-3 harvests per year with long, soft grains and a naturally pleasant aroma. Reliable year-round supply.",
    image: "/images/products/sro-rice.jpg",
    specs: { season: "Year-round", crop: "2-3 per year", length: "7.40mm min", color: "White", shape: "Slender", fragrance: "Natural" },
    category: "Fragrant",
  },
  {
    id: "om5451",
    name: "OM5451 White Rice",
    description: "High-yielding medium-long grain variety. Firm, white, non-fragrant. Year-round crop with 2-3 harvests per year. Popular for bulk export.",
    image: "/images/products/om5451-white.jpg",
    specs: { season: "Year-round", crop: "2-3 per year", length: "6.40mm min", color: "White", shape: "Medium", fragrance: "None" },
    category: "White Rice",
  },
  {
    id: "brown-rice",
    name: "Premium Brown Rice",
    description: "Sortexed semi-milled rice from Phka Rumduol, SKO or white rice varieties. Nutrient-rich whole grain for health-conscious markets and reprocessing plants.",
    image: "/images/products/brown-rice.jpg",
    specs: { season: "Varies", crop: "Varies", length: ">6.5 mm", color: "Brown", shape: "Medium", fragrance: "Mild" },
    category: "Specialty",
  },
  {
    id: "red-jasmine",
    name: "Red Jasmine Rice",
    description: "A distinctive Cambodian specialty with a reddish bran layer. Nutty flavor with the aromatic qualities of jasmine rice. Unique superfood grain for premium markets.",
    image: "/images/products/red-jasmine.jpg",
    specs: { season: "Wet (Dec-Jan)", crop: "1 per year", length: "7.00mm min", color: "Red/Brown", shape: "Slender", fragrance: "Nutty" },
    category: "Specialty",
  },
  {
    id: "broken-rice",
    name: "100% Broken Rice",
    description: "Fragments from the milling process, ideal for brewing, rice flour production, animal feed, and industrial applications. Cost-effective and versatile.",
    image: "/images/products/broken-rice.jpg",
    specs: { season: "Year-round", crop: "N/A", length: "<3.0 mm", color: "White", shape: "Fragments", fragrance: "None" },
    category: "Industrial",
  },
  {
    id: "neang-khon",
    name: "Neang Khon (Pearl Rice)",
    description: "A beloved Cambodian traditional white rice, also known as Pearl Rice. Neang Khon is a wet-season crop with medium grain length, prized for its slightly sticky texture and naturally sweet flavor. Popular in rural households across Cambodia's fertile northern regions.",
    image: "/images/products/neang-khon.jpg",
    specs: { season: "Wet (Dec-Jan)", crop: "1 per year", length: "5.80mm min", color: "White", shape: "Medium", fragrance: "Non-fragrant" },
    category: "White Rice",
  },
];

const CATEGORIES = ["All", "Fragrant", "White Rice", "Specialty", "Industrial"];

export default function RiceVarietiesPage() {
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = PRODUCT_SPECS.filter((p) => {
    const matchCategory = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(headerRef.current.children, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1,
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", once: true },
        });
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pt-[72px]">
      {/* Hero Banner */}
      <div className="relative bg-dark-900 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/hero-background.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-800/70" />
        <div className="container-main page-padding relative z-10">
          <SectionLabel label="Our Products" light />
          <h1 className="font-display text-4xl md:text-5xl text-white mt-4">Rice Varieties</h1>
          <p className="text-cream-100/70 mt-4 max-w-2xl leading-relaxed font-light">
            From premium fragrant jasmine to versatile broken rice, we offer Cambodia's finest rice varieties 
            for every market need. Each variety is carefully cultivated, processed, and quality-certified.
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-[72px] z-40 bg-cream-100 border-b border-dark-200 shadow-sm">
        <div className="container-main page-padding py-4 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-400" />
            <input
              type="text"
              placeholder="Search rice varieties..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-dark-200 rounded-lg text-sm text-dark-800 placeholder:text-dark-300 outline-none input-gold"
            />
          </div>
          {/* Category Filters */}
          <div className="flex items-center gap-2 overflow-x-auto">
            <SlidersHorizontal size={16} className="text-dark-600 shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-pill text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-gold-400 text-white"
                    : "bg-cream-200 text-dark-700 hover:bg-dark-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="container-main page-padding py-16">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((product) => (
            <Link
              to={`/products/${product.id}`}
              key={product.id}
              className="group bg-cream-100 rounded-xl border border-dark-200 shadow-card overflow-hidden hover:-translate-y-1 hover:shadow-card-hover transition-all duration-400"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-cream-200 text-dark-800 text-xs font-medium rounded-pill">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-display text-xl font-medium text-dark-800 group-hover:text-gold-500 transition-colors">
                  {product.name}
                </h3>
                <p className="text-sm text-dark-600 mt-2 leading-relaxed line-clamp-2">
                  {product.description}
                </p>

                {/* Specs Table */}
                <div className="mt-4 border-t border-dark-200 pt-4">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                    <div><span className="text-dark-400">Season:</span> <span className="text-dark-700">{product.specs.season}</span></div>
                    <div><span className="text-dark-400">Length:</span> <span className="text-dark-700">{product.specs.length}</span></div>
                    <div><span className="text-dark-400">Color:</span> <span className="text-dark-700">{product.specs.color}</span></div>
                    <div><span className="text-dark-400">Fragrance:</span> <span className="text-dark-700">{product.specs.fragrance}</span></div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 text-gold-400 text-sm font-medium">
                  <span className="link-underline">View Full Details</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-dark-500 text-lg">No rice varieties found matching your criteria.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearchQuery(""); }}
              className="mt-4 text-gold-400 font-medium hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
