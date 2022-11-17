import React from 'react';
import ReactDOM from 'react-dom/client';

class Categories extends React.Component {
    render() {
        return(
            <div className={this.props.className}>
                <h3>Categories</h3>
                <select className="food-list" onChange={(e) => {this.props.onSelect(e.target.value);}} value={this.props.category}>
                    {this.props.categories.map((category, index) => {
                        return(
                            <option key={index} value={category}>{category}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
}

export default Categories;