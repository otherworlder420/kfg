// ============================================================
// KHMER FOODS GROUP — WEBSITE CONTENT CONFIGURATION
// ============================================================
// This file contains ALL website content, colors, and copy.
// Edit text strings here to update the entire website.
//
// Tone: Warm, authentic, family-rooted Cambodian rice heritage
// Since 1994 — From Cambodia's fields to the world
// ============================================================

// --- FORM SUBMISSION ---
export const FORM_ENDPOINT = "https://formsubmit.co/ajax/bunsannkim@khmerfoods.com";

// --- COMPANY INFO ---
export const COMPANY = {
  name: "Khmer Foods Group",
  fullName: "Khmer Foods Group Co., Ltd.",
  tagline: "Three generations of Cambodian rice heritage. From contract farm to global export.",
  subTagline: "Since 1994 — Serving you quality rice with heart",
  email: "rice@khmerfoods.com",
  formEmail: "bunsannkim@khmerfoods.com",
  phone: "+855 12 977-888",
  address: "#9021, National Road No.3, Prey Totueng Village, Preah Nipean Commune, Kong Pisei District, Kampong Speu Province, Cambodia",
  mapUrl: "https://maps.app.goo.gl/6mzU837Chiu1Nn9a8",
  year: 2026,
  founded: 1994,
  firstMill: 1999,
  firstExport: 2009,
  yearsInBusiness: 32,
  contractFarmingHectares: 2500,
  logo: "/images/khmer-logo.png",
  logoWhite: "/images/khmer-logo-white.png",
} as const;

// --- HERO ---
export const HERO = {
  label: "Khmer Foods Group - A Leading Rice Producer and Exporter",
  title: "From Cambodia's Fields to the World",
  description:
    "Milling Cambodia's finest rice since 1994, our company delivers three decades of trusted quality on behalf of local farmers.",
  primaryCta: "Explore Our Rice",
  secondaryCta: "Watch Video",
  video: "/videos/hero-train.mp4",
} as const;

// --- ABOUT US (Homepage) ---
export const ABOUT_SECTION = {
  label: "Our Story",
  title: "Three Decades of Rice, From Humble Beginnings",
  paragraphs: [
    "Founded in 1994, Khmer Foods Group began as a small family trading business in local Cambodian markets. Built on patience, hard work, and deep respect for our farmers, we established generational relationships that remain our foundation today.",
    "By 1999, we had established our first milling facility. For 32 years now, we've been refining our craft — learning every detail of what makes Cambodian rice some of the finest in the world. We began exporting to the European Union countries in 2009, and today our rice reaches families across six continents.",
    "We work hand-in-hand with contract farming cooperatives across Cambodia, ensuring a reliable supply of high-quality paddy while supporting the communities that have been part of our journey from the very beginning.",
  ],
  stats: [
    { value: "32", label: "Years in Rice" },
    { value: "1994", label: "Founded" },
    { value: "2009", label: "First Export" },
    { value: "50+", label: "Countries" },
  ],
  image: "/images/family-heritage.jpg",
} as const;

// --- NAVIGATION ---
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Story", href: "/about" },
  { label: "Our Rice", href: "/rice-varieties" },
  { label: "Our Process", href: "/process" },
  { label: "Global Reach", href: "/global-reach" },
  { label: "News", href: "/news" },
  { label: "Get in Touch", href: "/contact" },
] as const;

// --- PRODUCTS ---
export const PRODUCT_SECTION = {
  label: "Milled with Care",
  title: "Our Products",
  description:
    "We select, harvest, and process every grain with the highest standard of family care. To support your market requirements, our entire portfolio is available under your private label (OEM), featuring tailored packaging and end-to-end logistics solutions.",
} as const;

export const PRODUCTS = [
  {
    id: "phka-rumduol",
    name: "Phka Rumduol Rice",
    description: "Cambodia's crown jewel — a fragrant jasmine rice so exquisite it has been crowned World's Best Rice seven times. Each grain is long, glossy, and carries the natural perfume of our wet-season paddies.",
    image: "/images/products/phka-rumduol.jpg",
  },
  {
    id: "sen-kro-oub",
    name: "Sen Kra Ob (SKO 01) Rice",
    description: "A dry-season treasure. Harvested under the warm April sun, these long, soft grains carry a delicate natural scent that reminds us of home. Cambodia's most beloved aromatic variety.",
    image: "/images/products/sko-rice.jpg",
  },
  {
    id: "sro-nge",
    name: "Sro Nge (SRO) Rice",
    description: "A reliable favorite — fragrant white rice that gives two to three harvests a year. Always there when you need it, with that same pleasant aroma Cambodian grandmothers have cherished for generations.",
    image: "/images/products/sro-rice.jpg",
  },
  {
    id: "om5451",
    name: "OM5451 White Rice",
    description: "The workhorse of Cambodian fields — firm, white, and wonderfully versatile. This high-yielding variety has fed countless families and remains a favorite for bulk export to communities worldwide.",
    image: "/images/products/om5451-white.jpg",
  },
  {
    id: "brown-rice",
    name: "Premium Brown Rice",
    description: "Nutrient-rich whole grain with the bran layer lovingly left intact. Milled from our finest Phka Rumduol and SKO varieties — wholesome, hearty, and full of the earth's goodness.",
    image: "/images/products/brown-rice.jpg",
  },
  {
    id: "red-jasmine",
    name: "Red Jasmine Rice",
    description: "A rare Cambodian gem with a beautiful reddish bran layer and a nutty, earthy flavor. This distinctive grain connects you to centuries of Cambodian agricultural tradition.",
    image: "/images/products/red-jasmine.jpg",
  },
  {
    id: "broken-rice",
    name: "100% Broken Rice",
    description: "Nothing goes to waste in our mill. These tender fragments — born from the milling process — find new life in brewing, rice flour, and nourishing dishes around the world.",
    image: "/images/products/broken-rice.jpg",
  },
  {
    id: "neang-khon",
    name: "Neang Khon",
    description: "A beloved Cambodian traditional white rice, also known as Pearl Rice. Neang Khon is a wet-season crop with medium grain length, prized for its slightly sticky texture and naturally sweet flavor. Popular in rural households across Cambodia's fertile northern regions, it's ideal for soups, porridge, and everyday family meals.",
    image: "/images/products/neang-khon.jpg",
  },
] as const;

