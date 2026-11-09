"use strict";

/*
  Assignment 1 JavaScript file

  Complete the JavaScript required for your website in this file.

  Your work should accomplish the following:

  1. Select the HTML elements that JavaScript needs to use.

  2. Create named functions for the required interactions.

  3. Add event listeners so that the functions run when a user clicks a
     button, enters information or performs another suitable action.

  4. Use the Document Object Model to change page content, CSS classes,
     attributes or visibility.

  5. Include an input-based interaction. Check whether the user has entered
     a valid value before displaying the result.

  6. Create a control that shows and hides additional information.

  7. Create an interaction on the insights page that changes, filters or
     highlights business information.

  8. Add useful console.log() messages while testing and debugging.

  9. Remember that this JavaScript file is connected to several HTML pages.
     Check that an element exists before attempting to use it.

  Do not place JavaScript directly inside the HTML using attributes such as
  onclick. Keep the JavaScript in this file.
*/

let products = [
  { id: 1, name: "The Diary of Anne Frank", category: "Books and Media", year: "1945", score: 2 },
  { id: 2, name: "Sony PSP", category: "Technology and Vehicles", year: "2005", score: 4 },
  { id: 3, name: "1969 Hot Wheels Pink Rear-Loading Beach Bomb", category: "Toys and Games", year: "1969", score: 6 },
  { id: 4, name: "Penny Black Stamp", category: "Art and Antiques", year: "1840", score: 8 },
  { id: 5, name: "Ming Dynasty Porcelain Vase", category: "Art and Antiques", year: "1400", score: 1 },
  { id: 6, name: "Pokémon First Edition Charizard", category: "Toys and Games", year: "1999", score: 3 },
  { id: 7, name: "Meteorite Fragment (Gibeon)", category: "Natural History", year: "Ancient", score: 5 },
  { id: 8, name: "Rolex Daytona Paul Newman", category: "Fashion and Personal Items", year: "1963", score: 7 },
  { id: 9, name: "1952 Mickey Mantle Topps Card", category: "Toys and Games", year: "1952", score: 9 },
  { id: 10, name: "Signed Beatles Album", category: "Books and Media", year: "1964", score: 8 },
  { id: 11, name: "Antique Pocket Watch (Patek Philippe)", category: "Fashion and Personal Items", year: "1900", score: 5 },
  { id: 12, name: "First Edition Harry Potter and the Philosopher's Stone", category: "Books and Media", year: "1997", score: 9 },
  { id: 13, name: "Original Star Wars Boba Fett Prototype Figure", category: "Toys and Games", year: "1979", score: 2 },
  { id: 14, name: "Apple-1 Computer", category: "Technology and Vehicles", year: "1976", score: 4 }
];

/*console.log(products);

const jsonText = JSON.stringify(products);
console.log(jsonText);
console.log(typeof jsonText);

const restoredTasks = JSON.parse(jsonText);
console.log(restoredTasks);
console.log(Array.isArray(restoredTasks)); */

let nextId = 15;

const themebtn = document.getElementById('theme-btn');
const dashboardStatus = document.getElementById("dashboardStatus");
const statTotal = document.getElementById("statTotal");
const statCategories = document.getElementById("statCategories");
const statAverage = document.getElementById("statAverage");
const statTop = document.getElementById("statTop");
const nameInput = document.getElementById("nameInput");
const greetingText = document.getElementById("greetingText");
const greetingButton = document.getElementById("greetingButton");
const alertButton = document.getElementById("alertButton");
const infoPanel = document.getElementById("info-panel");
const hiddenButton = document.getElementById("hiddenButton");
const categoryFilter = document.getElementById("categoryFilter");
const filterButton = document.getElementById("filterButton");
const resultCount = document.getElementById("resultCount");
const productList = document.getElementById("productList");
const averageScore = document.getElementById("averageScore");
const minimumScore = document.getElementById("minimumScore");
const productForm = document.getElementById("productForm");
const productName = document.getElementById("productName");
const productCategory = document.getElementById("productCategory");
const productYear = document.getElementById("productYear");
const productScore = document.getElementById("productScore");
const formMessage = document.getElementById("formMessage");
const sortButton = document.getElementById("sortButton");

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
  if (themebtn) {
    themebtn.textContent = document.body.classList.contains('dark-mode') 
      ? 'Toggle Light Theme' 
      : 'Toggle Dark Theme';
  }
  console.log('Theme toggled');
}

function createGreeting() {
   if (!nameInput || !greetingText) return;
    const name = nameInput.value.trim();
    console.log("Name: '" + name + "'");
    if (name === "") {
// Update warning text and class.
        greetingText.textContent = "Please enter your name.";
        greetingText.classList.remove("success");
        greetingText.classList.add("warning");
        greetingText.style.color = 'red';
    return;
}
// Create the personalised greeting and success state.
    greetingText.textContent = "Hello " + name + ", Welcome to Rudolph's Retro Trading website";
    greetingText.classList.remove("warning");
    greetingText.classList.add("success");
    greetingText.style.color = 'green';
    console.log('Greeting created');
}

