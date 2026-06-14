import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { ArrowLeft, ArrowRight, Check, Leaf, Award, Clock, Ruler, Palette, Wind, Wheat } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { PRODUCTS } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";

// Nutrition row with formatting
interface NutritionRow {
  label: string;
  serving: string;
  per100g: string;
  bold?: boolean;
  italic?: boolean;
  indent?: number;
  line?: "bold" | "thin" | "none";
  hide100g?: boolean;
}

interface ProductSpec {
  id: string;
  specs: Record<string, string>;
  nutrition: NutritionRow[];
  features: string[];
  certifications: string[];
  packaging: string[];
  applications: string[];
}

// US-style FDA nutrition rows
function makeNutritionRows(): NutritionRow[] {
  return [
    { label: "Total Fat", serving: "0.3g", per100g: "0.6g", bold: true, line: "none" },
    { label: "Saturated Fat", serving: "0g", per100g: "0g", indent: 1, line: "none" },
    { label: "Trans Fat", serving: "0g", per100g: "0g", indent: 1, line: "thin" },
    { label: "Cholesterol", serving: "0mg", per100g: "0mg", bold: true, line: "none" },
    { label: "Sodium", serving: "3.9mg", per100g: "91.0mg", bold: true, line: "thin" },
    { label: "Total Carbohydrate", serving: "35.9g", per100g: "79.7g", bold: true, line: "none" },
    { label: "Dietary Fiber", serving: "1.5g", per100g: "3.3g", indent: 1, line: "none" },
    { label: "Total Sugars", serving: "0g", per100g: "0g", indent: 1, line: "none" },
    { label: "Includes 0g Added Sugars", serving: "", per100g: "", indent: 2, line: "thin", hide100g: true },
    { label: "Protein", serving: "0.3g", per100g: "0.7g", bold: true, line: "thin" },
    { label: "Vitamin D", serving: "0mcg", per100g: "0mcg", line: "none" },
    { label: "Calcium", serving: "1.8mg", per100g: "4.0mg", line: "none" },
    { label: "Iron", serving: "0.4mg", per100g: "0.8mg", line: "none" },
    { label: "Potassium", serving: "26.0mg", per100g: "57.8mg", line: "none" },
    { label: "Vitamin A", serving: "0mcg", per100g: "0mcg", line: "none" },
    { label: "Vitamin B1", serving: "0mg", per100g: "0mg", line: "none" },
    { label: "Vitamin B2", serving: "0mg", per100g: "0mg", line: "none" },
  ];
}

// Specs in display order: Average Grain Length above Moisture
function makeSpecs(options: {
  length: string;
  shape: string;
  color: string;
  fragrance: string;
  season: string;
  crop: string;
  milling: string;
}): Record<string, string> {
  return {
    "Average Grain Length": options.length,
    "Grain Shape": options.shape,
    "Color": options.color,
    "Fragrance": options.fragrance,
    "Season": options.season,
    "Crop Cycle": options.crop,
    "Moisture": "14.0% max",
    "Broken (basic 3/4 grain)": "5.0% max",
    "Red/Red streaked kernels": "0.5% max",
    "Yellow kernels": "0.8% max",
    "Chalky kernels (basic 3/4 grain)": "3.0% max",
    "Immature kernels": "0.2% max",
    "Foreign matter/Mineral impurities": "0.3% max",
    "Damaged kernels": "0.5% max",
    "Paddy": "1 grain per kg max",
    "Glutinous rice": "0.5% max",
    "Rice texture after cooking": "Soft and remain soft",
    "Milling degree": options.milling,
    "Origin": "Cambodia",
  };
}

