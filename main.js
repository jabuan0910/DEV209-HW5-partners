let RecipeArray = [];

// Define the RecipeObject constructor
let RecipeObject = function (pName, pCuisine, pDifficulty) {
    this.ID = RecipeArray.length +1;
    this.name = pName;
    this.cuisine = pCuisine;
    this.difficulty = pDifficulty;
};

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
        li.innerHTML = `${element.ID}: ${element.difficulty}: ${element.cuisine} - ${element.name}`;
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

        // Push new recipe object to array
        RecipeArray.push(new RecipeObject(nameInput, selectedCuisine, selectedDifficulty));

        // Clear input fields
        document.getElementById("dataInput").value = "";

        // Re-create the list to include the new recipe
        createList();
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
        let pID = localStorage.getItem('parm');  // get the unique key back from the storage dictionairy
        document.getElementById("theID").innerHTML = pID;
    });
});