const defaultListings = [
  { title: "Used iPhone 13", price: "$320", area: "Downtown", category: "Electronics" },
  { title: "Wood desk", price: "$45", area: "North Side", category: "Furniture" },
  { title: "Yard cleanup service", price: "$80", area: "West End", category: "Services" },
  { title: "Free box of books", price: "Free", area: "East Side", category: "Free" },
  { title: "Black cat", price: "Free", area: "North Side", category: "Free" }
];

const grid = document.querySelector(".listings");
const searchInput = document.querySelector('.search-row input');
const searchBtn = document.querySelector('.search-row button');
const postBtn = document.querySelector(".post-btn");
const postForm = document.querySelector("#postForm");
const categoryButtons = document.querySelectorAll(".categories button");

const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#closeModal");
const modalTitle = document.querySelector("#modalTitle");
const modalArea = document.querySelector("#modalArea");
const modalPrice = document.querySelector("#modalPrice");

let listings = [];
let activeCategory = "";

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

function matchesCategory(item) {
  if (!activeCategory) return true;
  if (activeCategory === "For Sale") return item.category !== "Free";
  return item.category.toLowerCase() === activeCategory.toLowerCase();
}

function getFilteredListings() {
  const term = searchInput.value.toLowerCase().trim();
  return listings.filter(item => {
    const title = item.title?.toLowerCase() || "";
    const area = item.area?.toLowerCase() || "";
    const category = item.category?.toLowerCase() || "";

    const matchesSearch =
      title.includes(term) || area.includes(term) || category.includes(term);

    return matchesSearch && matchesCategory(item);
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

async function loadListings() {
  if (!window.sb) {
    console.error("Supabase client not found.");
    listings = defaultListings;
    refresh();
    return;
  }

  const { data, error } = await sb
    .from("listings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Load error:", error);
    listings = defaultListings;
  } else if (data && data.length) {
    listings = data;
  } else {
    listings = defaultListings;
  }

  refresh();
}

searchInput.addEventListener("input", refresh);
searchBtn.addEventListener("click", refresh);

categoryButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const clicked = btn.textContent.trim();

    if (activeCategory === clicked) {
      activeCategory = "";
      categoryButtons.forEach(b => b.classList.remove("active"));
    } else {
      activeCategory = clicked;
      categoryButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
    }

    refresh();
  });
});

postBtn.addEventListener("click", () => {
  postForm.classList.toggle("hidden");
});

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(postForm);
  const title = formData.get("title")?.trim();
  const price = formData.get("price")?.trim();
  const area = formData.get("area")?.trim();
  const category = formData.get("category")?.trim();

  if (!title || !price || !area || !category) return;

  const newListing = { title, price, area, category };

  if (window.sb) {
    const { error } = await sb.from("listings").insert([newListing]);
    if (error) {
      console.error("Insert error:", error);
      return;
    }
  }

  listings.unshift(newListing);
  postForm.reset();
  postForm.classList.add("hidden");
  refresh();
});

loadListings();
