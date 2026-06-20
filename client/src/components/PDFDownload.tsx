import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import html2pdf from "html2pdf.js";

interface PDFDownloadProps {
  articleTitle: string;
  articleId: number;
}

export default function PDFDownload({ articleTitle, articleId }: PDFDownloadProps) {
  const handleDownloadPDF = async () => {
    try {
      // Get the article content from the DOM
      const contentElement = document.getElementById("article-content");
      const heroElement = document.getElementById("article-hero");
      
      if (!contentElement) {
        console.error("Article content not found");
        return;
      }

      // Create a container for the PDF content
      const pdfContent = document.createElement("div");
      pdfContent.style.padding = "40px";
      pdfContent.style.fontFamily = "'Lora', serif";
      pdfContent.style.lineHeight = "1.8";
      pdfContent.style.color = "#1B2A4A";

      // Add header
      const header = document.createElement("div");
      header.style.borderBottom = "2px solid #C9A84C";
      header.style.paddingBottom = "20px";
      header.style.marginBottom = "30px";
      header.innerHTML = `
        <h1 style="font-family: 'Cormorant Garamond', serif; font-size: 2.5em; margin: 0 0 10px 0; color: #1A1A2E;">
          The Agentic USD Imperative
        </h1>
        <h2 style="font-family: 'Cormorant Garamond', serif; font-size: 1.8em; margin: 0 0 15px 0; color: #1A1A2E;">
          ${articleTitle}
        </h2>
        <p style="margin: 0 0 10px 0; font-size: 1em;"><strong>By David Parsons & Jonny Fry</strong></p>
        <p style="margin: 0; font-size: 0.95em; color: #666;">Generated: ${new Date().toLocaleDateString()}</p>
      `;
      pdfContent.appendChild(header);

      // Clone and add the article content
      const contentClone = contentElement.cloneNode(true) as HTMLElement;
      contentClone.style.marginTop = "20px";
      pdfContent.appendChild(contentClone);

      // Add footer
      const footer = document.createElement("div");
      footer.style.marginTop = "40px";
      footer.style.paddingTop = "20px";
      footer.style.borderTop = "1px solid #C9A84C";
      footer.style.fontSize = "0.9em";
      footer.style.color = "#666";
      footer.innerHTML = `
        <p><strong>About This Series:</strong> A comprehensive five-part analysis exploring how Central Banks and State Treasuries must prepare for the inevitable dollarization of their economies through Agentic USD stablecoins.</p>
        <p>Published by London Digital Escrow</p>
        <p>© 2026 David Parsons & Jonny Fry. All rights reserved.</p>
      `;
      pdfContent.appendChild(footer);

      // Configure PDF options
      const options: any = {
        margin: 10,
        filename: `Article-${articleId}-${articleTitle.replace(/\s+/g, "-").toLowerCase()}.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { 
          orientation: "portrait", 
          unit: "mm", 
          format: "a4",
          compress: true
        }
      };

      // Generate PDF
      html2pdf().set(options).from(pdfContent).save();
    } catch (error) {
      console.error("Error downloading PDF:", error);
    }
  };

  return (
    <Button
      onClick={handleDownloadPDF}
      variant="outline"
      className="gap-2 bg-[#C9A84C] text-[#1A1A2E] hover:bg-[#d4b65c] border-[#C9A84C]"
    >
      <Download className="w-4 h-4" />
      Download as PDF
    </Button>
  );
}
