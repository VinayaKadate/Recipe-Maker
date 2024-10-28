const apiKey = "00f2b61966f44c26a32552682a2ea022";
async function fetchRecipes() {
  const ingredients = document.getElementById("ingredientsInput").value;
  
  if (!ingredients) {
    alert("Please enter some ingredients!");
    return;
  }
  
  const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredients}&number=5&apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const recipes = await response.json();
    displayRecipes(recipes);
  } catch (error) {
    console.error("Error fetching recipes:", error);
    alert("Failed to fetch recipes. Please try again later.");
  }
}

function displayRecipes(recipes) {
  const recipesContainer = document.getElementById("recipes");
  recipesContainer.innerHTML = "";  // Clear previous results

  if (recipes.length === 0) {
    recipesContainer.innerHTML = "<p>No recipes found. Try different ingredients!</p>";
    return;
  }

  recipes.forEach(recipe => {
    const recipeCard = document.createElement("div");
    recipeCard.className = "recipe-card";

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p><strong>Ingredients used:</strong> ${recipe.usedIngredientCount}</p>
      <p><strong>Ingredients missing:</strong> ${recipe.missedIngredientCount}</p>
    `;

    recipesContainer.appendChild(recipeCard);
  });
}
