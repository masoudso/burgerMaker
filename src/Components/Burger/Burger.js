import React from 'react'
import classes from './Burger.css'
import BurgerIngredients from './BurgerIngredients/BurgerIngredients'


const burger = (props) => {/* 1 */
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => { 
            return <BurgerIngredients key={igKey + i} type={igKey} />;
        }); 
    }).reduce((arr, curr) => {return arr.concat(curr)}, []);/* 2 */
    /* 3 */
    if (transformedIngredients.length === 0){
        transformedIngredients = <p>Please add ingredients!</p>
    }

    return(
        <div className={classes.Burger}>
        <BurgerIngredients type="bread-top"/>
        {transformedIngredients} 
        <BurgerIngredients type="bread-bottom"/>
        </div>
    );
}

export default burger;
/* 1:  A Short note:
   Object.Keys receives the ingredients as an object and returns the keys (here 
   they are Salad, Meat, ...), then the function makes a new array using spread
    operator for each key with size of each key (number of meat, cheese, etc)
    and again maps it using index and a unique key.
   2: Reduce function takes arr as the array and curr as the current element
      and applies the function (here concat) on each element and puts it in arr.
   3: The transformedIngredients is now reduced (has a size)
    */