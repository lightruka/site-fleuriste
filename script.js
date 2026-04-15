// ── Menu Toggle ──
const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuBtn.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuBtn.textContent = "☰";
    });
  });
}

// ── Year ──
const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

// ── Contact Form with visual confirmation ──
const form = document.getElementById("contact-form");
const formSuccess = document.getElementById("form-success");

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (formSuccess) {
      form.style.display = "none";
      formSuccess.classList.add("show");
    } else {
      alert("Merci pour votre message. Nous vous répondrons rapidement.");
    }
    form.reset();
  });
}

// ── Dark Mode Toggle ──
const themeToggle = document.querySelector(".theme-toggle");
const htmlRoot = document.documentElement;

const moonSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
const sunSVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>';

function updateThemeUI() {
  const isDark = htmlRoot.dataset.theme === "dark";
  if (themeToggle) {
    themeToggle.innerHTML = isDark ? sunSVG : moonSVG;
    themeToggle.setAttribute("aria-label", isDark ? "Activer le mode clair" : "Activer le mode sombre");
  }
  document.querySelectorAll(".logo-icon").forEach((logo) => {
    logo.src = isDark ? "logo-floral-dark.svg" : "logo-floral.svg";
  });
}

updateThemeUI();

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const next = htmlRoot.dataset.theme === "dark" ? "light" : "dark";
    htmlRoot.dataset.theme = next;
    localStorage.setItem("theme", next);
    updateThemeUI();
  });
}

// ── Bouquet Data (products) ──
const bouquetData = {
  mariage: [
    {
      id: "pastel-elegance",
      name: "Pastel Élégance",
      image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80",
      short: "Roses branchues, pivoines et lisianthus.",
      description: "Un bouquet romantique aux tons poudrés, idéal pour mariage civil ou cérémonie.",
      price: "85 EUR - 120 EUR",
    },
    {
      id: "blanc-signature",
      name: "Blanc Signature",
      image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=80",
      short: "Renoncules blanches et feuillage olive.",
      description: "Composition chic en blanc et vert, élégante et intemporelle pour un décor raffiné.",
      price: "95 EUR - 140 EUR",
    },
  ],
  anniversaire: [
    {
      id: "explosion-couleurs",
      name: "Explosion de Couleurs",
      image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
      short: "Germinis, roses spray et alstroemères.",
      description: "Bouquet vif et joyeux pour célébrer les moments festifs avec une palette colorée.",
      price: "45 EUR - 75 EUR",
    },
    {
      id: "rose-poudre-chic",
      name: "Rose Poudré Chic",
      image: "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1200&q=80",
      short: "Roses garden, œillets premium et wax flower.",
      description: "Création douce et élégante, parfaite pour anniversaire ou remerciement raffiné.",
      price: "55 EUR - 90 EUR",
    },
  ],
  deuil: [
    {
      id: "hommage-blanc",
      name: "Hommage Blanc",
      image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80",
      short: "Lys, roses blanches et chrysanthèmes.",
      description: "Arrangement sobre et lumineux pour rendre hommage avec délicatesse et respect.",
      price: "70 EUR - 110 EUR",
    },
    {
      id: "sobriete-naturelle",
      name: "Sobriété Naturelle",
      image: "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=1200&q=80",
      short: "Tons crème et verts, composition apaisante.",
      description: "Composition épurée aux tons naturels pour un accompagnement discret et harmonieux.",
      price: "60 EUR - 95 EUR",
    },
  ],
};

// ── Product Category Selection ──
const productCards = document.querySelectorAll(".product-category-card");
const descriptionTitle = document.getElementById("product-description-title");
const descriptionText = document.getElementById("product-description-text");
const examplesContainer = document.getElementById("category-examples");
const examplesTitle = document.getElementById("examples-title");
const examplesIntro = document.getElementById("examples-intro");

