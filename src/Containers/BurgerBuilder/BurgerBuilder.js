import React, { Component } from 'react'
import Aux from '../../hoc/Aux/Aux'
import Burger from '../../Components/Burger/Burger'
import BuildControls from '../../Components/Burger/BuildControls/BuildControls'
import Modal from '../../Components/UI/Modal/Modal'
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary'
import axios from '../../axios-orders'
import Spinner from '../../Components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler' /* 4 */

const INGREDIENTS_PRICE = {
    lettuce: 1,
    meat: 1.7,
    bacon: 1.3,
    cheese: 0.7
}

class BurgerBuilder extends Component {
    state = {
        // ingredients : {
        //     lettuce : 0,
        //     cheese: 0,
        //     bacon: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: 1,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }
    /* 5 */
    componentDidMount() {
        // console.log(this.props);
        axios.get('https://reactburger-6a908.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            }).catch(error => {
                this.setState({error : true})
            })
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients).map(igKey => {
            return ingredients[igKey]
        }).reduce((sum, el) => { return sum + el }, 0);
        this.setState({
            purchasable: sum >= 1            /* 3 */
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
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const prevCount = this.state.ingredients[type];
        if (prevCount === 0) {
            return;
        }
        const updatedCount = prevCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const priceToBeReduced = INGREDIENTS_PRICE[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceToBeReduced;
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        this.updatePurchaseState(updatedIngredients);
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
        //alert("Let's proceed!");
        

        //using the 'history' object available by routing 
        //we can push this page into the stack when triggering the function above

        //sec12Lec211
        const queryParams = []
        for (let i in this.state.ingredients){
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));            
        }
        queryParams.push('price=' + this.state.totalPrice)
        const queryString = queryParams.join('&');

        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }


    render() {
        const infoDisabled = {
            ...this.state.ingredients
        }

        for (let key in infoDisabled) {/* 1 & 2*/
            infoDisabled[key] = infoDisabled[key] <= 0
        }
        
        let orderSummary = null;
        let burger = 
        this.state.error ? <p>Ingredients cannot be loaded...</p> : <Spinner />

        if (this.state.ingredients) {
            burger =
                (
                    <Aux>
                        <Burger ingredients={this.state.ingredients} />
                        <BuildControls
                            ingredientsAdded={this.addIngredientHandler}
                            ingredientsRemoved={this.removeIngredientHandler}
                            purchasable={this.state.purchasable}
                            disabled={infoDisabled}
                            price={this.state.totalPrice}
                            ordered={this.purchasingHandler} />
                    </Aux>
                )
            orderSummary = <OrderSummary ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                continueClicked={this.purchaseContinueHandler}
                cancelClicked={this.purchaseCancelHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default withErrorHandler(BurgerBuilder, axios);
/* 
1: 'let in' loops through each element and key in here is the key index (meat, ...)
2: if infoDisabled[key] is less than equal to 0 then infoDisabled[key] will be true
3: if sum > 1 set purchasable to true
4: it's lower case because we're not using it in JSX
5: a right place to fetch data
*/