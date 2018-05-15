import React from 'react'
import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl'

const controls = [
    {label: 'Lettuce', type: 'lettuce'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
    <p>Current Price: <strong>{props.price.toFixed(2)}</strong> $</p>
    {controls.map(ctrl => (
        <BuildControl 
        key={ctrl.label} 
        label={ctrl.label}
        added={() => props.ingredientsAdded(ctrl.type)}
        removed={() => props.ingredientsRemoved(ctrl.type)}
        ifEnable={props.disabled[ctrl.type]}/>
    ))}
    <button 
    className={classes.OrderButton}
    disabled={!props.purchasable}
    onClick={props.ordered}>Order Now</button>
    </div>
);

export default buildControls; 
