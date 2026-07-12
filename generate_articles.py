import re
import json

# Article metadata
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

# Read expanded markdown files and parse into sections
def parse_markdown_to_sections(md_file):
    """Parse markdown file into sections"""
    with open(md_file, 'r') as f:
        content = f.read()
    
    # Split by headers (lines starting with ##)
    parts = re.split(r'\n## ', content)
    
    sections = []
    
    # First part is intro/title
    if parts:
        intro_lines = parts[0].strip().split('\n')
        # Skip title and part info
        intro_content = []
        for line in intro_lines[2:]:  # Skip first 2 lines (title and part info)
            if line.strip() and not line.startswith('#'):
                intro_content.append(line.strip())
        
        if intro_content:
            # Group intro content into logical sections
            current_section = []
            for line in intro_content:
                if line and not line.startswith('**'):
                    current_section.append(line)
                elif line.startswith('**') and current_section:
                    # New section starting
                    if current_section:
                        sections.append({
                            "heading": "Introduction",
                            "content": current_section
                        })
                    current_section = []
            
            if current_section:
                sections.append({
                    "heading": "Introduction",
                    "content": current_section
                })
    
    # Parse remaining sections
    for i, part in enumerate(parts[1:], 1):
        lines = part.strip().split('\n')
        if lines:
            heading = lines[0].strip()
            content_lines = []
            for line in lines[1:]:
                if line.strip():
                    content_lines.append(line.strip())
            
            if content_lines:
                sections.append({
                    "heading": heading,
                    "content": content_lines
                })
    
    return sections

# Generate articles
for i, meta in enumerate(articles_meta, 1):
    md_file = f"article_{i}_expanded.md"
    try:
        sections = parse_markdown_to_sections(md_file)
        print(f"✓ Article {meta['id']}: {len(sections)} sections parsed")
    except Exception as e:
        print(f"✗ Article {meta['id']}: Error - {e}")

print("\nScript ready to generate articles.ts entries")
