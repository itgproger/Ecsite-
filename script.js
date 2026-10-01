const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const products = document.querySelector(".products");
const showMore = document.querySelector(".show-more");
const cartCount = document.querySelector(".cart-count");
const toast = document.querySelector(".toast");
let cartItems = Number(localStorage.getItem("furniro-cart") || 0);
cartCount.textContent = cartItems;

function notify(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(notify.timer);
  notify.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

menuButton.addEventListener("click", () => {
  const open = menuButton.classList.toggle("active");
  nav.classList.toggle("open", open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});

nav.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuButton.classList.remove("active");
    menuButton.setAttribute("aria-expanded", "false");
  }),
);

showMore.addEventListener("click", () => {
  const expanded = products.classList.toggle("expanded");
  showMore.textContent = expanded ? "Show Less" : "Show More";
  showMore.setAttribute("aria-expanded", String(expanded));
});

document.querySelectorAll(".add-cart").forEach((button) =>
  button.addEventListener("click", () => {
    cartItems += 1;
    localStorage.setItem("furniro-cart", String(cartItems));
    cartCount.textContent = cartItems;
    notify("Product added to cart");
  }),
);

document.querySelectorAll(".like").forEach((button) =>
  button.addEventListener("click", () => {
    const active = button.classList.toggle("active");
    button.setAttribute("aria-pressed", String(active));
    notify(active ? "Added to wishlist" : "Removed from wishlist");
  }),
);

const searchPanel = document.querySelector(".search-panel");
document.querySelector(".search-button").addEventListener("click", () => {
  searchPanel.hidden = false;
  searchPanel.querySelector("input").focus();
});
document
  .querySelector(".close-search")
  .addEventListener("click", () => (searchPanel.hidden = true));
searchPanel.addEventListener("click", (event) => {
  if (event.target === searchPanel) searchPanel.hidden = true;
});
searchPanel.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
  searchPanel.hidden = true;
  notify("Search is ready for catalog integration");
});

document
  .querySelector(".newsletter form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    const message = document.querySelector(".form-message");
    message.textContent = "Thank you for subscribing!";
    event.currentTarget.reset();
  });

document.querySelectorAll(".slider-dots button").forEach((dot) =>
  dot.addEventListener("click", () => {
    document.querySelector(".slider-dots .active").classList.remove("active");
    dot.classList.add("active");
  }),
);
