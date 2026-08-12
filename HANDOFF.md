# Project Handoff: Nikhil Dasari Portfolio Site
## Complete conversation history (Claude Cowork session, July 2026)

This document is a full record of the Cowork session that built this site, written
for a follow-on agent (Claude Code). Read alongside CLAUDE.md, which holds the
compact rules; this file holds the story, reasoning, and rejected approaches so
you do not repeat solved mistakes.

---

## 1. The brief

Nikhil Dasari wanted a personal portfolio website combining:

- A professional portfolio (recruiter audience): UT Dallas ITS grad, internships
  at Walmart, Cognizant, EY, Delta co-op, now incoming full-time Technology
  Consultant at EY (Dallas office).
- A UGC/creator portfolio (marketing-agency audience): TikTok creator covering
  travel, fashion, and student life.

Original creative direction: a game-like navigation hub, initially Zelda-style
floating islands, with content sourced from his existing Wix site
(https://dasarinikhil1.wixsite.com/nikhil-dasari-1). Design-taste skills
(high-end-visual-design, design-taste-frontend, etc.) were to be applied
throughout.

## 2. Chronology of major phases

### Phase 1: Outline and skeleton
- Wrote a site outline document first, per his request ("fill in details last").
- Built 6 static pages: index (hub), about, work, resume, ugc (Creator), contact.
- Stack decision: plain HTML + one shared css/styles.css + js/site.js. No
  framework, no build step. This remains intentional.

### Phase 2: Sky Atlas island hub (later replaced)
- Generated painterly sky + island art; hub was floating islands with pointer
  parallax clouds and a zoom-depart click transition.
- User verdict later: "it feels a little child like" -> triggered redesign.

### Phase 3: UGC page rebuild (two rounds)
Round 1 (Schema editorial style) was rejected as too dark/heavy. Round 2 is the
current page, built to a UGC-agency checklist the user supplied:
- Highlight languages/multilingual ability, location (city/state/country),
  whitelisting availability, service level (Strategist / Executor / Hybrid).
- Hook-first "stop-scrolling" content presentation.
- Work segmented by client type (travel / fashion / life-education).
- Google Drive download links under each video (NOT Canva; Canva blocks
  downloads). Drive URLs are still placeholders - open TODO.
- Light theme + "scrollytelling" (his term): pinned stage, chapters fade/swap
  on scroll via IntersectionObserver (.scrolly__stage, .chapter.is-active).
- Real TikToks embedded via official player iframes:
  https://www.tiktok.com/player/v1/{video_id}. His account categories: travel,
  fashion, life (education).

### Phase 4: Monument Campus hub (current)
- Brainstormed 5 alternatives to islands; user chose "Monument Campus"
  (Monument Valley-style isometric architecture) after also previewing a desk
  flat-lay option.
- Five monuments = five doors: Pavilion (About), Foundry (Work), Archive
  (Resume), Amphitheater (Creator), Lighthouse (Contact).
- Color-match saga (important, do not regress):
  1. First attempt: blurred copy of the full campus image as page background.
     FAILED - visible rectangular seam.
  2. Second attempt: offline-baked wide blurred extension image. FAILED -
     seams on resize.
  3. Final fix (user-directed): extracted each monument individually via
     Gemini image generation ("only the X on a pure white background"), cut to
     true alpha with ImageMagick floodfill + connected-components (also strips
     Gemini watermark sparkles), composited cutouts on a flat CSS gradient.
     Structurally seam-proof. Assets: assets/monu-*.webp.
- Zoom "dive" transition on click (scale 1 -> 0.955 dip -> 3.6) with
  transform-origin at the clicked monument; labels are borderless bold text
  with white glow that floats on hover.
- Monuments positioned centered/lower per user request; idle bob animation
  with per-monument rhythm.

### Phase 5: Nav-bar consistency bug (multi-round, now pixel-locked)
User reported the top-right nav pill "changes sizes" between pages, then that
the Creator tab looked bigger, then explicitly corrected: "it is not the text
but the size of the whole navigation bar."
Root causes found via Playwright bounding-box measurement + pixel diffing:
1. Hub had 5 nav items vs 6 elsewhere (missing "Map").
2. Hub used different markup (.campus-hub__corner) with different padding.
3. No scrollbar-gutter caused ~15px shift on non-scrolling pages.
4. A faux-bold text-shadow on the current page link rendered heavier.
Fixes (all still in place): identical .site-nav markup on all 6 pages (Map,
About, Work, Resume, Creator, Contact), html { scrollbar-gutter: stable },
color-only current-page highlight, all nav dimensions px-locked (76px bar,
38px pill, 14px font, 0 18px padding, 16px gap). Verified: identical bounding
box {x:1169, y:19, w:376, h:38} on all pages, 99.85%+ pixel-identical.

### Phase 6: About page rebuild
- Brainstormed layouts; user picked "Front porch + Now/Then/Next".
- Porch hero: greeting h1, intro, three "door" links (Here to hire? -> work,
  Here to collab? -> ugc, Just curious? -> #story), portrait photo (from his
  Wix site).
- User supplied 10 personal photos, processed to WebP (max 1100px, q80) in
  assets/life/: venice, grad, cascades, alpine, dog, coast, pittsburgh, boat,
  bigsur, dusk. Filename-to-content mapping was verified visually via contact
  sheets after an initial mix-up.
- Bug fixed: images distorted until height:auto added to all gallery img rules.

### Phase 7: Now/Then/Next content update (current facts)
User-directed rewrite - these are the authoritative facts:
- NOW: about to start as a full-time Technology Consultant at EY. UT Dallas
  graduate (Class of 2026 - he HAS graduated).
- THEN: Starbucks barista + Code Ninjas (2022) -> Champion Equipment Finance
  (2023) -> Walmart Bentonville + Cognizant externship (2024) -> EY Technology
  Consulting internship in DALLAS (2025; was wrongly listed as Boston, now
  fixed everywhere) -> Delta Air Lines product development co-op, Atlanta
  (2025-26) -> graduated UTD.
- NEXT: succeed and grow as a Technology Consultant at EY while keeping
  creative work (UGC) alive.
- Gallery change: graduation photo moved from the Next section into the bottom
  collage; the enlarged "lead" duo photo (Cascades) was de-emphasized to the
  same size as the rest. No enlarged lead image anymore.

### Phase 8: Work page redesign + site-wide motion polish (latest work)
Work page (design read: redesign-preserve, recruiter audience, keep campus
brand):
- EY leads as an accent-tinted "story" feature card: "Summer 2025, Dallas" +
  emerald pill "Returning full time as a Technology Consultant".
- Delta feature card (flipped), Walmart (tinted card) + Cognizant asymmetric duo.
- "Earlier chapters" strip replaced with a vertical timeline rail (emerald
  gradient line + ring markers): Champion 2023, UTD OIT 2022-2026, Code Ninjas
  2022, Starbucks 2022.
- Logo tiles got brand gradients (EY yellow #ffe600 on charcoal, Delta deep red).
- All "2022 to now" dates became "2022 to 2026" (work + resume).

Site-wide polish layer appended to css/styles.css:
- .rise / .rise-2/-3/-4: page-load entrance cascade (fade-up + blur settle),
  applied to hero children on about, work, resume, contact.
- .reveal upgraded with blur; .reveal--stagger cascades direct children with
  nth-child transition delays.
- Card hover physics use the CSS `translate` property (NOT transform) so they
  never conflict with reveal transforms. This split is deliberate - keep it.
- .btn__icon: nested circular arrow inside primary buttons, nudges on hover;
  primary buttons lift with a tinted emerald shadow.
- .role rows get a quiet hover surface.
- Everything transform/opacity only, custom ease cubic-bezier(0.16,1,0.3,1),
  gated behind prefers-reduced-motion. No scroll event listeners anywhere.

## 3. Design system summary
- Fonts: Cabinet Grotesk (display 700/800) + Satoshi (body) via Fontshare.
- Campus palette, light-locked (color-scheme: light, no dark mode by design):
  surface #f2f1e8, raised #fbfaf4, text #23261f, muted #6a6d60,
  accent #2b7a58 (only accent), accent-soft #e3eee6, lines #d6d5c4/#e7e6d8.
- Radii: 16px cards, pill buttons. Warm-tinted shadows rgba(95,100,75,...).
- Copy: no em-dashes, short sentences, concrete verbs, one CTA intent per page.
- Page-specific CSS lives in each page's <style> block; shared stays in
  css/styles.css.

## 4. Verification tooling used (sandbox-specific, may not apply in Claude Code)
Playwright headless Chromium was used for screenshot QA and pixel measurement.
In the Cowork sandbox this required extracting missing X11 libs from .deb
packages (libXdamage etc.) and LD_LIBRARY_PATH. In Claude Code on the user's
machine, a normal `npx playwright install chromium` should just work if visual
QA is needed.

## 5. File deployment note
During the Cowork session, files were mirrored to a second internal location.
In Claude Code, ignore that: the single source of truth is this folder
(nikhil-portfolio-site). Edit in place.

## 6. Open TODOs (verbatim state)
1. Resume page: "Download PDF" button is a dead placeholder; needs a real PDF.
2. Contact page: LinkedIn + social links are .ph placeholder boxes; contact
   form is not wired (suggested: Formspree/Netlify Forms).
3. Creator (ugc.html): Google Drive download links under videos are
   placeholders; user must supply real Drive URLs.
4. Possible: featured-card treatment for the contact intent boxes.
5. Hosting/deployment not chosen yet.
6. User paused while considering more UI/UX flexibility - expect further
   design iteration requests.

## 7. Key user preferences observed
- Concise, direct communication.
- Wants skills/taste-guides applied ("modern, elegant, sleek"); reacts against
  childlike or generic looks.
- Iterates on pixel-level detail (color seams, label sizes, nav consistency)
  and expects root-cause analysis over quick guesses.
- Confirms visual results from screenshots; keep verifying renders after edits.
