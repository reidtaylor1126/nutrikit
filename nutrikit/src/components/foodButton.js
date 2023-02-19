import React from 'react';
import { Button } from 'reactstrap'

function FoodButton(props) {
    return(
        <Button 
            className='m-2'
            color='dark'
            onClick={() => props.onClick()} 
        >
            {props.label}
        </Button>
    )
}
export default FoodButton;