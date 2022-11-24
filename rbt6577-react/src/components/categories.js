import React from 'react';
import ReactDOM from 'react-dom/client';
import { Col, Container, Input, Row } from 'reactstrap';

class Categories extends React.Component {
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
                sm={2}
            >
                <h3>
                    Categories
                </h3>
                <Input 
                    type="select" 
                    name="food-list" 
                    value={this.state.value}
                    onChange={(e) => {this.setState({value: e.target.value}); this.props.onSelect(e.target.value);}}>
                    {this.props.categories.map((category, index) => {
                        return(
                            <option key={index} value={category}>{category}</option>
                        )
                    })}
                </Input>
            </Col>
        )
    }
}

export default Categories;