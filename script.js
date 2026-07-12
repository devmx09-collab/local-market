const listings = [
  { title: "Used iPhone 13", price: "$320", area: "Downtown", category: "Electronics" },
  { title: "Wood desk", price: "$45", area: "North Side", category: "Furniture" },
  { title: "Yard cleanup service", price: "$80", area: "West End", category: "Services" },
  { title: "Free box of books", price: "Free", area: "East Side", category: "Free" },
  { title: "Black cat", price: "Free", area: "North Side", category: "Free" }
];

const grid = document.querySelector(".listings");
const searchInput = document.querySelector('input[placeholder="Search listings..."]');

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

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase().trim();
  render(listings.filter(item =>
    item.title.toLowerCase().includes(term) ||
    item.area.toLowerCase().includes(term) ||
    item.category.toLowerCase().includes(term)
  ));
});

render(listings);
