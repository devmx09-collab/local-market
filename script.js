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
    const category = formData.get("category").trim();

    if (!title || !price || !area || !category) return;

    listings.unshift({ title, price, area, category });
    saveListings();
    postForm.reset();
    postForm.classList.add("hidden");
    refresh();
  });
}

refresh();
