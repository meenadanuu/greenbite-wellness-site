var container = document.getElementById("recipesContainer");                                // Container for recipe cards
var searchInput = document.getElementById("searchInput");                                   // Search input box
var categoryFilter = document.getElementById("categoryFilter");                             // Category dropdown


// modal elements
var modal = document.getElementById("recipeModal");                                         // Modal overlay
var modalContent = document.getElementById("modalContent");                                 // Content inside modal
var closeModal = document.getElementById("closeModal");                                     // Close button

var recipes = [];                                                               // will store JSON recipes as an array

// fallback recipes (same as your recipes.json)
const fallbackRecipes = [
  {
    "name": "Avocado Toast",
    "category": "Breakfast",
    "description": "Healthy toast topped with fresh avocado",
    "image": "avocadotoast.jpeg",
    "ingredients": ["1 slice bread", "1/2 avocado", "Salt", "Pepper", "Lemon juice"],
    "steps": ["Toast the bread", "Mash avocado with salt, pepper, lemon", "Spread on toast", "Serve immediately"],
    "nutrition": {"Calories":"200 kcal","Protein":"5 g","Fat":"12 g","Carbs":"20 g"}
  },
  {
    "name": "Oatmeal",
    "category": "Breakfast",
    "description": "Warm oatmeal with fruits and nuts",
    "image": "oatmeal.jpeg",
    "ingredients": ["1 cup oats","2 cups milk or water","Fruits","Nuts","Honey"],
    "steps": ["Cook oats in milk or water", "Add fruits and nuts", "Drizzle honey", "Serve warm"],
    "nutrition": {"Calories":"150 kcal","Protein":"5 g","Fat":"3 g","Carbs":"27 g"}
  },
  {
    "name": "Quinoa Salad",
    "category": "Lunch",
    "description": "Nutritious salad with quinoa and vegetables",
    "image": "quinoasalad.jpeg",
    "ingredients": ["1 cup cooked quinoa","Tomatoes","Cucumber","Olive oil","Lemon juice"],
    "steps": ["Mix all veggies with quinoa", "Add olive oil and lemon juice", "Toss well", "Serve fresh"],
    "nutrition": {"Calories":"220 kcal","Protein":"6 g","Fat":"8 g","Carbs":"30 g"}
  },
  {
    "name": "Veggie Wrap",
    "category": "Lunch",
    "description": "Fresh veggies wrapped in a tortilla",
    "image": "veggiewrap.jpeg",
    "ingredients": ["Tortilla","Lettuce","Carrot","Cucumber","Hummus"],
    "steps": ["Spread hummus on tortilla", "Add veggies", "Roll tightly", "Cut and serve"],
    "nutrition": {"Calories":"250 kcal","Protein":"7 g","Fat":"10 g","Carbs":"32 g"}
  },
  {
    "name": "Baked Salmon",
    "category": "Dinner",
    "description": "Tender salmon baked with herbs",
    "image": "bakedsalmon.jpeg",
    "ingredients": ["Salmon fillet","Olive oil","Salt","Pepper","Lemon"],
    "steps": ["Preheat oven to 180°C","Place salmon on tray","Drizzle oil and seasoning","Bake 15-20 min","Serve hot"],
    "nutrition": {"Calories":"300 kcal","Protein":"25 g","Fat":"20 g","Carbs":"0 g"}
  },
  {
    "name": "Grilled Chicken",
    "category": "Dinner",
    "description": "Juicy grilled chicken with spices",
    "image": "grilledchicken.jpeg",
    "ingredients": ["Chicken breast","Olive oil","Spices","Salt","Pepper"],
    "steps": ["Marinate chicken","Preheat grill","Grill chicken until cooked","Serve with salad"],
    "nutrition": {"Calories":"280 kcal","Protein":"30 g","Fat":"15 g","Carbs":"0 g"}
  },
  {
    "name": "Fruit Smoothie",
    "category": "Snack",
    "description": "Sweet and healthy smoothie",
    "image": "fruitsmoothie.jpeg",
    "ingredients": ["Mixed fruits","Yogurt","Honey","Ice cubes"],
    "steps": ["Add fruits, yogurt, honey, ice to blender","Blend until smooth","Pour into glass","Serve chilled"],
    "nutrition": {"Calories":"180 kcal","Protein":"4 g","Fat":"2 g","Carbs":"36 g"}
  },
  {
    "name": "Yogurt Parfait",
    "category": "Snack",
    "description": "Layers of yogurt, granola and fruits",
    "image": "yogurtparfait.jpeg",
    "ingredients": ["Yogurt","Granola","Fruits","Honey"],
    "steps": ["Layer yogurt, granola and fruits in a glass","Drizzle honey","Serve immediately"],
    "nutrition": {"Calories":"200 kcal","Protein":"6 g","Fat":"5 g","Carbs":"30 g"}
  }
];

