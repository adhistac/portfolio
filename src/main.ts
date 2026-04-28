interface WorkSample {
  category: string;
  title: string;
  description: string;
  tags: string[];
  url: string | null;
}

const workSamples: WorkSample[] = [
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
    url: "https://docs.guardsix.com/soar",
  },
  {
    category: "Operator Manual — Sciton",
    title: "Joule Operator Manual",
    description:
      "Operator manual for the Joule laser platform — a multi-application aesthetic laser system used in clinical and medical spa environments. Covers system setup, treatment protocols, safety procedures, and maintenance.",
    tags: ["Medical Device", "Operator Manual", "Laser Systems"],
    url: "https://static1.squarespace.com/static/5b7f0ec11aef1d9ac2fa689d/t/5b89b5b80ebbe81299e6a578/1535751631801/Joule+Operator+Manual+Rev+Y.pdf",
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

function createWorkCard(sample: WorkSample): HTMLElement {
  const isLink = sample.url !== null;
  const el = document.createElement(isLink ? "a" : "div");

  if (isLink && el instanceof HTMLAnchorElement) {
    el.href = sample.url!;
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

function initWorkGrid(): void {
  const grid = document.getElementById("work-grid");
  if (!grid) return;
  workSamples.forEach((sample) => grid.appendChild(createWorkCard(sample)));
}

function initNav(): void {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 40);
  });

  toggle?.addEventListener("click", () => {
    links?.classList.toggle("open");
  });

  links?.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", () => links.classList.remove("open"));
  });
}

function initActiveNav(): void {
  const sections = document.querySelectorAll<HTMLElement>("section[id]");
  const navLinks = document.querySelectorAll<HTMLAnchorElement>(".nav__link");

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

function initScrollAnimations(): void {
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

  document.querySelectorAll<HTMLElement>(".fade-in").forEach((el) => observer.observe(el));
}

document.addEventListener("DOMContentLoaded", () => {
  initWorkGrid();
  initNav();
  initActiveNav();
  requestAnimationFrame(() => initScrollAnimations());
});
