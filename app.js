"use strict";
const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".detials-content");
const CloseBtn = document.getElementById("recipe-close-btn");

// eventlistener för klick funktioner
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener("click", getMealRecipe);
CloseBtn.addEventListener("click", () => {
  mealDetailsContent.parentElement.classList.remove("showRecipe");
});

// Hämta Matlist från det som skrivs i söksfältet. Loopa igenom data från API och skriv ut det som matchar med en forEachLoop

function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
   fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`)
    .then((response) => response.json())
    .then((data) => {
      let html = "";
      if (data.meals) { 
        data.meals.forEach((dinner) => {
          html += `
              <div class="meal-item" data-id = "${dinner.idMeal}">
                <div class="meal-img">
                  <img src="${dinner.strMealThumb}" alt="" />
                </div>
                <div class="meal-name">
                  <h3>${dinner.strMeal}</h3>
                  <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
              </div>
              `;    
        });
        mealList.classList.remove("notFound");
      } else {
        html = `Sorry there was 0 search results, try something else`;
        mealList.classList.add("notFound");  
      } 
      mealList.innerHTML = html;
    });
    
}




// Hämta recept till maten.

function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("recipe-btn")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
      .then((response) => response.json())
      .then((data) => getMealRecipeModal(data.meals));
   
  }
}

// Skapa modul fönster till resultaten.
function getMealRecipeModal(meal) {
  meal = meal[0];
  let html = `
  <h2 class="recipe-title">${meal.strMeal}</h2>
  <p class="recipe-category">${meal.strCategory}</p>
  <div class="recipe-instruct">
    <h3>Instructions:</h3>
    
    <p>${meal.strInstructions}</p>
  </div>
  <div class="recipe-meal-img">
    <img src="${meal.strMealThumb}" alt="" />
  </div>
  <div class="recipe-link">
    <a href="${meal.strYoutube}" target="_blank">Watch video</a>
  </div>`;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add("showRecipe");
}



// Animation för kuberna

const colors = ["#cebc81", "#303c6c", "#f7b733", "#a16e83"];

function createSquare() {
  const section = document.getElementById("animation");
  const square = document.createElement("span");

  let size = Math.random() * 50;

  square.style.width = 20 + size + "px";
  square.style.height = 20 + size + "px";

  square.style.top = Math.random() * innerHeight + "px";
  square.style.left = Math.random() * innerWidth + "px";

  const bg = colors[Math.floor(Math.random() * colors.length)];
  square.style.background = bg;

  section.appendChild(square);

  setTimeout(() => {
    square.remove();
  }, 5000);
}
setInterval(createSquare, 150);


