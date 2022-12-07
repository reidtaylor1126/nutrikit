import React from 'react';
import { Col, Row } from 'reactstrap';
import FoodButton from './foodButton';
import FoodList from './foodList';

class FoodMenu extends React.Component {
    render() {
        return(
            <Col 
                className={this.props.className + ' mb-4'}
                sm={4}
            >
                <FoodList 
                    sm={12}
                    title={this.props.title}
                    onSelect={this.props.onSelect}
                    foods={this.props.foods}
                    listModeAdd={this.props.listModeAdd}
                />
                <Row className='justify-content-start'>
                    <Col xs={3} className='justify-content-start'>
                        <FoodButton 
                            label={'New'}
                            onClick={this.props.onClickNew}
                            visible={true}
                        />
                    </Col>
                    <Col xs={3} className='justify-content-start'>
                        <FoodButton 
                            label={'Edit'}
                            onClick={this.props.onClickEdit}
                            visible={true}
                        />
                    </Col>
                    <Col xs={3} className='justify-content-start'>
                        <FoodButton 
                            label={'Delete'}
                            onClick={this.props.onClickDel}
                            visible={true}
                        />
                    </Col>

                </Row>
            </Col>
        )
    }
}

export default FoodMenu;