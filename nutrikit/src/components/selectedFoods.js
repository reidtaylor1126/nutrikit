import React from 'react';
import { Col } from 'reactstrap';
import FoodList from './foodList';

class SelectedFoods extends React.Component {
    render() {
        return(
            <Col 
                className={this.props.className + ' mb-4'}
                sm={4}
            >
                <FoodList 
                    sm={12}
                    title={"Selected Items"}
                    onSelect={this.props.onSelect}
                    foods={this.props.foods}
                    listModeAdd={this.props.listModeAdd}
                />
                <p>
                    Total Calories: {this.props.calories}/{this.props.maxCalories}
                </p>
            </Col>
        )
    }
}

export default SelectedFoods;