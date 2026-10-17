// Shared header/footer + small interactions for the CUUBE draft
(function () {
  const page = document.body.dataset.page || "";
  const links = [
    ["schools.html", "For Schools", "schools"],
    ["cities.html", "For Cities & Counties", "cities"],
    ["why-cuube.html", "Why CUUBE", "why"],
    ["models.html", "Models", "models"],
    ["projects.html", "Projects", "projects"],
    ["how-to-buy.html", "How to Buy", "buy"],
  ];

  const header = `
    <div class="draft-bar">Draft layout · placeholder content and images · not for distribution</div>
    <nav class="gnav"><div class="wrap">
      <a class="logo" href="index.html">CUU<span>BE</span></a>
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
          <li><a href="cities.html">Cities & Counties</a></li><li><a href="cities.html#parks">Parks & Rec</a></li></ul></div>
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
    function update() {
      builder.querySelectorAll("[data-group]").forEach((g) => {
        const on = [...g.querySelectorAll(".on")].map((o) => o.dataset.label || o.dataset.val);
        state[g.dataset.group] = on.length ? on.join(", ") : "None";
      });
      const dl = document.getElementById("summary");
      dl.innerHTML = Object.entries({
        Model: state.model, Use: state.use, Exterior: state.color, Roof: state.roof, Extras: state.extras,
      }).map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");
      document.getElementById("pv-label").textContent =
        `Live 3D preview placeholder — ${state.model} · ${state.use} · ${state.color}`;
      const msg = document.getElementById("msg");
      if (msg) msg.value = Object.entries(state).map(([k, v]) => `${k}: ${v}`).join("\n");
    }
    update();
  }
})();