// --- SUSTAINABLE FARMING ---
export const FARMING_SECTION = {
  label: "Paddy Contract Farming",
  title: "Scalable Agronomy. Structured Impact.",
  subtitle: "Our contract farming partnerships in Kampong Thom Province",
  description:
    "Operating under the strategic framework of the Ministry of Agriculture, our contract farming infrastructure aggregates ~2,500 hectares of managed cooperative cultivation across SKO rice variety SRP farming. We are expanding into Organic Phka Rumduol Jasmine Rice in the coming harvest. We mitigate systemic upstream volatility by integrating smallholder networks into a formalized, high-yield supply chain. For institutional partners, this structure guarantees strict traceability, volume predictability, and verifiable ESG compliance at scale.",
  image: "/images/farmers-paddy.jpg",
  farmerHandsImage: "/images/farmer-hands.jpg",
  aerialImage: "/images/aerial-farms.jpg",
  stats: {
    area: "~2,500",
    areaLabel: "Hectares of Farmland",
    yield: "12,000",
    yieldLabel: "MT per Harvest",
    location: "Kampong Thom Province",
    crops: "SKO, SRO, OM5451",
  },
  kfgObligations: [
    "Provide high-purity seeds to guarantee the best genetic quality",
    "Offer hands-on technical support guided by the Ministry of Agriculture",
    "Purchase every harvest at prices above market rate — our farmers come first",
    "Promote sustainable practices that protect our land for the next generation",
  ],
  farmerObligations: [
    "Cultivate with the same care they'd give their own family's plot",
    "Follow natural guidelines for chemical and pesticide use",
    "Keep residues minimal to ensure every grain is safe and pure",
    "Maintain the integrity that makes Cambodian rice world-renowned",
  ],
  benefits: [
    "Training programs that pass down generations of farming wisdom",
    "Community welfare — better healthcare, schools, and roads for everyone",
    "Economic stability through guaranteed fair prices, rain or shine",
    "A sustainable future for Cambodia's rice-growing communities",
  ],
} as const;

// --- MILLING PROCESS ---
export const MILLING_SECTION = {
  label: "From Paddy to Pure Grain",
  title: "Our Milling Process",
  description:
    "Our mills in Battambang and Kampong Speu province are where tradition meets precision. Using trusted Buhler and Satake machinery — the same equipment that has served quality rice producers for decades — we process every batch with the same care and consistency.",
  supportingText:
    "Our operations maintain strict oversight at every stage of production. Our facilities hold premier international certifications—including BRCGS, ISO 22000, ISO 9001, HACCP, GMP, and HALAL—reflecting an embedded corporate culture of food safety, operational excellence, and total quality management.",
} as const;

export const MILLING_STEPS = [
  {
    step: "Step 0",
    title: "Paddy Receiving",
    description: "We select only high-purity paddy from our trusted contract farming partners across ~2,500 hectares. Every batch is weighed, tested, and traced back to the cooperative and fields that grew it.",
    image: "/images/process/paddy-receiving.jpg",
  },
  {
    step: "Step 1",
    title: "Paddy Drying",
    description: "Freshly harvested paddy is gently dried to target moisture of 14% over 18-20 hours. Too much moisture and the grain cracks. Too little, and it won't mill properly. Our millers know the perfect balance by instinct.",
    image: "/images/process/drying.jpg",
  },
  {
    step: "Step 2",
    title: "Husking & Cleaning",
    description: "The dried paddy passes through our cleaning and husking machines at 800+ MT/day capacity, where husks, stones, and impurities are carefully removed. What remains is beautiful brown rice — nature's gift, gently prepared.",
    image: "/images/process/husking.jpg",
  },
  {
    step: "Step 3",
    title: "Rice Whitening",
    description: "Our Buhler UltraWhite machines process 600+ MT/day, gently removing the bran layer to reveal the pearly white grain beneath. We take our time here — patience is what separates good rice from great rice.",
    image: "/images/process/whitening.jpg",
  },
  {
    step: "Step 4",
    title: "Rice Polishing",
    description: "The Satake polishers apply Triple Polish at 600+ MT/day capacity, giving each grain its signature sheen — a natural glow that tells you this rice was cared for at every step. No shortcuts. No compromises.",
    image: "/images/process/polishing.jpg",
  },
  {
    step: "Step 5",
    title: "Color Sorting & Grading",
    description: "Our AI Sorting Technology at 500+ MT/day capacity removes even microscopic defects, plastic, metals, and glass foreign materials from every single grain. Only the best make it through — because our name is on every bag.",
    image: "/images/process/sorting.jpg",
  },
  {
    step: "Step 6",
    title: "Quality Control",
    description: "Our QC team uses AI grain scanner and analyzer alongside human expertise to check rice quality at every stage — moisture, grain length, whiteness, and aroma — ensuring every batch meets the exact specifications our customers expect with speed and accuracy.",
    image: "/images/process/quality-control.jpg",
  },
  {
    step: "Step 7",
    title: "Packaging",
    description: "Flexible packaging options from 0.5kg retail pouches to 1 tonne bulk bags and loose bulk loading. Whatever your market needs, we pack it with care and precision.",
    image: "/images/process/packaging.jpg",
  },
  {
    step: "Step 8",
    title: "Metal Detector",
    description: "Every single bag passes through our metal detection system. It's our final safety check — because quality means nothing without trust.",
    image: "/images/process/metal-detector.jpg",
  },
  {
    step: "Step 9",
    title: "Master Carton",
    description: "Small retail packs are master-packed into sealed carton boxes, ready for supermarket shelves around the world. Neat, secure, and shelf-ready.",
    image: "/images/process/carton-sealer.jpg",
  },
  {
    step: "Step 10",
    title: "Container Loading",
    description: "Finished goods are loaded directly into shipping containers at our facility. We lay out carton papers, silica gels, and plastic cover at the back of the container to protect the rice during transit.",
    image: "/images/process/container-loading.jpg",
  },
  {
    step: "Step 11",
    title: "Lift to Train",
    description: "Containers are lifted onto railway flatcars right at our facility. No trucking, no delays — just a smooth transfer from mill to rail.",
    image: "/images/process/container-train.jpg",
  },
  {
    step: "Step 12",
    title: "Rail to Seaport",
    description: "Our railway-connected logistics carry containers directly to Cambodia's deep seaport. From paddies to port — a seamless supply chain you can count on.",
    image: "/images/process/train-seaport.jpg",
  },
] as const;

