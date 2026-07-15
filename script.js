import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBrJREI60lka6JIP6nlGh0DzSrsGZuEvlw",
  authDomain: "local-mrkt.firebaseapp.com",
  projectId: "local-mrkt",
  storageBucket: "local-mrkt.firebasestorage.app",
  messagingSenderId: "257387620697",
  appId: "1:257387620697:web:3ca3c3c5aaabf77cc88448"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postBtn = document.querySelector(".post-btn");
const postForm = document.getElementById("postForm");
const listingsEl = document.querySelector(".listings");
const categoryButtons = document.querySelectorAll(".categories button");

let activeCategory = "all";
let currentListings = [];

postBtn.addEventListener("click", () => {
  postForm.classList.toggle("hidden");
});

postForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = postForm.title.value.trim();
  const price = postForm.price.value.trim();
  const area = postForm.area.value.trim();
  const category = postForm.category.value.trim();

  if (!title || !price || !area || !category) return;

  await addDoc(collection(db, "listings"), {
    title,
    price,
    area,
    category,
    createdAt: serverTimestamp()
  });

  postForm.reset();
  postForm.classList.add("hidden");
});

categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((b) => b.classList.remove("active"));
    button.classList.add("active");

    activeCategory = button.textContent.trim().toLowerCase();
    renderListings();
  });
});

function renderListings() {
  listingsEl.innerHTML = "";

  const filtered =
    activeCategory === "all"
      ? currentListings
      : currentListings.filter(
          (d) => (d.category || "").trim().toLowerCase() === activeCategory
        );

  filtered.forEach((d) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="image"></div>
      <div class="card-row">
        <div>
          <h3>${d.title || ""}</h3>
          <p>${d.area || ""} • ${d.category || ""}</p>
        </div>
        <strong>${d.price || ""}</strong>
      </div>
    `;
    listingsEl.appendChild(card);
  });
}

const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));

onSnapshot(q, (snap) => {
  currentListings = snap.docs.map((doc) => doc.data());
  renderListings();
});
