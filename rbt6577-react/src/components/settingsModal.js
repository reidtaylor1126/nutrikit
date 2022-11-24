import React from 'react';
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalHeader } from 'reactstrap';

class SettingsModal extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.props.toggle}>
                <ModalHeader toggle={this.props.toggle}>
                    Settings
                </ModalHeader>
                <ModalBody>
                    <Card>
                        <CardHeader>Calorie Counter</CardHeader>
                        <CardBody>
                            <h4>Max Calories</h4>
                            <Input type="number" value={this.props.maxCalories} onChange={(e) => {this.props.onChangeCalories(+e.target.value)}}></Input>
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
        )
    }
}

export default SettingsModal