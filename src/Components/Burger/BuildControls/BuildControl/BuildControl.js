import React from 'react'
import classes from './BuildControl.css'

const buildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.label}</div>
        <button className={classes.Less}>Decrease</button>
        <button className={classes.More}>Increase</button>
    </div>
);

export default buildControl;