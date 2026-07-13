const defaultListings = [
  { title: "Used iPhone 13", price: "$320", area: "Downtown", category: "Electronics" },
  { title: "Wood desk", price: "$45", area: "North Side", category: "Furniture" },
  { title: "Yard cleanup service", price: "$80", area: "West End", category: "Services" },
  { title: "Free box of books", price: "Free", area: "East Side", category: "Free" },
  { title: "Black cat", price: "Free", area: "North Side", category: "Free" }
];

const saved = localStorage.getItem("listings");
const listings = saved ? JSON.parse(saved) : defaultListings;

const grid = document.querySelector(".listings");
const searchInput = document.querySelector('input[placeholder="Search listings..."]');
const searchBtn = document.querySelector(".search-row button");
const postBtn = document.querySelector(".post-btn");
const postForm = document.querySelector("#postForm");

const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const modalTitle = document.querySelector("#modalTitle");
const modalArea = document.querySelector("#modalArea");
const modalPrice = document.querySelector("#modalPrice");

function saveListings() {
  localStorage.setItem("listings", JSON.stringify(listings));
}

function openModal(item) {
  modalTitle.textContent = item.title;
  modalArea.textContent = `${item.area} • ${item.category}`;
  modalPrice.textContent = item.price;
  modal.classList.remove("hidden");
}

closeModal.addEventListener("click", () => modal.classList.add("hidden"));
modal.addEventListener("click", (e) => {
  if (e.target === modal) modal.classList.add("hidden");
});

function render(items) {
  grid.innerHTML = items.map((item, index) => `
    <article class="card" data-index="${index}">
      <div class="image"></div>
      <div class="card-row">
        <div>
          <h3>${item.title}</h3>
          <p>${item.area} • ${item.category}</p>
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

function applySearch() {
  const term = searchInput.value.toLowerCase().trim();
  render(listings.filter(item =>
    item.title.toLowerCase().includes(term) ||
    item.area.toLowerCase().includes(term) ||
    item.category.toLowerCase().includes(term)
  ));
}

if (searchInput) searchInput.addEventListener("input", applySearch);
if (searchBtn) searchBtn.addEventListener("click", applySearch);

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
    const category = formData.get("category").trim();

    if (!title || !price || !area || !category) return;

    listings.unshift({ title, price, area, category });
    saveListings();
    postForm.reset();
    postForm.classList.add("hidden");
    applySearch();
  });
}

applySearch();
