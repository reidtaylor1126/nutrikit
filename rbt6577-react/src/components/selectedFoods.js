import React from 'react';
import ReactDOM from 'react-dom/client';
import { Col } from 'reactstrap';
import FoodList from './foodList';

class SelectedFoods extends React.Component {
    render() {
        return(
            <Col 
                className={this.props.className}
                sm={5}
            >
                <FoodList 
                    title={this.props.title}
                    onSelect={this.props.onSelect}
                    foods={this.props.foods}
                    listModeAdd={this.props.listModeAdd}
                />
                <p>
                    Total Calories: {this.props.calories}
                </p>
            </Col>
        )
    }
}

export default SelectedFoods;