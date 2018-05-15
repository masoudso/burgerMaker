import React from 'react'
// letting webpack know I'm using the image
import BurgerLogo from '../../Assets/images/burger-logo.png'
import classes from './Logo.css'

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={BurgerLogo} alt="BurgerLogo"/>
    </div>
)

export default logo;