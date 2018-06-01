import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../UI/Button/Button'
import classes from './CheckoutSummary.css'

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <p>Hope you enjoy your meal!</p>
            <div style={{width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button btnType="Danger" clicked>Cancel</Button>
            <Button btnType="Success" clicked>Continue</Button>
        </div>
    )
}

export default checkoutSummary