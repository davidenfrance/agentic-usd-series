import { Link } from "wouter";
import { articles, seriesIntroduction } from "@/lib/articles";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { calculateReadingTime, formatReadingTime } from "@/lib/readingTime";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/hero-main-oC9TepauufzczxPH6bYRQi.webp)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1A2E]/80 via-[#1A1A2E]/60 to-[#1A1A2E]/90" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <p
            className="text-[#C9A84C] tracking-[0.3em] uppercase text-sm mb-6"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            A Five-Part Series by David Parsons & Jonny Fry
          </p>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.1] mb-6"
            style={{ fontFamily: "var(--font-display)" }}
          >
            The Agentic USD
            <br />
            <span className="text-[#C9A84C]">Imperative</span>
          </h1>
          <p
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
            style={{ fontFamily: "var(--font-body)" }}
          >
            How Central Banks and State Treasuries must prepare for the inevitable
            dollarization of their economies by Agentic USD Stablecoins
          </p>
          <a
            href="#introduction"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#1A1A2E] font-semibold rounded-sm hover:bg-[#d4b65c] transition-colors duration-200"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            Begin Reading <ArrowRight className="w-4 h-4" />
          </a>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-[1px] h-12 bg-white/40 mx-auto mb-2" />
          <p className="text-white/50 text-xs tracking-widest uppercase" style={{ fontFamily: "var(--font-ui)" }}>
            Scroll
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section id="introduction" className="py-24 md:py-32 bg-[#FAFAF5]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="mb-12">
            <p
              className="text-[#C9A84C] tracking-[0.2em] uppercase text-xs mb-4"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              Series Introduction
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-[#1B2A4A] leading-tight mb-2"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {seriesIntroduction.title}
            </h2>
            <p
              className="text-xl text-[#1B2A4A]/70 italic"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {seriesIntroduction.subtitle}
            </p>
          </div>
          <div className="space-y-6">
            {seriesIntroduction.content.map((paragraph, i) => (
              <p
                key={i}
                className="text-[#1B2A4A]/85 text-lg leading-relaxed"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-24 md:py-32 bg-[#1A1A2E]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <p
              className="text-[#C9A84C] tracking-[0.2em] uppercase text-xs mb-4"
              style={{ fontFamily: "var(--font-ui)" }}
            >
              The Series
            </p>
            <h2
              className="text-4xl md:text-5xl font-bold text-white leading-tight"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Five Articles. One Imperative.
            </h2>
          </div>

          <div className="space-y-8">
            {articles.map((article, index) => (
              <Link key={article.id} href={`/article/${article.id}`}>
                <article className="group relative overflow-hidden rounded-sm bg-[#242444] hover:bg-[#2a2a50] transition-all duration-300 cursor-pointer">
                  <div className="flex flex-col md:flex-row">
                    {/* Image */}
                    <div className="md:w-2/5 h-56 md:h-auto relative overflow-hidden">
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#242444]/50 hidden md:block" />
                      <div className="absolute top-4 left-4 w-10 h-10 flex items-center justify-center bg-[#C9A84C] text-[#1A1A2E] font-bold text-sm rounded-sm" style={{ fontFamily: "var(--font-ui)" }}>
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                    {/* Content */}
                    <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                      <h3
                        className="text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-[#C9A84C] transition-colors duration-300"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {article.title}
                      </h3>
                      <p
                        className="text-white/60 text-lg italic mb-4"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {article.subtitle}
                      </p>
                      <p
                        className="text-white/70 text-base leading-relaxed mb-6 line-clamp-3"
                        style={{ fontFamily: "var(--font-body)" }}
                      >
                        {article.summary}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[#C9A84C] text-sm font-medium group-hover:gap-3 transition-all duration-300" style={{ fontFamily: "var(--font-ui)" }}>
                          <BookOpen className="w-4 h-4" />
                          Read Article
                          <ArrowRight className="w-4 h-4" />
                        </div>
                        <div className="flex items-center gap-1 text-white/50 text-sm" style={{ fontFamily: "var(--font-ui)" }}>
                          <Clock className="w-4 h-4" />
                          {formatReadingTime(calculateReadingTime(article))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-[#0f0f1e] border-t border-white/5">
        <div className="max-w-6xl mx-auto px-6 text-center">
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
