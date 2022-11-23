import React from 'react';
import { Button } from 'reactstrap'

function FoodButton(props) {
    return(
        <Button 
            color='dark'
            onClick={() => props.onClick()} 
            style={{display: props.visible ? 'block' : 'none'}}
        >
            {props.label}
        </Button>
    )
}
export default FoodButton;