function showGreetingAlert() {
alert("Hello, the most recent name is: " + nameInput.value.trim());
}

function logProducts() {
products.forEach(function (product) {
console.log(  `${product.name} is associated with ${product.category} which 1st released in ${product.year} and has a collector scor of ${product.score}.`);
});
}

function renderProducts(productsToShow) {
productList.textContent = "";
productsToShow.forEach(function (product) {
const card = document.createElement("article");
const heading = document.createElement("h3");
const details = document.createElement("p");
card.classList.add("product-card");
card.dataset.score = product.score; 
heading.textContent = product.name;
details.textContent = `${product.category} | Year: ${product.year} | Score: ${product.score}`;
card.appendChild(heading);
card.appendChild(details);
productList.appendChild(card);
});

highlightItems();
}

function applyFilters() {
  if (!productList) return;
  const productsToShow = getFilteredElements();
  renderProducts(productsToShow);
  updateSummary(productsToShow);
}

function getFilteredElements() {
if (!categoryFilter || !minimumScore) return products;
const category = categoryFilter.value;
const minimum = Number(minimumScore.value);
let productsToShow = products;
if (category !== "all") {
productsToShow = productsToShow.filter(function (product) {
return product.category === category;
});
}
productsToShow = productsToShow.filter(function (product) {
return product.score >= minimum;
});

return productsToShow;
}

function highlightItems() {
  const cards = document.querySelectorAll(".product-card");
  let highlighted = 0;

  cards.forEach(function (card) {
    if (Number(card.dataset.score) >= 9) {
      card.classList.add("highlight");
      highlighted++;
    }
  });

  console.log(`${highlighted} top-scoring item(s) highlighted`);
}

function updateSummary(productsToShow) {
   if (!resultCount || !averageScore) return;
let totalScore = 0;
productsToShow.forEach(function (product) {
totalScore += product.score;
});
const average = productsToShow.length === 0
? 0
: totalScore / productsToShow.length;
resultCount.textContent = `${productsToShow.length} products found`;
averageScore.textContent = `Average score: ${average.toFixed(1)}`;
}

function addProduct(event) {
event.preventDefault();
const name = productName.value.trim();
const category = productCategory.value;
const year = productYear.value.trim();
const score = Number(productScore.value);
if (name === "" || year === "" || score < 1 || score > 10) {
  formMessage.textContent = "Enter a name and a score from 1 to 10.";
  formMessage.className = "warning";
  return;
}

const newProduct = { 
    id: nextId,
    name: name, 
    category: category,
    year: year,
    score: score
};

products.push(newProduct);
nextId += 1;
saveProducts();
productForm.reset();
formMessage.textContent = `${name} was added successfully.`;
formMessage.className = "success";
console.log("Product has been added:", name);
applyFilters();
}

function scoreSorting() {
  const sorted = getFilteredElements().slice().sort(function (a, b) {
    return b.score - a.score;
  });
  renderProducts(sorted);
  updateSummary(sorted);
}

function renderDashboard() {
  if (!dashboardStatus || !statTotal || !statCategories || !statAverage || !statTop) return;

  const total = products.length;

  const categories = new Set(products.map(function (product) {
    return product.category;
  }));

  const totalScore = products.reduce(function (sum, product) {
    return sum + product.score;
  }, 0);
  const average = total === 0 ? 0 : totalScore / total;

  let topProduct = null;
  products.forEach(function (product) {
    if (topProduct === null || product.score > topProduct.score) {
      topProduct = product;
    }
  });

  statTotal.textContent = total;
  statCategories.textContent = categories.size;
  statAverage.textContent = average.toFixed(1);
  statTop.textContent = topProduct ? topProduct.name : "-";

  dashboardStatus.textContent = `Collection loaded: ${total} items across ${categories.size} categories.`;
  console.log("Dashboard rendered", { total, average });
}

function toggleInfo() {
    infoPanel.classList.toggle("hidden");
    hiddenButton.textContent = infoPanel.classList.contains("hidden")
      ? "Show Extra Info" : "Hide Extra Info";
}

function saveProducts() {
  try {
    localStorage.setItem("rudolphProducts", JSON.stringify(products));
  } catch (error) {
    console.log("Could not save products:", error);
  }
}

function loadProducts() {
  try {
    const savedText = localStorage.getItem("rudolphProducts");
    if (savedText !== null) {
      products = JSON.parse(savedText);
    }
  } catch (error) {
    console.log("Could not load saved products:", error);
  }
}

//loadProducts();
//console.log(products);

function startApplication() {
  loadProducts();

  if (products.length > 0) {
    nextId = Math.max(...products.map(product => product.id)) + 1;
  }

  renderDashboard();
  applyFilters();
}

themebtn?.addEventListener("click", toggleTheme);
greetingButton?.addEventListener("click", createGreeting);
alertButton?.addEventListener("click", showGreetingAlert);
filterButton?.addEventListener("click", applyFilters);
sortButton?.addEventListener("click", scoreSorting);
productForm?.addEventListener("submit", addProduct);
hiddenButton?.addEventListener("click", toggleInfo);

startApplication();