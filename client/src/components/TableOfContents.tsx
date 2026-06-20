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
  const [isCollapsed, setIsCollapsed] = useState(true);

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
    <aside className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-40">
      <div className="bg-white/95 backdrop-blur-sm rounded-r-lg shadow-lg border-r-4 border-[#C9A84C] ml-0">
        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="w-full px-4 py-3 flex items-center justify-between hover:bg-[#FAFAF5] transition border-b border-[#C9A84C]/20"
        >
          <span
            className="text-sm font-semibold text-[#1B2A4A] tracking-wide"
            style={{ fontFamily: "var(--font-ui)" }}
          >
            {isCollapsed ? "TOC" : "In This Article"}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-[#C9A84C] transition-transform ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Sections List */}
        {!isCollapsed && (
          <nav className="py-3 px-4 max-h-96 overflow-y-auto">
            <ul className="space-y-1 border-l-2 border-[#C9A84C]/20">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => handleSectionClick(section.id)}
                    className={`block w-full text-left pl-4 py-2 rounded-r transition-all duration-200 ${
                      activeSection === section.id
                        ? "text-[#C9A84C] font-semibold border-l-2 border-[#C9A84C] -ml-[2px] bg-[#C9A84C]/5"
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
        )}

        {/* Footer hint */}
        {!isCollapsed && (
          <div className="border-t border-[#C9A84C]/10 px-4 py-3">
            <p className="text-[#1B2A4A]/40 text-xs" style={{ fontFamily: "var(--font-ui)" }}>
              Scroll to explore
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