// --- CTA ---
export const CTA_SECTION = {
  title: "Request FOB Pricing & Milling Specs",
  description:
    "Whether you are a regional distributor managing supply security or an international importer sourcing Cambodia's premium grains, our mills deliver verified quality at scale. Backed by 30 years of milling and export excellence, we provide the volume reliability your supply chain demands.",
  primaryCta: "Talk to Our Team",
  secondaryCta: "Let's Chat",
  tertiaryCta: "Send an Email",
} as const;

// --- GLOBAL REACH ---
export const GLOBAL_SECTION = {
  label: "Cambodia Rice Export Markets",
  title: "Europe, Asia, Australia, North America & Africa",
  description:
    "In 2025, Cambodia exported 947,936 tonnes of rice to 82 countries, generating over $602 million in revenue. Khmer Foods Group is proud to be a leading contributor to this growing trade.",
  ctaText: "Learn About Cambodian Rice Export in 2025",
} as const;

export const STATISTICS = [
  { value: 82, suffix: "", label: "Countries We Serve" },
  { value: 948, suffix: "K", label: "Tonnes Shared in 2025" },
  { value: 7238, suffix: "", label: "Rice Shipments from Cambodia" },
  { value: 7, suffix: "x", label: "World's Best Rice Awards" },
] as const;

export const EXPORT_REGIONS = [
  {
    name: "Europe",
    volume: "342,367 MT",
    countries: "France, Netherlands, United Kingdom, Italy, Germany",
  },
  {
    name: "Asia",
    volume: "510,498 MT",
    countries: "China, Malaysia, Hong Kong, Philippines, Vietnam",
  },
  {
    name: "North America",
    volume: "7,201 MT",
    countries: "USA and Canada",
  },
  {
    name: "Oceania",
    volume: "19,376 MT",
    countries: "Australia, New Zealand, New Caledonia, French Polynesia",
  },
  {
    name: "Africa",
    volume: "51,385 MT",
    countries: "Gabon, C\u00F4te d'Ivoire, Ghana, Togo, Guinea",
  },
  {
    name: "Middle East",
    volume: "9,625 MT",
    countries: "Saudi Arabia, Turkey, UAE, Bahrain, Kuwait",
  },
] as const;

// --- CSR ---
export const CSR_SECTION = {
  label: "Giving Back",
  title: "Caring for the Community That Raised Us",
  description:
    "We believe that a business built on the land has a responsibility to the people who live on it. That's why we dedicate a portion of every sale to supporting children, education, and healthcare in the communities that have supported us for three decades.",
  partnerships: [
    {
      name: "Angkor Hospital for Children",
      description:
        "Since 1999, this remarkable hospital in Siem Reap has provided over 2.5 million free medical treatments to Cambodian children. A portion of every Kroya Brand sale goes directly to keeping their doors open — because every child deserves a healthy start.",
      image: "/images/csr-hospital.jpg",
      since: "Proud supporters since 2024",
    },
    {
      name: "Kirirom Coconut School",
      description:
        "Nestled in the mountains of Kampong Speu, this innovative school gives children in remote areas access to education, life skills, and hope. Our rice donations help keep their students nourished and their classrooms full.",
      image: "/images/csr-school.jpg",
      since: "Supporting since 2025",
    },
  ],
  commitments: [
    "A portion of every Kroya Brand sale supports children's healthcare and education",
    "We partner with organizations that uplift women and families in rural Cambodia",
    "We believe every child deserves access to good food, good schools, and good health",
    "Our farmers and their families are always our first priority",
  ],
} as const;

// --- QUALITY ---
export const QUALITY_SECTION = {
  label: "Our Food Safety Standards",
  title: "Excellent Quality Assurance, Proven by Track Records",
  description:
    "We back our product quality with rigorous operational metrics. Every production batch undergoes strict laboratory testing, every milling process is continuously monitored, and every certification is strictly maintained. When we deliver our rice under our name or yours, we provide the absolute compliance and consistency required to protect your brand reputation globally.",
  quote:
    "From raw paddy intake to the final security seal on the export container, every phase of production is optimized to guarantee uncompromised product integrity for the global markets and consumers we serve.",
  attribution: "— The Production Team",
} as const;

