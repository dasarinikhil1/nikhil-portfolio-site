# Nikhil Dasari — Portfolio Site ("Monument Campus")

Personal site for Nikhil Dasari: UT Dallas grad (ITS, Class of 2026), incoming
full-time Technology Consultant at EY (Dallas), plus a UGC/creator side
(travel, fashion, student life on TikTok). Two audiences: recruiters and
UGC/marketing agencies.

Static site. No framework, no build step. Plain HTML + one shared CSS file +
one small JS file. Keep it that way unless explicitly asked.

## Structure

- `index.html` — hub/landing: 5 "monument" cutouts scattered on a gradient,
  each is a door to a page. Click = zoom-dive transition, then navigate.
  Mobile collapses to a card list (`.campus-links`).
- `about.html` — "front porch" hero + Now/Then/Next narrative + photo gallery.
- `work.html` — EY-led featured cards, timeline rail for earlier jobs, leadership.
- `resume.html` — formal record. **Download PDF button is a placeholder (TODO).**
- `ugc.html` — Creator page: light scrollytelling (pinned stage, chapters swap
  via IntersectionObserver), embedded TikTok players, agency fact sheet
  (languages, location, whitelisting, service level).
- `contact.html` — intent split (recruiting vs collabs) + form (not wired, TODO).
- `css/styles.css` — ALL shared tokens/components. Page-specific CSS lives in a
  `<style>` block in each page's `<head>`.
- `js/site.js` — IntersectionObserver scroll-reveal + hub behaviors. No scroll
  event listeners anywhere; keep it that way.
- `assets/` — monument cutouts (`monu-*.webp`, transparent), `assets/life/` —
  10 personal photos (webp, already optimized).

## Design system (do not drift)

- Fonts: Cabinet Grotesk (display, 700/800) + Satoshi (body) via Fontshare.
- Palette ("campus"): warm ivory/sage, light-locked (`color-scheme: light`,
  no dark mode — intentional). Tokens in `:root`:
  `--surface #f2f1e8`, `--surface-raised #fbfaf4`, `--accent #2b7a58` (emerald,
  the ONLY accent), `--accent-soft #e3eee6`, `--text #23261f`.
- Radius system: 16px cards (`--radius-card`), pill buttons. Nothing else.
- Shadows: warm-tinted only (`rgba(95,100,75,…)`), never gray/black.
- Copy style: no em-dashes anywhere. Short sentences, concrete verbs.

## Conventions & gotchas (hard-won, don't regress)

1. **Nav bar is pixel-locked.** `.site-nav` (76px) and `.site-nav__links`
   (height 38px, font 14px, padding 0 18px, gap 16px) use px, not rem, and the
   exact same markup on all 6 pages (Map, About, Work, Resume, Creator,
   Contact). `html { scrollbar-gutter: stable }` prevents width shift.
   Current page = color-only highlight (`aria-current="page"`), never bold or
   text-shadow (changes rendered size). This was a multi-round bug; verify
   with pixel measurement if touched.
2. **Hover lifts use `translate`, scroll reveals use `transform`.** The
   `.reveal` / `.reveal--stagger` system animates `transform`; card hovers use
   the separate `translate` property so they never fight. Keep this split.
3. **Motion rules:** transform/opacity only, custom ease
   (`--ease-out: cubic-bezier(0.16,1,0.3,1)`), everything gated behind
   `prefers-reduced-motion`. IntersectionObserver, never `scroll` listeners.
4. **Entrance cascade:** `.rise` + `.rise-2/-3/-4` on hero children (page-load).
   Scroll: `.reveal` on sections, add `.reveal--stagger` to cascade direct
   children.
5. **Hub monuments are individually extracted transparent cutouts** composited
   on a flat CSS gradient. Never reintroduce a rectangular background image
   there (caused visible color-seam bugs). If new art is needed, extract with
   alpha and drop-shadow via CSS filter.
6. Buttons: `.btn--primary` with optional `.btn__icon` (nested circle arrow).
   One CTA intent per page.

## Content facts

- EY internship was **Dallas** (was wrongly "Boston" before; fixed everywhere).
- Timeline: Starbucks + Code Ninjas (2022) → Champion Equipment Finance (2023)
  → Walmart Bentonville + Cognizant (2024) → EY Dallas internship (2025) →
  Delta co-op Atlanta (2025-26) → graduated UTD 2026 → full-time EY consultant.
- GPA 3.88, Collegium V Honors, AIS Finance Director.
- Contact email: edu.nikhild@gmail.com
- TikTok embedded via official player iframes
  (`https://www.tiktok.com/player/v1/{video_id}`).

## Open TODOs

- [ ] Resume: link a real PDF to the Download button.
- [ ] Contact: LinkedIn URL + social links (placeholder `.ph` boxes), wire the
      form to Formspree/Netlify Forms or similar.
- [ ] Creator page: replace placeholder Google Drive download links under each
      video with real Drive URLs (agencies need raw downloads; Canva blocks them).
- [ ] Consider featured-card treatment for contact.html intent boxes.
- [ ] Hosting/deployment not set up yet.
