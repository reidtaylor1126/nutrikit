import React from 'react';
import {Row, Label} from 'reactstrap';
import ColorProgress from './colorProgress';

class LabeledColorProgress extends React.Component {
    render() {
        return (
            <Row>
                <Label>{this.props.label}</Label>
                <ColorProgress value={this.props.value} max={this.props.max}></ColorProgress>
                <p>{this.props.value}/{this.props.max} {this.props.units}</p>
            </Row>
        )
    }
}

export default LabeledColorProgress