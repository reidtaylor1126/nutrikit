import React from 'react';
import ReactDOM from 'react-dom/client'
import Categories from './categories.js';
import FoodList from './foodList.js';
import FoodButton from './foodButton.js';
import SelectedFoods from './selectedFoods.js';
import './styles.css'

import {categories, menuItems} from '../data.js'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: '',
            selectedFoodIndex: -1,
            selectedFoods: [],
            totalCalories: 0,
            listModeAdd: true
        }
    }

    selectCategory = (category) => {
        console.log(category);
        this.setState({selectedCategory: category});
    }

    addFood = () => {
        let food = menuItems[this.state.selectedCategory][this.state.selectedFoodIndex];
        this.state.selectedFoods.push(food);
        this.setState({totalCalories: this.state.totalCalories + food.calories});
    }

    removeFood = () => {
        let food = this.state.selectedFoods[this.state.selectedFoodIndex];
        this.state.selectedFoods.splice(this.state.selectedFoodIndex, 1);
        this.setState({totalCalories: this.state.totalCalories - food.calories});
    }

    selectFood = (index, listModeAdd) => {
        this.setState({
            selectedFoodIndex: index,
            listModeAdd: listModeAdd
        })
    }

    render() {

        return (
            <div className='controls'>
                <Categories 
                    className='control-section'
                    categories={categories} 
                    onSelect={this.selectCategory} 
                    category={this.state.selectedCategory}
                />
                <FoodList 
                    className='control-section'
                    title={'Menu Items'}
                    onSelect={this.selectFood}
                    foods={menuItems[this.state.selectedCategory] || []}
                    listModeAdd={true}
                />
                <div className='control-section'>
                    <span className="section-title-space"></span>
                    <FoodButton 
                        label={'>>'}
                        onClick={this.addFood}
                        visible={this.state.listModeAdd}
                    />
                    <FoodButton 
                        label={'<<'}
                        onClick={this.removeFood}
                        visible={!this.state.listModeAdd}
                    />
                </div>
                <SelectedFoods 
                    className='control-section'
                    title={'Selected Foods'}
                    onSelect={this.selectFood}
                    foods={this.state.selectedFoods}
                    listModeAdd={false}
                    calories={this.state.totalCalories}
                />
            </div>
        )
    }
}

export default Page;