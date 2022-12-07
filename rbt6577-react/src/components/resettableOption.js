import React from 'react';
import { Row, Col, Input, Button } from 'reactstrap';

class ResettableOption extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            default: props.value
        }
    }

    render() {
        return(
            <Row className='align-items-center'>
                <Col xs={12} md={3}>
                    <h5>{this.props.label}</h5>
                </Col>
                <Col xs={9} md={6}>
                    <Input type="number" 
                        value={this.props.value} 
                            onChange={(e) => {
                                this.props.onChange(this.props.optionKey, e.target.value)
                            }}
                    />
                </Col>
                <Col xs={3} md={3}>
                    <Button 
                        className='m-1' 
                        color='danger' 
                        onClick={() => {
                            this.props.onReset(this.props.optionKey)
                        }}
                    >
                        Reset
                    </Button>
                </Col>
            </Row>
        )
    }
}

export default ResettableOption