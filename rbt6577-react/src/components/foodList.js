import React from 'react';
import ReactDOM from 'react-dom/client';
import {Col, Container, Input} from 'reactstrap'

class FoodList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            value: props.default || ""
        }
    }

    render() {
        return(
            <Col 
                className={this.props.className}
            >
                <h3>{this.props.title}</h3>
                <Input 
                    type="select"
                    name="foodList"
                    size={5}
                    value={this.state.value}
                    onChange={(e) => { this.setState({value: e.target.value}); this.props.onSelect(e.target.selectedIndex, this.props.listModeAdd);}}
                >
                    {this.props.foods.map((food, index) => {
                        return(
                            <option key={index} value={food.name}>{food.name}</option>
                        )
                    })}
                </Input>
            </Col>
        )
    }
}

export default FoodList;