import React from 'react';
import ReactDOM from 'react-dom/client'
import Categories from './components/categories';

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

class Page extends React.Component {
    constructor(props) {
        this.state = {
            selectedCategory: '',
            selectedFoods: [],
            totalCalories: 0
        }
    }

    selectCategory = (category) => {
        this.setState({selectedCategory: category})
    }

    addFood = (food) => {
        this.state.selectedFoods.push(food);
        this.setState({totalCalories: this.state.totalCalories + food.calories});
    }

    removeFood = (index) => {
        this.state.selectedFoods.
        this.setState({totalCalories: this.state.totalCalories + food.calories});
    }

    render() {

        return (
            <div>
                <Categories categories={categories} />
            </div>
        )
    }
}