"""Generate a clean dotted world-map SVG from the reference pattern image.

Ocean dots are an SVG pattern. Land dots are individual circles.
Pulse animation is applied in CSS (globals.css).
"""

from __future__ import annotations

import sys
from pathlib import Path

from PIL import Image

if len(sys.argv) != 2:
    raise SystemExit("usage: python scripts/generate-dotted-world-map.py <reference-image.png>")

SRC = Path(sys.argv[1])
OUT = Path(__file__).resolve().parents[1] / "public" / "brand" / "dotted-world-map.svg"

COLS = 120
ROWS = 74
OCEAN = "#d9d7d4"
LAND = "#5b5856"
RADIUS = 1.45
CELL = 6
PAD = 4
LAND_MAX = 40


def main() -> None:
    img = Image.open(SRC).convert("L")
    w, h = img.size

    land: list[tuple[float, float]] = []

    for row in range(ROWS):
        for col in range(COLS):
            x0 = int(col / COLS * w)
            x1 = max(x0 + 1, int((col + 1) / COLS * w))
            y0 = int(row / ROWS * h)
            y1 = max(y0 + 1, int((row + 1) / ROWS * h))
            darkest = min(img.crop((x0, y0, x1, y1)).getdata())
            if darkest <= LAND_MAX:
                cx = PAD + col * CELL + CELL / 2
                cy = PAD + row * CELL + CELL / 2
                land.append((cx, cy))

    width = PAD * 2 + COLS * CELL
    height = PAD * 2 + ROWS * CELL

    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" '
        f'width="{width}" height="{height}" fill="none" role="img" aria-hidden="true" '
        f'preserveAspectRatio="xMidYMid slice">',
        "<title>Dotted world map</title>",
        "<defs>",
        f'<pattern id="oceanDots" width="{CELL}" height="{CELL}" patternUnits="userSpaceOnUse">',
        f'<circle cx="{CELL / 2}" cy="{CELL / 2}" r="{RADIUS}" fill="{OCEAN}"/>',
        "</pattern>",
        "</defs>",
        f'<rect width="{width}" height="{height}" fill="#ffffff"/>',
        f'<rect class="ocean-field" x="{PAD}" y="{PAD}" width="{COLS * CELL}" '
        f'height="{ROWS * CELL}" fill="url(#oceanDots)"/>',
        f'<g class="land" fill="{LAND}">',
    ]
    for x, y in land:
        parts.append(f'<circle cx="{x:.1f}" cy="{y:.1f}" r="{RADIUS}"/>')
    parts.append("</g>")
    parts.append("</svg>")

    OUT.parent.mkdir(parents=True, exist_ok=True)
    OUT.write_text("\n".join(parts) + "\n", encoding="utf-8")
    print(f"Wrote {OUT}")
    print(f"land={len(land)} size={OUT.stat().st_size}")


if __name__ == "__main__":
    main()
