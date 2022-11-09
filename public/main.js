const categories = ["Proteins", "Fruits", "Vegetables", "Dairy", "Grains"]
const menuItems = {
    "Proteins": [
        {"name": "steak", "calories": 300},
        {"name": "ground beef", "calories": 200},
        {"name": "chicken", "calories": 100},
        {"name": "fish", "calories": 80},
        {"name": "soy", "calories": 50}
    ],
    "Fruits": [
        {"name": "orange", "calories": 300},
        {"name": "banana", "calories": 200},
        {"name": "pineapple", "calories": 100},
        {"name": "grapes", "calories": 80},
        {"name": "blueberries", "calories": 50}
    ],
    "Vegetables": [
        {"name": "romaine", "calories": 30},
        {"name": "green beans", "calories": 40},
        {"name": "squash", "calories": 100},
        {"name": "spinach", "calories": 50},
        {"name": "kale", "calories": 10}
    ],
    "Dairy": [
        {"name": "milk", "calories": 300},
        {"name": "yoghurt", "calories": 200},
        {"name": "cheddar cheese", "calories": 200},
        {"name": "skim milk", "calories": 100},
        {"name": "cottage cheese", "calories": 80}
    ],
    "Grains": [
        {"name": "bread", "calories": 200},
        {"name": "bagel", "calories": 300},
        {"name": "pita", "calories": 250},
        {"name": "naan", "calories": 210},
        {"name": "tortilla", "calories": 120}
    ]
}

let selectedCategory = '';
let selectedFoods = [];

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
        console.log("Category '" + category + "' does not exist");
    } else {
        selectedCategory = category;
        let foodList = document.getElementById("food-list");
        while(foodList.firstChild) {
            foodList.removeChild(foodList.lastChild);
        }

        menuItems[category].map((food) => {
            let listItem = createFoodListItem(food);
            foodList.appendChild(listItem);
        });
    }
}

createFoodListItem = (food) => {
    let listItem = document.createElement("option");
    listItem.id = "item-" + food.name;
    listItem.value = food.name;
    listItem.text = food.name;
    listItem.onclick = showAddButton()

    return listItem
}

showAddButton = () => {
    document.getElementById("addButton").style = "display: flex;"
    document.getElementById("removeButton").style = "display: none;"
}
showRemoveButton = () => {
    document.getElementById("addButton").style = "display: none;"
    document.getElementById("removeButton").style = "display: flex;"
}

function updateCalories() {
    const calorieCount = document.getElementById("calories");

    totalCalories = 0;
    selectedFoods.map((food) => {
        totalCalories = totalCalories + food.calories;
    });

    calorieCount.innerText = "Total Calories: " + totalCalories;
}

addFood = () => {
    let menuList = document.getElementById("food-list");
    let selectedList = document.getElementById("selected-list");

    if(menuList.selectedIndex > -1) {

        let selectedFoodElement = menuList.childNodes[menuList.selectedIndex];
        let menuListItems = menuItems[selectedCategory];

        let selectedFood = menuListItems[menuList.selectedIndex];

        selectedFoods.push(selectedFood);
        //menuListItems.splice(menuListItems.indexOf(selectedFood), 1);

        //menuList.removeChild(selectedFoodElement);
        let newFoodElement = createFoodListItem(selectedFood)
        newFoodElement.onclick = showRemoveButton()
        selectedList.appendChild(newFoodElement);

        updateCalories();
    }

    console.log("menuItems", menuItems[selectedCategory])
    console.log("selectedFoods", selectedFoods)
}

removeFood = () => {
    let selectedList = document.getElementById("selected-list");

    if(selectedList.selectedIndex > -1) {

        let selectedFoodElement = selectedList.childNodes[selectedList.selectedIndex];

        let selectedFood = menuItems[selectedCategory][selectedList.selectedIndex];

        selectedFoods.splice(selectedFoods.indexOf(selectedFood), 1);

        //selectedList.removeChild(selectedFoodElement);
        // selectedFoodElement.onclick = showAddButton()
        // menuList.appendChild(selectedFoodElement);

        selectedList.removeChild(selectedFoodElement)
        selectedFoodElement.remove()

        updateCalories();
    }

    console.log("menuItems", menuItems[selectedCategory])
    console.log("selectedFoods", selectedFoods)
}