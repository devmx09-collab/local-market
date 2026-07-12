const listings = [
  { title: "Used iPhone 13", price: "$320", area: "Downtown", category: "Electronics" },
  { title: "Wood desk", price: "$45", area: "North Side", category: "Furniture" },
  { title: "Yard cleanup service", price: "$80", area: "West End", category: "Services" },
  { title: "Free box of books", price: "Free", area: "East Side", category: "Free" },
  { title: "Bicycle", price: "$120", area: "Central", category: "For Sale" },
  { title: "Apartment room", price: "$700/mo", area: "Downtown", category: "Housing" },
];

const grid = document.querySelector(".listings");
const searchInput = document.querySelector('input[placeholder="Search listings..."]');
const categoryButtons = [...document.querySelectorAll(".categories button")];

function render(items) {
  grid.innerHTML = items.map(item => `
    <article class="card">
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
}

function filterListings() {
  const term = searchInput.value.toLowerCase().trim();
  const active = document.querySelector(".categories button.active")?.textContent || "";

  const filtered = listings.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(term) ||
      item.area.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);

    const matchesCategory = !active || active === "All" || item.category === active;
    return matchesSearch && matchesCategory;
  });

  render(filtered);
}

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    categoryButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterListings();
  });
});

searchInput.addEventListener("input", filterListings);

render(listings);
