import React from 'react';
import { Col, Row } from 'reactstrap';

class NutritionLabel extends React.Component {
    render() {
        return(
            <Col xs="12" md="4" className='m-3'>
                <Row>
                    <Col xs="10"><h3>Calories</h3></Col>
                    <Col xs="2"><h5>{this.props.food.calories}</h5></Col>
                </Row>
                <Row>
                    <Col xs="10"><h5>Total Fat</h5></Col>
                    <Col xs="2"><p>{this.props.food.totalfat} mg</p></Col>
                </Row>
                <Row>
                    <Col xs="10"><h5>Saturated Fat</h5></Col>
                    <Col xs="2"><p>{this.props.food.saturatedfat} mg</p></Col>
                </Row>
                <Row>
                    <Col xs="10"><h5>Trans Fat</h5></Col>
                    <Col xs="2"><p>{this.props.food.transfat} mg</p></Col>
                </Row>
                <Row>
                    <Col xs="10"><h5>Protein</h5></Col>
                    <Col xs="2"><p>{this.props.food.protein} mg</p></Col>
                </Row>
                <Row>
                    <Col xs="10"><h5>Carbohydrates</h5></Col>
                    <Col xs="2"><p>{this.props.food.carbohydrate} mg</p></Col>
                </Row>
            </Col>
        )
    }
}

export default NutritionLabel