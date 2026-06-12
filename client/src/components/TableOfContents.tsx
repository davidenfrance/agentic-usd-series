import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

interface Section {
  heading: string;
  id: string;
}

interface TableOfContentsProps {
  sections: Section[];
}

export default function TableOfContents({ sections }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      // Find the current section based on scroll position
      const sectionElements = sections.map((s) => ({
        id: s.id,
        element: document.getElementById(s.id),
      }));

      let currentSection = "";
      for (const section of sectionElements) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 200) {
            currentSection = section.id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <aside className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 w-64 max-h-[80vh] overflow-y-auto z-40">
      <div className="sticky top-1/2 -translate-y-1/2 pl-6 pr-4">
        {/* Toggle button for mobile */}
        <button
          onClick={() => setIsVisible(!isVisible)}
          className="lg:hidden mb-4 flex items-center gap-2 text-[#C9A84C] hover:text-[#d4b65c] transition-colors"
          style={{ fontFamily: "var(--font-ui)" }}
        >
          <ChevronDown className={`w-4 h-4 transition-transform ${isVisible ? "rotate-180" : ""}`} />
          Sections
        </button>

        {/* TOC Content */}
        <nav className={`${isVisible ? "block" : "hidden"} lg:block`}>
          <p
            className="text-[#C9A84C] tracking-[0.15em] uppercase text-xs font-semibold mb-4"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            In This Article
          </p>
          <ul className="space-y-3 border-l-2 border-[#C9A84C]/20">
            {sections.map((section) => (
              <li key={section.id}>
                <button
                  onClick={() => handleSectionClick(section.id)}
                  className={`block w-full text-left pl-4 py-2 transition-all duration-200 ${
                    activeSection === section.id
                      ? "text-[#C9A84C] font-semibold border-l-2 border-[#C9A84C] -ml-[2px]"
                      : "text-[#1B2A4A]/60 hover:text-[#1B2A4A]/80"
                  }`}
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {section.heading}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Scroll indicator */}
        <div className="mt-8 pt-6 border-t border-[#C9A84C]/10">
          <p className="text-[#1B2A4A]/40 text-xs" style={{ fontFamily: "var(--font-ui)" }}>
            Scroll to explore
          </p>
        </div>
      </div>
    </aside>
  );
}
