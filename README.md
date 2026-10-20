# CUUBE site (draft)

**Live:** https://boomboomllc.github.io/cuube-draft/

Draft of the new CUUBE website. Layout and flow are ready for review. All copy, logos, numbers and contract names are placeholders.

## What it is

The site has one job: **get visitors into the building designer as fast as possible.**

- The **homepage** says what CUUBE is, *a permanent steel building delivered as a kit, not modular*. Then it asks who you're building for: **Schools, Cities & Counties, or Federal.**
- Each **audience page** opens with quick-start tiles ("Classrooms", "Park restrooms", "Barracks"…). One click opens the designer with that building type and a recommended size already picked.
- In the **designer** you choose a model, a look and options. Contact info is asked for only at the very end, to request a quote, so trying it costs nothing.
- Everything else (why CUUBE, models, projects, how to buy) backs up that decision. We cut repeated content so nobody has to scroll through paragraphs before they can build something.

## Where it goes next

1. **Make the designer the product.** It's the core of the site and still a placeholder. Add a real 3D or plan preview, a rough price or timeline estimate as people choose options, and a way to save or share a design with a board or contracting officer.
2. **Replace placeholders with real proof.** Real stats, client logos (with permission), testimonials and case studies. Federal especially needs real contract vehicles (for example a GSA schedule number) before it goes public.
3. **Connect the quote form** to the CRM or email, and track how many visitors start the designer and how many finish it.
4. **Keep the rule:** if a section doesn't help someone build or buy, cut it or link to it rather than adding it to the page.

---

## Dev notes

### Stack
Plain static HTML, CSS and JS. No build step, framework or dependencies. GitHub Pages serves `main` from the repo root, and each push goes live in about a minute.

```
index.html          Home
schools.html        Audience: K–12
cities.html         Audience: municipalities
federal.html        Audience: federal / defense
why-cuube.html      Kit vs. modular, specs
models.html         Series + compare table
projects.html       Project grid / map
project.html        Single project template
how-to-buy.html     Process timeline, funding, contact
design.html         The designer
assets/style.css    All styles
assets/site.js      Shared header/footer, nav, filters, designer logic
assets/img/         Images
```

### Run locally
Serve the folder over HTTP. Opening the files directly with `file://` works but is less reliable.

```bash
python3 -m http.server 8123
```

Then open http://localhost:8123.

### How things fit together
- **Header and footer** are injected by `assets/site.js`. To add a page to the main nav or footer, edit the `links` array and footer markup there, not each HTML file.
- **Designer presets via URL:** `design.html?use=gym&model=100x90&extras=Solar-ready&sector=federal`
  - Any `data-group` in `design.html` (`model`, `use`, `color`, `roof`, `extras`) can be preset by a query param matching an option's `data-val`.
  - `sector=federal` changes the Organization field placeholder.
  - New building uses: add a `<button class="opt" data-val="…">` to the `use` group, then link to it from the audience pages.
- **The quote form is not connected.** It currently shows an alert. The `#msg` textarea is filled automatically with the visitor's selections, ready to send along once the form is connected.
- **Placeholders** are marked `<span class="tbd">[…]</span>` and show as yellow highlights. To list them all:

  ```bash
  grep -n 'class="tbd"' *.html
  ```

- **The "Draft" banner** is in `site.js` (`.draft-bar`). Remove it before any public launch.

### Styling conventions
- `style.css` is layered: base styles first, then later override blocks ("modern layer", fast-path tiles and so on). Later rules win, so check the bottom of the file before changing an early rule.
- Text is **solid colors only**. Gradients are for backgrounds and borders.
- **Only the main nav "Design Your Building" button is a solid blue button.** Context-bar buttons (`.lnav .btn`) are outlined on purpose.
- Anchor jumps are offset for the sticky bars with `scroll-padding-top` on `html` (more when a `.lnav` context bar is present).
- Quick-start tiles: `.quick` (3 columns) or `.quick.q4` (4 columns).

### Before going public
- [ ] Replace all `[tbd]` placeholders, stats and the logo strips (get permission for every logo)
- [ ] Real project photos, testimonials and case studies
- [ ] Connect the quote form; add analytics (designer start → quote submitted)
- [ ] Remove the draft banner; add meta descriptions, Open Graph images and a sitemap
- [ ] Custom domain (Pages settings + `CNAME` file)
- [ ] Accessibility pass (alt text on decorative images, contrast, keyboard use of designer options)
- [ ] Decide whether the repo should be private
