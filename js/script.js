(function () {
  let DATA = null;
  let LANG = localStorage.getItem("site_lang") || "en";

  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html !== undefined) e.innerHTML = html;
    return e;
  }

  function render() {
    const d = DATA[LANG];
    document.documentElement.lang = LANG;
    document.title = d.meta.title;

    // simple text nodes via data-i18n path
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      const path = node.getAttribute("data-i18n").split(".");
      let val = d;
      path.forEach((p) => (val = val ? val[p] : ""));
      if (typeof val === "string") node.textContent = val;
    });

    document.getElementById("brand-name").textContent = d.hero.name;
    document.getElementById("hero-name").textContent = d.hero.name;
    document.getElementById("hero-role").textContent = d.hero.role;

    // stats
    const statsWrap = document.getElementById("hero-stats");
    statsWrap.innerHTML = "";
    (d.hero.stats || []).forEach((s) => {
      const item = el("div", "stat");
      item.appendChild(el("div", "stat-value", s.value));
      item.appendChild(el("div", "stat-label", s.label));
      statsWrap.appendChild(item);
    });

    // about
    document.getElementById("about-body").textContent = d.about.body;
    const cv = document.getElementById("about-cv");
    if (d.about.resume_file) {
      cv.href = d.about.resume_file;
      cv.style.display = "inline-flex";
    } else {
      cv.style.display = "none";
    }

    // skills
    const skillsGrid = document.getElementById("skills-grid");
    skillsGrid.innerHTML = "";
    (d.skills.groups || []).forEach((g) => {
      const card = el("div", "skill-card");
      card.appendChild(el("h3", null, g.title));
      const ul = el("ul");
      g.items.forEach((i) => ul.appendChild(el("li", null, i)));
      card.appendChild(ul);
      skillsGrid.appendChild(card);
    });

    // projects
    const grid = document.getElementById("project-grid");
    grid.innerHTML = "";
    (d.projects.items || []).forEach((p) => {
      const card = el("div", "project-card");
      card.appendChild(el("div", "project-tag", p.tag));
      card.appendChild(el("h3", null, p.title));
      card.appendChild(el("p", null, p.description));
      const stack = el("div", "project-stack");
      (p.stack || []).forEach((s) => stack.appendChild(el("span", null, s)));
      card.appendChild(stack);
      if (p.link) {
        const a = el("a", "project-link", (LANG === "de" ? "Ansehen ↗" : "View ↗"));
        a.href = p.link;
        a.target = "_blank";
        a.rel = "noopener";
        card.appendChild(a);
      }
      grid.appendChild(card);
    });

    // experience
    const timeline = document.getElementById("timeline");
    timeline.innerHTML = "";
    (d.experience.items || []).forEach((x, idx) => {
      const item = el("div", "timeline-item");
      item.appendChild(el("div", "timeline-num", String(idx + 1).padStart(2, "0")));
      const body = el("div");
      body.appendChild(el("div", "timeline-role", `${x.role} · ${x.company}`));
      body.appendChild(el("div", "timeline-meta", x.period));
      body.appendChild(el("div", "timeline-desc", x.description));
      item.appendChild(body);
      timeline.appendChild(item);
    });

    // contact
    document.getElementById("contact-heading").textContent = d.contact.heading;
    document.getElementById("contact-body").textContent = d.contact.body;
    const links = document.getElementById("contact-links");
    links.innerHTML = "";
    const email = el("a", null, `✉ ${d.contact.email}`);
    email.href = `mailto:${d.contact.email}`;
    const li = el("a", null, "↗ LinkedIn");
    li.href = d.contact.linkedin;
    li.target = "_blank"; li.rel = "noopener";
    const loc = el("div", null, `📍 ${d.contact.location}`);
    loc.style.fontFamily = "var(--mono)";
    loc.style.fontSize = "13px";
    loc.style.color = "#B9C0D4";
    loc.style.marginTop = "4px";
    links.appendChild(email);
    links.appendChild(li);
    links.appendChild(loc);

    document.getElementById("footer-text").textContent =
      `${d.footer.text} © ${new Date().getFullYear()}`;

    document.querySelectorAll(".lang-toggle button").forEach((b) => {
      b.classList.toggle("active", b.dataset.lang === LANG);
    });
  }

  function setupLangToggle() {
    document.querySelectorAll(".lang-toggle button").forEach((btn) => {
      btn.addEventListener("click", () => {
        LANG = btn.dataset.lang;
        localStorage.setItem("site_lang", LANG);
        render();
      });
    });
  }

  function setupMobileNav() {
    const toggle = document.getElementById("nav-toggle");
    const nav = document.getElementById("main-nav");
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => nav.classList.remove("open"))
    );
  }

  function setupReveal() {
    const items = document.querySelectorAll(".reveal");
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((i) => obs.observe(i));
  }

  fetch("content.json?_=" + Date.now())
    .then((r) => r.json())
    .then((json) => {
      DATA = json;
      render();
      setupLangToggle();
      setupMobileNav();
      setupReveal();
    })
    .catch((err) => {
      document.body.innerHTML =
        '<p style="padding:40px;font-family:sans-serif">Could not load content.json. Make sure it is in the same folder as index.html.</p>';
      console.error(err);
    });
})();
