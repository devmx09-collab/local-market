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
