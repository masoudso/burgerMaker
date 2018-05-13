import React from 'react'
import Aux from '../../../hoc/Aux'

const orderSummary = (props) => {
    const ingredients = Object.keys(props.ingredients).map(igKey => {
        return (<li key={igKey}>
            <span style={{TextTransform : 'capitalize'}}>
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
            <p>Continue to Checkout?</p>
            <button>CANCEL</button>
            <button>CONTINUE</button>
        </Aux>
    )
}

export default orderSummary;