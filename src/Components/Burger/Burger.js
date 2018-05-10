import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'

/* A Short note about function below
   Object.Keys receives the ingredients as an object and returns the keys (here 
   they are Salad, Meat, ..., then the function makes a new array using spread
    operator for each key with size of each key (number of meat, cheese, etc)
    and again maps it using index and a unique key.)     
*/
const burger = (props) => {
    const transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { 
            return <BurgerIngredients key={igKey + i} type={igKey} />;
        }); 
    });

    return(
        <div className={classes.Burger}>
        <BurgerIngredients type="bread-top"/>
        {transformedIngredients} 
        <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;