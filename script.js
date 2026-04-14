const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("open");
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => navLinks.classList.remove("open"));
  });
}

const yearNode = document.getElementById("year");
if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const form = document.getElementById("contact-form");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Merci pour votre message. Nous vous répondrons rapidement.");
    form.reset();
  });
}

const bouquetData = {
  mariage: [
    {
      id: "pastel-elegance",
      name: "Pastel Elegance",
      image:
        "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=1200&q=80",
      short: "Roses branchues, pivoines et lisianthus.",
      description:
        "Un bouquet romantique aux tons poudres, ideal pour mariage civil ou ceremonie.",
      price: "85 EUR - 120 EUR",
    },
    {
      id: "blanc-signature",
      name: "Blanc Signature",
      image:
        "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1200&q=80",
      short: "Renoncules blanches et feuillage olive.",
      description:
        "Composition chic en blanc et vert, elegante et intemporelle pour un decor raffine.",
      price: "95 EUR - 140 EUR",
    },
  ],
  anniversaire: [
    {
      id: "explosion-couleurs",
      name: "Explosion de Couleurs",
      image:
        "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1200&q=80",
      short: "Germinis, roses spray et alstroemeres.",
      description:
        "Bouquet vif et joyeux pour celebrer les moments festifs avec une palette coloree.",
      price: "45 EUR - 75 EUR",
    },
    {
      id: "rose-poudre-chic",
      name: "Rose Poudre Chic",
      image:
        "https://images.unsplash.com/photo-1487070183336-b863922373d4?auto=format&fit=crop&w=1200&q=80",
      short: "Roses garden, oeillets premium et wax flower.",
      description:
        "Creation douce et elegante, parfaite pour anniversaire ou remerciement raffine.",
      price: "55 EUR - 90 EUR",
    },
  ],
  deuil: [
    {
      id: "hommage-blanc",
      name: "Hommage Blanc",
      image:
        "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=1200&q=80",
      short: "Lys, roses blanches et chrysanthemes.",
      description:
        "Arrangement sobre et lumineux pour rendre hommage avec delicatesse et respect.",
      price: "70 EUR - 110 EUR",
    },
    {
      id: "sobriete-naturelle",
      name: "Sobriete Naturelle",
      image:
        "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?auto=format&fit=crop&w=1200&q=80",
      short: "Tons creme et verts, composition apaisante.",
      description:
        "Composition epuree aux tons naturels pour un accompagnement discret et harmonieux.",
      price: "60 EUR - 95 EUR",
    },
  ],
};

const productCards = document.querySelectorAll(".product-category-card");
const descriptionTitle = document.getElementById("product-description-title");
const descriptionText = document.getElementById("product-description-text");
const examplesContainer = document.getElementById("category-examples");
const examplesTitle = document.getElementById("examples-title");
const examplesIntro = document.getElementById("examples-intro");

const renderExamples = (categoryKey, categoryLabel) => {
  if (!examplesContainer || !examplesTitle || !examplesIntro) return;
  const items = bouquetData[categoryKey] || [];

  examplesTitle.textContent = `Exemples de bouquets - ${categoryLabel}`;
  examplesIntro.textContent =
    "Chaque exemple est cliquable et ouvre sa page detaillee.";

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

    descriptionTitle.textContent = card.dataset.title || "Description categorie";
    descriptionText.textContent =
      card.dataset.description || "Description indisponible.";

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

const detailImage = document.getElementById("detail-image");
const detailCategory = document.getElementById("detail-category");
const detailName = document.getElementById("detail-name");
const detailDescription = document.getElementById("detail-description");
const detailPrice = document.getElementById("detail-price");

if (
  detailImage &&
  detailCategory &&
  detailName &&
  detailDescription &&
  detailPrice
) {
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
    detailCategory.textContent =
      selected.category.charAt(0).toUpperCase() + selected.category.slice(1);
  }
}
