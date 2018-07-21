import React, {Component} from 'react'
import {connect} from 'react-redux'
import Order from '../../Components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/index'
import Spinner from '../../Components/UI/Spinner/Spinner'

class Orders extends Component{
    
    componentDidMount(){
       this.props.onfetchOrders()
    }

    render(){
        let orders = <Spinner/>
        if (!this.props.loading){
            orders = this.props.orders.map(order => (
                 <Order 
                 key={order.id}
                 ingredients={order.ingredients}
                 price = {order.price}
                 />)
            )
        }
        return(
            <div>
            {orders}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return{
        orders : state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onfetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)); 

/* 1: Since firebase is returning a json object, we need to turn it into an array,
and for that, we loop through each key (a unique key that can be found in console.log)
and push the keys into an empty array that we defined earlier.
Also, the reason for having ...res.data[key] is to create a new array*/