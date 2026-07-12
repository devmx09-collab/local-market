const listings = [
  { title: "Used iPhone 13", price: "$320", area: "Downtown", category: "Electronics", description: "Good condition, unlocked." },
  { title: "Wood desk", price: "$45", area: "North Side", category: "Furniture", description: "Solid wood, pickup only." },
  { title: "Yard cleanup service", price: "$80", area: "West End", category: "Services", description: "Same-day availability." },
  { title: "Free box of books", price: "Free", area: "East Side", category: "Free", description: "Mostly novels and textbooks." },
  { title: "Bicycle", price: "$120", area: "Central", category: "For Sale", description: "Needs new tire tube." },
  { title: "Apartment room", price: "$700/mo", area: "Downtown", category: "Housing", description: "Utilities included." },
  { title: "Black cat", price: "Free", area: "North Side", category: "Free", description: "Friendly, litter trained." },
  { title: "Cat carrier", price: "$20", area: "Downtown", category: "For Sale", description: "Lightly used." }
];

const grid = document.querySelector(".listings");
const searchInput = document.querySelector('input[placeholder="Search listings..."]');
const categoryButtons = [...document.querySelectorAll(".categories button")];
const postBtn = document.querySelector(".post-btn");

let selectedCategory = "";

function render(items) {
  if (!items.length) {
    grid.innerHTML = '<p style="padding:12px;color:#6b7280;">No listings matched your search.</p>';
    return;
  }

  grid.innerHTML = items.map((item) => `
    <article class="card">
      <div class="image"></div>
      <div class="card-row">
        <div>
          <h3>${item.title}</h3>
          <p>${item.area} • ${item.category}</p>
          <p>${item.description}</p>
        </div>
        <strong>${item.price}</strong>
      </div>
    </article>
  `).join("");
}

function filterListings() {
  const term = searchInput.value.toLowerCase().trim();

  const filtered = listings.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(term) ||
      item.area.toLowerCase().includes(term) ||
      item.category.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term);

    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  render(filtered);
}

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.textContent.trim();

    if (selectedCategory === category) {
      selectedCategory = "";
      btn.classList.remove("active");
    } else {
      selectedCategory = category;
      categoryButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
    }

    filterListings();
  });
});

searchInput.addEventListener("input", filterListings);

postBtn.addEventListener("click", () => {
  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.innerHTML = `
    <div class="modal">
      <h2>Post a listing</h2>
      <input id="title" placeholder="Title" />
      <input id="price" placeholder="Price" />
      <input id="area" placeholder="Area" />
      <input id="category" placeholder="Category" />
      <textarea id="description" placeholder="Description"></textarea>
      <div class="modal-actions">
        <button id="cancel">Cancel</button>
        <button id="save" class="primary">Post</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  overlay.querySelector("#cancel").addEventListener("click", () => {
    overlay.remove();
  });

  overlay.querySelector("#save").addEventListener("click", () => {
    const title = overlay.querySelector("#title").value.trim();
    if (!title) return;

    listings.unshift({
      title,
      price: overlay.querySelector("#price").value.trim() || "Free",
      area: overlay.querySelector("#area").value.trim() || "Local",
      category: overlay.querySelector("#category").value.trim() || "For Sale",
      description: overlay.querySelector("#description").value.trim() || ""
    });

    searchInput.value = "";
    selectedCategory = "";
    categoryButtons.forEach((b) => b.classList.remove("active"));
    overlay.remove();
    filterListings();
  });
});

render(listings);
