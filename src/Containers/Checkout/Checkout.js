import React, {Component} from 'react'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData'
import { connect } from 'react-redux'
import * as actionTypes from '../../store/actions/index'

class Checkout extends Component {


    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        let summary = <Redirect to="/"/>
        if (this.props.ings){
            const purchaseRedirect = this.props.purchased ? <Redirect to="/"/> : null
            summary = (
                <div>
                    {purchaseRedirect}
                <CheckoutSummary 
                ingredients={this.props.ings}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                />
                {/* since we are rendering component manually,
                to be able to get 'history' in contact-data page,
                we need to pass props */}
                <Route 
                path={this.props.match.path + '/contact-data'}
                component={ContactData}/>
                </div>
            )
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased : state.order.purchased
    }
}

 
export default  connect(mapStateToProps)(Checkout) ;