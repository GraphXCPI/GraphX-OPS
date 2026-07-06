#!/usr/bin/env python3
"""Extract live OPS template-designer kit glyphs to SVG masks.

Usage:
  python3 scripts/extract-ops-kit-svgs.py /path/to/custom-icons.ttf
"""

from pathlib import Path
import re
import sys
import xml.sax.saxutils as xml

from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont


KIT_GLYPHS = {
    "back": "e011",
    "clip-art": "e021",
    "continue": "e023",
    "copy": "e025",
    "cut": "e028",
    "delete": "e02c",
    "grid": "e02e",
    "image": "e033",
    "layers": "e03c",
    "margin": "e043",
    "paste": "e04d",
    "pdf": "e050",
    "portrait-view-s": "e055",
    "redo": "e05c",
    "save": "e069",
    "snap-to-grid": "e076",
    "template": "e080",
    "text": "e081",
    "un-lock": "e08a",
    "undo": "e08b",
    "zoom-in": "e08d",
}


def svg_for_glyph(font, glyph_name):
    glyph_set = font.getGlyphSet()
    pen = SVGPathPen(glyph_set)
    glyph_set[glyph_name].draw(pen)
    path = pen.getCommands()
    upem = font["head"].unitsPerEm
    ascent = font["hhea"].ascent
    return "\n".join(
        [
            "<?xml version='1.0' encoding='utf-8'?>",
            f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {upem} {upem}" width="100" height="100" fill="currentColor">',
            f'  <g transform="scale(1, -1) translate(0, -{ascent})">',
            f'    <path d="{xml.escape(path)}" />',
            "  </g>",
            "</svg>",
            "",
        ]
    )


def main():
    if len(sys.argv) not in (2, 3):
        print("usage: extract-ops-kit-svgs.py /path/to/custom-icons.ttf [output-dir]", file=sys.stderr)
        return 2

    font_path = Path(sys.argv[1])
    output_dir = Path(sys.argv[2]) if len(sys.argv) == 3 else Path("icon-mapping/extracted-svgs")
    if not font_path.is_file():
        print(f"font not found: {font_path}", file=sys.stderr)
        return 1

    font = TTFont(str(font_path))
    cmap = font["cmap"].getBestCmap()
    output_dir.mkdir(parents=True, exist_ok=True)

    for css_name, codepoint in KIT_GLYPHS.items():
        glyph_name = cmap.get(int(codepoint, 16))
        if not glyph_name:
            print(f"missing glyph for {css_name} ({codepoint})", file=sys.stderr)
            return 1
        safe_name = re.sub(r"[^a-z0-9-]+", "-", css_name.lower()).strip("-")
        output_path = output_dir / f"ops-kit-fa-{safe_name}.svg"
        output_path.write_text(svg_for_glyph(font, glyph_name), encoding="utf-8")
        print(output_path)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
