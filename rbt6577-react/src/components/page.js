import React from 'react';
import Categories from './categories.js';
import FoodList from './foodList.js';
import FoodButton from './foodButton.js';
import SelectedFoods from './selectedFoods.js';

import {categories, menuItems, dailyValue, defaultGoals, api_address} from '../data.js';
import { Container, Row, Col, Button } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SettingsModal from './settingsModal.js';
import NutritionSummary from './nutritionSummary.js';
import NutritionLabel from './nutritionLabel.js';
import FoodMenu from './foodMenu.js';
import FoodModal from './foodModal.js'

class Page extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            connected: true,
            categories: [],
            selectedCategory: '',
            selectedFoodIndex: -1,
            selectedFoods: [],
            maxCalories: 2000,
            totalCalories: 0,
            listModeAdd: true,
            showSettings: false,
            nutritionGoals: JSON.parse(JSON.stringify(defaultGoals)),
            foodDataTemp: {
                'id': -1,
                'name': '',
                'category': 'Proteins',
                'calories': 0,
                'totalfat': 0,
                'saturatedfat': 0,
                'transfat': 0,
                'protein': 0,
                'carbohydrate': 0
            },
            showFoodEdit: false,
            foodEditMode: '',
            foodEditAction: this.addFood,
            foodEditMessage: ''
        }
    }

    componentDidMount = () => {
        fetch(`${api_address}categories`, {
            method: 'get', 
        }).then(
            (res) => {
                if(res.ok) {
                    res.json().then((data) => {
                        this.setState({categories: data})
                    })
                } else {
                    this.state.connected = false
                }
            }
        )
    }

    selectCategory = (category) => {
        console.log(category);
        fetch(`${api_address}foods/${category}`, {
            method: 'get',
        }).then(
            (res) => {
                res.json().then((data) => {
                    this.setState({selectedCategory: category, foodMenu: data, selectedFoodIndex: 0});
                })
            }
        )
    }

    setNutritionGoal = (nutrient, value) => {
        console.log(`Setting ${nutrient} goal to ${value}`)
        let goalsCopy = JSON.parse(JSON.stringify(this.state.nutritionGoals));
        goalsCopy[nutrient] = value;
        this.setState({nutritionGoals: goalsCopy});
    }

    resetNutritionGoal = (nutrient) => {
        const value = defaultGoals[nutrient]
        this.setNutritionGoal(nutrient, value)
    }

    openNewFood = () => {
        console.log('opening food creation modal')
        this.setState({
            showFoodEdit: true,
            foodEditMode: 'New',
            foodEditAction: this.newFood,
            foodEditMessage: ''
        })
    }

    newFood = () => {
        const data = this.state.foodDataTemp;
        //this.state.foodMenu.push(data);
        this.setState();
        fetch(`${api_address}foods`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.ok) {
                this.successCloseFoodEditor()
            } else {
                this.foodEditorFailure()
            }
        })
    }

    openEditFood = () => {
        console.log('opening food edit modal')
        this.setState({
            foodEditMode: 'Edit',
            foodEditAction: this.editFood,
            showFoodEdit: true,
            foodEditMessage: ''
        })
    }

    editFood = () => {
        const data = this.state.foodDataTemp;
        this.state.foodMenu[this.state.selectedFoodIndex] = data;
        this.setState();

        fetch(`${api_address}foods?id=${data.id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }).then((res) => {
            if(res.ok) {
                this.successCloseFoodEditor()
            } else {
                this.foodEditorFailure()
            }
        })
    }

    successCloseFoodEditor = () => {
        this.setState({
            foodDataTemp: {
                'id': -1,
                'name': '',
                'category': 'Proteins',
                'calories': 0,
                'totalfat': 0,
                'saturatedfat': 0,
                'transfat': 0,
                'protein': 0,
                'carbohydrate': 0
            },
            foodEditMessage: 'Updated foods'
        })
        setTimeout(() => {this.setState({showFoodEdit: false})}, 500)
    }

    foodEditorFailure = () => {
        this.setState({foodEditMessage: 'Failed to update foods'});
    }

    toggleFoodEditor = () => {
        this.setState({
            showFoodEdit: !this.state.showFoodEdit
        })
    }

    deleteFood = () => {
        if(this.state.selectedFoodIndex >= 0) {
            const food = this.state.foodMenu[this.state.selectedFoodIndex];
            console.log(food);
            fetch(`${api_address}foods?id=${food.id}`, {
                method: 'delete'
            })
            this.state.foodMenu.splice(this.state.selectedFoodIndex, 1);
            this.setState({selectedFoodIndex: 0});
        }
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
        return sum;
    }

    getScaledNutrient = (nutrient) => {
        return dailyValue[nutrient] * this.state.maxCalories / 2000;
    }

    addFood = () => {
        let food = this.state.foodMenu[this.state.selectedFoodIndex];
        if(food != null) {
            console.log(food)
            const oldFoods = this.state.selectedFoods;
            this.setState({
                selectedFoods: [...oldFoods, food],
                totalCalories: this.state.totalCalories + food.calories, 
            });
        }
    }

    modifyTempFood = (key, value) => {
        console.log(key)
        console.log(value)
        let foodDataCopy = JSON.parse(JSON.stringify(this.state.foodDataTemp)) // create deep copy
        console.log(foodDataCopy[key])
        foodDataCopy[key] = value;
        this.setState({foodDataTemp: foodDataCopy});
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
        console.log(this.state.foodMenu[index])
        this.setState({
            selectedFoodIndex: index,
            listModeAdd: listModeAdd,
            foodDataTemp: this.state.foodMenu[index]
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
                "id": -1,
                "name": "No Food Selected",
                "calories": 0,
                "totalfat": 0,
                "saturatedfat": 0,
                "transfat": 0,
                "protein": 0,
                "carbohydrate": 0
            })
        } else {
            const data = this.state.foodMenu[this.state.selectedFoodIndex];
            console.log(data);
            return data;
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
                        categories={this.state.categories} 
                        onSelect={this.selectCategory} 
                        category={this.state.selectedCategory}
                    />
                    <FoodMenu 
                        sm={4}
                        title={this.state.selectedCategory + " Menu"}
                        className='control-section px-4 py-2'
                        onSelect={this.selectFood}
                        foods={this.state.foodMenu || []}
                        listModeAdd={true}
                        onClickNew={this.openNewFood}
                        onClickEdit={this.openEditFood}
                        onClickDel={this.deleteFood}
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
                        maxCalories={this.state.nutritionGoals['calories']}
                        fat={this.sumNutrient('totalfat') || 0}
                        maxFat={this.state.nutritionGoals['totalfat']}
                        satFat={this.sumNutrient('saturatedfat') || 0}
                        maxSatFat={this.state.nutritionGoals['saturatedfat']}
                        protein={this.sumNutrient('protein') || 0}
                        maxProtein={this.state.nutritionGoals['protein']}
                        carbs={this.sumNutrient('carbohydrate') || 0}
                        maxCarbs={this.state.nutritionGoals['carbohydrate']}
                    ></NutritionSummary>
                </Row>
                <SettingsModal 
                    isOpen={this.state.showSettings}
                    toggle={this.toggleSettings}
                    onChange={this.setNutritionGoal}
                    onReset ={this.resetNutritionGoal}
                    calories={this.state.nutritionGoals['calories']}
                    totalfat={this.state.nutritionGoals['totalfat']}
                    satfat={this.state.nutritionGoals['saturatedfat']}
                    protein={this.state.nutritionGoals['protein']}
                    carbohydrate={this.state.nutritionGoals['carbohydrate']}
                />
                <FoodModal 
                    isOpen={this.state.showFoodEdit}
                    toggle={this.toggleFoodEditor}
                    modeLabel={this.state.foodEditMode}
                    categories={this.state.categories}
                    foodId={this.state.foodDataTemp.id}
                    foodName={this.state.foodDataTemp.name}
                    category={this.state.foodDataTemp.category}
                    calories={this.state.foodDataTemp.calories}
                    totalFat={this.state.foodDataTemp.totalfat}
                    saturatedFat={this.state.foodDataTemp.saturatedfat}
                    transFat={this.state.foodDataTemp.transfat}
                    protein={this.state.foodDataTemp.protein}
                    carbs={this.state.foodDataTemp.carbohydrate}
                    onConfirm={this.state.foodEditAction}
                    modify={this.modifyTempFood}
                    message={this.state.foodEditMessage}
                />
            </Container>
        )
    }
}

export default Page;