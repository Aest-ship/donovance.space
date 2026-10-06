"""Pulls the base64 magazine cover out of your OLD single-file HTML
and saves it as magazine.jpg next to this script.

Usage:  python extract_cover.py old-portfolio.html
"""
import base64, re, sys

src = sys.argv[1] if len(sys.argv) > 1 else "old-portfolio.html"
html = open(src, encoding="utf-8").read()
m = re.search(r"data:image/jpeg;base64,([A-Za-z0-9+/=]+)", html)
if not m:
    sys.exit("No base64 JPEG found in " + src)
open("magazine.jpg", "wb").write(base64.b64decode(m.group(1)))
print("Saved magazine.jpg")
