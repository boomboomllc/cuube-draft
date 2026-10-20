# CUUBE Website: Draft Reference

**Live preview:** https://boomboomllc.github.io/cuube-draft/

This is a working draft of a proposed CUUBE website. Use it as a **reference for structure, page flow and messaging**: something to review, borrow from, or rebuild on whatever platform CUUBE chooses. It is not a finished production site.

All copy, statistics, logos, client names and contract details are **placeholders**. They show where content belongs, not what it should say. Placeholders appear on the site as yellow highlighted text, and a "Draft" banner runs across the top of every page.

---

## 1. Purpose

The site is built around one goal: **move visitors into the building designer as quickly as possible.**

Prospective buyers (district facilities staff, city managers, federal program offices) usually come with a specific need. The site aims to recognize that need within seconds and let them start configuring a building, instead of making them read general marketing copy first.

## 2. Visitor journey

| Step | Page | What the visitor sees |
|---|---|---|
| 1 | **Home** | What CUUBE is (a permanent steel building delivered as a kit, not modular), then "Who are you building for?" |
| 2 | **Audience page** (Schools, Cities & Counties, Federal) | Quick-start tiles for common building types. One click opens the designer with that use and a recommended size already selected. |
| 3 | **Designer** | Choose series and size, use, exterior, roof and options. A summary updates as they go. |
| 4 | **Quote request** | Contact details are requested only at the end, with the visitor's selections attached. |

Supporting pages (Why CUUBE, Models, Projects, How to Buy) provide proof and detail for visitors who want it. They are reached from links on the main pages and do not stand between the visitor and the designer.

## 3. Guiding principles

- **Every page leads to the designer.** Each page has a clear route into it, usually in one click.
- **Brevity over volume.** If a section doesn't help a visitor build or buy, it is cut or moved to a supporting page.
- **Audience-specific entry points.** Schools, municipalities and federal buyers have different vocabularies and priorities. Each gets its own page but the same flow.
- **Low-commitment conversion.** Visitors can explore freely, and contact information is the last step.
- **One primary action.** Only the main "Design Your Building" button is a solid blue button. Every other button uses a lighter, secondary style.

## 4. Recommended next steps

1. **Develop the designer into the centerpiece.** Priorities: a real 3D or floor-plan preview, an indicative price and schedule that update as options are chosen, and the ability to save or share a configuration with a school board or contracting officer.
2. **Replace placeholders with real proof.** Verified statistics, client logos (with written permission), testimonials and completed case studies. The Federal page in particular needs real procurement details (for example a GSA schedule number) before publication.
3. **Connect the quote form** to CUUBE's CRM or sales inbox.
4. **Measure the funnel.** Track how many visitors open the designer, how many finish it and how many submit a quote, and use those numbers to guide later changes.

---

## 5. Implementation options

The draft is plain HTML, CSS and JavaScript with no framework or build tools, so it can be adapted to any platform. Here are the main paths, in order of how much of the draft carries over directly.

### Option A: Host the files directly, with Cloudflare Pages (recommended for fidelity)

The draft becomes the production site almost as-is, served on CUUBE's own domain.

1. Download this repository (the green **Code** button on GitHub, then **Download ZIP**).
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Upload assets** and upload the folder. (Or connect a Git repository for automatic deploys.)
3. Under **Custom domains**, add the CUUBE domain (for example `www.cuube.com`). If the domain's DNS is already on Cloudflare, this takes a few clicks.
4. Connect the quote form to a form service, such as Formspree, Basin or a HubSpot form embed, or to a Cloudflare Pages Function.

- **Pros:** Exact design and behavior, very fast, free or low cost, no plugins to maintain.
- **Cons:** Editing content means editing HTML, so it needs a developer or someone comfortable with code.
- Other static hosts (Netlify, Vercel, GitHub Pages) work the same way.

### Option B: WordPress

Best when non-technical staff need to update content regularly.