export const CERTIFICATIONS = [
  { icon: "award", label: "BRCGS Certified" },
  { icon: "check-circle", label: "ISO 22000" },
  { icon: "check-circle", label: "ISO 9001" },
  { icon: "shield", label: "HACCP Compliant" },
  { icon: "award", label: "GMP Standards" },
  { icon: "globe", label: "FDA Registered" },
  { icon: "leaf", label: "HALAL Certified" },
] as const;

// --- NEWS ---
export const NEWS_SECTION = {
  label: "From Our Company",
  title: "News & Stories",
  description: "The latest from our farm, our community, and our journey to share Cambodian rice with the world.",
} as const;

export const NEWS_CATEGORIES = [
  { id: "all", label: "All Articles", description: "Complete archive of KFG news and rice industry coverage" },
  { id: "kfg-news", label: "KFG News", description: "Company announcements, partnerships, and milestones" },
  { id: "industry", label: "Rice Industry", description: "Global rice market trends, technology, and sector developments" },
  { id: "trade-policy", label: "Trade & Policy", description: "Export regulations, trade agreements, and agricultural policy" },
  { id: "sustainability", label: "Sustainability", description: "Sustainable rice farming, SRP standards, and environmental initiatives" },
  { id: "market-report", label: "Market Reports", description: "Price trends, export statistics, and market analysis" },
] as const;

