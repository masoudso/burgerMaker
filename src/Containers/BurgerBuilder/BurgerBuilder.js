import React, { Component } from 'react';
import Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'

const INGREDIENTS_PRICE = {
    salad : 1,
    meat : 1.7,
    bacon : 1.3,
    cheese : 0.7
}

class BurgerBuilder extends Component{
    state = {
        ingredients : {
            salad : 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice : 1
    }

    addIngredientHandler = (type) => {
        const prevCount = this.state.ingredients[type];
        const updatedCount = prevCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceToBeAdded = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceToBeAdded;
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        })
    }

    removeIngredientHandler = (type) => {

    }

    render(){
        return(
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <div> 
                    <BuildControls />
                </div>
            </Aux>
        )
    };
};

export default BurgerBuilder;