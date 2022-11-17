import React from 'react';
import ReactDOM from 'react-dom/client';
import FoodList from './foodList';

class SelectedFoods extends React.Component {
    render() {
        return(
            <div className={this.props.className}>
                <FoodList 
                    title={this.props.title}
                    onSelect={this.props.onSelect}
                    foods={this.props.foods}
                    listModeAdd={this.props.listModeAdd}
                />
                <p>
                    Total Calories: {this.props.calories}
                </p>
            </div>
        )
    }
}

export default SelectedFoods;