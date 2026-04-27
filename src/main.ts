interface WorkSample {
  category: string;
  title: string;
  description: string;
  tags: string[];
  url: string | null;
}

const workSamples: WorkSample[] = [
  {
    category: "Technical Writing Blog",
    title: "Exploring Technical Writing",
    description:
      "Personal articles covering documentation best practices, product writing, release notes, and career development in technical writing.",
    tags: ["Blog", "Documentation", "Best Practices"],
    url: "https://techdocs1.blogspot.com/",
  },
  {
    category: "Portfolio",
    title: "Technical Writing Portfolio",
    description:
      "A curated collection of writing samples including LogPoint technical documentation, release notes built with Sphinx and reST, and a starter guide for aspiring technical writers.",
    tags: ["Portfolio", "Sphinx", "reST", "LogPoint"],
    url: "https://adhistac1.blogspot.com/",
  },
  {
    category: "Research Publication",
    title: "Nepali Handwriting Recognition using CNN",
    description:
      "Published research applying convolutional neural networks to recognize handwritten Nepali characters across 92,000 images and 46 character classes. IRJET, May 2020.",
    tags: ["Machine Learning", "CNN", "IRJET 2020"],
    url: "https://irjiet.com/Volume-4/Issue-5-May-2020/Nepali-Handwriting-Recognition-using-Convolution-Neural-Network/203",
  },
  {
    category: "Research Publication",
    title: "Predicting Breast Cancer using SVM",
    description:
      "Published research achieving 95.6% accuracy in breast cancer classification using Support Vector Machine learning on UCI dataset cell nuclei features. IRJET, May 2020.",
    tags: ["Machine Learning", "SVM", "IRJET 2020"],
    url: "https://irjiet.com/Volume-4/Issue-5-May-2020/Predicting-Breast-Cancer-using-Support-Vector-Machine-Learning-Algorithm/204",
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
      ${isLink ? '<span class="work-card__arrow">&rarr;</span>' : '<span class="work-card__badge">Coming soon</span>'}
    </div>
  `;

  return el;
}

function initWorkGrid(): void {
  const grid = document.getElementById("work-grid");
  if (!grid) return;
  workSamples.forEach((sample) => grid.appendChild(createWorkCard(sample)));
}

function initPhotoFallback(): void {
  const photo = document.getElementById("hero-photo") as HTMLImageElement | null;
  const initials = document.querySelector<HTMLElement>(".hero__photo-initials");
  if (!photo || !initials) return;

  photo.addEventListener("error", () => {
    photo.style.display = "none";
    initials.style.display = "flex";
  });
}

function initNav(): void {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("nav-toggle");
  const links = document.getElementById("nav-links");

  window.addEventListener("scroll", () => {
    nav?.classList.toggle("scrolled", window.scrollY > 60);
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
  initPhotoFallback();
  initNav();
  initActiveNav();
  requestAnimationFrame(() => initScrollAnimations());
});