- **Rebuild with a page builder** (Elementor, Bricks or the built-in block editor). Recreate each page section by section, using the draft as the visual reference. Copy `assets/style.css` into the theme's **Additional CSS** to keep most of the styling.
- **Or have a developer build a custom theme.** The HTML files convert cleanly into page templates, with the shared header and footer as theme parts.
- **The designer:** put the designer section of `design.html` into a **Custom HTML** block and load the designer code from `assets/site.js` (for example with the "WPCode" plugin), or rebuild it as a quote form with conditional fields (Gravity Forms, WPForms).
- **Pros:** Easy content editing, large plugin ecosystem.
- **Cons:** More upkeep (updates, security, plugins), and the result will be close to the draft rather than identical.

### Option C: Squarespace

Best for a simple, low-maintenance site managed entirely by marketing staff.

- Rebuild each page with Squarespace's section editor, following the draft's order and content.
- Add the brand colors and fonts in **Site Styles**. Selected rules from `style.css` can go in **Custom CSS** (Business plan or above).
- **The designer:** Squarespace can't run custom page scripts on lower plans. Options are a **Code Block** with the designer markup and script (Business plan or above), an embedded form tool (Typeform, Jotform, HubSpot) that mirrors the designer steps, or hosting the designer separately (Option A) and linking or embedding it.
- **Pros:** No maintenance, simple editing, hosting included.
- **Cons:** Least flexible; the interactive designer is the hardest part to reproduce.

### Hybrid approach

CUUBE can run its main marketing site on WordPress or Squarespace and host **only the designer** as a standalone page (Option A) on a subdomain such as `design.cuube.com`. That keeps content editing easy and keeps the interactive tool intact.

---

## 6. Technical reference

### File overview

```
index.html          Home
schools.html        Audience page: K–12
cities.html         Audience page: municipalities
federal.html        Audience page: federal / defense
why-cuube.html      Kit vs. modular, specifications
models.html         Building series and comparison table
projects.html       Project gallery
project.html        Single project template
how-to-buy.html     Process timeline, funding, contact
design.html         Building designer
assets/style.css    All styles
assets/site.js      Shared header/footer, navigation, designer logic
assets/img/         Images (placeholder and project photography)
```

### Viewing locally

Download the files and serve the folder from any local web server, for example:

```bash
python3 -m http.server 8123
```

Then open http://localhost:8123 in a browser.

### Key behaviors

- **Shared header and footer.** Both are generated by `assets/site.js` and appear on every page. On a platform with its own header and footer (WordPress, Squarespace), use that instead.
- **Pre-filled designer links.** Links can preselect designer options through the URL, for example:
  `design.html?use=gym&model=100x90&extras=Solar-ready&sector=federal`
  - Supported keys: `model`, `use`, `color`, `roof`, `extras`. Each value matches an option's `data-val` in `design.html`.
  - `sector=federal` changes the Organization field prompt to suit federal buyers.
  - The quick-start tiles on the audience pages work this way, and the same approach works in any platform that can run the designer.
- **Quote form.** Currently not connected; submitting shows a notice. The visitor's selections are collected into a text field automatically, ready to send once a form service is attached.
- **Placeholders.** Marked in the code as `<span class="tbd">…</span>`, so they can all be found with one search.

### Design conventions

- **Typography:** Plus Jakarta Sans for headings. All text is solid color; gradients appear only in backgrounds and borders.
- **Color:** CUUBE logo blue (`#0065cc`) is the accent, used sparingly.
- **Buttons:** one solid primary button (Design Your Building); secondary actions use outlined or text-link styles.
- **Layout:** responsive, adapting to desktop, tablet and phone widths.

---

## 7. Pre-launch checklist

- [ ] Replace all placeholder copy, statistics and highlighted `[ ]` items
- [ ] Get written permission for every client or agency logo shown
- [ ] Add real project photography, testimonials and case studies
- [ ] Connect the quote form to the CRM or sales inbox
- [ ] Add analytics, including designer started → quote submitted
- [ ] Remove the draft banner
- [ ] Add page titles, meta descriptions, social sharing images and a sitemap
- [ ] Accessibility review (image descriptions, color contrast, keyboard navigation)
- [ ] Connect the production domain

---

*Prepared as a design and structure reference for CUUBE. The content is illustrative and subject to review.*
