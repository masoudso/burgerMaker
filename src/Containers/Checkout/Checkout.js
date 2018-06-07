import React, {Component} from 'react'
import CheckoutSummary from '../../Components/Order/CheckoutSummary/CheckoutSummary'
import { Route } from 'react-router-dom'
import ContactData from './ContactData/ContactData'

export default class Checkout extends Component {
    state = {
        ingredients: null,
        totalPrice : 0
    }

    componentWillMount(){
        console.log(this.props);
        //it gets all the info from the above object shown in console
        const query = new URLSearchParams(this.props.location.search);
        let price = 0;
        const ingredients = {};
        for (let param of query.entries()){
            if(param[0] === 'price'){
                price = param[1];
            }else{
                ingredients[param[0]] = +param[1]; //plus sign to change it to int
            }
        }
        this.setState({ingredients : ingredients , totalPrice : price})
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued = {this.checkoutContinuedHandler}
                />
                {/* since we are rendering component manually,
                to be able to get 'history' in contact-data page,
                we need to pass props */}
                <Route path={this.props.match.path + '/contact-data'} 
                render = {(props) => (<ContactData ingredients={this.state.ingredients} price={this.state.totalPrice} {...props}/>)}/>
                </div>
        )
    }
}