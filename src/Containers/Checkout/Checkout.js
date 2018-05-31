import React, {Component} from 'react'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'

export default class Checkout extends Component {
    state = {
        lettuce : 1,
        meat: 1,
        bacon: 1,
        cheese: 1
    }
    render(){
        return(
            <div>
                <CheckoutSummary ingredients={this.state.ingredients}/>
                </div>
        )
    }
}