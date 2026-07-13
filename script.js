const defaultListings = [
  { title: "Used iPhone 13", price: "$320", area: "Downtown", category: "Electronics", contact: "Text: 555-0101", description: "Good condition, unlocked, charger included." },
  { title: "Wood desk", price: "$45", area: "North Side", category: "Furniture", contact: "Call: 555-0102", description: "Solid wood desk with one drawer." },
  { title: "Yard cleanup service", price: "$80", area: "West End", category: "Services", contact: "Text: 555-0103", description: "Leaf cleanup, trimming, and hauling." },
  { title: "Free box of books", price: "Free", area: "East Side", category: "Free", contact: "Message only", description: "Mixed fiction and non-fiction." },
  { title: "Black cat", price: "Free", area: "North Side", category: "Free", contact: "Text: 555-0104", description: "Friendly adult cat needs a home." }
];

const saved = localStorage.getItem("listings");
const listings = saved ? JSON.parse(saved) : defaultListings;

const grid = document.querySelector(".listings");
const searchInput = document.querySelector('input[placeholder="Search listings..."]');
const searchBtn = document.querySelector(".search-row button");
const postBtn = document.querySelector(".post-btn");
const postForm = document.querySelector("#postForm");
const categoryButtons = document.querySelectorAll(".categories button");

const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const modalTitle = document.querySelector("#modalTitle");
const modalArea = document.querySelector("#modalArea");
const modalPrice = document.querySelector("#modalPrice");
const modalContact = document.querySelector("#modalContact");
const modalDescription = document.querySelector("#modalDescription");

let activeCategory = "";

function saveListings() {
  localStorage.setItem("listings", JSON.stringify(listings));
}

function openModal(item) {
  modalTitle.textContent = item.title;
  modalArea.textContent = `${item.area} • ${item.category}`;
  modalPrice.textContent = item.price;
  modalContact.textContent = item.contact ? `Contact: ${item.contact}` : "";
  modalDescription.textContent = item.description || "";
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

function getFilteredListings() {
  const term = searchInput.value.toLowerCase().trim();
  return listings.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(term) ||
      item.area.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      (item.description || "").toLowerCase().includes(term) ||
      (item.contact || "").toLowerCase().includes(term);

    const matchesCategory =
      !activeCategory ||
      item.category.toLowerCase() === activeCategory.toLowerCase() ||
      (activeCategory === "For Sale" && item.category !== "Free");

    return matchesSearch && matchesCategory;
  });
}

function render(items) {
  grid.innerHTML = items.map((item, index) => `
    <article class="card" data-index="${index}">
      <div class="image"></div>
      <div class="card-row">
        <div>
          <h3>${item.title}</h3>
          <p>${item.area} • ${item.category}</p>
          ${item.description ? `<p>${item.description}</p>` : ""}
          ${item.contact ? `<p><strong>Contact:</strong> ${item.contact}</p>` : ""}
        </div>
        <strong>${item.price}</strong>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".card").forEach((card) => {
    card.addEventListener("click", () => {
      const item = items[Number(card.dataset.index)];
      openModal(item);
    });
  });
}

function refresh() {
  render(getFilteredListings());
}

if (searchInput) searchInput.addEventListener("input", refresh);
if (searchBtn) searchBtn.addEventListener("click", refresh);

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const clicked = btn.textContent.trim();

    if (activeCategory === clicked) {
      activeCategory = "";
      btn.classList.remove("active");
    } else {
      activeCategory = clicked;
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }

    refresh();
  });
});

if (postBtn && postForm) {
  postBtn.addEventListener("click", () => {
    postForm.classList.toggle("hidden");
  });

  postForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(postForm);
    const title = formData.get("title").trim();
    const price = formData.get("price").trim();
    const area = formData.get("area").trim();
    const contact = formData.get("contact").trim();
    const category = formData.get("category").trim();
    const description = formData.get("description").trim();

    if (!title || !price || !area || !category || !contact) return;

    listings.unshift({ title, price, area, category, contact, description });
    saveListings();
    postForm.reset();
    postForm.classList.add("hidden");
    refresh();
  });
}

refresh();
