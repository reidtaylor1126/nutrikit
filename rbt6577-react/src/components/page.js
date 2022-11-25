import React from 'react';
import Categories from './categories.js';
import FoodList from './foodList.js';
import FoodButton from './foodButton.js';
import SelectedFoods from './selectedFoods.js';

import {categories, menuItems, dailyValue} from '../data.js';
import { Container, Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsModal from './settingsModal.js';
import NutritionSummary from './nutritionSummary.js';
import NutritionLabel from './nutritionLabel.js';

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedCategory: '',
            selectedFoodIndex: -1,
            selectedFoods: [],
            maxCalories: 2000,
            totalCalories: 0,
            listModeAdd: true,
            showSettings: false
        }
    }

    selectCategory = (category) => {
        console.log(category);
        this.setState({selectedCategory: category, selectedFoodIndex: 0});
    }

    changeMaxCalories = (maxCalories) => {
        this.setState({
            maxCalories: maxCalories
        })
    }

    sumNutrient = (nutrient) => {
        if(this.state.selectedFoods.length === 0)
            return 0
        let sum = 0;
        this.state.selectedFoods.map((food) => {
            sum += food[nutrient];
        })
        console.log(sum);
        return sum;
    }

    getScaledNutrient = (nutrient) => {
        return dailyValue[nutrient] * this.state.maxCalories / 2000;
    }

    addFood = () => {
        let food = menuItems[this.state.selectedCategory][this.state.selectedFoodIndex];
        if(food != null) {
            console.log(food)
            const oldFoods = this.state.selectedFoods;
            this.setState({
                selectedFoods: [...oldFoods, food],
                totalCalories: this.state.totalCalories + food.calories, 
            });
        }
    }

    removeFood = () => {
        let food = this.state.selectedFoods[this.state.selectedFoodIndex];
        if(food != null) {
            this.state.selectedFoods.splice(this.state.selectedFoodIndex, 1);
            this.setState({
                totalCalories: this.state.totalCalories - food.calories,
                selectedFoodIndex: 0
            });
        }
    }

    selectFood = (index, listModeAdd) => {
        console.log("selected index ", index)
        this.setState({
            selectedFoodIndex: index,
            listModeAdd: listModeAdd
        })
    }

    toggleSettings = () => {
        this.setState({
            showSettings: !this.state.showSettings
        })
    }

    hoveredFood = () => {
        if(this.state.selectedCategory === '' || this.state.selectedCategory === null) {
            return ({
                "calories": 0,
                "totalFat": 0,
                "saturatedFat": 0,
                "transFat": 0,
                "protein": 0,
                "carbohydrate": 0
            })
        } else {
            return menuItems[this.state.selectedCategory][this.state.selectedFoodIndex]
        }
    }

    render() {

        return (
            <Container 
                className='controls pt-2'
            >
                <Row className="headerbar mx-auto">
                    <Col xs={7} md={10}>
                        <h1>
                            NutriKit
                        </h1>
                    </Col>
                    <Col xs={4} md={1}>
                        <Button color="secondary" outline onClick={this.toggleSettings}>
                            Settings
                        </Button>
                    </Col>
                </Row>
                <Row className="controls">
                    <Categories 
                        className='control-section px-4 py-2'
                        categories={categories} 
                        onSelect={this.selectCategory} 
                        category={this.state.selectedCategory}
                    />
                    <FoodList 
                        sm={4}
                        title={this.state.selectedCategory + " Menu"}
                        className='control-section px-4 py-2'
                        onSelect={this.selectFood}
                        foods={menuItems[this.state.selectedCategory] || []}
                        listModeAdd={true}
                    />
                    <Col 
                        className='control-section px-4 py-2'
                        sm={1}
                    >
                        <Row xs="0" md="3">
                            <h3> {'\n'} </h3>
                        </Row>
                        <Row xs="3" md="1" className='center'>
                            <FoodButton 
                                label={'+'}
                                onClick={this.addFood}
                                visible={true}
                            />
                            <FoodButton 
                                label={'-'}
                                onClick={this.removeFood}
                                visible={true}
                            />
                        </Row>
                    </Col>
                    <SelectedFoods 
                        className='control-section px-4 py-2'
                        title={'Selected Foods'}
                        onSelect={this.selectFood}
                        foods={this.state.selectedFoods}
                        listModeAdd={false}
                        calories={this.state.totalCalories}
                        maxCalories={this.state.maxCalories}
                    />
                </Row>
                <Row>
                    <NutritionLabel
                        food={this.hoveredFood()}
                    ></NutritionLabel>
                    <NutritionSummary
                        calories={this.state.totalCalories}
                        maxCalories={this.state.maxCalories}
                        fat={this.sumNutrient('totalFat') || 0}
                        maxFat={this.getScaledNutrient('totalFat')}
                        satFat={this.sumNutrient('saturatedFat') || 0}
                        maxSatFat={this.getScaledNutrient('saturatedFat')}
                        protein={this.sumNutrient('protein') || 0}
                        maxProtein={this.getScaledNutrient('protein')}
                        carbs={this.sumNutrient('carbohydrate') || 0}
                        maxCarbs={this.getScaledNutrient('carbohydrate')}
                    ></NutritionSummary>
                </Row>
                <SettingsModal 
                    isOpen={this.state.showSettings}
                    toggle={this.toggleSettings}
                    maxCalories={this.state.maxCalories}
                    onChangeCalories={this.changeMaxCalories}
                ></SettingsModal>
            </Container>
        )
    }
}

export default Page;