const PRODUCT_DETAILS: Record<string, ProductSpec> = {
  "phka-rumduol": {
    id: "phka-rumduol",
    specs: {
      "Average Grain Length": "\u22657.0mm",
      "Grain Shape": "Long",
      "Color": "White, Translucent",
      "Fragrance": "Natural Jasmine",
      "Season": "Wet (Dec-Jan)",
      "Crop Cycle": "1 per year",
      "Moisture": "\u226414.0%",
      "Broken (basic 3/4 grain)": "\u22645.0%",
      "Red/Red streaked kernels": "\u22640.4%",
      "Yellow kernels": "\u22640.3%",
      "Chalky kernels (basic 3/4 grain)": "\u22643.0%",
      "Immature kernels": "\u22640.1%",
      "Foreign matter/Mineral impurities": "\u22640.1%",
      "Damaged kernels": "\u22640.3%",
      "Paddy": "\u22641 grains per kg",
      "Glutinous rice": "\u22640.1%",
      "Rice texture after cooking": "Soft and remain soft",
      "Milling degree": "Well milled, double polished & sortexed",
      "Origin": "Cambodia",
    },
    nutrition: makeNutritionRows(),
    features: ["World's Best Rice Award Winner", "Extra-long slender grains", "Natural jasmine aroma", "Soft, fluffy texture when cooked", "Premium export grade"],
    certifications: ["ISO 22000", "HACCP", "BRCGS", "HALAL"],
    packaging: ["5kg Bag", "10kg Bag", "25kg PP Bag", "50kg PP Bag", "1-Tonne Jumbo Bag"],
    applications: ["Premium retail", "High-end restaurants", "Airline catering", "Gift packaging"],
  },
  "sen-kro-oub": {
    id: "sen-kro-oub",
    specs: makeSpecs({
      length: "7.20mm min",
      shape: "Long",
      color: "White",
      fragrance: "Natural Jasmine",
      season: "Dry (Apr-May)",
      crop: "1 per year",
      milling: "Well-milled, double polished and sortexed",
    }),
    nutrition: makeNutritionRows(),
    features: ["Cambodia's signature aromatic rice", "Long, soft grains", "Delicate natural scent", "Harvested in dry season", "High export demand"],
    certifications: ["ISO 22000", "HACCP", "GMP", "HALAL"],
    packaging: ["5kg Bag", "10kg Bag", "25kg PP Bag", "50kg PP Bag", "1-Tonne Jumbo Bag"],
    applications: ["Export markets", "Restaurant chains", "Bulk retail", "Wholesale distribution"],
  },
  "sro-nge": {
    id: "sro-nge",
    specs: makeSpecs({
      length: "7.40mm min",
      shape: "Long",
      color: "White",
      fragrance: "Slight",
      season: "Year-round",
      crop: "2-3 per year",
      milling: "Well-milled, double polished and sortexed",
    }),
    nutrition: makeNutritionRows(),
    features: ["Year-round availability", "Consistent quality", "Reliable supply", "2-3 harvests annually", "Versatile usage"],
    certifications: ["ISO 22000", "HACCP", "ISO 9001", "HALAL"],
    packaging: ["5kg Bag", "10kg Bag", "25kg PP Bag", "50kg PP Bag", "1-Tonne Jumbo Bag"],
    applications: ["General retail", "Food service", "Processing", "Re-exports"],
  },
  "om5451": {
    id: "om5451",
    specs: makeSpecs({
      length: "6.40mm min",
      shape: "Medium",
      color: "White",
      fragrance: "None",
      season: "Year-round",
      crop: "2-3 per year",
      milling: "Well-milled, double polished and sortexed",
    }),
    nutrition: makeNutritionRows(),
    features: ["High-yielding variety", "Cost-effective", "Firm texture", "Non-fragrant", "Bulk export favorite"],
    certifications: ["ISO 22000", "HACCP", "GMP"],
    packaging: ["25kg PP Bag", "50kg PP Bag", "1-Tonne Jumbo Bag", "Loose Loading", "Break Bulk"],
    applications: ["Bulk export", "Food processing", "General consumption"],
  },
  "brown-rice": {
    id: "brown-rice",
    specs: makeSpecs({
      length: "6.50mm min",
      shape: "Medium",
      color: "Brown (Bran intact)",
      fragrance: "None",
      season: "Varies by source",
      crop: "Varies",
      milling: "Semi-Milled",
    }),
    nutrition: [
      { label: "Calories", serving: "370 kcal/100g", per100g: "" },
      { label: "Carbohydrates", serving: "77g", per100g: "" },
      { label: "Protein", serving: "7.9g", per100g: "" },
      { label: "Fat", serving: "2.9g", per100g: "" },
      { label: "Fiber", serving: "3.5g", per100g: "" },
      { label: "Iron", serving: "1.5mg", per100g: "" },
    ],
    features: ["Nutrient-rich whole grain", "High fiber content", "Natural bran layer intact", "Health-conscious choice", "Ideal for reprocessing"],
    certifications: ["ISO 22000", "HACCP", "Organic available"],
    packaging: ["1kg Bag", "5kg Bag", "25kg PP Bag", "50kg PP Bag"],
    applications: ["Health food market", "Rice bran oil extraction", "Nutritional products", "Specialty retail"],
  },
  "red-jasmine": {
    id: "red-jasmine",
    specs: makeSpecs({
      length: "7.00mm min",
      shape: "Long",
      color: "Red/Brown",
      fragrance: "None",
      season: "Wet (Dec-Jan)",
      crop: "1 per year",
      milling: "Semi-Milled",
    }),
    nutrition: [
      { label: "Calories", serving: "365 kcal/100g", per100g: "" },
      { label: "Carbohydrates", serving: "78g", per100g: "" },
      { label: "Protein", serving: "8g", per100g: "" },
      { label: "Fat", serving: "2.5g", per100g: "" },
      { label: "Fiber", serving: "3.2g", per100g: "" },
      { label: "Iron", serving: "2.0mg", per100g: "" },
    ],
    features: ["Unique Cambodian specialty", "Rich in antioxidants", "Nutty, earthy flavor", "Distinctive red bran layer", "Superfood grain"],
    certifications: ["ISO 22000", "HACCP", "Organic"],
    packaging: ["500g Bag", "1kg Bag", "5kg Bag", "25kg PP Bag"],
    applications: ["Premium health market", "Organic retail", "Specialty restaurants", "Superfood products"],
  },
  "broken-rice": {
    id: "broken-rice",
    specs: makeSpecs({
      length: "<3.0 mm",
      shape: "Broken",
      color: "White",
      fragrance: "None",
      season: "Year-round",
      crop: "N/A",
      milling: "Well-milled, double polished and sortexed",
    }),
    nutrition: makeNutritionRows(),
    features: ["Most economical option", "High starch content", "Easy to cook", "Versatile applications", "Bulk availability"],
    certifications: ["ISO 22000", "HACCP"],
    packaging: ["50kg PP Bag", "1-Tonne Jumbo Bag"],
    applications: ["Brewing industry", "Rice Noodle Production", "Animal feed", "Starch extraction"],
  },
  "neang-khon": {
    id: "neang-khon",
    specs: makeSpecs({
      length: "5.80mm min",
      shape: "Medium",
      color: "White, Pearl-like",
      fragrance: "None",
      season: "Wet season only",
      crop: "1 per year",
      milling: "Well-milled, double polished and sortexed",
    }),
    nutrition: makeNutritionRows(),
    features: ["Cambodian traditional pearl rice", "Wet season crop only", "Medium grain length", "Slightly sticky when cooked", "Naturally sweet flavor"],
    certifications: ["ISO 22000", "HACCP", "GMP", "HALAL"],
    packaging: ["1kg Bag", "5kg Bag", "10kg Bag", "25kg PP Bag", "50kg PP Bag"],
    applications: ["Soups and porridge", "Everyday meals", "Rice Noodle Production", "Regional markets"],
  },
};

