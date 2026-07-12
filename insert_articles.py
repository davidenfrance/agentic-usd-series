import re

# Read the generated articles
with open('articles_101_108.ts', 'r') as f:
    new_articles_content = f.read()

# Extract just the article objects (remove the comment line)
new_articles = new_articles_content.split('\n', 2)[2]  # Skip first 2 lines

# Read the current articles.ts
with open('client/src/lib/articles.ts', 'r') as f:
    articles_ts = f.read()

# Find the position to insert (before the final '];')
insert_pos = articles_ts.rfind('];')

if insert_pos == -1:
    print("Error: Could not find insertion point")
    exit(1)

# Insert the new articles before the closing bracket
updated_articles_ts = articles_ts[:insert_pos] + ',\n' + new_articles + '\n' + articles_ts[insert_pos:]

# Write back
with open('client/src/lib/articles.ts', 'w') as f:
    f.write(updated_articles_ts)

print("✓ Successfully inserted 8 new articles (101-108) into articles.ts")
print(f"  File size: {len(updated_articles_ts)} bytes")
