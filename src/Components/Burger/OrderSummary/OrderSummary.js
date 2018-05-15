import React from 'react'
import Aux from '../../../hoc/Aux'
import Button from '../../UI/Button/Button'

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map(igKey => {
        return (<li key={igKey}>
            <span style={{ textTransform: 'Capitalize' }}>
                {igKey}
            </span>: {props.ingredients[igKey]} </li>)
    })
    return(
        <Aux>
            <h3>Your Order</h3>
            <p>Your burger has the following ingredients:</p>
            <ul>
            {ingredients}
            </ul>
            <p><strong>Total Price: {props.price.toFixed(2)} $</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelClicked}>CANCEL</Button>
            <Button btnType="Success" clicked={props.continueClicked}>CONTINUE</Button>
        </Aux>
    )
}

export default orderSummary;