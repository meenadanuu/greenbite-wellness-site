var container = document.getElementById("recipesContainer");                                // Container for recipe cards
var searchInput = document.getElementById("searchInput");                                   // Search input box
var categoryFilter = document.getElementById("categoryFilter");                             // Category dropdown


// modal elements
var modal = document.getElementById("recipeModal");                                         // Modal overlay
var modalContent = document.getElementById("modalContent");                                 // Content inside modal
var closeModal = document.getElementById("closeModal");                                     // Close button

var recipes = [];                                                               // will store JSON recipes as an array


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
