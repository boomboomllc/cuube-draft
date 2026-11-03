# CUUBE Website: Draft Reference

**Live preview:** https://boomboomllc.github.io/cuube-draft/

A working draft of a proposed CUUBE website, meant as a **reference for structure, page flow and messaging**. All copy, statistics, logos and contract details are placeholders (shown as yellow highlighted text).

**📋 [Content checklist](CONTENT-CHECKLIST.md):** everything the CUUBE team needs to confirm or send before launch: contact info, license numbers, specs, designer options, photos and legal text.

## Purpose

One goal: **move visitors into the building designer as quickly as possible.** Buyers usually arrive with a specific need. The site recognizes it within seconds and lets them start configuring a building, instead of making them read marketing copy first.

## Visitor journey

1. **Home:** what CUUBE is (a permanent steel building delivered as a kit, not modular), then "Who are you building for?"
2. **Audience page** (Schools, Cities & Counties, Federal): quick-start tiles that open the designer with that building type and size already selected.
3. **Designer:** choose the use, then series and size, add-ons and colors.
4. **Quote request:** contact details are asked for only at the end.

Supporting pages (Why CUUBE, Models, Projects, How to Buy) hold proof and detail without standing in the way.

## Guiding principles

- Every page leads to the designer, usually in one click.
- If a section doesn't help someone build or buy, cut it.
- Only "Design Your Building" is a solid blue button; other buttons are secondary styles.

## Next steps

1. **Finish and launch:** swap in real content from the [checklist](CONTENT-CHECKLIST.md), build the live 3D preview and budget range into the designer, connect the quote form to the CRM (HubSpot or Salesforce), add analytics, and go live on the CUUBE domain.
    - **Live 3D preview:** the building updates in 3D as buyers choose series, size, add-ons and colors. Needs 3D models of each series (Revit, SketchUp or 3D AutoCAD; 2D drawings alone aren't enough).
    - **Budget range:** the designer ends with a budget estimate range ("final pricing confirmed by your CUUBE rep"), shown to everyone or after a quote request. Needs rough per-square-foot ranges per series and ballparks for big add-ons.
2. **Admin site:** a separate login where the marketing team edits page text, photos and headlines, plus every designer option: series, sizes, uses, add-ons (and which add-ons fit which series) and the prices behind the budget range.

---
---

# 🛠 Developer Notes

*Everything below is for whoever implements or adapts the site.*

## Implementation options

The draft is plain HTML, CSS and JavaScript (no framework or build step), so it carries over to any platform.

**A. Cloudflare Pages + admin site (recommended, closest to the draft)**
1. Move this repo to a CUUBE / KYA GitHub account.
2. In Cloudflare (free plan, under a KYA email): **Workers & Pages → Create → Pages → Connect to Git**, and pick the repo. Every saved change then goes live in about a minute.
3. Under **Custom domains**, add the CUUBE domain (a DNS change by whoever manages it).
4. Connect the quote form to the CRM (HubSpot forms API or Salesforce Web-to-Lead), so each quote becomes a lead with the buyer's selections attached.
5. Add the admin site ([Pages CMS](https://pagescms.org), free): marketing logs in and edits page text, photos, designer options and prices. Content moves into data files the pages read.

Exact design, the full designer (3D preview, budget range), about $0/month to host. Layout changes and new page types still need a developer.

**B. WordPress**
Rebuild the pages in a page builder (Elementor or the block editor) using the draft as the visual reference, and paste `assets/style.css` into **Additional CSS**. For the designer, embed its markup and script (Custom HTML block plus a code plugin such as WPCode) to keep the 3D preview and budget range; a multi-step form plugin (Gravity Forms, WPForms) is easier to edit but loses both. Easiest for staff to edit pages, but needs plugin and security updates, and the designer's options and prices still need their own editor or a developer.

**C. Squarespace**
Rebuild the pages with the section editor and set the brand colors and fonts in Site Styles. Lowest maintenance, least flexible.

Squarespace has no built-in way to make the designer. Its own forms have no steps that change with earlier answers, no live preview, no color swatches and no budget math. That leaves two options:

| | Embed this designer | Embed a form tool (Typeform, Jotform, HubSpot forms) |
|---|---|---|
| Buyers get | The full designer: steps, live preview, colors, budget range | A step-by-step questionnaire with some logic and a rough price calculation; no live preview or color swatches |
| Cost | No fee for the designer itself, but it needs a Squarespace plan that allows custom code, which can cost more than the basic plan | Often a monthly fee for the form tool, on top of the Squarespace plan |
| Who edits options and prices | A small admin site for the designer, or a developer | Marketing, inside the form tool |

Either way the page text is edited in Squarespace. Each Squarespace site is its own subscription, so a separate CUUBE site adds a plan; adding CUUBE pages to an existing site doesn't, but they then share that site's menus, look and domain.

**Hybrid:** run the main site on WordPress or Squarespace and host only the designer with Option A on a subdomain (for example `design.cuube.info`), with its own small admin site for options and prices.

## Files

```
index.html          Home
schools.html        Audience: K–12
cities.html         Audience: municipalities
federal.html        Audience: federal / defense
why-cuube.html      Kit vs. modular, specs
models.html         Series and comparison table
projects.html       Project gallery
project.html        Single project template
how-to-buy.html     Process, funding, contact
design.html         Building designer
assets/style.css    All styles
assets/site.js      Shared header/footer, navigation, designer logic
assets/img/         Images
```

To view locally, serve the folder with any web server, then open http://localhost:8123:

```bash
python3 -m http.server 8123
```

## Key behaviors

- **Header and footer** are generated by `assets/site.js` on every page.
- **Designer presets via URL:** for example `design.html?use=gym&model=100x90&sector=federal`. The keys `model`, `use` and `extras` match each option's `data-val`; color parts (`field`, `accent`, `columns`, `beams`, `eaves`, `roof`, `trim`) take a Metl-Span color name. The quick-start tiles use this.
- **Quote form** is not connected yet. The visitor's selections are filled into a text field, ready to send.
- **Placeholders** are marked `<span class="tbd">`, so one search finds them all.
- **Styling:** text is solid colors only (gradients only on backgrounds and borders), and the accent is CUUBE blue `#0065cc`.
