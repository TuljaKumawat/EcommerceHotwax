const productContainer = document.getElementById("products");
const loader = document.getElementById("loader");
const logoutBtn = document.getElementById("logoutBtn");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

let allProducts = [];

// 🔐 Login protection
const user = JSON.parse(localStorage.getItem("user"));
if (!user) {
    window.location.href = "index.html";
}


// 📦 Fetch products
fetch("https://fakestoreapi.com/products")
    .then(res => res.json())
    .then(data => {
        loader.style.display = "none";
        allProducts = data;
        displayProducts(allProducts);
        loadCategories(allProducts);
    })
    .catch(() => {
        loader.innerText = "Failed to load products";
    });

// 🧾 Display products
function displayProducts(products) {
    productContainer.innerHTML = "";

    if (products.length === 0) {
        productContainer.innerHTML = "<p>No products found</p>";
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "product-card";

        card.innerHTML = `
      <img src="${product.image}" />
      <h4>${product.title}</h4>
      <p>₹ ${product.price}</p>
      <p class="category">${product.category}</p>
      <button>Add to Cart</button>
    `;

        productContainer.appendChild(card);
    });
}

// 🎯 Load categories in dropdown
function loadCategories(products) {
    const categories = [...new Set(products.map(p => p.category))];

    categories.forEach(cat => {
        const option = document.createElement("option");
        option.value = cat;
        option.textContent = cat;
        categoryFilter.appendChild(option);
    });
}

