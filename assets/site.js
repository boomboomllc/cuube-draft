// Shared header/footer + small interactions for the CUUBE draft
(function () {
  const page = document.body.dataset.page || "";
  const links = [
    ["schools.html", "For Schools", "schools"],
    ["cities.html", "For Cities & Counties", "cities"],
    ["federal.html", "For Federal", "federal"],
    ["why-cuube.html", "Why CUUBE", "why"],
    ["models.html", "Models", "models"],
    ["projects.html", "Projects", "projects"],
    ["how-to-buy.html", "How to Buy", "buy"],
  ];

  // Sister-company links carry utm tags so KYA's analytics can count visitors sent from CUUBE
  const KYA = "https://www.thekyagroup.com";
  const CHOICE = "https://tlschoice.com";
  const out = (url, spot) => `${url}${url.includes("?") ? "&" : "?"}utm_source=cuube&utm_medium=referral&utm_campaign=${spot}`;
  window.cuubeOut = out;

  const header = `
    <a class="skip" href="#main">Skip to content</a>
    <div class="draft-bar">Draft layout · placeholder content and images · not for distribution</div>
    <div class="co-bar"><div class="wrap">
      <a class="co-kya" href="${out(KYA, "company_bar")}"><span>A</span><img src="assets/img/kya-logo.png" alt="KYA"><span>company</span></a>
      <nav aria-label="Family of companies"><a href="${out(KYA, "company_bar")}">KYA Group</a><a href="${out(CHOICE, "company_bar")}">CHOICE</a><a href="index.html" aria-current="page">CUUBE</a></nav>
    </div></div>
    <nav class="gnav"><div class="wrap">
      <a class="logo" href="index.html"><img src="assets/img/cuube-logo.png" alt="CUUBE"></a>
      <ul id="gmenu">
        ${links.map(([h, t, k]) => `<li><a href="${h}" class="${k === page ? "on" : ""}">${t}</a></li>`).join("")}
      </ul>
      <a class="btn sm" href="design.html">Design Your Building</a>
      <button class="menu-btn" aria-label="Menu" aria-controls="gmenu" aria-expanded="false" onclick="this.setAttribute('aria-expanded', document.getElementById('gmenu').classList.toggle('open'))">☰</button>
    </div></nav>`;

  const footer = `
    <footer><div class="wrap">
      <div class="cols c5">
        <div><h2 class="fh">Who it's for</h2><ul>
          <li><a href="schools.html">K–12 Schools</a></li><li><a href="schools.html#upk">UPK / TK</a></li>
          <li><a href="cities.html">Cities & Counties</a></li><li><a href="cities.html#parks">Parks & Rec</a></li><li><a href="federal.html">Federal & Defense</a></li></ul></div>
        <div><h2 class="fh">The building</h2><ul>
          <li><a href="why-cuube.html">Why CUUBE</a></li><li><a href="models.html">Models</a></li>
          <li><a href="models.html#compare">Compare models</a></li><li><a href="design.html">Design your building</a></li></ul></div>
        <div><h2 class="fh">Proof</h2><ul>
          <li><a href="projects.html">Projects</a></li><li><a href="projects.html#map">Project map</a></li>
          <li><a href="#">Virtual tours</a></li></ul></div>
        <div><h2 class="fh">Get started</h2><ul>
          <li><a href="how-to-buy.html">How to buy</a></li><li><a href="how-to-buy.html#funding">Funding</a></li>
          <li><a href="how-to-buy.html#purchasing">Purchasing options</a></li><li><a href="how-to-buy.html#contact">Talk to a specialist</a></li></ul></div>
        <div><h2 class="fh">Contact</h2><ul>
          <li><a href="tel:+17144622955">714.462.2955</a></li><li><a href="mailto:CUUBE@tlschoice.com">CUUBE@tlschoice.com</a></li>
          <li>[Street address]<br>[City], CA [ZIP]</li></ul></div>
      </div>
      <div class="family">
        <span class="fh">Family of companies</span>
        <a href="${out(KYA, "footer")}"><b>KYA Group</b><small>General contractor · 7 offices in CA &amp; TX</small></a>
        <a href="${out(CHOICE, "footer")}"><b>CHOICE</b><small>Contracting · offers CUUBE</small></a>
        <a href="index.html"><b>CUUBE</b><small>Pre-engineered steel buildings</small></a>
      </div>
      <p class="legal">CUUBE is offered by TLS Choice and built by KYA Group <span class="tbd">[describe KYA relationship]</span>. CA Contractor License (CSLB) #<span class="tbd">[number]</span> · DSA pre-approved plans <span class="tbd">[PC #]</span> · DIR #<span class="tbd">[number]</span></p>
      <p class="legal">© 2026 CUUBE · <a href="privacy.html">Privacy policy</a> · <a href="accessibility.html">Accessibility statement</a> · Draft site, content is placeholder.</p>
    </div></footer>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);
  // Landmarks: banner header, one <main> around the page content
  const head = document.createElement("header");
  head.append(...document.querySelectorAll("body > .skip, body > .draft-bar, body > .co-bar, body > .gnav"));
  document.body.prepend(head);
  const main = document.createElement("main");
  main.id = "main"; main.tabIndex = -1;
  main.append(...document.querySelectorAll("body > .lnav, body > section"));
  head.after(main);
  // Moving the content resets the browser's jump to #anchor, so re-apply it
  if (location.hash) requestAnimationFrame(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView());

  // Lead tagging: remember the first landing's source for this visit, then add it to every quote form
  // so the CRM can sort leads by brand, page and sector and route them to a regional office by ZIP
  const q = new URLSearchParams(location.search);
  const store = (() => { try { return sessionStorage; } catch { return null; } })();
  const first = (() => { try { return JSON.parse(store?.getItem("cuube-src") || "null"); } catch { return null; } })() || {
    utm_source: q.get("utm_source") || "", utm_medium: q.get("utm_medium") || "", utm_campaign: q.get("utm_campaign") || "",
    referrer: document.referrer && !document.referrer.startsWith(location.origin) ? document.referrer : "",
    landing_page: location.pathname,
  };
  try { store?.setItem("cuube-src", JSON.stringify(first)); } catch {}
  document.querySelectorAll("form.lead").forEach((f) => {
    const tags = { brand: "CUUBE", form_page: location.pathname, sector_hint: q.get("sector") || (["schools", "cities", "federal"].includes(page) ? page : ""), ...first };
    Object.entries(tags).forEach(([name, value]) => {
      if (f.elements[name]) return;
      const i = document.createElement("input");
      i.type = "hidden"; i.name = name; i.value = value;
      f.append(i);
    });
  });

  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const conn = navigator.connection || {};
  const slow = conn.saveData || /(^|-)2g|3g/.test(conn.effectiveType || "");

  // Open a FAQ item when linked to directly (e.g. how-to-buy.html#dsa)
  const openHash = () => { const d = location.hash && document.querySelector(`details${location.hash}`); if (d) d.open = true; };
  openHash(); addEventListener("hashchange", openHash);

  // Project cards: photos ease in as they scroll into view
  document.querySelectorAll('a.card[href^="project.html"], a.card[href*="thekyagroup.com/projects/"]').forEach((c) => c.classList.add("proj"));

  // Scroll reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  // Stats count up once, only when the value is a real number (placeholders like "[X]" stay as-is)
  const countIO = new IntersectionObserver((es) => es.forEach((e) => {
    if (!e.isIntersecting) return;
    countIO.unobserve(e.target);
    const el = e.target, m = el.textContent.match(/^(\d[\d,]*)(.*)$/);
    if (!m || reduced) return;
    const end = +m[1].replace(/,/g, ""), rest = m[2], t0 = performance.now();
    const tick = (t) => {
      const k = Math.min((t - t0) / 1400, 1), v = Math.round(end * (1 - Math.pow(1 - k, 3)));
      el.textContent = v.toLocaleString() + rest;
      if (k < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }), { threshold: 0.6 });
  document.querySelectorAll("[data-count]").forEach((el) => countIO.observe(el));

  // Kit of parts: the building assembles layer by layer as you scroll.
  // Reduced motion, small screens and slow connections get the finished building, no scroll scrubbing.
  const asm = document.querySelector("[data-asm]");
  if (asm) {
    const lazy = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting) return;
      lazy.disconnect();
      initAssembly(asm, !reduced && !slow && matchMedia("(min-width: 761px)").matches);
    }, { rootMargin: "600px 0px" });
    lazy.observe(asm);
  }

  function initAssembly(root, live) {
    const C = Math.cos(Math.PI / 6), S = 24, H = 3.4, L = 12, D = 7;
    const P = (x, y, z) => [(x - y) * C * S, (x + y) * 0.5 * S - z * S];
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    const poly = (pts, fill, op) => pts.map((p) => P(...p)).map(([x, y]) => {
      minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ").replace(/^/, `<polygon fill="${fill}"${op ? ` fill-opacity="${op}"` : ""} points="`) + '"/>';
    // Only the three faces the viewer can see: top, +x side, +y side
    const box = ([a, b, c, d, e, f], [top, rt, ft], op) => ({
      k: d + e + c * 0.1,
      svg: poly([[a, b, f], [d, b, f], [d, e, f], [a, e, f]], top, op) +
        poly([[d, b, c], [d, e, c], [d, e, f], [d, b, f]], rt, op) +
        poly([[a, e, c], [d, e, c], [d, e, f], [a, e, f]], ft, op),
    });
    const col = {
      slab: ["#d3d7dd", "#b4bac4", "#a0a7b2"], floor: ["#efe6d6", "#d9cdb7", "#c8bba3"], part: ["#fafbfc", "#e3e7ec", "#d3d9e1"],
      steel: ["#3d86d6", "#0065cc", "#004e9e"], panel: ["#f3f5f8", "#dfe4eb", "#cbd2dc"], glass: ["#a9d1f5", "#6fb1f5", "#4f97e0"],
      door: ["#4a6789", "#34506f", "#2a425d"], roof: ["#7d8b9e", "#5d6b7e", "#4b586b"], unit: ["#eef0f3", "#cfd4db", "#b9c0ca"],
    };
    const layers = [[], [], [], [], [], []];
    // 1 Foundation
    layers[0].push(box([-0.3, -0.3, -0.5, L + 0.3, D + 0.3, 0], col.slab));
    // 2 Floor & interior
    layers[1].push(box([0, 0, 0, L, D, 0.08], col.floor));
    [4, 8].forEach((x) => layers[1].push(box([x, 0.2, 0.08, x + 0.14, D - 0.2, 2.7], col.part)));
    // 3 Steel frame
    [0, 4, 8, L].forEach((x) => [0, D].forEach((y) => layers[2].push(box([x - 0.13, y - 0.13, 0, x + 0.13, y + 0.13, H], col.steel))));
    [0, D].forEach((y) => layers[2].push(box([0, y - 0.11, H - 0.32, L, y + 0.11, H], col.steel)));
    [0, 4, 8, L].forEach((x) => layers[2].push(box([x - 0.11, 0, H - 0.32, x + 0.11, D, H], col.steel)));
    // 4 Wall panels: solid far walls, near walls framed around window and door openings
    const t = 0.14, wins = [[1, 3.2], [5, 7.2], [9, 11.2]], sill = 1, head = 2.5;
    layers[3].push(box([0, -t, 0, L, 0, H], col.panel), box([-t, 0, 0, 0, D, H], col.panel));
    let x0 = 0;
    wins.forEach(([a, b]) => {
      layers[3].push(box([x0, D, 0, a, D + t, H], col.panel), box([a, D, 0, b, D + t, sill], col.panel), box([a, D, head, b, D + t, H], col.panel));
      x0 = b;
    });
    layers[3].push(box([x0, D, 0, L, D + t, H], col.panel));
    const sideW = (y0, y1, z0, z1) => box([L, y0, z0, L + t, y1, z1], col.panel);
    layers[3].push(sideW(0, 2.2, 0, H), sideW(2.2, 4, 2.4, H), sideW(4, 5, 0, H), sideW(5, 6.4, 0, sill), sideW(5, 6.4, head, H), sideW(6.4, D, 0, H));
    // 5 Glazing & doors
    wins.forEach(([a, b]) => layers[4].push(box([a, D + 0.04, sill, b, D + 0.08, head], col.glass, 0.85)));
    layers[4].push(box([L + 0.04, 2.2, 0, L + 0.08, 4, 2.4], col.door), box([L + 0.04, 5, sill, L + 0.08, 6.4, head], col.glass, 0.85));
    // 6 Roof, skylights and HVAC
    layers[5].push(box([-0.45, -0.45, H, L + 0.45, D + 0.45, H + 0.3], col.roof));
    [2, 6].forEach((x) => layers[5].push(box([x, 3, H + 0.3, x + 1, 4, H + 0.42], col.glass)));
    layers[5].push(box([9, 2, H + 0.3, 10.6, 3.6, H + 1.1], col.unit));

    const LIFT = 150, GAP = 48;
    const groups = layers.map((l, i) => `<g class="asm-layer" data-i="${i}">${l.sort((a, b) => a.k - b.k).map((b) => b.svg).join("")}</g>`).join("");
    const pad = 16, top = minY - pad - GAP * 5;
    root.querySelector(".asm-svg").innerHTML =
      `<svg viewBox="${(minX - pad).toFixed(0)} ${top.toFixed(0)} ${(maxX - minX + pad * 2).toFixed(0)} ${(maxY - top + pad).toFixed(0)}" aria-hidden="true" stroke="rgba(15,27,45,.22)" stroke-width=".6" stroke-linejoin="round">${groups}</svg>`;

    const els = [...root.querySelectorAll(".asm-layer")], steps = [...root.querySelectorAll(".asm-steps li")];
    const bar = root.querySelector(".asm-bar i"), btn = root.querySelector(".asm-toggle");
    const track = root.querySelector(".asm-track"), stage = root.querySelector(".asm-stage");
    let exploded = false, progress = live ? 0 : 6;

    function paint() {
      els.forEach((g, i) => {
        const k = Math.max(0, Math.min(1, progress - i)), e = 1 - Math.pow(1 - k, 3);
        g.style.transform = `translateY(${(-(1 - e) * LIFT - (exploded ? i * GAP : 0)).toFixed(1)}px)`;
        g.style.opacity = e.toFixed(3);
      });
      const cur = Math.min(5, Math.floor(progress));
      steps.forEach((li, i) => { li.classList.toggle("done", progress >= i + 1); li.classList.toggle("cur", live && i === cur && progress < 6); });
      bar.style.width = `${(progress / 6) * 100}%`;
    }
    btn.addEventListener("click", () => {
      exploded = !exploded;
      btn.setAttribute("aria-pressed", exploded);
      btn.textContent = exploded ? "Assembled view" : "Exploded view";
      root.classList.add("easing"); paint();
      setTimeout(() => root.classList.remove("easing"), 600);
    });

    if (live) {
      root.classList.add("live");
      const onScroll = () => {
        const r = track.getBoundingClientRect(), span = track.offsetHeight - stage.offsetHeight;
        // Assemble over the first 85% of the scroll, then hold the finished building
        progress = Math.max(0, Math.min(6, (-r.top / span / 0.85) * 6));
        paint();
      };
      let raf = 0;
      addEventListener("scroll", () => { if (!raf) raf = requestAnimationFrame(() => { raf = 0; onScroll(); }); }, { passive: true });
      addEventListener("resize", onScroll);
      steps.forEach((li, i) => {
        li.tabIndex = 0;
        const go = () => scrollTo({ top: scrollY + track.getBoundingClientRect().top + (track.offsetHeight - stage.offsetHeight) * 0.85 * (i + 1) / 6 + 2, behavior: "smooth" });
        li.addEventListener("click", go);
        li.addEventListener("keydown", (ev) => { if (ev.key === "Enter" || ev.key === " ") { ev.preventDefault(); go(); } });
      });
      onScroll();
    } else paint();
  }

  // Project filter
  document.querySelectorAll("[data-filter]").forEach((chip) => chip.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((c) => c.classList.toggle("on", c === chip));
    const f = chip.dataset.filter;
    document.querySelectorAll("[data-cat]").forEach((c) => {
      c.style.display = f === "all" || c.dataset.cat === f ? "" : "none";
    });
  }));

  // Builder
  const builder = document.querySelector(".builder");
  if (builder) {
    const state = {};
    const params = new URLSearchParams(location.search);
    builder.querySelectorAll("[data-group]").forEach((group) => {
      const key = group.dataset.group;
      const multi = group.hasAttribute("data-multi");
      const items = group.querySelectorAll("[data-val]");
      const preset = params.get(key);
      items.forEach((it) => {
        if (preset && it.dataset.val === preset) it.classList.add("on");
        it.addEventListener("click", () => {
          if (multi) it.classList.toggle("on");
          else items.forEach((o) => o.classList.toggle("on", o === it));
          update();
        });
      });
      if (!multi && !group.querySelector(".on")) items[0].classList.add("on");
    });
    // Colors: one palette, applied to whichever component tab is active
    const pal = builder.querySelector(".cpal");
    const tabs = [...builder.querySelectorAll(".ctab")];
    const colors = {};
    let part = tabs[0] && tabs[0].dataset.part;
    function paintColors() {
      tabs.forEach((t) => {
        const sw = pal.querySelector(`[data-val="${colors[t.dataset.part]}"]`);
        t.classList.toggle("on", t.dataset.part === part);
        t.querySelector(".cdot").style.background = sw.style.background;
      });
      pal.querySelectorAll(".sw").forEach((s) => s.classList.toggle("on", s.dataset.val === colors[part]));
      const label = tabs.find((t) => t.dataset.part === part).textContent;
      builder.querySelector(".cnow").innerHTML = `<b>${label}:</b> ${colors[part]}`;
    }
    if (pal) {
      tabs.forEach((t) => {
        const k = t.dataset.part;
        const preset = params.get(k);
        colors[k] = pal.querySelector(`[data-val="${preset}"]`) ? preset : pal.querySelector(".sw").dataset.val;
        t.addEventListener("click", () => { part = k; paintColors(); });
      });
      pal.querySelectorAll(".sw").forEach((s) => s.addEventListener("click", () => {
        colors[part] = s.dataset.val; paintColors(); update();
      }));
      paintColors();
    }
    // Collapse long option lists behind "See more"
    builder.querySelectorAll("[data-collapse]").forEach((g) => {
      const max = +g.dataset.collapse;
      let n = 0;
      const extra = [...g.children].filter((el) => (el.classList.contains("opt") && ++n > max) || n >= max && !el.classList.contains("opt"));
      if (!extra.length) return;
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "see-more";
      g.after(btn);
      const set = (open) => {
        extra.forEach((el) => (el.hidden = !open));
        btn.textContent = open ? "See less" : `See more (${extra.filter((el) => el.classList.contains("opt")).length})`;
        btn.dataset.open = open ? "1" : "";
      };
      btn.addEventListener("click", () => set(!btn.dataset.open));
      set(extra.some((el) => el.classList.contains("on")));
    });
    builder.querySelector(".use-other")?.addEventListener("input", () => update());
    function update() {
      builder.querySelectorAll("[data-group]").forEach((g) => {
        const on = [...g.querySelectorAll(".on")].map((o) => o.dataset.label || o.dataset.val);
        state[g.dataset.group] = on.length ? on.join(", ") : "None";
      });
      Object.assign(state, colors);
      const other = builder.querySelector(".use-other");
      if (other) {
        const on = builder.querySelector('[data-group="use"] [data-val="other"]').classList.contains("on");
        if (on && other.hidden) { other.hidden = false; other.focus(); }
        other.hidden = !on;
        if (on) state.use = other.value.trim() || "Other";
      }
      const dl = document.getElementById("summary");
      dl.innerHTML = Object.entries({
        Model: state.model, Use: state.use, "Field panels": state.field, "Accent panels": state.accent, Columns: state.columns,
        Beams: state.beams, Eaves: state.eaves, Roof: state.roof, Trim: state.trim, Extras: state.extras,
      }).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
      document.getElementById("pv-label").textContent =
        `${state.model} · ${state.use} · ${state.field} field panels — live 3D preview coming`;
      const on = builder.querySelector('[data-group="model"] .on');
      const pv = document.getElementById("pv-img");
      if (on && pv) pv.src = `assets/img/series-${on.dataset.val.split("x")[0]}.jpg`;
      const msg = document.getElementById("msg");
      if (msg) msg.value = Object.entries(state).map(([k, v]) => `${k}: ${v}`).join("\n");
    }
    if (params.get("sector") === "federal") {
      const org = document.querySelector('form.lead input[placeholder^="District"]');
      if (org) org.placeholder = "Agency, base, or installation";
    }
    update();
  }
})();
