const apiKey = "00f2b61966f44c26a32552682a2ea022";  // Replace with your Spoonacular API key

// Initialize modal and close button
const modal = document.getElementById("recipeModal");
const closeButton = document.querySelector(".close-button");

// Function to fetch recipes based on ingredients
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

// Function to display fetched recipes
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

    // Attach click event to each recipe card
    recipeCard.onclick = () => fetchRecipeDetails(recipe.id, recipe.title);

    recipeCard.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}">
      <h3>${recipe.title}</h3>
      <p><strong>Ingredients used:</strong> ${recipe.usedIngredientCount}</p>
      <p><strong>Ingredients missing:</strong> ${recipe.missedIngredientCount}</p>
    `;

    recipesContainer.appendChild(recipeCard);
  });
}

// Function to fetch and display recipe details in the modal
async function fetchRecipeDetails(recipeId, recipeTitle) {
  const apiUrl = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const instructions = await response.json();

    // Display instructions in the modal
    const instructionList = instructions.length > 0 ? instructions[0].steps : [];
    let instructionText = `<ol>`;
    
    instructionList.forEach(step => {
      instructionText += `<li>${step.step}</li>`;
    });
    
    instructionText += `</ol>`;

    // Set modal content
    document.getElementById("modalRecipeTitle").innerText = recipeTitle;
    document.getElementById("modalInstructions").innerHTML = instructionText;

    // Display the modal
    modal.style.display = "block";
  } catch (error) {
    console.error("Error fetching recipe details:", error);
    alert("Failed to fetch recipe details. Please try again later.");
  }
}

// Close modal when user clicks on <span> (x)
closeButton.onclick = function() {
  modal.style.display = "none";
}

// Close modal when user clicks anywhere outside of the modal
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
