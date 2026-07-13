const listings = [
  { title: "Used iPhone 13", price: "$320", area: "Downtown", category: "Electronics" },
  { title: "Wood desk", price: "$45", area: "North Side", category: "Furniture" },
  { title: "Yard cleanup service", price: "$80", area: "West End", category: "Services" },
  { title: "Free box of books", price: "Free", area: "East Side", category: "Free" },
  { title: "Black cat", price: "Free", area: "North Side", category: "Free" }
];

const grid = document.querySelector(".listings");
const searchInput = document.querySelector('input[placeholder="Search listings..."]');
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const modalTitle = document.querySelector("#modalTitle");
const modalArea = document.querySelector("#modalArea");
const modalPrice = document.querySelector("#modalPrice");

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

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase().trim();
  render(listings.filter(item =>
    item.title.toLowerCase().includes(term) ||
    item.area.toLowerCase().includes(term) ||
    item.category.toLowerCase().includes(term)
  ));
});

render(listings);
