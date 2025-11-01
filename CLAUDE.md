# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

LazyTimer is a static website featuring a free online timer with beautiful countdown display. It's a single-page application focused on SEO optimization and ad revenue generation through Google AdSense. The site targets users looking for timers for productivity (Pomodoro), cooking, fitness, meditation, and study sessions.

**Live URL**: https://lazytimer.com

## Architecture

### Technology Stack
- **Pure HTML/CSS/JavaScript** - No build tools, frameworks, or dependencies
- **Static hosting** - All pages are standalone HTML files
- **Google AdSense** - Integrated for monetization (Publisher ID: `pub-5523870768931777`)

### File Structure
```
/
├── index.html              # Main timer application (homepage)
├── pomodoro-timer.html     # Dedicated Pomodoro timer landing page (NEW)
├── cooking-timer.html      # Dedicated cooking timer landing page (NEW)
├── about.html              # About page
├── how-to-use.html         # Usage instructions
├── privacy-policy.html     # Privacy policy
├── terms-of-service.html   # Terms of service
├── stopwatch.png           # Analog stopwatch image used in timer UI
├── ads.txt                 # Google AdSense verification
├── sitemap.xml             # SEO sitemap (updated with new pages)
├── robots.txt              # Search engine crawler directives
├── CLAUDE.md               # This file
├── SEO_IMPROVEMENTS.md     # SEO changes documentation
├── backup/                 # Old versions of HTML files
└── static/                 # Static assets (ads.txt copy)
```

## Key Features & Implementation

### Timer Functionality (index.html)

The timer is implemented entirely in vanilla JavaScript with three main components:

1. **Visual Analog Stopwatch**: CSS-positioned hands that rotate using `transform: rotate()` to show elapsed time
   - Minute hand: Rotates based on `(elapsedTime / totalTime) * 360`
   - Second hand: Rotates based on `((60 - seconds) / 60) * 360`
   - Located at `index.html:1579-1642`

2. **Digital Flip Clock Display**: Four flip cards showing MM:SS with animation
   - Each digit animates independently with flip effect
   - Located at `index.html:1392-1404`

3. **Preset Timer System**: 50+ categorized preset timers organized in optgroups
   - Categories: Cooking & Kitchen, Work & Productivity, Fitness & Exercise, Wellness & Meditation, Study & Learning, Daily Activities, Breaks & Rest
   - Premium timers marked with `data-premium="true"` attribute
   - Located at `index.html:1288-1369`

### Styling & Design

- **Dark gradient background**: Linear gradient from #0a0e27 → #1a1f3a → #0f1419
- **Glassmorphism effects**: `backdrop-filter: blur()` with semi-transparent backgrounds
- **Responsive design**: Mobile-first with breakpoints at 1024px, 768px, 480px, and 360px
- **Purple accent color**: `#667eea` (primary) and `#764ba2` (secondary gradient)
- All styles are embedded in `<style>` tags within each HTML file

### Google AdSense Integration

**Ad Placements**:
- **Homepage (index.html)**: 3 ad units
  - Top banner (after nav, before timer): slot `7285922677`
  - Middle display (between timer and content): slot `7285922677`
  - Bottom banner (after content, before footer): slot `6571606806`

- **Content pages**: 2 ad units each
  - Top banner: slot `7285922677`
  - Bottom banner: slot `6571606806`

**CSS classes for ads**:
- `.ad-container` - Base wrapper for all ad units
- `.ad-container.top-ad` - Top banner styling
- `.ad-container.bottom-ad` - Bottom banner styling

### SEO Implementation

- **Meta tags**: Comprehensive Open Graph, Twitter Card, and standard meta tags on all pages
- **Structured data**: JSON-LD schema for WebApplication with ratings on homepage
- **Canonical URLs**: Each page has proper canonical tag
- **Keywords**: Focused on "online timer", "countdown timer", "pomodoro timer", etc.
- **Content optimization**: Long-form SEO content sections with H2/H3 headers and keyword-rich text

## Development Workflow

### Making Changes

**To modify the timer functionality**:
1. Edit `index.html`
2. JavaScript is located in `<script>` tag at bottom of file (lines 1549-1744)
3. Test in browser - no build process needed

