import React from 'react'
import classes from './Order.css'

const order = (props) => {

    const ingredients1 = []

    for (let stuff in props.ingredients){
        ingredients1.push({
            name: stuff, amount: props.ingredients[stuff]
        })
    }

    const ingredients2 = ingredients1.map(ig => {
        return <span
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
            key={ig.name}>
            {ig.name}:({ig.amount})
        </span>
    })
    return(
    <div className={classes.Order}>
        <p>{ingredients2} </p>
        <p>Price<strong>: ${props.price}</strong></p>
        </div>
    )
}

export default order;