export const NEWS_ARTICLES = [
  {
    id: "kfg-philippines-shipment-2026",
    title: "Khmer Foods Group Ships 50,000 Metric Tons of Premium Cambodian Rice to the Philippines in First Five Months of 2026",
    excerpt:
      "KFG announces the successful shipment of 50,000 metric tons of high-quality Cambodian rice to the Philippines, distributed to Manila, CDO, Cebu, and Davao.",
    content: `Phnom Penh, Cambodia — June 1, 2026 — Khmer Foods Group (KFG), a leading Cambodian rice exporter, is proud to announce the successful shipment of 50,000 metric tons of high-quality Cambodian rice to the Philippines during the first five months of 2026. The rice has been distributed to key Philippine destinations including Manila, Cagayan de Oro (CDO), Cebu, and Davao, reinforcing KFG's commitment to strengthening bilateral agricultural trade between Cambodia and the Philippines.

KFG's export portfolio includes its flagship SKO (Sen Kra Ob) and Phka Rumduol Premium Cambodian rice varieties, both classified under the premium rice category. As premium-grade products, these varieties are not subject to the Philippines' maximum recommended selling price cap of 50 pesos, reflecting their superior quality and market positioning. This distinction underscores Cambodia's growing reputation as a source of world-class aromatic rice on the global stage.

KFG is honored to contribute to Cambodia's ambitious national goal of reaching 1,000,000 metric tons of rice exports, a milestone championed by Samdech Techo HUN SEN. The company remains steadfast in its mission to support Cambodia's agricultural sector, empower local farming communities, and elevate the nation's standing as a trusted global rice supplier. With continued investment in quality, sustainability, and international partnerships, KFG looks forward to a bright and prosperous future for Cambodia's rice industry.`,
    date: "June 1, 2026",
    category: "KFG News",
    categoryId: "kfg-news",
    tags: ["Philippines", "Export", "SKO", "Phka Rumduol", "Rice Trade"],
    readTime: "3 min",
    featured: true,
    author: "Khmer Foods Group",
    authorRole: "Corporate Communications",
    type: "kfg",
    image: "/images/news/philippines-shipment-2026.jpg",
    caption: "Cambodian Prime Minister Hun Manet has assured President Ferdinand R. Marcos Jr. of his country's support in ensuring food security in the Philippines, particularly regarding the supply of rice and other food products. Dated February 2025.",
  },
  {
    id: "srp-contract-farming-2026",
    title: "Khmer Foods Group (KFG) Secures Sustainable Rice Supply Chain Through Strategic Contract Farming Agreement",
    excerpt:
      "KFG announces the official signing of a contract farming agreement with the Rumduol Tean Kam agricultural cooperative for the production and supply of premium rice certified under the Sustainable Rice Platform (SRP) standard.",
    content: `PHNOM PENH, CAMBODIA — Khmer Foods Group Co., Ltd. (KFG) is pleased to announce the official signing of a contract farming agreement with the Rumduol Tean Kam agricultural cooperative for the production and supply of premium rice certified under the Sustainable Rice Platform (SRP) standard.

This strategic agreement ensures KFG secures a reliable supply of sustainably grown, high-quality Cambodian rice to meet growing global demand. Facilitated by the Cambodian Institute for Research and Rural Development (CIRD) under the Public-Private-Community Partnerships for Resilience in Rice Landscape (PCRL) project, this partnership establishes a secure market and stable pricing structure for local farming communities.

Through this contract farming framework, KFG is directly investing in the resilience of Cambodia's agricultural sector. By prioritizing fair trade practices and verifiable sustainability metrics, KFG continues to strengthen its supply chain integrity while empowering farming communities to build sustainable, long-term livelihoods.

The PCRL project is a five-year joint initiative implemented by FAO Cambodia, the General Directorate of Agriculture (GDA) of the Ministry of Agriculture, Forestry and Fisheries, and the General Directorate of Local Community (GDLC) of the Ministry of Environment, with financial support from the Global Environment Facility (GEF). KFG remains dedicated to collaborating with these institutional partners to advance sustainable agriculture and elevate Cambodian rice on the world stage.`,
    date: "March 25, 2026",
    category: "KFG News",
    categoryId: "kfg-news",
    tags: ["SRP", "Contract Farming", "Sustainability", "PCRL", "FAO", "Cambodia"],
    readTime: "4 min",
    featured: true,
    author: "Khmer Foods Group",
    authorRole: "Corporate Communications",
    type: "kfg",
    image: "/images/news/srp-contract-farming.jpg",
    source: "PCRL Project / Facebook",
    sourceUrl: "https://www.facebook.com/PCRL.Project/posts/pfbid02Sjmnmk7PejgYR7bengKJMsLnZ69dfmx6LkEZkotG9oxczDT2nwdkeMfXq7SDyyBl?rdid=ZX9i4AAAdL1FcOdW#",
    gallery: [
      "/images/news/srp-community-meeting.jpg",
      "/images/news/srp-field-inspection.jpg",
    ],
  },
  {
    id: "kfg-srp-certification-2026",
    title: "Khmer Foods Group Awarded SRP Certification for Cambodian Sen Kro Oub Rice",
    excerpt:
      "KFG receives Sustainable Rice Platform certification from Control Union, covering SKO rice from 74 producers across 341.71 hectares with a 91% sustainability score.",
    content: `PHNOM PENH, CAMBODIA — Khmer Foods Group Co., Ltd. (KFG) has been awarded Sustainable Rice Platform (SRP) certification by Control Union for its Cambodian Sen Kro Oub (SKO) rice, valid from June 5, 2026 through June 4, 2029. The certification covers 74 producers farming 341.71 hectares under SRP's Chain of Custody Standard Version 2.5, achieving a 91% sustainability score and "Sustainably Cultivated Rice" status through third-party verification.

The certification authorizes KFG to display the SRP logo on its own KFG-branded rice packaging, as well as on customer OEM packaging — enabling buyers worldwide to communicate verified sustainability credentials directly to end consumers. With SRP Code VU0096 and Certificate No. C915798SRP-01.2026, KFG's certification covers the complete processing chain including drying, hulling, polishing, sorting, packaging, metal detection, and export operations across two operating sites.`,
    date: "June 5, 2026",
    category: "KFG News",
    categoryId: "kfg-news",
    tags: ["SRP", "Certification", "SKO", "Sustainability", "Control Union", "Cambodia"],
    readTime: "2 min",
    featured: false,
    author: "Khmer Foods Group",
    authorRole: "Corporate Communications",
    type: "kfg",
    image: "/images/news/srp-certification-2026.jpg",
    gallery: [
      "/images/news/srp-cert-1.jpg",
      "/images/news/srp-cert-2.jpg",
    ],
  },
  {
    id: "cambodia-rice-export-5months-2026",
    title: "Cambodia Exports 568,912 Tons of Milled Rice in First Five Months of 2026",
    excerpt:
      "Cambodia shipped milled rice to 63 destinations worldwide, generating USD 327.43 million in export revenue, according to Cambodia Rice Federation data.",
    content: `PHNOM PENH, CAMBODIA — Cambodia's milled rice exports reached 568,912 tons across 63 international destinations during the first five months of 2026, generating a total export value of USD 327.43 million, according to data compiled by the Cambodia Rice Federation from the General Department of Customs and Excise and the Ministry of Commerce.

The 61 registered exporters shipped 208,593 tons to 5 ASEAN member countries (USD 87.32 million), 162,125 tons to China and its autonomous regions (USD 94.92 million), 154,254 tons to 31 European countries (USD 105.12 million), and 43,940 tons to 24 destinations across Africa and the Middle East (USD 40.07 million). By rice type, fragrant rice accounted for 59.20% of exports, followed by white rice at 22.28%, broken rice at 15.58%, parboiled rice at 1.72%, organic rice at 1.04%, and other varieties at 0.18%.

In addition to formal milled rice exports, border-traded paddy rice totaled 2,753,816 tons worth USD 591.41 million during the same period, bringing Cambodia's combined rice trade to over 3.3 million tons.`,
    date: "June 5, 2026",
    category: "Market Reports",
    categoryId: "market-report",
    tags: ["Export Statistics", "CRF", "Cambodia", "Rice Trade", "2026"],
    readTime: "2 min",
    featured: false,
    author: "Cambodia Rice Federation",
    authorRole: "Industry Data",
    type: "industry",
    image: "/images/news/cambodia-export-5months-2026.jpg",
    source: "Cambodia Rice Federation",
    sourceUrl: "https://www.crf.org.kh/",
  },
  {
    id: "contract-farming-2025",
    title: "2,463 Hectares of Hope: Our New Partnership With Kampong Thom Farmers",
    excerpt:
      "Two farming cooperatives have joined our company, committing to grow 12,000 tons of premium paddy per harvest — at prices that ensure their families thrive.",
    content: `Two farming cooperatives in Kampong Thom province have officially become part of the Khmer Foods Group family, committing to grow and supply 12,000 tons of high-purity SKO, SRO, and OM-5451 paddy varieties per harvest.

Under the warm guidance of the Ministry of Agriculture, Forestry and Fisheries, this partnership ensures our farmers receive prices well above the market rate — because we believe that when our farmers thrive, we all thrive.

The agreement was signed with the blessing of H.E Minister Dith Tina, marking another chapter in our company's three-decade story of growing Cambodian rice with care, respect, and a deep commitment to the land and the people who work it.

For us, this isn't just business. It's about building a future where every farmer who works with us can send their children to school, care for their families, and pass their knowledge down to the next generation — just as our company has done since 1994.`,
    date: "April 29, 2025",
    category: "KFG News",
    categoryId: "kfg-news",
    tags: ["Contract Farming", "Kampong Thom", "Cooperative", "Cambodia"],
    readTime: "3 min",
    featured: false,
    author: "Khmer Foods Group",
    authorRole: "Corporate Communications",
    type: "kfg",
    image: "/images/aerial-farms.jpg",
    source: "Fresh News Asia",
    sourceUrl: "https://freshnewsasia.com/index.php/en/localnews/385826-2025-04-29-14-03-50.html",
  },
  {
    id: "coconut-school-2025",
    title: "A Mountain of Rice for the Children of Kirirom",
    excerpt:
      "During our company retreat to Kirirom Mountain, we visited the Coconut School and left with empty trucks but full hearts.",
    content: `During our annual company retreat to the misty mountains of Kirirom, our team made a stop that reminded us why we do what we do.

The Kirirom Coconut School, founded by the visionary Ouk Vanday in 2013, provides education to children in one of Cambodia's most remote areas. Many of these children walk hours each day just to attend class — and many come to school hungry.

We arrived with trucks full of our finest rice, donations to support the school's nutrition program, and left with something far more valuable: the smiles of children who know their community hasn't forgotten them.

"When you grow food for a living," our founder often says, "you have a responsibility to make sure no child goes without it." That's a value we live by every single day.`,
    date: "February 2, 2025",
    category: "KFG News",
    categoryId: "kfg-news",
    tags: ["CSR", "Education", "Kirirom", "Community", "Cambodia"],
    readTime: "3 min",
    featured: false,
    author: "Khmer Foods Group",
    authorRole: "Corporate Communications",
    type: "kfg",
    image: "/images/csr-school.jpg",
    source: "Coconut School Foundation",
    sourceUrl: "https://www.coconutschool.org/",
  },
  {
    id: "angkor-hospital-2024",
    title: "Healing Hands: Renewing Our Partnership With Angkor Hospital for Children",
    excerpt:
        "A portion of every Kroya Brand sale continues to support life-saving medical care for Cambodia's children.",
    content: `There are partnerships that make business sense — and then there are partnerships that make life sense. Our continued support of Angkor Hospital for Children falls firmly in the latter category.

Since 1999, this extraordinary hospital in Siem Reap has provided over 2.5 million medical treatments to Cambodian children — many of them completely free for families who could never afford care otherwise. Surgeries, neonatal care, outpatient services — they do it all, with compassion that rivals their medical expertise.

A portion of every Kroya Brand rice sale goes directly to keeping their doors open. So when you choose our rice for your company, you're not just nourishing your own table — you're helping heal a child across Cambodia.

That's the kind of relationship we believe in. That's the kind of family we want to be.`,
    date: "December 19, 2024",
    category: "KFG News",
    categoryId: "kfg-news",
    tags: ["CSR", "Healthcare", "Angkor Hospital", "Siem Reap", "Cambodia"],
    readTime: "3 min",
    featured: false,
    author: "Khmer Foods Group",
    authorRole: "Corporate Communications",
    type: "kfg",
    image: "/images/csr-hospital.jpg",
    source: "Angkor Hospital for Children",
    sourceUrl: "https://angkorhospital.org/",
  },
  // --- INDUSTRY ARTICLES ---
  {
    id: "cambodia-rice-export-record-2025",
    title: "Cambodia Rice Exports Hit Record 947,936 Tonnes in 2025, Generating Over $602 Million",
    excerpt:
      "Cambodia exported rice to 82 countries in 2025, with Europe and Asia absorbing the lion's share. The surge reflects growing global recognition of Cambodian jasmine rice quality.",
    content: `PHNOM PENH — Cambodia's rice export sector achieved a historic milestone in 2025, shipping 947,936 tonnes of milled rice to 82 countries worldwide and generating over $602 million in export revenue, according to figures released by the Cambodia Rice Federation (CRF).

European markets remained the largest destination, importing 342,367 tonnes — roughly 36% of total exports — led by the Netherlands, France, Italy, Germany, and the United Kingdom. Asian markets followed closely at 510,498 tonnes, with China, Malaysia, Hong Kong, and the Philippines as top buyers.

The achievement underscores Cambodia's rising profile as a premium rice origin. Cambodian jasmine varieties, particularly Phka Rumduol, have won the World's Best Rice award seven times — a record that continues to drive demand in quality-conscious markets.

"The consistent growth in our rice exports reflects the investments we've made in milling technology, food safety certification, and farmer training over the past decade," a CRF spokesperson noted. "Buyers in Europe and Asia are increasingly recognizing that Cambodian rice offers both exceptional quality and full traceability."

Emerging markets also showed notable growth. Africa imported 51,385 tonnes, with Gabon, Côte d'Ivoire, and Ghana leading demand. Oceania accounted for 19,376 tonnes, and North America received 7,201 tonnes — modest volumes but growing year over year.

Industry analysts attribute the success to Cambodia's commitment to international standards. Major exporters have obtained BRCGS, ISO 22000, HACCP, and HALAL certifications, enabling access to premium supermarket chains and institutional buyers worldwide.

The Cambodian government has set an ambitious target of 1 million tonnes of rice exports annually by 2028, supported by expanded irrigation infrastructure, increased milling capacity, and ongoing trade negotiations with key import markets.`,
    date: "January 15, 2026",
    category: "Market Reports",
    categoryId: "market-report",
    tags: ["Export Statistics", "CRF", "Revenue", "Europe", "Asia", "Cambodia"],
    readTime: "5 min",
    featured: true,
    author: "Rice Industry Desk",
    authorRole: "Market Analyst",
    type: "industry",
    image: "/images/process/container-loading.jpg",
    source: "Cambodia Rice Federation",
    sourceUrl: "https://www.cambodiaricefederation.org/",
  },
  {
    id: "eu-cambodia-trade-agreement-2026",
    title: "EU-Cambodia Trade Framework: What the New Everything But Arms Review Means for Rice Exporters",
    excerpt:
      "The European Commission's latest EBA preference review introduces revised rules of origin for Cambodian agricultural exports. Rice millers should prepare for updated compliance requirements.",
    content: `BRUSSELS / PHNOM PENH — The European Commission has published its updated Everything But Arms (EBA) trade preference scheme review, introducing modifications to rules of origin that will affect Cambodian rice exporters shipping to the European Union.

Under the revised framework, which takes effect January 1, 2027, rice products must meet stricter regional value content thresholds to qualify for duty-free access. Specifically, milled rice must demonstrate a minimum 40% local value addition — up from the previous 35% threshold — and provide documented proof of paddy origin from Cambodian contract farming partnerships.

For established millers with integrated supply chains, the impact is expected to be minimal. Companies that have invested in contract farming networks and maintain BRCGS or ISO 22000 certifications are already well-positioned to meet the new requirements. However, smaller traders who rely on third-party paddy sourcing may face compliance challenges.

"The revised EBA rules actually reinforce what quality-conscious Cambodian millers have been doing for years," noted an industry analyst at the ASEAN Rice Trade Association. "Full traceability from farm to port is becoming the standard expectation in European markets, not a premium feature."

The Cambodia Rice Federation has announced it will conduct a series of workshops for members in Q3 and Q4 2026 to ensure smooth transition. Key topics will include updated documentation requirements, certification alignment, and the EU's new digital customs pre-clearance system.

Cambodia has been a beneficiary of the EBA scheme since 2001, allowing duty-free, quota-free access to EU markets for all products except arms and ammunition. Rice has been one of the primary beneficiaries, with European markets absorbing over 36% of Cambodia's total rice export volume in 2025.`,
    date: "May 12, 2026",
    category: "Trade & Policy",
    categoryId: "trade-policy",
    tags: ["EU", "EBA", "Trade Agreement", "Rules of Origin", "Export", "Compliance"],
    readTime: "6 min",
    featured: false,
    author: "Trade Policy Watch",
    authorRole: "Regulatory Analyst",
    type: "industry",
    image: "/images/farmer-hands.jpg",
    source: "European Commission / CRF",
    sourceUrl: "https://policy.trade.ec.europa.eu/",
  },
  {
    id: "sustainable-rice-platform-adoption-2026",
    title: "SRP Certification Expands Across Southeast Asia: 2.4 Million Hectares Now Under Sustainable Rice Platform Standards",
    excerpt:
      "The Sustainable Rice Platform reports accelerated adoption across Cambodia, Thailand, and Vietnam. SRP-certified rice now commands a 12-18% price premium in European and North American markets.",
    content: `BANGKOK — The Sustainable Rice Platform (SRP) has released its 2025 annual report, revealing that certified sustainable rice cultivation now covers 2.4 million hectares across Southeast Asia — a 34% increase from the previous year.

Cambodia showed the strongest growth trajectory, with SRP-certified areas expanding from 12,000 hectares in 2024 to over 47,000 hectares in 2025. This growth was driven by public-private partnership programs, including the PCRL initiative supported by FAO Cambodia and the Global Environment Facility.

"The market signal is clear," said SRP Executive Director Wyn Ellis. "Buyers in Europe, North America, and East Asia are willing to pay a documented premium for verifiably sustainable rice. Our data shows SRP-certified lots commanding a 12-18% price advantage over conventionally grown comparable varieties."

The SRP standard evaluates rice production across 103 indicators covering water management, pesticide reduction, biodiversity protection, greenhouse gas emissions, and farmer livelihoods. Certification requires third-party auditing and annual verification.

For Cambodian exporters, SRP certification is becoming a key differentiator. Major importers in the Netherlands, Germany, and the United Kingdom now include sustainability criteria in their procurement frameworks, and several European supermarket chains have committed to sourcing 100% sustainable rice by 2028.

The environmental impact is significant. SRP-certified farms in Cambodia reported a 28% reduction in water use, 41% reduction in chemical pesticide application, and a 19% decrease in methane emissions per tonne of paddy produced — metrics that align with the EU's Carbon Border Adjustment Mechanism (CBAM) reporting requirements.

Looking ahead, SRP aims to expand certified coverage to 5 million hectares globally by 2028, with Southeast Asia representing the primary growth region. Training programs, subsidized auditing for smallholder cooperatives, and integration with national agricultural extension services are the key expansion strategies.`,
    date: "April 3, 2026",
    category: "Sustainability",
    categoryId: "sustainability",
    tags: ["SRP", "Sustainability", "Certification", "Climate", "Carbon", "Cambodia", "Premium"],
    readTime: "6 min",
    featured: false,
    author: "Sustainability Insights",
    authorRole: "Environmental Correspondent",
    type: "industry",
    image: "/images/aerial-farms.jpg",
    source: "Sustainable Rice Platform",
    sourceUrl: "https://sustainablerice.org/",
  },
  {
    id: "jasmine-rice-premium-trend-2026",
    title: "Global Jasmine Rice Demand Outpaces Supply as Premium Segment Grows 8.3% Annually",
    excerpt:
      "A new industry report shows aromatic rice consumption rising fastest in Middle Eastern and African markets. Cambodian Phka Rumduol holds the strongest brand recognition among premium jasmine varieties.",
    content: `SINGAPORE — The global jasmine and aromatic rice market is experiencing unprecedented demand growth, with the premium segment expanding at 8.3% annually — significantly outpacing the 2.1% growth rate for standard white rice, according to a comprehensive report published by Rice Market Intelligence.

The report, which analyzed consumption patterns across 67 countries, identifies Middle Eastern and African markets as the fastest-growing demand centers. Saudi Arabia, the UAE, Turkey, and several West African nations have all reported double-digit annual growth in jasmine rice imports over the past three years.

"What we're seeing is a fundamental shift in consumer preferences," said the report's lead analyst. "Middle-class consumers in emerging markets are trading up from standard white rice to aromatic varieties, and they're willing to pay a meaningful premium for origin-specific brands they trust."

Among premium jasmine varieties, Cambodian Phka Rumduol emerged with the strongest brand equity score in the study — attributed to its seven World's Best Rice awards and the Cambodian government's successful origin branding campaigns. Thai Hom Mali and Vietnamese ST25 followed closely in recognition metrics.

The supply side, however, is struggling to keep pace. Jasmine rice production is constrained by the specific agro-climatic conditions required for optimal aroma development — primarily wet-season cultivation in lowland delta regions with high organic soil content. Climate variability has added further uncertainty, with irregular monsoon patterns affecting yields in both Cambodia and Thailand.

For Cambodian exporters, the demand surge presents both opportunity and challenge. While FOB prices for Phka Rumduol have risen 14% year-over-year, available export volumes remain limited by milling capacity and the seasonal nature of wet-season harvests. Several major millers are investing in expanded storage and processing facilities to capture a larger share of the premium market.

Industry projections suggest the premium jasmine rice market will reach $18.7 billion by 2030, up from $12.4 billion in 2025, representing one of the most attractive growth segments in global agricultural commodities.`,
    date: "February 28, 2026",
    category: "Rice Industry",
    categoryId: "industry",
    tags: ["Jasmine Rice", "Premium", "Market Growth", "Phka Rumduol", "Middle East", "Africa"],
    readTime: "7 min",
    featured: false,
    author: "Rice Market Intelligence",
    authorRole: "Senior Analyst",
    type: "industry",
    image: "/images/process/polishing.jpg",
    source: "Rice Market Intelligence",
    sourceUrl: "https://www.ricemarketintelligence.com/",
  },
] as const;

