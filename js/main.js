const workSamples = [
  {
    category: "GIS Documentation — Esri",
    title: "ArcGIS Velocity",
    description:
      "Documentation for ArcGIS Velocity — real-time IoT data ingestion, streaming analytics, big data processing, and visualization for ArcGIS Online.",
    tags: ["ArcGIS Velocity", "IoT", "Real-Time Analytics"],
    url: "https://doc.arcgis.com/en/velocity/get-started/what-is-arcgis-velocity.htm",
  },
  {
    category: "GIS Documentation — Esri",
    title: "ArcGIS GeoEvent Server",
    description:
      "Enterprise documentation for ArcGIS GeoEvent Server — real-time data streaming, GeoEvent services, connectors, filters, and processors for live GIS data integration.",
    tags: ["GeoEvent", "ArcGIS Enterprise", "Real-Time GIS"],
    url: "https://enterprise.arcgis.com/en/geoevent/",
  },
  {
    category: "Blog — Esri",
    title: "ArcGIS Blog",
    description:
      "Technical blog posts covering ArcGIS product updates, workflows, best practices, and announcements — written for GIS professionals and developers.",
    tags: ["ArcGIS Blog", "Esri", "Product Updates"],
    url: "https://www.esri.com/arcgis-blog/author/achapagain",
  },
  {
    category: "Security Documentation — LogPoint",
    title: "LogPoint Integrations",
    description:
      "Documentation for LogPoint SIEM source integrations — covering connector configuration, log ingestion, event parsing, and security analytics across enterprise systems.",
    tags: ["SIEM", "Integrations", "Security"],
    url: "https://docs.guardsix.com/integrations",
  },
  {
    category: "Security Documentation — LogPoint",
    title: "Pre-configured SOAR Playbooks",
    description:
      "Analyst guide for LogPoint pre-configured SOAR playbooks — automated incident response workflows, playbook configuration, and SLA management for security operations teams.",
    tags: ["SOAR", "Playbooks", "Automation"],
    url: "https://archive-docs.guardsix.com/soar?p=Logpoint&page=Pre-configured%20Playbook%20Guides",
  },
  {
    category: "Training Content — Ansys",
    title: "Introduction to Ansys Composite PrepPost (ACP)",
    description:
      "Course content for Ansys Composite PrepPost — covering composite material modeling, layup definitions, fiber orientations, and post-processing of structural analysis results.",
    tags: ["Ansys ACP", "Composites", "Simulation"],
    url: "https://learninghub.ansys.com/learn/courses/951/introduction-to-ansys-composite-preppost-acp",
  },
];

function createWorkCard(sample) {
  const isLink = sample.url !== null;
  const el = document.createElement(isLink ? "a" : "div");

  if (isLink) {
    el.href = sample.url;
    el.target = "_blank";
    el.rel = "noopener noreferrer";
  }

  el.className = `work-card fade-in${isLink ? " is-link" : ""}`;
  el.innerHTML = `
    <span class="work-card__category">${sample.category}</span>
    <h3 class="work-card__title">${sample.title}</h3>
    <p class="work-card__desc">${sample.description}</p>
    <div class="work-card__footer">
      <div class="work-card__tags">
        ${sample.tags.map((t) => `<span class="work-card__tag">${t}</span>`).join("")}
      </div>
      ${isLink ? '<span class="work-card__arrow">&rarr;</span>' : ""}
    </div>
  `;

  return el;
}

function initWorkGrid() {
  const grid = document.getElementById("work-grid");
  if (!grid) return;
  workSamples.forEach((sample) => grid.appendChild(createWorkCard(sample)));
}

function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    nav && nav.classList.toggle("scrolled", window.scrollY > 40);
  });

  toggle && toggle.addEventListener("click", () => {
    links && links.classList.toggle("open");
  });

  links && links.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });
}

function initActiveNav() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav__link");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === `#${entry.target.id}`
            );
          });
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((s) => observer.observe(s));
}

function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08 }
  );

  document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initWorkGrid();
  initNav();
  initActiveNav();
  requestAnimationFrame(() => initScrollAnimations());
});
