import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFDownloadProps {
  articleTitle: string;
  articleId: number;
}

export default function PDFDownload({ articleTitle, articleId }: PDFDownloadProps) {
  const handleDownloadPDF = async () => {
    try {
      // Create a simple HTML document with the article content
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${articleTitle}</title>
          <style>
            body {
              font-family: 'Lora', serif;
              line-height: 1.8;
              max-width: 8.5in;
              margin: 0.5in;
              color: #1B2A4A;
            }
            h1 {
              font-family: 'Cormorant Garamond', serif;
              font-size: 2.5em;
              margin-bottom: 0.5em;
              color: #1A1A2E;
            }
            h2 {
              font-family: 'Cormorant Garamond', serif;
              font-size: 1.8em;
              margin-top: 1.5em;
              margin-bottom: 0.5em;
              color: #1A1A2E;
            }
            .header {
              border-bottom: 2px solid #C9A84C;
              padding-bottom: 1em;
              margin-bottom: 2em;
            }
            .footer {
              margin-top: 3em;
              padding-top: 1em;
              border-top: 1px solid #C9A84C;
              font-size: 0.9em;
              color: #666;
            }
            p {
              margin-bottom: 1em;
              text-align: justify;
            }
            .reference {
              margin-left: 2em;
              margin-bottom: 0.5em;
              font-size: 0.95em;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>The Agentic USD Imperative</h1>
            <p><strong>${articleTitle}</strong></p>
            <p>By David Parsons & Jonny Fry</p>
          </div>
          
          <p><em>This PDF was generated from the article series on Agentic USD and its implications for central banks and state treasuries.</em></p>
          
          <div class="footer">
            <p><strong>About This Series:</strong> A comprehensive five-part analysis exploring how Central Banks and State Treasuries must prepare for the inevitable dollarization of their economies through Agentic USD stablecoins.</p>
            <p>Published by London Digital Escrow</p>
            <p>Generated: ${new Date().toLocaleDateString()}</p>
          </div>
        </body>
        </html>
      `;

      // Create a blob and download
      const blob = new Blob([htmlContent], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `Article-${articleId}-${articleTitle.replace(/\s+/g, "-").toLowerCase()}.html`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
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
