import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PDFDownloadProps {
  articleTitle: string;
  articleId: number;
}

export default function PDFDownload({ articleTitle, articleId }: PDFDownloadProps) {
  const handleDownloadPDF = async () => {
    try {
      // Get the article content from the DOM
      const contentElement = document.getElementById("article-content");
      
      if (!contentElement) {
        console.error("Article content not found");
        alert("Could not find article content to download");
        return;
      }

      // Create a new window for printing
      const printWindow = window.open("", "", "width=800,height=600");
      if (!printWindow) {
        alert("Please disable pop-up blockers to download PDF");
        return;
      }

      // Get the content HTML
      const contentHTML = contentElement.innerHTML;

      // Create the HTML document for PDF
      const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="UTF-8">
          <title>${articleTitle}</title>
          <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Lora:wght@400;500;600&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Lora', serif;
              line-height: 1.8;
              color: #1B2A4A;
              margin: 40px;
              background: white;
            }
            h1, h2, h3 {
              font-family: 'Cormorant Garamond', serif;
              color: #1A1A2E;
            }
            h1 {
              font-size: 2.5em;
              margin-bottom: 10px;
            }
            h2 {
              font-size: 1.8em;
              margin-top: 30px;
              margin-bottom: 15px;
              border-bottom: 2px solid #C9A84C;
              padding-bottom: 10px;
            }
            .header {
              border-bottom: 2px solid #C9A84C;
              padding-bottom: 20px;
              margin-bottom: 30px;
            }
            .metadata {
              font-size: 0.95em;
              color: #666;
              margin: 10px 0;
            }
            .footer {
              margin-top: 40px;
              padding-top: 20px;
              border-top: 1px solid #C9A84C;
              font-size: 0.9em;
              color: #666;
            }
            p {
              margin-bottom: 15px;
              text-align: justify;
            }
            strong {
              font-weight: 600;
            }
            em {
              font-style: italic;
            }
            .reference {
              color: #C9A84C;
              font-weight: 600;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>The Agentic USD Imperative</h1>
            <h2 style="border: none; font-size: 1.5em; margin: 10px 0;">${articleTitle}</h2>
            <p class="metadata"><strong>By David Parsons & Jonny Fry</strong></p>
            <p class="metadata">Generated: ${new Date().toLocaleDateString()}</p>
          </div>
          
          <div class="content">
            ${contentHTML}
          </div>
          
          <div class="footer">
            <p><strong>About This Series:</strong> A comprehensive five-part analysis exploring how Central Banks and State Treasuries must prepare for the inevitable dollarization of their economies through Agentic USD stablecoins.</p>
            <p>Published by London Digital Escrow</p>
            <p>© 2026 David Parsons & Jonny Fry. All rights reserved.</p>
          </div>
        </body>
        </html>
      `;

      // Write content to the new window
      printWindow.document.write(htmlContent);
      printWindow.document.close();

      // Trigger print dialog which allows saving as PDF
      setTimeout(() => {
        printWindow.print();
      }, 250);

    } catch (error) {
      console.error("Error downloading PDF:", error);
      alert("Error generating PDF. Please try again.");
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