const renderExamples = (categoryKey, categoryLabel) => {
  if (!examplesContainer || !examplesTitle || !examplesIntro) return;
  const items = bouquetData[categoryKey] || [];

  examplesTitle.textContent = `Exemples de bouquets — ${categoryLabel}`;
  examplesIntro.textContent = "Chaque exemple est cliquable et ouvre sa page détaillée.";

  examplesContainer.innerHTML = items
    .map(
      (item) => `
      <article class="card bouquet-example-card" data-id="${item.id}" tabindex="0" role="link" aria-label="Voir le bouquet ${item.name}">
        <img src="${item.image}" alt="${item.name}" />
        <div class="card-body">
          <span class="card-tag">${categoryLabel}</span>
          <h3>${item.name}</h3>
          <p>${item.short}</p>
          <p class="price-note">Budget indicatif : ${item.price}</p>
        </div>
      </article>
    `
    )
    .join("");

  examplesContainer.querySelectorAll(".bouquet-example-card").forEach((card) => {
    const redirectToDetail = () => {
      const id = card.dataset.id;
      window.location.href = `bouquet.html?id=${encodeURIComponent(id)}`;
    };

    card.addEventListener("click", redirectToDetail);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        redirectToDetail();
      }
    });
  });
};

if (productCards.length && descriptionTitle && descriptionText) {
  const updateCategory = (card) => {
    const categoryKey = card.dataset.category;
    const categoryLabel = card.querySelector("h3")?.textContent || "Bouquets";

    descriptionTitle.textContent = card.dataset.title || "Description catégorie";
    descriptionText.textContent = card.dataset.description || "Description indisponible.";

    productCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
    renderExamples(categoryKey, categoryLabel);
  };

  productCards.forEach((card) => {
    card.tabIndex = 0;
    card.addEventListener("click", () => updateCategory(card));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        updateCategory(card);
      }
    });
  });

  updateCategory(productCards[0]);
}

// ── Bouquet Detail Page ──
const detailImage = document.getElementById("detail-image");
const detailCategory = document.getElementById("detail-category");
const detailName = document.getElementById("detail-name");
const detailDescription = document.getElementById("detail-description");
const detailPrice = document.getElementById("detail-price");

if (detailImage && detailCategory && detailName && detailDescription && detailPrice) {
  const params = new URLSearchParams(window.location.search);
  const bouquetId = params.get("id");

  const allBouquets = Object.entries(bouquetData).flatMap(([category, items]) =>
    items.map((item) => ({ ...item, category }))
  );

  const selected = allBouquets.find((item) => item.id === bouquetId);
  if (selected) {
    detailImage.src = selected.image;
    detailImage.alt = selected.name;
    detailName.textContent = selected.name;
    detailDescription.textContent = selected.description;
    detailPrice.textContent = `Budget indicatif : ${selected.price}`;
    detailCategory.textContent = selected.category.charAt(0).toUpperCase() + selected.category.slice(1);
  }
}

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll("main .section, main .about-grid, main .cards").forEach((el) => {
  const rect = el.getBoundingClientRect();
  if (rect.top > window.innerHeight * 0.85) {
    el.classList.add("reveal");
    revealObserver.observe(el);
  }
});

// ── Back to Top ──
const backToTop = document.querySelector(".back-to-top");
if (backToTop) {
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 400);
  });
  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ── Hero Carousel ──
const carousel = document.querySelector(".hero-carousel");
if (carousel) {
  const slides = carousel.querySelectorAll("img");
  const prevBtn = carousel.querySelector(".prev");
  const nextBtn = carousel.querySelector(".next");
  let currentSlide = 0;
  let autoPlay;

  const showSlide = (i) => {
    slides.forEach((s) => s.classList.remove("active"));
    slides[i].classList.add("active");
    currentSlide = i;
  };

  const next = () => showSlide((currentSlide + 1) % slides.length);
  const prev = () => showSlide((currentSlide - 1 + slides.length) % slides.length);
  const startAuto = () => { autoPlay = setInterval(next, 5000); };

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => {
      clearInterval(autoPlay);
      next();
      startAuto();
    });
    prevBtn.addEventListener("click", () => {
      clearInterval(autoPlay);
      prev();
      startAuto();
    });
  }

  showSlide(0);
  startAuto();
}

