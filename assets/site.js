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

  const header = `
    <div class="draft-bar">Draft layout · placeholder content and images · not for distribution</div>
    <nav class="gnav"><div class="wrap">
      <a class="logo" href="index.html"><img src="assets/img/cuube-logo.png" alt="CUUBE"></a>
      <ul id="gmenu">
        ${links.map(([h, t, k]) => `<li><a href="${h}" class="${k === page ? "on" : ""}">${t}</a></li>`).join("")}
      </ul>
      <a class="btn sm" href="design.html">Design Your Building</a>
      <button class="menu-btn" aria-label="Menu" onclick="document.getElementById('gmenu').classList.toggle('open')">☰</button>
    </div></nav>`;

  const footer = `
    <footer><div class="wrap">
      <div class="cols">
        <div><h5>Who it's for</h5><ul>
          <li><a href="schools.html">K–12 Schools</a></li><li><a href="schools.html#upk">UPK / TK</a></li>
          <li><a href="cities.html">Cities & Counties</a></li><li><a href="cities.html#parks">Parks & Rec</a></li><li><a href="federal.html">Federal & Defense</a></li></ul></div>
        <div><h5>The building</h5><ul>
          <li><a href="why-cuube.html">Why CUUBE</a></li><li><a href="models.html">Models</a></li>
          <li><a href="models.html#compare">Compare models</a></li><li><a href="design.html">Design your building</a></li></ul></div>
        <div><h5>Proof</h5><ul>
          <li><a href="projects.html">Projects</a></li><li><a href="projects.html#map">Project map</a></li>
          <li><a href="#">Virtual tours</a></li></ul></div>
        <div><h5>Get started</h5><ul>
          <li><a href="how-to-buy.html">How to buy</a></li><li><a href="how-to-buy.html#funding">Funding</a></li>
          <li><a href="how-to-buy.html#contact">Talk to a specialist</a></li><li>714.462.2955</li></ul></div>
      </div>
      <p>© CUUBE · TLS Choice · KYA Group · Draft site — content is placeholder.</p>
    </div></footer>`;

  document.body.insertAdjacentHTML("afterbegin", header);
  document.body.insertAdjacentHTML("beforeend", footer);

  // Scroll reveal
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

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
    function update() {
      builder.querySelectorAll("[data-group]").forEach((g) => {
        const on = [...g.querySelectorAll(".on")].map((o) => o.dataset.label || o.dataset.val);
        state[g.dataset.group] = on.length ? on.join(", ") : "None";
      });
      Object.assign(state, colors);
      const dl = document.getElementById("summary");
      dl.innerHTML = Object.entries({
        Model: state.model, Use: state.use, Panels: state.panels, Beams: state.beams, Field: state.field,
        Doors: state.doors, Trim: state.trim, Roof: state.roof, Accent: state.accent, Extras: state.extras,
      }).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
      document.getElementById("pv-label").textContent =
        `${state.model} · ${state.use} · ${state.panels} panels — live 3D preview coming`;
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
