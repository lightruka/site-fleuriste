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

    // Update WhatsApp share link
    const shareWA = document.getElementById("share-whatsapp");
    if (shareWA) {
      const msg = encodeURIComponent(`Regarde ce bouquet "${selected.name}" chez Maison Florale !\n${window.location.href}`);
      shareWA.href = `https://wa.me/?text=${msg}`;
    }
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
    ["❄️", "Hiver", "Amaryllis, hellébores, anémones", "Les fleurs d'hiver subliment vos intérieurs avec élégance"],
    ["❄️", "Hiver", "Amaryllis, hellébores, anémones", "Créez une ambiance chaleureuse avec nos compositions hivernales"],
    ["🌷", "Printemps", "Pivoines, renoncules, lilas, tulipes", "C'est la saison rêvée pour offrir pivoines et tulipes !"],
    ["🌷", "Printemps", "Pivoines, renoncules, lilas, tulipes", "Les pivoines sont de retour — profitez-en vite !"],
    ["🌷", "Printemps", "Pivoines, renoncules, lilas, tulipes", "Muguet, lilas et pivoines : le trio magique du printemps"],
    ["🌻", "Été", "Tournesols, lavande, dahlias, delphiniums", "Couleurs solaires et parfums envoûtants pour vos bouquets d'été"],
    ["🌻", "Été", "Tournesols, lavande, dahlias, delphiniums", "Tournesols et lavande illuminent vos plus beaux événements"],
    ["🌻", "Été", "Tournesols, lavande, dahlias, delphiniums", "Profitez de l'abondance estivale pour des compositions généreuses"],
    ["🍂", "Automne", "Chrysanthèmes, dahlias, roses d'automne", "Tons cuivrés et orangés pour des bouquets chaleureux"],
    ["🍂", "Automne", "Chrysanthèmes, dahlias, roses d'automne", "L'automne flamboie — des compositions aux couleurs de saison"],
    ["🍂", "Automne", "Chrysanthèmes, dahlias, roses d'automne", "Dahlias et chrysanthèmes, les stars de l'arrière-saison"],
    ["❄️", "Hiver", "Amaryllis, hellébores, anémones", "Ambiance festive : rouges profonds, verts et dorés"],
  ];
  const [icon, name, flowers, catchphrase] = data[m];
  seasonBanner.innerHTML = `${icon} <strong>${name}</strong> — ${catchphrase}`;
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

// ══════════════════════════════════════════
// NEW FEATURES
// ══════════════════════════════════════════

// ── Scroll Progress Bar ──
const scrollProgress = document.querySelector(".scroll-progress");
if (scrollProgress) {
  window.addEventListener("scroll", () => {
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docH > 0 ? (window.scrollY / docH) * 100 : 0;
    scrollProgress.style.width = pct + "%";
  });
}

// ── FAQ Accordion ──
document.querySelectorAll(".faq-question").forEach((btn) => {
  btn.addEventListener("click", () => {
    const item = btn.closest(".faq-item");
    const wasOpen = item.classList.contains("open");
    // Close all
    document.querySelectorAll(".faq-item.open").forEach((el) => el.classList.remove("open"));
    // Toggle clicked
    if (!wasOpen) item.classList.add("open");
  });
});

// ── Testimonial Carousel ──
const testimonialCarousel = document.querySelector(".testimonial-carousel");
if (testimonialCarousel) {
  const slides = testimonialCarousel.querySelectorAll(".testimonial-slide");
  const dots = testimonialCarousel.querySelectorAll(".testimonial-dot");
  let currentTestimonial = 0;
  let testimonialTimer;

  const showTestimonial = (i) => {
    slides.forEach((s) => s.classList.remove("active"));
    dots.forEach((d) => d.classList.remove("active"));
    slides[i].classList.add("active");
    dots[i].classList.add("active");
    currentTestimonial = i;
  };

  dots.forEach((dot, i) => {
    dot.addEventListener("click", () => {
      clearInterval(testimonialTimer);
      showTestimonial(i);
      startTestimonialAuto();
    });
  });

  const startTestimonialAuto = () => {
    testimonialTimer = setInterval(() => {
      showTestimonial((currentTestimonial + 1) % slides.length);
    }, 6000);
  };

  showTestimonial(0);
  startTestimonialAuto();
}

// ── Welcome Popup ──
const popupOverlay = document.querySelector(".welcome-popup-overlay");
if (popupOverlay && !localStorage.getItem("popup-dismissed")) {
  const closePopup = () => {
    popupOverlay.classList.remove("show");
    localStorage.setItem("popup-dismissed", "true");
  };

  // Show after 4 seconds
  setTimeout(() => {
    popupOverlay.classList.add("show");
  }, 4000);

  const closeBtn = popupOverlay.querySelector(".popup-close");
  const skipBtn = popupOverlay.querySelector(".popup-skip");
  const popupForm = popupOverlay.querySelector(".popup-form");

  if (closeBtn) closeBtn.addEventListener("click", closePopup);
  if (skipBtn) skipBtn.addEventListener("click", closePopup);
  if (popupForm) {
    popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const emailInput = popupForm.querySelector("input");
      if (emailInput && emailInput.value) {
        popupForm.innerHTML = '<p style="color:var(--vert-sauge-dark);font-weight:700;">✓ Merci ! Vous recevrez nos offres.</p>';
        setTimeout(closePopup, 2000);
      }
    });
  }

  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) closePopup();
  });
}

