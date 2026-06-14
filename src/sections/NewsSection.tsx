import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { Link } from "react-router-dom";
import { NEWS_SECTION, NEWS_ARTICLES } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import OptimizedImage from "@/components/OptimizedImage";
import { SectionDecoration } from "@/components/GoldDecorations";

gsap.registerPlugin(ScrollTrigger);

export default function NewsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".news-reveal").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.8, ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-cream-100 py-24 md:py-32 relative">
      <SectionDecoration variant="angkor" />
      <div className="container-main page-padding relative z-10">
        {/* Header */}
        <div className="news-reveal flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <SectionLabel label={NEWS_SECTION.label} />
            <h2 className="font-display text-3xl md:text-4xl font-medium text-dark-800 mt-4">
              {NEWS_SECTION.title}
            </h2>
          </div>
          <Link
            to="/news"
            className="flex items-center gap-2 text-gold-400 font-medium text-sm hover:text-gold-500 transition-colors link-underline shrink-0"
          >
            View All Articles
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Articles Grid - Featured + Side */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Featured Article (first, larger) */}
          <div className="news-reveal lg:col-span-2">
            <Link
              to={`/news/${NEWS_ARTICLES[0].id}`}
              className="group block bg-cream-100 rounded-xl overflow-hidden border border-dark-200 shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              <div className="aspect-[16/9] overflow-hidden">
                <OptimizedImage
                  src={NEWS_ARTICLES[0].image}
                  alt={NEWS_ARTICLES[0].title}
                  width={800}
                  height={450}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 mb-3">
                  <span className="inline-flex items-center gap-1 text-xs text-dark-400">
                    <Calendar size={12} /> {NEWS_ARTICLES[0].date}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-cream-200 text-dark-800 text-xs rounded-pill">
                    <Tag size={10} /> {NEWS_ARTICLES[0].category}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-medium text-dark-800 group-hover:text-gold-500 transition-colors leading-snug">
                  {NEWS_ARTICLES[0].title}
                </h3>
                <p className="text-dark-500 mt-3 text-sm leading-relaxed font-light line-clamp-2">
                  {NEWS_ARTICLES[0].excerpt}
                </p>
                <span className="inline-flex items-center gap-2 mt-4 text-gold-400 text-sm font-medium">
                  <span className="link-underline">Read Full Article</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </div>

          {/* Side Articles */}
          <div className="space-y-6">
            {NEWS_ARTICLES.slice(1, 6).map((article) => (
              <div key={article.id} className="news-reveal">
                <Link
                  to={`/news/${article.id}`}
                  className="group flex gap-4 bg-cream-100 rounded-xl overflow-hidden border border-dark-200 shadow-card hover:shadow-card-hover transition-all duration-300 p-4"
                >
                  <div className="w-28 h-20 shrink-0 overflow-hidden rounded-lg bg-cream-200">
                    <OptimizedImage
                      src={article.image}
                      alt={article.title}
                      width={112}
                      height={80}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-dark-400">{article.date}</span>
                      <span className="px-2 py-0.5 bg-cream-200 text-dark-800 text-[10px] rounded-pill">
                        {article.category}
                      </span>
                    </div>
                    <h4 className="font-display text-sm font-medium text-dark-800 group-hover:text-gold-500 transition-colors leading-snug line-clamp-2">
                      {article.title}
                    </h4>
                    <span className="inline-flex items-center gap-1 mt-2 text-gold-400 text-xs font-medium">
                      Read more <ArrowRight size={10} />
                    </span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
