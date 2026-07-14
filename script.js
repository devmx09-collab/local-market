import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY",
  authDomain: "PASTE_YOUR_AUTH_DOMAIN",
  projectId: "PASTE_YOUR_PROJECT_ID",
  storageBucket: "PASTE_YOUR_STORAGE_BUCKET",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID",
  appId: "PASTE_YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const postBtn = document.querySelector(".post-btn");
const postForm = document.getElementById("postForm");
const listingsEl = document.querySelector(".listings");

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
    createdAt: Date.now()
  });

  postForm.reset();
  postForm.classList.add("hidden");
});

const q = query(collection(db, "listings"), orderBy("createdAt", "desc"));

onSnapshot(q, (snap) => {
  listingsEl.innerHTML = "";

  snap.forEach((doc) => {
    const d = doc.data();

    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `
      <div class="image"></div>
      <div class="card-row">
        <div>
          <h3>${d.title}</h3>
          <p>${d.area} • ${d.category}</p>
        </div>
        <strong>${d.price}</strong>
      </div>
    `;

    listingsEl.appendChild(card);
  });
});
