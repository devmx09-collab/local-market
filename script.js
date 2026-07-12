const listings = [
  { title: "Used iPhone 13", price: "$320", area: "Downtown", category: "Electronics" },
  { title: "Wood desk", price: "$45", area: "North Side", category: "Furniture" },
  { title: "Yard cleanup service", price: "$80", area: "West End", category: "Services" },
  { title: "Free box of books", price: "Free", area: "East Side", category: "Free" },
  { title: "Bicycle", price: "$120", area: "Central", category: "For Sale" },
  { title: "Apartment room", price: "$700/mo", area: "Downtown", category: "Housing" },
  { title: "Black cat", price: "Free", area: "North Side", category: "Free" },
  { title: "Cat carrier", price: "$20", area: "Downtown", category: "For Sale" },
];

const grid = document.querySelector(".listings");
const searchInput = document.querySelector('input[placeholder="Search listings..."]');
const categoryButtons = [...document.querySelectorAll(".categories button")];
const postBtn = document.querySelector(".post-btn");
const main = document.querySelector("main");

let selectedCategory = "";

function render(items) {
  if (!items.length) {
    grid.innerHTML = `<p style="padding: 12px; color: #6b7280;">No listings matched your search.</p>`;
    return;
  }

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

  const filtered = listings.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(term) ||
      item.area.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term);

    const matchesCategory =
      !selectedCategory || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  render(filtered);
}

categoryButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const category = btn.textContent.trim();

    if (selectedCategory === category) {
      selectedCategory = "";
      btn.classList.remove("active");
    } else {
      selectedCategory = category;
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }

    filterListings();
  });
});

searchInput.addEventListener("input", filterListings);

postBtn.addEventListener("click", () => {
  const title = prompt("What are you posting?");
  if (!title) return;

  const price = prompt("Price? Example: $20, Free, $80/mo") || "Free";
  const area = prompt("Area? Example: Downtown") || "Local";
  const category = prompt("Category? Example: For Sale, Free, Services, Housing, Jobs, Vehicles, Electronics, Furniture") || "For Sale";

  listings.unshift({
    title,
    price,
    area,
    category
  });

  searchInput.value = "";
  selectedCategory = "";
  categoryButtons.forEach(b => b.classList.remove("active"));
  filterListings();
});

render(listings);
