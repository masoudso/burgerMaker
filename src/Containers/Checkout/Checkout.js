import React, {Component} from 'react'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {
    state = {
        ingredients: {
        lettuce : 1,
        meat: 1,
        cheese: 1,
        bacon: 1
        }
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/>
                </div>
        )
    }
}