// --- QUOTE FORM ---
export const QUOTE_FORM = {
  title: "Request FOB Pricing & Milling Specs",
  description: "Tell us about your sourcing requirements, and our export team will respond within 24 hours with FOB pricing, milling specifications, and lead times.",
  successTitle: "Thank You!",
  successMessage: "Your message has been received! Someone from our company team will reach out to you within 24 hours. We look forward to getting to know you.",
  backButton: "Back to Home",
  submitButton: "Send My Inquiry",
  submittingText: "Sending...",
  fields: {
    fullName: { label: "Your Name", placeholder: "e.g., Sopheap Chen", required: true },
    email: { label: "Email Address", placeholder: "your@email.com", required: true },
    companyName: { label: "Company or Shop Name", placeholder: "Your business name (optional)", required: false },
    phone: { label: "Phone or WhatsApp", placeholder: "+855 or your local number", required: false },
    website: { label: "Website", placeholder: "www.yourbusiness.com", required: false },
    productInterest: { label: "Which rice varieties interest you?", required: true },
    quantity: { label: "How much are you looking for?", placeholder: "Approximate quantity", required: true },
    quantityUnit: { label: "Unit" },
    packaging: { label: "How would you like it packed?" },
    destinationPort: { label: "Where should we send it?", placeholder: "e.g., Port of Rotterdam", required: false },
    deliveryTerms: { label: "Preferred shipping terms" },
    specialRequirements: { label: "Anything else we should know?", placeholder: "Tell us about your needs, your market, your story...", required: true },
    howFound: { label: "How did you find our company?" },
  },
} as const;

