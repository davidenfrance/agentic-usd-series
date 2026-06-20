import { useParams, Link } from "wouter";
import { articles } from "@/lib/articles";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import PDFDownload from "@/components/PDFDownload";
import GlossaryTooltip from "@/components/GlossaryTooltip";
import TableOfContents from "@/components/TableOfContents";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";
import { useMemo } from "react";
import { getAllTerms } from "@/lib/glossary";

export default function Article() {
  const params = useParams<{ id: string }>();
  const articleId = parseInt(params.id || "1", 10);
  const article = articles.find((a) => a.id === articleId);

  // Generate TOC sections with IDs
  const tocSections = useMemo(() => {
    if (!article) return [];
    const sections = [
      {
        heading: "Executive Summary",
        id: "executive-summary",
      },
      ...article.sections.map((section, index) => ({
        heading: section.heading,
        id: `section-${index}`,
      })),
    ];
    return sections;
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

  // Function to render paragraph with clickable reference links and glossary tooltips
  const renderParagraphWithReferences = (paragraph: string, key: string | number) => {
    const glossaryTerms = getAllTerms();
    const parts = paragraph.split(/(\[\d+\])/);
    
    return (
      <p
        key={key}
        className="text-[#1B2A4A]/80 text-[1.1rem] leading-[1.85]"
        style={{ fontFamily: "var(--font-body)" }}
      >
        {parts.map((part, i) => {
          const refMatch = part.match(/\[(\d+)\]/);
          if (refMatch) {
            return (
              <a
                key={i}
                href="#references"
                className="text-[#C9A84C] hover:underline font-semibold cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  const refSection = document.getElementById("references");
                  if (refSection) {
                    refSection.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                {part}
              </a>
            );
          }
          
          // Check for glossary terms in the text
          const words = part.split(/(\s+)/);
          return (
            <span key={i}>
              {words.map((word, wordIndex) => {
                const cleanWord = word.replace(/[^a-zA-Z\s-]/g, '');
                const isGlossaryTerm = glossaryTerms.some(
                  (term) => term.toLowerCase() === cleanWord.toLowerCase()
                );
                
                if (isGlossaryTerm && word.trim()) {
                  return (
                    <GlossaryTooltip key={`${i}-${wordIndex}`} term={cleanWord}>
                      {word}
                    </GlossaryTooltip>
                  );
                }
                return word;
              })}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(27, 42, 74, 0.85) 0%, rgba(201, 168, 76, 0.15) 100%)`,
          backgroundColor: "#1B2A4A",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#C9A84C] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#C9A84C] rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
          <p className="text-[#C9A84C] tracking-[0.15em] uppercase text-xs mb-6 font-semibold" style={{ fontFamily: "var(--font-ui)" }}>
            Article {article.id}
          </p>
          <h1
            className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight"
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
          <div className="mt-6 flex items-center gap-4 flex-wrap mb-8 justify-center">
            <div className="h-[1px] w-12 bg-[#C9A84C]" />
            <p className="text-white/60 text-sm" style={{ fontFamily: "var(--font-ui)" }}>
              David Parsons, Jonny Fry & Antony Abell
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
          <div className="mb-16 p-8 bg-white border-l-4 border-[#C9A84C] shadow-sm" id="executive-summary">
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
                  {section.content.map((paragraph, pIndex) =>
                    renderParagraphWithReferences(paragraph, `${sIndex}-${pIndex}`)
                  )}
                </div>
                {/* Section Image */}
                {section.image && (
                  <div className="mt-8 mb-8 bg-white rounded-lg p-6 shadow-sm border border-[#E8E8E0]">
                    <img
                      src={section.image}
                      alt={section.imageCaption}
                      className="w-full h-auto rounded"
                    />
                    {section.imageCaption && (
                      <p
                        className="mt-4 text-sm text-[#1B2A4A]/60 italic text-center"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {section.imageCaption}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* References Section */}
          <div id="references" className="mt-20 pt-16 border-t-2 border-[#C9A84C]/20">
            <h2
              className="text-3xl font-bold text-[#1B2A4A] mb-8"
              style={{ fontFamily: "var(--font-display)" }}
            >
              References
            </h2>
            <div className="space-y-4">
              {article.references?.map((ref, index) => (
                <div key={index} className="flex gap-4">
                  <span className="text-[#C9A84C] font-semibold flex-shrink-0">[{index + 1}]</span>
                  <p
                    className="text-[#1B2A4A]/75 text-sm leading-relaxed"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {ref}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Table of Contents Sidebar */}
      <TableOfContents sections={tocSections} />

      {/* Navigation */}
      <section className="py-16 bg-[#1B2A4A]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {prevArticle ? (
              <Link href={`/article/${prevArticle.id}`}>
                <span
                  className="flex items-center gap-2 text-[#C9A84C] hover:text-[#E8C547] cursor-pointer transition"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Previous Article
                </span>
              </Link>
            ) : (
              <div />
            )}
            <Link href="/">
              <span
                className="text-white/60 hover:text-white cursor-pointer transition"
                style={{ fontFamily: "var(--font-ui)" }}
              >
                Back to Series
              </span>
            </Link>
            {nextArticle ? (
              <Link href={`/article/${nextArticle.id}`}>
                <span
                  className="flex items-center gap-2 text-[#C9A84C] hover:text-[#E8C547] cursor-pointer transition"
                  style={{ fontFamily: "var(--font-ui)" }}
                >
                  Next Article
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