// ── Hero Parallax ──
window.addEventListener("scroll", () => {
  const heroImgs = document.querySelectorAll(".hero-carousel img");
  if (!heroImgs.length) return;
  const scrolled = window.scrollY;
  heroImgs.forEach(img => {
    if (img.classList.contains("active")) {
      img.style.transform = `translateY(${Math.floor(scrolled * 0.15)}px) scale(1)`;
    } else {
      img.style.transform = `translateY(${Math.floor(scrolled * 0.15)}px) scale(1.05)`;
    }
  });
});

// ── Animated Counters ──
const counterEls = document.querySelectorAll(".counter-value");
if (counterEls.length) {
  const counterObs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || "";
          const prefix = el.dataset.prefix || "";
          const dec = el.dataset.decimal === "true";
          const dur = 2000;
          const t0 = performance.now();

          const tick = (now) => {
            const p = Math.min((now - t0) / dur, 1);
            const ease = 1 - Math.pow(1 - p, 3);
            const v = target * ease;
            el.textContent = prefix + (dec ? v.toFixed(1) : Math.floor(v)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          };

          requestAnimationFrame(tick);
          counterObs.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  counterEls.forEach((el) => counterObs.observe(el));
}

// ── Seasonal Banner ──
const seasonBanner = document.getElementById("season-banner");
if (seasonBanner) {
  const m = new Date().getMonth();
  const data = [
    ["❄️", "Hiver", "Amaryllis, hellébores, anémones"],
    ["❄️", "Hiver", "Amaryllis, hellébores, anémones"],
    ["🌷", "Printemps", "Pivoines, renoncules, lilas, tulipes"],
    ["🌷", "Printemps", "Pivoines, renoncules, lilas, tulipes"],
    ["🌷", "Printemps", "Pivoines, renoncules, lilas, tulipes"],
    ["🌻", "Été", "Tournesols, lavande, dahlias, delphiniums"],
    ["🌻", "Été", "Tournesols, lavande, dahlias, delphiniums"],
    ["🌻", "Été", "Tournesols, lavande, dahlias, delphiniums"],
    ["🍂", "Automne", "Chrysanthèmes, dahlias, roses d'automne"],
    ["🍂", "Automne", "Chrysanthèmes, dahlias, roses d'automne"],
    ["🍂", "Automne", "Chrysanthèmes, dahlias, roses d'automne"],
    ["❄️", "Hiver", "Amaryllis, hellébores, anémones"],
  ];
  const [icon, name, flowers] = data[m];
  seasonBanner.innerHTML = `${icon} <strong>${name}</strong> — Fleurs de saison : ${flowers}`;
}

// ── Gallery Filters ──
const filterBtns = document.querySelectorAll(".filter-btn");
const galleryItems = document.querySelectorAll(".gallery-item");

if (filterBtns.length && galleryItems.length) {
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      galleryItems.forEach((item) => {
        item.classList.toggle("hidden", f !== "all" && item.dataset.category !== f);
      });
    });
  });
}

// ── Lightbox ──
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const lightboxClose = document.querySelector(".lightbox-close");

if (lightbox && lightboxImg) {
  const closeLB = () => {
    lightbox.classList.remove("open");
    document.body.style.overflow = "";
  };

  document.querySelectorAll(".gallery-item").forEach((item) => {
    item.addEventListener("click", () => {
      const img = item.querySelector("img");
      if (img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add("open");
        document.body.style.overflow = "hidden";
      }
    });
  });

  if (lightboxClose) lightboxClose.addEventListener("click", closeLB);
  lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLB(); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.classList.contains("open")) closeLB();
  });
}
