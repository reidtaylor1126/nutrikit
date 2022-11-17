import React from 'react';
import ReactDOM from 'react-dom/client';

class FoodButton extends React.Component {
    render() {
        return(
            <button 
                onClick={() => this.props.onClick()} 
                style={{display: this.props.visible ? 'block' : 'none'}}
            >
                {this.props.label}
            </button>
        )
    }
}

export default FoodButton;