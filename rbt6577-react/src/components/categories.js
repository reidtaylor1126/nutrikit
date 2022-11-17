import React from 'react';
import ReactDOM from 'react-dom/client';

class Categories extends React.Component {
    render() {
        return(
            <div>
                <h3>Categories</h3>
                <select  class="food-list" onChange={(e) => console.log(e)}>
                    {this.props.categories.map((category) => {
                        return(
                            <option value={category}>{category}</option>
                        )
                    })}
                </select>
            </div>
        )
    }
}

export default Categories;