import { useParams, Link, useSearchParams } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import OptimizedImage from "@/components/OptimizedImage";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Tag,
  ExternalLink,
  Search,
  Clock,
  User,
  ChevronLeft,
  ChevronRight,
  X,
  BookOpen,
} from "lucide-react";
import { NEWS_ARTICLES, NEWS_CATEGORIES, NEWS_SECTION } from "@/data/content";
import type { NewsArticle } from "@/types";
import SectionLabel from "@/components/SectionLabel";

const ARTICLES_PER_PAGE = 9;

/* ============================================================
   MAIN NEWS PAGE ROUTER
   ============================================================ */
export default function NewsPage() {
  const { id } = useParams<{ id: string }>();

  if (id) {
    const article = NEWS_ARTICLES.find((a) => a.id === id);
    if (!article) {
      return (
        <div className="pt-[72px] min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-3xl text-dark-800">Article Not Found</h1>
            <Link to="/news" className="text-gold-400 font-medium mt-4 inline-block link-underline">
              Back to News
            </Link>
          </div>
        </div>
      );
    }
    return <ArticleDetail article={article} />;
  }

  return <NewsListing />;
}

/* ============================================================
   ARTICLE DETAIL — WITH SEO & RELATED ARTICLES
   ============================================================ */
function ArticleDetail({ article }: { article: NewsArticle }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [article.id]);

  // Related articles: same category > same tags > recent
  const related = useMemo(() => {
    const others = NEWS_ARTICLES.filter((a) => a.id !== article.id);
    const scored = others.map((a) => {
      let score = 0;
      if (a.categoryId === article.categoryId) score += 3;
      const sharedTags = a.tags.filter((t) => article.tags.includes(t));
      score += sharedTags.length;
      return { article: a, score };
    });
    scored.sort((a, b) => b.score - a.score || new Date(b.article.date).getTime() - new Date(a.article.date).getTime());
    return scored.slice(0, 3).map((s) => s.article);
  }, [article]);

  const paragraphs = article.content.split("\n\n").filter((p) => p.trim());

  // Article schema for rich snippets
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `https://khmerfoods.com${article.image}`,
    datePublished: new Date(article.date).toISOString(),
    author: {
      "@type": article.type === "kfg" ? "Organization" : "Organization",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Khmer Foods Group",
      logo: {
        "@type": "ImageObject",
        url: "https://khmerfoods.com/images/khmer-logo.png",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://khmerfoods.com/#/news/${article.id}`,
    },
    articleSection: article.category,
    keywords: article.tags.join(", "),
  };

  return (
    <>
      {/* Per-article SEO */}
      <Helmet>
        <title>{`${article.title} | Khmer Foods Group News`}</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://khmerfoods.com/#/news/${article.id}`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://khmerfoods.com/#/news/${article.id}`} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={`https://khmerfoods.com${article.image}`} />
        <meta property="article:published_time" content={new Date(article.date).toISOString()} />
        <meta property="article:section" content={article.category} />
        {article.tags.map((t) => (
          <meta property="article:tag" content={t} key={t} />
        ))}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={article.title} />
        <meta property="twitter:description" content={article.excerpt} />
        <meta property="twitter:image" content={`https://khmerfoods.com${article.image}`} />
      </Helmet>

      {/* JSON-LD Article Schema */}
      <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>

      <div className="pt-[72px]">
        {/* Breadcrumb */}
        <div className="bg-cream-200 border-b border-dark-200">
          <div className="container-main page-padding py-3 flex items-center gap-2 text-sm">
            <Link to="/" className="text-dark-600 hover:text-dark-800 transition-colors">Home</Link>
            <span className="text-dark-400">/</span>
            <Link to="/news" className="text-dark-600 hover:text-dark-800 transition-colors">News</Link>
            <span className="text-dark-400">/</span>
            <span className="text-dark-500 line-clamp-1 max-w-[300px] md:max-w-[500px]">{article.title}</span>
          </div>
        </div>

        {/* Article */}
        <article className="bg-[#FAF8F3]">
          {/* Masthead header */}
          <div className="border-b-2 border-dark-800">
            <div className="container-main page-padding max-w-[900px] mx-auto py-8">
              {/* Type badge & Date */}
              <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium tracking-wider uppercase ${
                      article.type === "kfg"
                        ? "bg-dark-800 text-white"
                        : "bg-gold-400 text-dark-800"
                    }`}
                  >
                    <BookOpen size={10} />
                    {article.type === "kfg" ? "KFG News" : "Industry"}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-1 bg-cream-200 text-dark-600 text-xs">
                    <Tag size={10} /> {article.category}
                  </span>
                </div>
                <span className="inline-flex items-center gap-2 text-sm text-dark-500">
                  <Calendar size={14} /> {article.date}
                  <span className="text-dark-300">|</span>
                  <Clock size={14} /> {article.readTime} read
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display text-3xl md:text-5xl text-dark-900 leading-tight mb-4">
                {article.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg md:text-xl text-dark-600 font-serif italic leading-relaxed border-l-4 border-gold-400 pl-4">
                {article.excerpt}
              </p>

              {/* Author */}
              <div className="mt-6 pt-4 border-t border-dark-200 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${article.type === "kfg" ? "bg-dark-800" : "bg-gold-400"}`}>
                    <span className={`text-sm font-medium ${article.type === "kfg" ? "text-white" : "text-dark-800"}`}>
                      {article.type === "kfg" ? "KFG" : <User size={14} />}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-dark-800">{article.author}</p>
                    <p className="text-xs text-dark-400">{article.authorRole}</p>
                  </div>
                </div>
                {article.source && (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-dark-400 hover:text-gold-400 transition-colors"
                  >
                    Source: {article.source} <ExternalLink size={10} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="container-main page-padding max-w-[900px] mx-auto py-8">
            <figure className="mb-8">
              <OptimizedImage src={article.image} alt={article.title} width={800} height={450} className="w-full aspect-[16/9] object-cover rounded-sm shadow-lg" />
              <figcaption className="text-xs text-dark-400 mt-2 text-center italic font-serif">
                {article.title} — {article.date}
              </figcaption>
            </figure>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/news?tag=${encodeURIComponent(tag)}`}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-cream-200 text-dark-600 text-xs rounded-pill border border-dark-200 hover:border-gold-400 hover:text-gold-500 transition-colors"
                >
                  <Tag size={10} /> {tag}
                </Link>
              ))}
            </div>

            {/* Article Body */}
            <div className="prose-newsaper">
              {paragraphs.length > 0 && (
                <p className="text-lg md:text-xl text-dark-800 leading-relaxed font-serif mb-6 first-letter:text-5xl first-letter:font-display first-letter:text-gold-500 first-letter:float-left first-letter:mr-2 first-letter:mt-[-4px]">
                  {paragraphs[0]}
                </p>
              )}

              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-px bg-dark-200" />
                <span className="text-dark-400 text-xs tracking-widest uppercase">Continued</span>
                <div className="flex-1 h-px bg-dark-200" />
              </div>

              {paragraphs.slice(1).map((para, i) => (
                <p key={i} className="text-base text-dark-700 leading-[1.8] font-serif mb-6">
                  {para}
                </p>
              ))}
            </div>

            {/* Gallery */}
            {article.gallery && article.gallery.length > 0 && (
              <div className="mb-12">
                <h3 className="font-display text-lg text-dark-600 mb-4 text-center italic">Gallery</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {article.gallery.map((img, i) => (
                    <figure key={i} className="rounded-sm overflow-hidden shadow-md bg-dark-100">
                      <OptimizedImage src={img} alt={`${article.title} — gallery image ${i + 1}`} width={800} height={600} className="w-full aspect-[4/3] object-contain" />
                    </figure>
                  ))}
                </div>
              </div>
            )}

            {/* End marker */}
            <div className="flex items-center justify-center gap-4 my-12">
              <div className="w-16 h-px bg-dark-300" />
              <span className="text-2xl text-dark-300">&#10038;</span>
              <div className="w-16 h-px bg-dark-300" />
            </div>

            {/* Back + Source */}
            <div className="flex items-center justify-between mb-16 flex-wrap gap-4">
              <Link to="/news" className="inline-flex items-center gap-2 text-dark-600 hover:text-gold-400 transition-colors font-medium">
                <ArrowLeft size={16} /> Back to All News
              </Link>
              {article.sourceUrl && (
                <a href={article.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-500 transition-colors text-sm">
                  Read Original Source <ExternalLink size={14} />
                </a>
              )}
            </div>

            {/* Related Articles */}
            {related.length > 0 && (
              <div className="border-t-2 border-dark-800 pt-8">
                <h3 className="font-display text-2xl text-dark-800 mb-6">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {related.map((ra) => (
                    <Link
                      key={ra.id}
                      to={`/news/${ra.id}`}
                      className="group bg-cream-100 rounded-lg overflow-hidden border border-dark-200 hover:shadow-md transition-all"
                    >
                      <div className="overflow-hidden aspect-[16/10]">
                        <OptimizedImage src={ra.image} alt={ra.title} width={400} height={300} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center gap-2 text-xs text-dark-400 mb-2">
                          <span>{ra.date}</span>
                          <span>|</span>
                          <span>{ra.readTime}</span>
                        </div>
                        <h4 className="font-display text-sm font-medium text-dark-800 group-hover:text-gold-500 transition-colors line-clamp-2">
                          {ra.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
    </>
  );
}

/* ============================================================
   NEWS LISTING — WITH CATEGORIES, SEARCH & PAGINATION
   ============================================================ */
function NewsListing() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";
  const activeTag = searchParams.get("tag") || "";
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Reset page when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, activeTag, searchQuery]);

  // Filter articles
  const filteredArticles = useMemo(() => {
    let result = [...NEWS_ARTICLES];

    // Category filter
    if (activeCategory !== "all") {
      result = result.filter((a) => a.categoryId === activeCategory);
    }

    // Tag filter
    if (activeTag) {
      result = result.filter((a) => a.tags.some((t) => t.toLowerCase() === activeTag.toLowerCase()));
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.tags.some((t) => t.toLowerCase().includes(q)) ||
          a.category.toLowerCase().includes(q)
      );
    }

    // Sort: newest first
    result.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return result;
  }, [activeCategory, activeTag, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredArticles.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filteredArticles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );
  const featuredArticle = paginatedArticles.find((a) => a.featured) || null;
  const regularArticles = paginatedArticles.filter((a) => a.id !== featuredArticle?.id);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: NEWS_ARTICLES.length };
    NEWS_CATEGORIES.forEach((cat) => {
      if (cat.id === "all") return;
      counts[cat.id] = NEWS_ARTICLES.filter((a) => a.categoryId === cat.id).length;
    });
    return counts;
  }, []);

  const setCategory = (catId: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete("tag");
    if (catId === "all") {
      params.delete("cat");
    } else {
      params.set("cat", catId);
    }
    setSearchParams(params);
  };

  const clearTag = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("tag");
    setSearchParams(params);
  };

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{`News & Articles | ${NEWS_SECTION.title} | Khmer Foods Group`}</title>
        <meta
          name="description"
          content="Latest rice industry news, market reports, trade policy updates, and company announcements from Khmer Foods Group — your source for Cambodian rice industry intelligence."
        />
        <link rel="canonical" href="https://khmerfoods.com/#/news" />
      </Helmet>

      <div className="pt-[72px]">
        {/* Hero Header */}
        <div className="relative bg-dark-900 py-16 md:py-24">
          <div className="absolute inset-0 opacity-10">
            <img src="/images/farmer-hands.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-800/70" />
          <div className="container-main page-padding relative z-10">
            <SectionLabel label="Rice Industry Intelligence" light />
            <h1 className="font-display text-4xl md:text-5xl text-white mt-4">News & Articles</h1>
            <p className="text-cream-100/70 mt-4 max-w-2xl leading-relaxed font-light">
              Industry insights, market reports, trade policy updates, and the latest from Khmer Foods Group — your source for Cambodian rice intelligence.
            </p>

            {/* Search Bar */}
            <div className="mt-8 max-w-lg">
              <div className="relative">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search articles, topics, tags..."
                  className="w-full pl-11 pr-10 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder:text-white/40 text-sm focus:bg-white/15 focus:border-gold-400 focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="bg-cream-200 border-b border-dark-200 sticky top-[72px] z-40">
          <div className="container-main page-padding">
            <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
              {NEWS_CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategory(cat.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat.id && !activeTag
                      ? "bg-dark-800 text-white"
                      : "text-dark-600 hover:bg-dark-200 hover:text-dark-800"
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 text-xs ${
                      activeCategory === cat.id && !activeTag ? "text-cream-100/60" : "text-dark-400"
                    }`}
                  >
                    {categoryCounts[cat.id] || 0}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Active tag filter indicator */}
        {activeTag && (
          <div className="bg-gold-400/10 border-b border-gold-400/20">
            <div className="container-main page-padding py-2 flex items-center justify-between">
              <span className="text-sm text-dark-700">
                Filtering by tag: <strong className="text-gold-600">{activeTag}</strong>
              </span>
              <button onClick={clearTag} className="inline-flex items-center gap-1 text-xs text-dark-500 hover:text-red-500 transition-colors">
                <X size={14} /> Clear filter
              </button>
            </div>
          </div>
        )}

        {/* Articles Grid */}
        <div className="bg-[#FAF8F3] py-12 md:py-16">
          <div className="container-main page-padding max-w-[1100px] mx-auto">
            {/* Results count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-dark-500">
                {filteredArticles.length} article{filteredArticles.length !== 1 ? "s" : ""}
                {activeCategory !== "all" && (
                  <span>
                    {" "}
                    in <span className="font-medium text-dark-700">{NEWS_CATEGORIES.find((c) => c.id === activeCategory)?.label}</span>
                  </span>
                )}
              </p>
            </div>

            {/* No results */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-20">
                <Search size={48} className="mx-auto text-dark-300 mb-4" />
                <h3 className="font-display text-xl text-dark-700 mb-2">No articles found</h3>
                <p className="text-dark-500 text-sm mb-4">Try adjusting your search or filter criteria.</p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setCategory("all");
                    clearTag();
                  }}
                  className="text-gold-400 font-medium text-sm hover:underline"
                >
                  View all articles
                </button>
              </div>
            )}

            {/* Featured Article Hero */}
            {featuredArticle && currentPage === 1 && !searchQuery && !activeTag && (
              <div className="mb-10">
                <Link
                  to={`/news/${featuredArticle.id}`}
                  className="group grid grid-cols-1 md:grid-cols-2 gap-0 bg-cream-100 rounded-xl overflow-hidden border border-dark-200 shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="overflow-hidden aspect-[16/10] md:aspect-auto">
                    <OptimizedImage
                      src={featuredArticle.image}
                      alt={featuredArticle.title}
                      width={800}
                      height={500}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                    />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 bg-gold-400 text-dark-800 text-xs font-medium rounded-pill">
                        Featured
                      </span>
                      <span className="text-xs text-dark-400">{featuredArticle.category}</span>
                    </div>
                    <h2 className="font-display text-2xl md:text-3xl font-medium text-dark-800 group-hover:text-gold-500 transition-colors leading-snug">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-dark-500 mt-3 text-sm leading-relaxed font-light line-clamp-3">
                      {featuredArticle.excerpt}
                    </p>
                    <div className="flex items-center gap-3 mt-4 text-xs text-dark-400">
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={12} /> {featuredArticle.date}
                      </span>
                      <span>|</span>
                      <span className="inline-flex items-center gap-1">
                        <Clock size={12} /> {featuredArticle.readTime} read
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-2 mt-5 text-gold-400 text-sm font-medium">
                      <span className="link-underline">Read Full Article</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </div>
            )}

            {/* Regular Article Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-dark-200 text-dark-600 hover:bg-cream-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-dark-800 text-white"
                        : "text-dark-600 hover:bg-cream-200 border border-dark-200"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-dark-200 text-dark-600 hover:bg-cream-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ============================================================
   ARTICLE CARD COMPONENT
   ============================================================ */
function ArticleCard({ article }: { article: NewsArticle }) {
  return (
    <Link
      to={`/news/${article.id}`}
      className="group bg-cream-100 rounded-xl overflow-hidden border border-dark-200 shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col"
    >
      <div className="overflow-hidden aspect-[16/10] relative">
        <OptimizedImage
          src={article.image}
          alt={article.title}
          width={800}
          height={500}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-2 py-0.5 text-xs font-medium rounded-pill ${
              article.type === "kfg" ? "bg-dark-800 text-white" : "bg-gold-400 text-dark-800"
            }`}
          >
            {article.type === "kfg" ? "KFG" : "Industry"}
          </span>
        </div>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 text-xs text-dark-400 mb-2">
          <span className="inline-flex items-center gap-1">
            <Calendar size={11} /> {article.date}
          </span>
          <span>|</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={11} /> {article.readTime}
          </span>
        </div>
        <h3 className="font-display text-base font-medium text-dark-800 group-hover:text-gold-500 transition-colors leading-snug line-clamp-2">
          {article.title}
        </h3>
        <p className="text-dark-500 mt-2 text-sm leading-relaxed font-light line-clamp-2 flex-1">
          {article.excerpt}
        </p>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {article.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 bg-cream-200 text-dark-500 text-[10px] rounded-pill border border-dark-100"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="inline-flex items-center gap-1 mt-4 text-gold-400 text-xs font-medium">
          <span className="link-underline">Read Article</span>
          <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
        </span>
      </div>
    </Link>
  );
}
