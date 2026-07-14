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
