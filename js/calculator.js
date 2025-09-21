function calculate() {

    // get user input from form
    var age = parseFloat(document.getElementById("age").value);
    var gender = document.getElementById("gender").value;
    var height = parseFloat(document.getElementById("height").value);
    var weight = parseFloat(document.getElementById("weight").value);
    var activity = parseFloat(document.getElementById("activity").value);


    // calculator BMR
    var bmr;
    if (gender === "Male") {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }


    // calculate TDEE
    var tdee = bmr * activity;                                      // Adjust BMR based on activity level


    // calculate macronutrient needs 
    var carbs = Math.round((tdee * 0.5) / 4);
    var protein = Math.round((tdee * 0.2) / 4);
    var fat = Math.round((tdee * 0.3) / 9);


    // display results
    document.getElementById("bmrResult").textContent = "BMR: " + Math.round(bmr) + " kcal/day";
    document.getElementById("tdeeResult").textContent = "TDEE: " + Math.round(tdee) + " kcal/day";


    // insert calculated macros
    document.getElementById("carbs").textContent = carbs;
    document.getElementById("protein").textContent = protein;
    document.getElementById("fat").textContent = fat;


    // animate progress bars
    document.getElementById("carbsBar").style.width = Math.min((carbs/300)*100, 100) + "%";
    document.getElementById("proteinBar").style.width = Math.min((protein/150)*100, 100) + "%";
    document.getElementById("fatBar").style.width = Math.min((fat/80)*100, 100) + "%";

    
    // show results section
    document.getElementById("results").style.display = "block";
}
