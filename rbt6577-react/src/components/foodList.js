import React from 'react';
import ReactDOM from 'react-dom/client';

class FoodList extends React.Component {
    render() {
        return(
            <div className={this.props.className}>
                <h3>{this.props.title}</h3>
                <select className="food-list" size={5} onChange={(e) => {this.props.onSelect(e.target.selectedIndex, this.props.listModeAdd);}} value={this.props.selectedFood}>
                    {this.props.foods.map((food, index) => {
                        return(
                            <option key={index} value={food.name}>{food.name}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
}

export default FoodList;