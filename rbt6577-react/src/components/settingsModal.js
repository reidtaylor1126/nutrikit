import React from 'react';
import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalHeader, Row } from 'reactstrap';
import ResettableOption from './resettableOption';

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
                        <CardHeader>Nutrition Goals</CardHeader>
                        <CardBody>
                            <ResettableOption 
                                label={'Calories'}
                                value={this.props.calories}
                                optionKey={'calories'}
                                onChange={this.props.onChange}
                                onReset={this.props.onReset}
                            />
                            <ResettableOption 
                                label={'Total Fat'}
                                value={this.props.totalfat}
                                optionKey={'totalfat'}
                                onChange={this.props.onChange}
                                onReset={this.props.onReset}
                            />
                            <ResettableOption 
                                label={'Saturated Fat'}
                                value={this.props.satfat}
                                optionKey={'saturatedfat'}
                                onChange={this.props.onChange}
                                onReset={this.props.onReset}
                            />
                            <ResettableOption 
                                label={'Protein'}
                                value={this.props.protein}
                                optionKey={'protein'}
                                onChange={this.props.onChange}
                                onReset={this.props.onReset}
                            />
                            <ResettableOption 
                                label={'Carbs'}
                                value={this.props.carbohydrate}
                                optionKey={'carbohydrate'}
                                onChange={this.props.onChange}
                                onReset={this.props.onReset}
                            />
                        </CardBody>
                    </Card>
                </ModalBody>
            </Modal>
        )
    }
}

export default SettingsModal