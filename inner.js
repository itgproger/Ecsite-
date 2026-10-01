const path = location.pathname.split("/").pop() || "index.html";
const active = (name) => (path === name ? "active" : "");
const headerRoot = document.querySelector(".page-header");
const footerRoot = document.querySelector(".page-footer");

if (headerRoot)
  headerRoot.innerHTML = `<header class="site-header">
  <a class="brand" href="index.html"><svg class="brand-mark" viewBox="0 0 48 36" aria-hidden="true"><path d="M4 30 16 5l8 17L32 5l12 25h-8l-4-9-8 14-8-14-4 9H4Z"/></svg><span>Furniro</span></a>
  <button class="menu-toggle" type="button" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
  <nav class="main-nav"><a class="${active("index.html")}" href="index.html">Home</a><a class="${active("shop.html")}" href="shop.html">Shop</a><a class="${active("blog.html")}" href="blog.html">Blog</a><a class="${active("about.html")}" href="about.html">About</a><a class="${active("contact.html")}" href="contact.html">Contact</a></nav>
  <div class="header-actions"><button aria-label="Account"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6"/></svg></button><button class="global-search" aria-label="Search"><svg viewBox="0 0 24 24"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg></button><button aria-label="Wishlist"><svg viewBox="0 0 24 24"><path d="M20.8 4.8a5.5 5.5 0 0 0-7.8 0L12 5.9l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.4a5.5 5.5 0 0 0 0-7.8Z"/></svg></button><button class="cart-button" aria-label="Cart" onclick="location.href='cart.html'"><svg viewBox="0 0 24 24"><circle cx="9" cy="20" r="1"/><circle cx="19" cy="20" r="1"/><path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h8.8a2 2 0 0 0 2-1.6L22 8H6"/></svg><span class="cart-count">${localStorage.getItem("furniro-cart") || 0}</span></button></div>
</header>`;

if (footerRoot)
  footerRoot.innerHTML = `<footer><div class="footer-grid"><div class="footer-brand"><h2>Funiro.</h2><p>400 University Drive Suite 200 Coral Gables,<br>FL 33134 USA</p></div><div><h3>Links</h3><a href="index.html">Home</a><a href="shop.html">Shop</a><a href="blog.html">Blog</a><a href="about.html">About</a><a href="contact.html">Contact</a></div><div><h3>Help</h3><a href="checkout.html">Payment Options</a><a href="contact.html">Returns</a><a href="contact.html">Privacy Policies</a></div><div class="newsletter"><h3>Newsletter</h3><form><input type="email" placeholder="Enter Your Email Address" required><button>Subscribe</button></form><p class="form-message"></p></div></div><p class="copyright">2023 furino. All rights reserved</p></footer>`;

const menu = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
menu?.addEventListener("click", () => {
  const open = menu.classList.toggle("active");
  nav.classList.toggle("open", open);
  menu.setAttribute("aria-expanded", open);
});
document.querySelector(".global-search")?.addEventListener("click", () => {
  const q = prompt("Search products");
  if (q) location.href = `shop.html?q=${encodeURIComponent(q)}`;
});
document.querySelector(".newsletter form")?.addEventListener("submit", (e) => {
  e.preventDefault();
  document.querySelector(".form-message").textContent =
    "Thank you for subscribing!";
  e.target.reset();
});

window.addToCart = function (count = 1) {
  const total = Number(localStorage.getItem("furniro-cart") || 0) + count;
  localStorage.setItem("furniro-cart", total);
  document
    .querySelectorAll(".cart-count")
    .forEach((el) => (el.textContent = total));
  showToast("Product added to cart");
};
window.showToast = function (message) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = message;
  el.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
};
const catalog = [
  [
    "Syltherine",
    "Stylish cafe chair",
    "Rp 2.500.000",
    "Rp 3.500.000",
    "product-1.png",
    "-30%",
  ],
  ["Leviosa", "Stylish cafe chair", "Rp 2.500.000", "", "product-2.png", ""],
  [
    "Lolito",
    "Luxury big sofa",
    "Rp 7.000.000",
    "Rp 14.000.000",
    "product-3.png",
    "-50%",
  ],
  [
    "Respira",
    "Outdoor bar table and stool",
    "Rp 500.000",
    "",
    "product-4.png",
    "New",
  ],
  ["Grifo", "Night lamp", "Rp 1.500.000", "", "product-5.png", ""],
  ["Muggo", "Small mug", "Rp 150.000", "", "product-6.png", "New"],
  [
    "Pingky",
    "Cute bed set",
    "Rp 7.000.000",
    "Rp 14.000.000",
    "product-7.png",
    "-50%",
  ],
  ["Potty", "Minimalist flower pot", "Rp 500.000", "", "product-8.png", "New"],
];
document.querySelectorAll("[data-product-grid]").forEach((grid) => {
  const count = Number(grid.dataset.productGrid || 8);
  grid.innerHTML = catalog
    .slice(0, count)
    .map(
      (p, i) => `<a class="product-card" href="product.html">
    <div class="product-image"><img src="assets/${p[4]}" alt="${p[0]}">${p[5] ? `<span class="badge ${p[5] === "New" ? "new" : "sale"}">${p[5]}</span>` : ""}</div>
    <div class="product-info"><h3>${p[0]}</h3><p>${p[1]}</p><strong>${p[2]}</strong>${p[3] ? `<del>${p[3]}</del>` : ""}</div>
    <div class="product-overlay"><button class="add-cart" data-add-cart>Add to cart</button><div><button><span>Share</span></button><button data-like aria-pressed="false"><span>Like</span></button></div></div>
  </a>`,
    )
    .join("");
});
document.querySelectorAll("[data-add-cart]").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    addToCart();
  }),
);
document.querySelectorAll("[data-like]").forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();
    const active = btn.classList.toggle("active");
    btn.setAttribute("aria-pressed", String(active));
    showToast(active ? "Added to wishlist" : "Removed from wishlist");
  }),
);
