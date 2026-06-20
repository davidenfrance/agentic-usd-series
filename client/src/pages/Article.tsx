import { useParams, Link } from "wouter";
import { articles } from "@/lib/articles";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import TableOfContents from "@/components/TableOfContents";
import PDFDownload from "@/components/PDFDownload";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";
import { useMemo } from "react";

export default function Article() {
  const params = useParams<{ id: string }>();
  const articleId = parseInt(params.id || "1", 10);
  const article = articles.find((a) => a.id === articleId);

  // Generate TOC sections with IDs
  const tocSections = useMemo(() => {
    if (!article) return [];
    return article.sections.map((section, index) => ({
      heading: section.heading,
      id: `section-${index}`,
    }));
  }, [article]);

  // Calculate reading time
  const readingTime = useMemo(() => {
    if (!article) return 0;
    return calculateReadingTime(article);
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FAFAF5]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#1B2A4A] mb-4" style={{ fontFamily: "var(--font-display)" }}>
            Article Not Found
          </h1>
          <Link href="/">
            <span className="text-[#C9A84C] hover:underline cursor-pointer" style={{ fontFamily: "var(--font-ui)" }}>
              Return to Series
            </span>
          </Link>
        </div>
      </div>
    );
  }

  const prevArticle = articles.find((a) => a.id === articleId - 1);
  const nextArticle = articles.find((a) => a.id === articleId + 1);

  return (
    <div className="min-h-screen">
      {/* Table of Contents Sidebar */}
      <TableOfContents sections={tocSections} />

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-end overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${article.heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/50 to-transparent" />
        {/* Back button */}
        <Link href="/">
          <span className="absolute top-6 left-6 z-20 inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm rounded-sm hover:bg-white/20 transition-colors cursor-pointer" style={{ fontFamily: "var(--font-ui)" }}>
            <ArrowLeft className="w-4 h-4" /> Back to Series
          </span>
        </Link>
        {/* Title overlay */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 pb-16 w-full">
          <p
            className="text-[#C9A84C] tracking-[0.2em] uppercase text-xs mb-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Article {String(article.id).padStart(2, "0")} of 05
          </p>
          <h1
            className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.title}
          </h1>
          <p
            className="text-xl md:text-2xl text-white/70 italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            {article.subtitle}
          </p>
          <div className="mt-6 flex items-center gap-4 flex-wrap mb-8">
            <div className="h-[1px] w-12 bg-[#C9A84C]" />
            <p className="text-white/60 text-sm" style={{ fontFamily: "var(--font-ui)" }}>
              David Parsons & Jonny Fry
            </p>
            <div className="h-[1px] w-12 bg-[#C9A84C]" />
            <div className="flex items-center gap-1 text-white/60 text-sm" style={{ fontFamily: "var(--font-ui)" }}>
              <Clock className="w-4 h-4" />
              {formatReadingTime(readingTime)}
            </div>
          </div>
          <div className="mt-6">
            <PDFDownload articleTitle={article.title} articleId={article.id} />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="py-16 md:py-24 bg-[#FAFAF5]" id="article-hero">
        <div className="max-w-3xl mx-auto px-6" id="article-content">
          {/* Executive Summary */}
          <div className="mb-16 p-8 bg-white border-l-4 border-[#C9A84C] shadow-sm">
            <p
              className="text-[#C9A84C] tracking-[0.15em] uppercase text-xs mb-3 font-semibold"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Executive Summary
            </p>
            <p
              className="text-[#1B2A4A]/85 text-lg leading-relaxed italic"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {article.summary}
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-16">
            {article.sections.map((section, sIndex) => (
              <div key={sIndex} id={`section-${sIndex}`} className="scroll-mt-20">
                <h2
                  className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-6 leading-tight"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {section.heading}
                </h2>
                <div className="space-y-5">
                  {section.content.map((paragraph, pIndex) => (
                    <p
                      key={pIndex}
                      className="text-[#1B2A4A]/80 text-[1.1rem] leading-[1.85]"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
                {/* Section Image */}
                {section.image && (
                  <div className="mt-10 rounded-sm overflow-hidden shadow-lg">
                    <img
                      src={section.image}
                      alt={section.imageCaption}
                      className="w-full h-auto"
                    />
                    {section.imageCaption && (
                      <div className="bg-[#F5F5F0] p-6 border-t border-[#E0E0D5]">
                        <p
                          className="text-[#1B2A4A]/70 text-sm italic"
                          style={{ fontFamily: "var(--font-body)" }}
                        >
                          {section.imageCaption}
                        </p>
                      </div>
                    )}
                  </div>
                )}
                {sIndex < article.sections.length - 1 && (
                  <div className="mt-12 flex items-center gap-4">
                    <div className="h-[1px] flex-1 bg-[#C9A84C]/20" />
                    <div className="w-2 h-2 rotate-45 bg-[#C9A84C]/40" />
                    <div className="h-[1px] flex-1 bg-[#C9A84C]/20" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 bg-[#1A1A2E]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-6 justify-between">
            {prevArticle ? (
              <Link href={`/article/${prevArticle.id}`}>
                <div className="group flex-1 p-6 bg-[#242444] rounded-sm hover:bg-[#2a2a50] transition-colors cursor-pointer">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-ui)" }}>
                    <ArrowLeft className="w-3 h-3 inline mr-1" /> Previous
                  </p>
                  <p className="text-white font-semibold group-hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {prevArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
            {nextArticle ? (
              <Link href={`/article/${nextArticle.id}`}>
                <div className="group flex-1 p-6 bg-[#242444] rounded-sm hover:bg-[#2a2a50] transition-colors cursor-pointer text-right">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-ui)" }}>
                    Next <ArrowRight className="w-3 h-3 inline ml-1" />
                  </p>
                  <p className="text-white font-semibold group-hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    {nextArticle.title}
                  </p>
                </div>
              </Link>
            ) : (
              <Link href="/">
                <div className="group flex-1 p-6 bg-[#242444] rounded-sm hover:bg-[#2a2a50] transition-colors cursor-pointer text-right">
                  <p className="text-white/50 text-xs uppercase tracking-wider mb-2" style={{ fontFamily: "var(--font-ui)" }}>
                    Return <ArrowRight className="w-3 h-3 inline ml-1" />
                  </p>
                  <p className="text-white font-semibold group-hover:text-[#C9A84C] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                    Back to Series Overview
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0f0f1e] border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-[#C9A84C] tracking-[0.2em] uppercase text-xs mb-3" style={{ fontFamily: "var(--font-ui)" }}>
            The Agentic USD Imperative
          </p>
          <p className="text-white/50 text-sm" style={{ fontFamily: "var(--font-ui)" }}>
            By David Parsons and Jonny Fry &middot; 2025
          </p>
        </div>
      </footer>
    </div>
  );
}