const specIcons: Record<string, React.ReactNode> = {
  "Average Grain Length": <Ruler size={14} />,
  "Grain Shape": <Wheat size={14} />,
  "Color": <Palette size={14} />,
  "Fragrance": <Wind size={14} />,
  "Season": <Clock size={14} />,
  "Crop Cycle": <Leaf size={14} />,
  "Moisture": <Check size={14} />,
  "Broken (basic 3/4 grain)": <Check size={14} />,
  "Red/Red streaked kernels": <Check size={14} />,
  "Yellow kernels": <Check size={14} />,
  "Chalky kernels (basic 3/4 grain)": <Check size={14} />,
  "Immature kernels": <Check size={14} />,
  "Foreign matter/Mineral impurities": <Check size={14} />,
  "Damaged kernels": <Check size={14} />,
  "Paddy": <Check size={14} />,
  "Glutinous rice": <Check size={14} />,
  "Rice texture after cooking": <Check size={14} />,
  "Milling degree": <Award size={14} />,
  "Origin": <Check size={14} />,
};

// Check if nutrition is US-style (has bold/italic formatting)
function isUSStyle(nutrition: NutritionRow[]): boolean {
  return nutrition.some((r) => r.bold || r.italic || r.line === "bold");
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { openQuoteModal } = useApp();

  const product = PRODUCTS.find((p) => p.id === id);
  const details = id ? PRODUCT_DETAILS[id] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product || !details) {
    return (
      <div className="pt-[72px] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-dark-800">Product Not Found</h1>
          <p className="text-dark-600 mt-2">The rice variety you are looking for does not exist.</p>
          <Link to="/rice-varieties" className="text-gold-400 font-medium mt-4 inline-block link-underline">
            Back to Rice Varieties
          </Link>
        </div>
      </div>
    );
  }

  const currentIndex = PRODUCTS.findIndex((p) => p.id === id);
  const related = [
    PRODUCTS[(currentIndex + 1) % PRODUCTS.length],
    PRODUCTS[(currentIndex + 2) % PRODUCTS.length],
  ];

  const usStyle = isUSStyle(details.nutrition);

  return (
    <div className="pt-[72px]">
      <Helmet>
        <title>{`${product.name} | Khmer Foods Group`}</title>
        <meta name="description" content={product.description} />
        <link rel="canonical" href={`https://khmerfoods.com/#/products/${product.id}`} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={product.name} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={`https://khmerfoods.com${product.image}`} />
      </Helmet>
      {/* Breadcrumb */}
      <div className="bg-cream-200 border-b border-dark-200">
        <div className="container-main page-padding py-3 flex items-center gap-2 text-sm">
          <Link to="/" className="text-dark-600 hover:text-dark-800 transition-colors">Home</Link>
          <span className="text-dark-400">/</span>
          <Link to="/rice-varieties" className="text-dark-600 hover:text-dark-800 transition-colors">Rice Varieties</Link>
          <span className="text-dark-400">/</span>
          <span className="text-dark-800 font-medium">{product.name}</span>
        </div>
      </div>

      {/* Hero Product Section */}
      <section className="bg-cream-100 py-16">
        <div className="container-main page-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Product Image */}
            <div className="rounded-xl overflow-hidden shadow-card">
              <OptimizedImage src={product.image} alt={product.name} width={800} height={600} className="w-full aspect-[4/3] object-cover" />
            </div>

            {/* Product Info */}
            <div>
              <SectionLabel label="Premium Cambodian Rice" />
              <h1 className="font-display text-3xl md:text-4xl font-medium text-dark-800 mt-3">{product.name}</h1>
              <p className="text-dark-600 mt-4 leading-relaxed font-light">{product.description}</p>

              <div className="mt-6 space-y-3">
                {details.features.map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                      <Check size={12} className="text-gold-400" />
                    </div>
                    <span className="text-sm text-dark-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {details.certifications.map((cert) => (
                  <span key={cert} className="px-3 py-1.5 bg-cream-200 text-dark-700 text-xs font-medium rounded-pill border border-dark-200">{cert}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <button onClick={openQuoteModal} className="bg-gold-400 text-white font-medium px-8 py-3.5 rounded-pill hover:bg-gold-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
                  Request a Quote
                </button>
                <Link to="/contact" className="flex items-center gap-2 border-[1.5px] border-dark-800 text-dark-800 font-medium px-8 py-3.5 rounded-pill hover:bg-dark-800 hover:text-cream-100 transition-all duration-300">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specifications & Nutrition */}
      <section className="bg-cream-200 py-16">
        <div className="container-main page-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Technical Specs */}
            <div className="bg-cream-100 rounded-xl p-8 shadow-card">
              <h2 className="font-display text-2xl font-medium text-dark-800 mb-6">Technical Specifications</h2>
              <div className="space-y-0">
                {Object.entries(details.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between py-[6px] border-b border-cream-200 last:border-0">
                    <div className="flex items-center gap-2 text-dark-500 text-xs">
                      <span className="text-gold-400">{specIcons[key] || <Check size={14} />}</span>
                      {key}
                    </div>
                    <span className="text-dark-800 text-xs font-medium text-right max-w-[50%]">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nutrition Facts - US FDA Style */}
            <div className="bg-cream-100 rounded-xl p-8 shadow-card">
              <h2 className="font-display text-2xl font-medium text-dark-800">Nutrition Facts</h2>
              {usStyle ? (
                <>
                  <p className="text-sm text-dark-600 mt-1">Serving Size: <strong>1/4 cup (45g)</strong></p>
                  {/* Header row */}
                  <div className="grid grid-cols-[1fr_100px_100px] gap-2 pb-2 border-b-2 border-dark-800 mt-4 mb-0">
                    <span></span>
                    <span className="text-xs font-semibold text-dark-600 uppercase tracking-wider text-center leading-tight">Quantity Per Serving</span>
                    <span className="text-xs font-semibold text-dark-600 uppercase tracking-wider text-center leading-tight">Quantity Per 100g</span>
                  </div>
                  {/* Rows */}
                  {details.nutrition.map((row, idx) => {
                    const indentClass = row.indent === 2 ? "pl-8" : row.indent === 1 ? "pl-4" : "";
                    const fontClass = row.bold ? "font-bold text-dark-900" : row.italic ? "italic text-dark-600" : "text-dark-700";
                    const lineClass = row.line === "bold" ? "border-b-2 border-dark-800" : row.line === "thin" ? "border-b border-dark-300" : "";

                    return (
                      <div key={idx} className={`grid grid-cols-[1fr_100px_100px] gap-2 py-1.5 ${lineClass}`}>
                        <span className={`text-sm ${indentClass} ${fontClass}`}>{row.label}</span>
                        <span className={`text-sm text-center ${fontClass}`}>{row.hide100g ? "" : row.serving}</span>
                        <span className={`text-sm text-center ${fontClass}`}>{row.hide100g ? "" : row.per100g}</span>
                      </div>
                    );
                  })}
                </>
              ) : (
                <>
                  <p className="text-xs text-dark-400 mb-4">Per 100g serving (raw)</p>
                  <div className="space-y-4">
                    {details.nutrition.map((row, idx) => (
                      <div key={idx} className="flex items-center justify-between py-3 border-b border-cream-200 last:border-0">
                        <span className="text-dark-500 text-sm">{row.label}</span>
                        <span className="text-dark-800 text-sm font-medium">{row.serving}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Packaging & Applications */}
      <section className="bg-cream-100 py-16">
        <div className="container-main page-padding">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display text-2xl font-medium text-dark-800 mb-6">Packaging Options</h2>
              <div className="grid grid-cols-2 gap-3">
                {details.packaging.map((pkg) => (
                  <div key={pkg} className="bg-cream-200 rounded-lg p-4 text-center">
                    <span className="text-sm font-medium text-dark-700">{pkg}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="font-display text-2xl font-medium text-dark-800 mb-6">Target Applications</h2>
              <div className="flex flex-wrap gap-3">
                {details.applications.map((app) => (
                  <span key={app} className="px-4 py-2 bg-gold-400/10 text-dark-700 text-sm rounded-pill border border-gold-100">{app}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      <section className="bg-cream-200 py-16">
        <div className="container-main page-padding">
          <h2 className="font-display text-2xl font-medium text-dark-800 mb-8">Related Rice Varieties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rp) => (
              <Link to={`/products/${rp.id}`} key={rp.id} className="group flex gap-4 bg-cream-100 rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all duration-300">
                <OptimizedImage src={rp.image} alt={rp.name} width={96} height={96} className="w-24 h-24 rounded-lg object-cover shrink-0" />
                <div>
                  <h3 className="font-display text-lg font-medium text-dark-800 group-hover:text-gold-500 transition-colors">{rp.name}</h3>
                  <p className="text-sm text-dark-600 mt-1 line-clamp-2">{rp.description}</p>
                  <span className="inline-flex items-center gap-1 text-gold-400 text-sm mt-2 font-medium">View Details <ArrowRight size={14} /></span>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/rice-varieties" className="inline-flex items-center gap-2 text-dark-700 hover:text-gold-400 transition-colors font-medium">
              <ArrowLeft size={16} /> Back to All Rice Varieties
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
