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
      <input id="price" placeholder="Price (e.g. $20, Free, $80/mo)" />
      <input id="area" placeholder="Area (e.g. Downtown)" />
      <input id="category" placeholder="Category (For Sale, Free, Services, Housing, Jobs, Vehicles, Electronics, Furniture)" />
      <textarea id="description" placeholder="Description"></textarea>
      <div class="modal-actions">
        <button id="cancel">Cancel</button>
        <button id="save" class="primary">Post</button>
      </div>
    </div>
  `;

  document.body.appendChild(overlay);

  const close = () => overlay.remove();

  overlay.querySelector("#cancel").addEventListener("click", close);

  overlay.querySelector("#save").addEventListener("click", () => {
    const title = overlay.querySelector("#title").value.trim();
    const price = overlay.querySelector("#price").value.trim() || "Free";
    const area = overlay.querySelector("#area").value.trim() || "Local";
    const category = overlay.querySelector("#category").value.trim() || "For Sale";
    const description = overlay.querySelector("#description").value.trim() || "";

    if (!title) return;

    listings.unshift({ title, price, area, category, description });

    searchInput.value = "";
    selectedCategory = "";
    categoryButtons.forEach(b => b.classList.remove("active"));
    close();
    filterListings();
  });
});

render(listings);