**To update styling**:
1. Edit the `<style>` tag in the relevant HTML file
2. Styles are page-specific and not shared between files
3. Ensure responsive breakpoints are maintained for mobile compatibility

**To add/modify ad placements**:
1. Locate `.ad-container` divs in HTML
2. Update `data-ad-slot` attribute with new ad unit ID
3. Maintain spacing and responsive behavior

### Testing

Since this is a static site with no build process:
1. Open HTML files directly in browser, or
2. Use simple HTTP server: `python3 -m http.server 8000`
3. Test on multiple screen sizes (mobile, tablet, desktop)
4. Verify timer countdown accuracy
5. Check ad display (may show blank in development)

### Deployment

**No build process required** - files can be uploaded directly to hosting:
1. Upload all HTML files
2. Ensure `ads.txt` is at domain root (critical for AdSense)
3. Verify `sitemap.xml` and `robots.txt` are accessible
4. Update sitemap dates if content changes significantly

## Important Constraints

1. **No external dependencies**: Everything runs in the browser with no npm packages or build tools
2. **No backend**: All functionality is client-side JavaScript
3. **AdSense compliance**: Never modify ad code behavior or encourage clicks
4. **Performance**: Keep page weight low for fast loading (critical for SEO)
5. **Mobile-first**: Timer must work perfectly on small screens

## Common Modifications

### Adding a new preset timer
1. Open `index.html`
2. Find the timer select dropdown (line 1283)
3. Add new `<option>` in appropriate `<optgroup>`
4. Format: `<option value="SECONDS">Name - X min</option>`

### Changing timer appearance
1. Locate stopwatch container styles (`.stopwatch-container`)
2. Modify hand styles (`.minute-hand`, `.second-hand`)
3. Adjust positioning for `.minute-counter` if needed

### Updating content
1. Edit the `.seo-content` section in `index.html`
2. Maintain keyword density for "timer", "countdown", "online timer"
3. Keep headings in proper hierarchy (H2 → H3)

## Known Limitations

- Timer accuracy depends on `setInterval()` - may drift slightly over long durations
- Premium features are UI mockups only (no payment integration)
- No timer persistence - refreshing page resets timer
- No sound alerts (planned for premium)

## SEO Strategy & Implementation

### Landing Page Approach
Instead of trying to rank one page for all keywords, we use dedicated landing pages:
- **index.html**: General "online timer", "countdown timer", "free timer"
- **pomodoro-timer.html**: "pomodoro timer", "25 minute timer", "focus timer"
- **cooking-timer.html**: "cooking timer", "kitchen timer", "egg timer", "pasta timer"

### Schema Markup Strategy
Each page includes:
1. **WebApplication schema**: Tells Google this is a web app
2. **FAQPage schema**: 5 questions per page for featured snippet opportunities
3. **HowTo schema** (Pomodoro page): Step-by-step instructions for rich results

### SEO Best Practices Applied
- Title tags: 50-60 characters, keyword-focused
- Meta descriptions: 150-160 characters, benefit-focused with CTAs
- H1 tags: One per page, matches user intent
- Internal linking: Navigation + contextual content links
- Sitemap: All pages included with proper priorities
- FAQ content: Targets "People Also Ask" boxes

**Target keywords by page**:
- Homepage: "online timer", "countdown timer", "free timer"
- Pomodoro: "pomodoro timer", "25 minute timer", "pomodoro technique timer"
- Cooking: "cooking timer", "kitchen timer", "egg timer", "recipe timer"

**Performance targets**:
- Page load: < 2 seconds
- Mobile-friendly score: 100%
- Core Web Vitals: All green
- Featured snippets: Target 3-5 FAQ appearances

**Traffic sources**:
- Organic search (primary - 80%+ target)
- Direct navigation
- Referrals from productivity blogs

## Future Considerations

If adding features, maintain these principles:
- Keep it simple - LazyTimer's value is in simplicity
- No registration/login - stay frictionless
- Free tier must remain fully functional
- Respect user privacy - minimal tracking
- Mobile experience is critical
