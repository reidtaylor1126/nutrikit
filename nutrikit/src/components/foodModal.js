import React from 'react';
import { Button, Card, CardBody, CardHeader, Col, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import FoodButton from './foodButton';

class SettingsModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props)
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    {this.props.modeLabel} Food
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardHeader>General Information</CardHeader>
                        <CardBody>
                            <h4>Name</h4>
                            <Input type="text" value={this.props.foodName} onChange={(e) => {this.props.modify('name', e.target.value)}}></Input>
                            <h4>Category</h4>
                            <Input type="select" value={this.props.category} onChange={(e) => {this.props.modify('category', e.target.value)}}>
                                {this.props.categories.map((category, index) => {
                                    return(
                                        <option key={index} value={category}>{category}</option>
                                    )
                                })}
                            </Input>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardHeader>Nutrition Information</CardHeader>
                        <CardBody>
                            <h4>Calories</h4>
                            <Input type="number" value={this.props.calories} onChange={(e) => {this.props.modify('calories', +e.target.value)}}></Input>
                            <h4>Total Fat</h4>
                            <Input type="number" value={this.props.totalFat} onChange={(e) => {this.props.modify('totalfat', +e.target.value)}}></Input>
                            <h4>Saturated Fat</h4>
                            <Input type="number" value={this.props.saturatedFat} onChange={(e) => {this.props.modify('saturatedfat', +e.target.value)}}></Input>
                            <h4>Trans Fat</h4>
                            <Input type="number" value={this.props.transFat} onChange={(e) => {this.props.modify('transfat', +e.target.value)}}></Input>
                            <h4>Protein</h4>
                            <Input type="number" value={this.props.protein} onChange={(e) => {this.props.modify('protein', +e.target.value)}}></Input>
                            <h4>Carbohydrate</h4>
                            <Input type="number" value={this.props.carbs} onChange={(e) => {this.props.modify('carbohydrate', +e.target.value)}}></Input>
                        </CardBody>
                    </Card>

                    <Row>
                        <Col xs={6} md={3}>
                            <FoodButton label={"Save"} onClick={() => this.props.onConfirm()}/>
                        </Col>
                        <Col xs={12} md={6} className="m-3">
                            <h5>{this.props.message}</h5>
                        </Col>
                    </Row>
                </ModalBody>
            </Modal>
        )
    }
}

export default SettingsModal