// load recipes JSON
fetch("js/json/recipes.json")
.then(function(response){ 
    return response.json(); })                                                  // Parse JSON response
.then(function(data){
    recipes = data;                                                             // Store recipes in array
    showRecipes(recipes);                                                       // Display all recipes initially
})

.catch(function(error){ 
    console.log("Error loading recipes:", error); });                           // Handle errors


// show recipes as cards
function showRecipes(list){
    container.innerHTML = "";                                                   // clear previous

    for(var i=0; i<list.length; i++){
        var recipe = list[i];
        var card = document.createElement("div");
        card.className = "card";


        // image path added here
        card.innerHTML =
            '<img src="images/' + recipe.image + '" alt="' + recipe.name + '"><br>' +
            '<div style="text-align:center;">' +
            '<strong>' + recipe.name + '</strong><br>' +
        recipe.description + '<br>' +
        'Category: <em>' + recipe.category + '</em>' +
        '</div>';


        // click card to open modal
        card.onclick = (function(r){
            return function(){ showModal(r); }
        })(recipe);

        container.appendChild(card);                                                        // Add card to container
    }
}

// filter recipes
function filterRecipes(){
    var searchValue = searchInput.value.toLowerCase();                                      // Convert input to lowercase
    var categoryValue = categoryFilter.value;                                               // Selected category
    var filtered = [];

    for(var i=0; i<recipes.length; i++){
        var nameMatch = recipes[i].name.toLowerCase().includes(searchValue);                            // Name contains input
        var categoryMatch = categoryValue === "All" || recipes[i].category === categoryValue;           // Match category
        if(nameMatch && categoryMatch) filtered.push(recipes[i]);
    }

    showRecipes(filtered);                                                                  // Display filtered recipes
}


// trigger filtering on input or category change
searchInput.oninput = filterRecipes;
categoryFilter.onchange = filterRecipes;


// show modal with recipe details
function showModal(recipe){
    var html = '<h2>' + recipe.name + '</h2>';

    // ingredients list
    html += '<h3>Ingredients:</h3><ul>';
    recipe.ingredients.forEach(function(item){ html += '<li>'+item+'</li>'; });
    html += '</ul>';

    // steps list
    html += '<h3>Steps:</h3><ol>';
    recipe.steps.forEach(function(step){ html += '<li>'+step+'</li>'; });
    html += '</ol>';

    // nutrition info table
    html += '<h3>Nutrition Info:</h3><table border="1" style="width:100%; border-collapse:collapse;">' +
            '<tr><th>Nutrient</th><th>Amount</th></tr>';
    for(var key in recipe.nutrition){
        html += '<tr><td>' + key + '</td><td>' + recipe.nutrition[key] + '</td></tr>';
    }
    html += '</table>';

    modalContent.innerHTML = html;                                                              // Insert HTML into modal
    modal.style.display = "flex";                                                               // Show modal
}

// close modal
closeModal.onclick = function(){ modal.style.display = "none"; }                                // Close on clicking X
window.onclick = function(event){
    if(event.target == modal) modal.style.display = "none";                                     // Close when clicking outside modal
}
