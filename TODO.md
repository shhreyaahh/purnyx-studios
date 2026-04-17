# Hero Curve Outward Drop Shadow Task

## Steps:

- [x] 1. Create this TODO.md
- [x] 2. Edit globals.css with outward shadows (blue-whitish glow)
- [x] 3. Verify in browser (run `npm run dev`)
- [x] 4. Mark complete & attempt_completion

✅ Feedback fixes applied:

- Reverted .hero overflow: hidden (fixes image split)
- .hero-curve box-shadow: 0 -12px 30px rgba(100,160,255,0.18) (blue-whitish outward)
- .hero-curve svg filter: drop-shadow(0 -3px 10px rgba(255,255,255,0.08))

v3 Complete: SVG shadow path + image z-index fix.

- Hero.jsx: Added shadow-path use + id for curve shape.
- globals.css: .shadow-path styled with outward drop-shadow following exact curve contour.
- Images z-index:1 prevents overflow/split.

Refresh browser (localhost:3001). Outward curve-shaped blue-white glow now works.
