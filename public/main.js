const categories = ["Proteins", "Fruits", "Vegetables", "Dairy", "Grains"]
const menuItems = {
    "Proteins": [
        "steak",
        "ground beef",
        "chicken",
        "fish",
        "soy"
    ],
    "Fruits": [
        "orange",
        "banana",
        "pineapple",
        "grapes",
        "blueberries"
    ],
    "Vegetables": [
        "romaine",
        "green beans",
        "squash",
        "spinach",
        "kale"
    ],
    "Dairy": [
        "milk",
        "yoghurt",
        "cheddar cheese",
        "skim milk",
        "cottage cheese"
    ],
    "Grains": [
        "bread",
        "bagel",
        "pita",
        "naan",
        "tortilla"
    ]
}


populateCategories = () => {
    let categoryList = document.getElementById("category-list");

    categories.map((category) => {
        let listItem = document.createElement("option");
        listItem.value = category;
        listItem.text = category;
        categoryList.appendChild(listItem);
    });
}

selectCategory = (category) => {
    if(! (category in menuItems)) {
        console.log("Category '" + category + "' does not exist")
    } else {
        let foodList = document.getElementById("food-list");
        while(foodList.firstChild) {
            foodList.removeChild(foodList.lastChild)
        }

        menuItems[category].map((food) => {
            let listItem = document.createElement("option");
            listItem.id = food;
            listItem.value = food;
            listItem.text = food;
            foodList.appendChild(listItem);
        });
    }
}

addFood()