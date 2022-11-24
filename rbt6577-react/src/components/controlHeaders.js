import React from 'react'
import {Row, Col} from 'reactstrap'

class ControlHeaders extends React.Component {
    render() {
        return(
            <Row className='control-headers'>
                <Col sm={2}>
                    <h3>Categories</h3>
                </Col>
                <Col sm={4}>
                    <h3>Menu</h3>
                </Col>
                <Col sm={1}>
                    <h3> </h3>
                </Col>
                <Col sm={4}>
                    <h3>Selected Items</h3>
                </Col>
        </Row>
        )
    }
}

export default ControlHeaders