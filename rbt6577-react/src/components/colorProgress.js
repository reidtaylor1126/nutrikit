import React from 'react';
import {Progress} from 'reactstrap';

class ColorProgress extends React.Component {
    render() {

        let barColor = 'primary';
        if(Math.abs(this.props.value - this.props.max) < this.props.max * this.props.margin) {
            barColor = 'warning'
        }
        if(this.props.value - this.props.max > this.props.max * this.props.margin) {
            barColor = 'danger'
        }

        return(
            <Progress 
                max={this.props.max}
                value={this.props.value}
                color={barColor}
            />
        )
    }
}

export default ColorProgress