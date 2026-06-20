import { useState } from "react";
import { getGlossaryTerm } from "@/lib/glossary";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface GlossaryTooltipProps {
  term: string;
  children?: React.ReactNode;
}

export default function GlossaryTooltip({ term, children }: GlossaryTooltipProps) {
  const glossaryEntry = getGlossaryTerm(term);

  if (!glossaryEntry) {
    return <span>{children || term}</span>;
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            className="cursor-help border-b-2 border-[#C9A84C]/40 hover:border-[#C9A84C] transition-colors"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {children || term}
          </span>
        </TooltipTrigger>
        <TooltipContent
          className="max-w-xs bg-[#1B2A4A] text-white border border-[#C9A84C]/30 p-3 rounded-lg shadow-lg"
          style={{ fontFamily: "var(--font-body)" }}
        >
          <div className="space-y-2">
            <p className="font-semibold text-[#C9A84C]">{glossaryEntry.term}</p>
            <p className="text-sm text-white/90">{glossaryEntry.definition}</p>
            <p className="text-xs text-white/60 italic capitalize">{glossaryEntry.category}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
