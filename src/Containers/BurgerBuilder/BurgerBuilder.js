import React, { Component } from 'react'
import Aux from '../../hoc/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'

const INGREDIENTS_PRICE = {
    lettuce : 1,
    meat : 1.7,
    bacon : 1.3,
    cheese : 0.7
}

class BurgerBuilder extends Component{
    state = {
        ingredients : {
            lettuce : 0,
            cheese: 0,
            bacon: 0,
            meat: 0
        },
        totalPrice : 1,
        purchasable : false,
        purchasing: false
    }

    updatePurchaseState (ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum , el) => {return sum + el}, 0);
        this.setState({
            purchasable : sum >= 1            /* 3 */
        })
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
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const prevCount = this.state.ingredients[type];
        if (prevCount === 0){
            return;
        }
        const updatedCount = prevCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;
        const priceToBeReduced = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceToBeReduced;
        this.setState({
            ingredients : updatedIngredients,
            totalPrice : newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    purchasingHandler = () => {
        this.setState({
            purchasing : true
        });
    }
    
    purchaseCancelHandler = () => {
        this.setState({
            purchasing : false
        })
    }

    purchaseContinueHandler = () => {
        alert("Let's proceed!");
    }

    render(){
        const infoDisabled = {
            ...this.state.ingredients
        }

        for (let key in infoDisabled){/* 1 & 2*/
            infoDisabled[key] = infoDisabled[key] <= 0
        }

        return(
            <Aux>
                <Modal show={this.state.purchasing} closeModal={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}
                        price={this.state.totalPrice}
                        continueClicked={this.purchaseContinueHandler}
                        cancelClicked={this.purchaseCancelHandler} />
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <div> 
                    <BuildControls 
                    ingredientsAdded = {this.addIngredientHandler}
                    ingredientsRemoved = {this.removeIngredientHandler}
                    purchasable = {this.state.purchasable}
                    disabled = {infoDisabled}
                    price = {this.state.totalPrice}
                    ordered = {this.purchasingHandler}/>
                </div>
            </Aux>
        )
    };
};

export default BurgerBuilder;
/* 
1: 'let in' loops through each element and key in here is the key index (meat, ...)
2: if infoDisabled[key] is less than equal to 0 then infoDisabled[key] will be true
3: if sum > 1 set purchasable to true
*/