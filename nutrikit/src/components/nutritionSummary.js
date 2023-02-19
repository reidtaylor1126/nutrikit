import React from 'react';
import { Col } from 'reactstrap';
import LabeledColorProgress from './labeledColorProgress';

class NutritionSummary extends React.Component {
    render() {
        return (
            <Col xs={12} md={6} className="mx-3">
                <LabeledColorProgress 
                    label={"Total Calories:"} 
                    value={this.props.calories}
                    max={this.props.maxCalories}
                ></LabeledColorProgress>
                <LabeledColorProgress 
                    label={"Total Fat:"} 
                    value={this.props.fat}
                    max={this.props.maxFat}
                    units={"mg"}
                ></LabeledColorProgress>
                <LabeledColorProgress 
                    label={"Saturated Fat:"} 
                    value={this.props.satFat}
                    max={this.props.maxSatFat}
                    units={"mg"}
                ></LabeledColorProgress>
                <LabeledColorProgress 
                    label={"Protein:"} 
                    value={this.props.protein}
                    max={this.props.maxProtein}
                    units={"mg"}
                ></LabeledColorProgress>
                <LabeledColorProgress 
                    label={"Carbs:"} 
                    value={this.props.carbs}
                    max={this.props.maxCarbs}
                    units={"mg"}
                ></LabeledColorProgress>
            </Col>
        )
    }
}

export default NutritionSummary