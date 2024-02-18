let RecipeArray = [];

// Define the RecipeObject constructor
let RecipeObject = function (pName, pCuisine, pDifficulty, pURL) {
    this.ID = RecipeArray.length +1;
    this.name = pName;
    this.cuisine = pCuisine;
    this.difficulty = pDifficulty;
    this.URL = pURL
};

// load some starters

RecipeArray.push(new RecipeObject("Chicken & Spinach Skillet Pasta", "American", "Medium", "https://www.eatingwell.com/recipe/267768/chicken-spinach-skillet-pasta-with-lemon-parmesan/"));
RecipeArray.push(new RecipeObject("Spaghetti & Spinach with Sun-Dried Tomato", "Italian", "Easy", "https://www.eatingwell.com/recipe/7919563/spaghetti-spinach-with-sun-dried-tomato-cream-sauce/"));
RecipeArray.push(new RecipeObject("One-Pot Garlicky Shrimp & Broccoli ", "Chinese", "Medium", "https://www.eatingwell.com/recipe/7919492/one-pot-garlicky-shrimp-broccoli/"));
// Default selected cuisine and difficulty
let selectedCuisine = "Italian";
let selectedDifficulty = "Medium";

// Function to create the list of recipes
function createList() {
    var myul = document.getElementById("myul");
    if (!myul) {
        console.error('The "myul" element was not found.');
        return;
    }
    
    myul.innerHTML = ""; // Clear existing list items

    // Create new list items for each recipe in the array
    RecipeArray.forEach(function (element) {
        var li = document.createElement('li');
        li.innerHTML = `${element.ID}: ${element.difficulty}: ${element.cuisine} - ${element.name} - ${element.URL}`;
        myul.appendChild(li);
    });

    // Refresh listview if using jQuery Mobile and the listview has been initialized
    if ($("#myul").hasClass('ui-listview')) {
        $("#myul").listview('refresh');
    }
}

// DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
    // Initial list creation
    createList();

    // Add recipe button event listener
    document.getElementById("buttonAdd").addEventListener("click", function () {
        let nameInput = document.getElementById("dataInput").value;
        let URLinput = document.getElementById("URLinput").value;

        // Push new recipe object to array
        let recipe = new RecipeObject(nameInput, selectedCuisine, selectedDifficulty, URLinput);
        RecipeArray.push(recipe);

        // Clear input fields
        document.getElementById("dataInput").value = "";

        // Re-create the list to include the new recipe
        createList();


        localStorage.setItem("data", JSON.stringify(RecipeArray));
        localStorage.setItem('latest-recipe-id', recipe.ID);

        window.location.href = "#details"
    });

    // Dropdown selection event handling for cuisine
    document.getElementById("select-cuisine").addEventListener("change", function () {
        selectedCuisine = this.value;
    });

    // Dropdown selection event handling for difficulty
    document.getElementById("select-difficulty").addEventListener("change", function () {
        selectedDifficulty = this.value;
    });

     // need one for our details page to fill in the info based on the passed in ID
     $(document).on("pagebeforeshow", "#details", function (event) {   
        let pID = localStorage.getItem('latest-recipe-id');  // get the unique key back from the storage dictionairy
        if (pID === undefined || pID === null) {
            return;
        }
        let data = RecipeArray[parseInt(pID) - 1];
        if (data === undefined || data === null) {
            return;
        } 
        document.getElementById("theID").innerHTML = "ID: " + pID;
        document.getElementById("name").innerHTML = "Name: " + data.name;
    });
});