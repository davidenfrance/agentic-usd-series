import re
import json

# Article metadata with proper titles and subtitles
articles_meta = [
    {
        "id": 101,
        "title": "The Governor's Inconvenient Truth: Why Money Can't Be Two Things at Once",
        "subtitle": "Part 1 of 8: The Case for the Singleness of Money",
        "summary": "Andrew Bailey's central insight: money must be singular. A monetary system cannot function if fragmented into competing currencies with different yields and economic properties.",
        "heroImage": "https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/article101-hero-governors-truth.webp"
    },
    {
        "id": 102,
        "title": "They Clipped the Coins: Newton's Great Recoinage and the Birth of Trusted Money",
        "subtitle": "Part 2 of 8: The Case for the Singleness of Money",
        "summary": "How Sir Isaac Newton solved the 1696 monetary crisis through technological innovation and tax enforcement, establishing 330 years of monetary singularity.",
        "heroImage": "https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/article102-hero-clipped-coins.webp"
    },
    {
        "id": 103,
        "title": "The Coupon Catastrophe: Why Your Grandmother's Bonds Could Never Be Money",
        "subtitle": "Part 3 of 8: The Case for the Singleness of Money",
        "summary": "Technical barriers that historically prevented yield-bearing bonds from functioning as currency, and why those barriers are crumbling in the digital age.",
        "heroImage": "https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/article103-hero-coupon-catastrophe.webp"
    },
    {
        "id": 104,
        "title": "Gresham's Law in the Digital Age: How the GENIUS Act Proved the Theory",
        "subtitle": "Part 4 of 8: The Case for the Singleness of Money",
        "summary": "Real-time evidence of Gresham's Law in action with the GENIUS Act, showing how high-yield money drives out low-yield money in digital markets.",
        "heroImage": "https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/article104-hero-greshams-law.webp"
    },
    {
        "id": 105,
        "title": "The Banking System's Dirty Secret: Why Yield-Bearing Money Destroys Fractional Reserve Banking",
        "subtitle": "Part 5 of 8: The Case for the Singleness of Money",
        "summary": "How yield-bearing stablecoins undermine the fundamental mechanisms of fractional reserve banking and threaten financial system stability.",
        "heroImage": "https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/article105-hero-banking-secret.webp"
    },
    {
        "id": 106,
        "title": "The Tax Man Cometh: How Tax Payments Became the Ultimate Monetary Weapon",
        "subtitle": "Part 6 of 8: The Case for the Singleness of Money",
        "summary": "Tax acceptance policies as the enforcement mechanism for monetary singularity, and how this power is being weaponized in the Agentic USD era.",
        "heroImage": "https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/article106-hero-tax-man.webp"
    },
    {
        "id": 107,
        "title": "The Trojan Horse: Agentic USD and the Threat to Sterling Sovereignty",
        "subtitle": "Part 7 of 8: The Case for the Singleness of Money",
        "summary": "How Agentic USD represents an existential threat to pound sterling and UK monetary sovereignty through programmable money and autonomous agents.",
        "heroImage": "https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/article107-hero-trojan-horse.webp"
    },
    {
        "id": 108,
        "title": "Rest in Peace, Monetary Singularity: The Twisted Ending",
        "subtitle": "Part 8 of 8: The Case for the Singleness of Money",
        "summary": "The final analysis: why monetary singularity is dead, what replaces it, and the geopolitical implications of a fragmented, AI-driven monetary future.",
        "heroImage": "https://d2xsxph8kpxj0f.cloudfront.net/310519663302847091/MXy6CDFnqWez7ocRVRb3ET/article108-hero-rest-in-peace.webp"
    }
]

def escape_quotes(text):
    """Escape quotes for JavaScript strings"""
    return text.replace('"', '\\"').replace('\n', '\\n')

def parse_markdown_to_sections(md_file):
    """Parse markdown file into sections with proper content arrays"""
    with open(md_file, 'r') as f:
        content = f.read()
    
    # Split by headers (lines starting with ##)
    parts = re.split(r'\n## ', content)
    
    sections = []
    
    # Process all parts
    for part_idx, part in enumerate(parts):
        lines = part.strip().split('\n')
        
        if part_idx == 0:
            # First part - skip title and metadata
            heading = "Introduction"
            content_lines = []
            skip_count = 0
            for line in lines:
                if skip_count < 3 and (line.startswith('Part') or line.startswith('The ') or line == ''):
                    skip_count += 1
                    continue
                if line.strip() and not line.startswith('#'):
                    content_lines.append(line.strip())
        else:
            # Subsequent parts
            if not lines:
                continue
            heading = lines[0].strip()
            content_lines = []
            for line in lines[1:]:
                if line.strip():
                    content_lines.append(line.strip())
        
        if content_lines and heading:
            sections.append({
                "heading": heading,
                "content": content_lines
            })
    
    return sections

# Generate TypeScript code
output = []
output.append("// Singleness of Money Series (Articles 101-108)")
output.append("")

for i, meta in enumerate(articles_meta, 1):
    md_file = f"article_{i}_expanded.md"
    try:
        sections = parse_markdown_to_sections(md_file)
        
        # Build article object
        article_code = f"""  {{
    id: {meta['id']},
    title: "{escape_quotes(meta['title'])}",
    subtitle: "{escape_quotes(meta['subtitle'])}",
    heroImage: "{meta['heroImage']}",
    summary: "{escape_quotes(meta['summary'])}",
    sections: ["""
        
        for section in sections:
            heading = escape_quotes(section['heading'])
            content_array = ",".join([f'"{escape_quotes(line)}"' for line in section['content']])
            article_code += f"""
      {{
        heading: "{heading}",
        content: [{content_array}]
      }},"""
        
        # Remove trailing comma
        article_code = article_code.rstrip(',')
        article_code += """
    ]
  },"""
        
        output.append(article_code)
        print(f"✓ Generated Article {meta['id']} with {len(sections)} sections")
        
    except Exception as e:
        print(f"✗ Article {meta['id']}: Error - {e}")

# Save to file
with open('articles_101_108.ts', 'w') as f:
    f.write('\n'.join(output))

print(f"\n✓ Generated articles_101_108.ts with {len(articles_meta)} articles")