export const PRODUCT_OPTIONS = PRODUCTS.map((p) => ({ value: p.id, label: p.name }));

export const QUANTITY_UNITS = [
  { value: "mt", label: "Metric Tons" },
  { value: "kg", label: "Kilograms" },
  { value: "20ft", label: "20ft Container" },
];

export const PACKAGING_OPTIONS = [
  { value: "retail", label: "500g to 2kg Retail Pack" },
  { value: "5kg", label: "5kg Bag" },
  { value: "10kg", label: "10kg Bag" },
  { value: "18-20kg", label: "18-20kg Bag" },
  { value: "50lbs-25kg", label: "50lbs - 25kg" },
  { value: "50kg", label: "50kg PP Bag" },
  { value: "jumbo", label: "Jumbo Bags" },
  { value: "loose", label: "Loose Loading" },
];

export const DELIVERY_TERMS = [
  { value: "fob", label: "FOB (Free On Board)" },
  { value: "cif", label: "CIF (Cost, Insurance, Freight)" },
  { value: "crf-cnf", label: "CRF/CNF (Cost and Freight)" },
];

export const HOW_FOUND_OPTIONS = [
  { value: "b2b", label: "B2B Platform" },
  { value: "google", label: "Google Search" },
  { value: "trade-show", label: "Trade Show or Exhibition" },
  { value: "social-media", label: "Social Media" },
  { value: "retail", label: "Retail Store" },
  { value: "referral", label: "Friend or Family Referral" },
];
