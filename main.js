let RecipeArray = [];

// Define the RecipeObject constructor
let RecipeObject = function (pName, pCuisine, pDifficulty, pURL) {
    this.ID = RecipeArray.length + 1;
    this.name = pName;
    this.cuisine = pCuisine;
    this.difficulty = pDifficulty;
    this.URL = pURL;
};

// Preload some recipes
RecipeArray.push(new RecipeObject("Chicken & Spinach Skillet Pasta", "American", "Medium", "https://www.eatingwell.com/recipe/267768/chicken-spinach-skillet-pasta-with-lemon-parmesan/"));
RecipeArray.push(new RecipeObject("Spaghetti & Spinach with Sun-Dried Tomato", "Italian", "Easy", "https://www.eatingwell.com/recipe/7919563/spaghetti-spinach-with-sun-dried-tomato-cream-sauce/"));
RecipeArray.push(new RecipeObject("One-Pot Garlicky Shrimp & Broccoli ", "Chinese", "Medium", "https://www.eatingwell.com/recipe/7919492/one-pot-garlicky-shrimp-broccoli/"));

// Default selected cuisine and difficulty
let selectedCuisine = "Italian";
let selectedDifficulty = "Medium";

// Function to create the list of recipes
function createList() {
    let myul = document.getElementById("myul");
    if (!myul) {
        console.error('the "myul" element was not found.');
        return;
    }

    myul.innerHTML = ""; // Clear existing list items

    // Create new list items for each recipe in the array
    RecipeArray.forEach(function (element, index) {
        let li = document.createElement('li');
        li.innerHTML = `<a href="#details" onclick="showDetails(${index})">${element.name}</a>`;
        myul.appendChild(li);
    });

    // Refresh listview if using jQuery Mobile and the listview has been initialized
    if ($("#myul").hasClass('ui-listview')) {
        $("#myul").listview('refresh');
    }
}

function showDetails(index) {
    let data = RecipeArray[index];
    localStorage.setItem('latest-recipe-id', data.ID.toString());
    document.getElementById("theID").innerHTML = "ID: " + data.ID;
    document.getElementById("theName").innerHTML = "Name: " +data.name;
    document.getElementById("theCuisine").innerHTML = "Cuisine: " + data.cuisine;
    document.getElementById("theDifficulty").innerHTML = "Difficulty: " + data.difficulty
    document.getElementById("theURL").innerHTML = "Click for instructions: <a href='" + data.URL + "' target='_blank'>" + data.URL + "</a>";
    $.mobile.changePage("#details");
}

// DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
    
    // Attempt to load recipes from localStorage
    let storedRecipes = localStorage.getItem("recipes");
    if (storedRecipes) {
        RecipeArray = JSON.parse(storedRecipes); // Convert back to an array
    }
    
    createList(); // Populate the UI with loaded or default recipes
    
    // Add recipe button event listener
    document.getElementById("buttonAdd").addEventListener("click", function () {
        let nameInput = document.getElementById("dataInput").value;
        let URLinput = document.getElementById("URLinput").value;

        // Create new recipe object
        let recipe = new RecipeObject(nameInput, selectedCuisine, selectedDifficulty, URLinput);
        RecipeArray.push(recipe); // Add to array

        // Clear input fields for next use
        document.getElementById("dataInput").value = "";
        document.getElementById("URLinput").value = "";
        
        // Convert RecipeArray to a string and store in localStorage
        localStorage.setItem("recipes", JSON.stringify(RecipeArray));

        // Refresh the list and navigate to the home page
        createList();

        $.mobile.changePage("#show"); // Redirect back to the home page
    });

    // Dropdown selection event handling for cuisine
    document.getElementById("select-cuisine").addEventListener("change", function () {
        selectedCuisine = this.value;
    });

    // Dropdown selection event handling for difficulty
    document.getElementById("select-difficulty").addEventListener("change", function () {
        selectedDifficulty = this.value;
    });
});