// ── Enhanced Card Reveal with Stagger ──
const cardRevealObs = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        cardRevealObs.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 }
);

document.querySelectorAll(".card, .panel, .counter-item, .faq-item, .calendar-month").forEach((el) => {
  const rect = el.getBoundingClientRect();
  if (rect.top > window.innerHeight * 0.7) {
    el.classList.add("reveal-card");
    cardRevealObs.observe(el);
  }
});

// ── Share Buttons (bouquet page) ──
const copyLinkBtn = document.getElementById("share-copy-link");
if (copyLinkBtn) {
  copyLinkBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      copyLinkBtn.classList.add("copied");
      copyLinkBtn.textContent = "✓ Lien copié !";
      setTimeout(() => {
        copyLinkBtn.classList.remove("copied");
        copyLinkBtn.textContent = "📋 Copier le lien";
      }, 2500);
    });
  });
}

// ── Floral Calendar ──
const calendarMonths = document.querySelectorAll(".calendar-month");
const calendarDetail = document.getElementById("calendar-detail");

const calendarData = {
  janvier:    { emoji: "❄️", flowers: ["Amaryllis", "Hellébore", "Anémone", "Renoncule", "Tulipe"], tip: "L'hiver impose ses teintes profondes. Préférez les tons bordeaux et blancs pour des compositions élégantes." },
  fevrier:    { emoji: "💐", flowers: ["Tulipe", "Renoncule", "Mimosa", "Jacinthe", "Iris"], tip: "Le mimosa illumine l'hiver. Idéal pour la Saint-Valentin avec des bouquets ronds et parfumés." },
  mars:       { emoji: "🌷", flowers: ["Narcisse", "Jonquille", "Tulipe", "Anémone", "Renoncule"], tip: "Le printemps s'annonce ! Les premières fleurs champêtres reviennent pour des bouquets frais et colorés." },
  avril:      { emoji: "🌸", flowers: ["Pivoine", "Lilas", "Muguet", "Renoncule", "Fritillaire"], tip: "La saison des pivoines commence enfin. Compositions romantiques et parfumées au rendez-vous." },
  mai:        { emoji: "🌺", flowers: ["Pivoine", "Rose de jardin", "Lilas", "Muguet", "Clématite"], tip: "Le mois du muguet et des pivoines en pleine gloire. Parfait pour les mariages de printemps." },
  juin:       { emoji: "🌹", flowers: ["Rose", "Pivoine", "Delphinium", "Nigelle", "Lupin"], tip: "Les roses sont au sommet de leur beauté. Compositions opulentes pour mariages et jardins." },
  juillet:    { emoji: "🌻", flowers: ["Tournesol", "Lavande", "Dahlia", "Glaïeul", "Agapanthe"], tip: "Couleurs chaudes et solaires. Les tournesols apportent joie et énergie à vos intérieurs." },
  aout:       { emoji: "☀️", flowers: ["Dahlia", "Zinnia", "Échinacée", "Glaïeul", "Lys"], tip: "Les dahlias se déclinent en mille formes et couleurs. Profitez de l'abondance estivale." },
  septembre:  { emoji: "🍂", flowers: ["Dahlia", "Aster", "Chrysanthème", "Rose d'automne", "Sédum"], tip: "Les teintes automnales arrivent. Compositions chaleureuses dans les tons cuivrés et orangés." },
  octobre:    { emoji: "🎃", flowers: ["Chrysanthème", "Rose", "Aster", "Cosmos", "Baies"], tip: "L'automne flamboyant. Rajoutez des baies et branches pour des compositions texturées." },
  novembre:   { emoji: "🍁", flowers: ["Chrysanthème", "Hellébore", "Cyclamen", "Bruyère", "Skimmia"], tip: "La transition vers l'hiver. Les chrysanthèmes de Toussaint et les premières hellébores." },
  decembre:   { emoji: "🎄", flowers: ["Amaryllis", "Rose de Noël", "Houx", "Eucalyptus", "Sapin"], tip: "Ambiance festive avec rouges profonds, verts et dorés. L'amaryllis est la reine de décembre." }
};

if (calendarMonths.length && calendarDetail) {
  const showMonth = (monthEl) => {
    const key = monthEl.dataset.month;
    const data = calendarData[key];
    if (!data) return;

    calendarMonths.forEach((m) => m.classList.remove("active"));
    monthEl.classList.add("active");

    calendarDetail.innerHTML = `
      <h3>${data.emoji} Fleurs de ${key.charAt(0).toUpperCase() + key.slice(1)}</h3>
      <p>${data.tip}</p>
      <div class="calendar-flowers">
        ${data.flowers.map(f => `<span class="flower-tag">${f}</span>`).join("")}
      </div>
    `;
    calendarDetail.style.display = "block";
  };

  calendarMonths.forEach((m) => {
    m.addEventListener("click", () => showMonth(m));
  });

  // Auto-select current month
  const monthNames = Object.keys(calendarData);
  const currentMonthIndex = new Date().getMonth();
  const currentMonthEl = calendarMonths[currentMonthIndex];
  if (currentMonthEl) showMonth(currentMonthEl);
}
