import React, { Component } from 'react'
import axios from '../../axios-orders'
import {connect} from 'react-redux'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler' /* 4 */
import * as burgerBuilderActions from '../../store/actions/index'

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }
    /* 5 */
    componentDidMount() {
        console.log(this.props);
       //now in redux, burgerBuilder reducer
       this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => { return sum + el }, 0);
        return sum >= 1            /* 3 */
    }

   
    purchasingHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    purchaseCancelHandler = () => {
        this.setState({
            purchasing: false
        })
    }

    purchaseContinueHandler = () => {
        this.props.history.push('/Checkout');
    }
    
    render() {
        const infoDisabled = {
            ...this.props.ings
        }

        for (let key in infoDisabled) {/* 1 & 2*/
            infoDisabled[key] = infoDisabled[key] <= 0
        }
        
        let orderSummary = null;
        let burger = 
        this.props.error ? <p>Ingredients cannot be loaded...</p> : <Spinner />

        if (this.props.ings) {
            burger =
                (
                    <Aux>
                        <Burger ingredients={this.props.ings} />
                        <BuildControls
                            ingredientsAdded={this.props.onIngredientAdded}
                            ingredientsRemoved={this.props.onIngredientRemoved}
                            purchasable={this.updatePurchaseState(this.props.ings)}
                            disabled={infoDisabled}
                            price={this.props.price}
                            ordered={this.purchasingHandler} />
                    </Aux>
                )
            orderSummary = <OrderSummary ingredients={this.props.ings}
                price={this.props.price}
                continueClicked={this.purchaseContinueHandler}
                cancelClicked={this.purchaseCancelHandler} />
        }
       
        return (
            <Aux>
                <Modal show={this.state.purchasing}
                    closeModal={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
            {burger}
            </Aux>
        )
    };
};

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
        error: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(burgerBuilderActions.initIngridients())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
/* 
1: 'let in' loops through each element and key in here is the key index (meat, ...)
2: if infoDisabled[key] is less than equal to 0 then infoDisabled[key] will be true
3: if sum > 1 set purchasable to true
4: it's lower case because we're not using it in JSX
5: a right place to fetch data
*/