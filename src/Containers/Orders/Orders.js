import React, {Component} from 'react'
import Order from '../../Components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

class Orders extends Component{
    state = {
        orders : [],
        loading : true
    }
    
    componentDidMount(){
        axios.get('/orders.json')
        .then(res => { 
            const fetchedOrders = [];
            for (let key in res.data){/* 1 */
                fetchedOrders.push({...res.data[key], id: key})
            }
            this.setState({loading : false, orders: fetchedOrders})
        })
        .catch(err => {
            this.setState({loading : false})
        })
    }

    render(){
        return(
            <div>
                {this.state.orders.map(order => {
                     return (<Order 
                     key={order.id}
                     ingredients={order.ingredients}
                     price = {order.price}
                     />)
                })}
            </div>
        )
    }
}

export default  withErrorHandler(Orders, axios); 

/* 1: Since firebase is returning a json object, we need to turn it into an array,
and for that, we loop through each key (a unique key that can be found in console.log)
and push the keys into an empty array that we defined earlier.
Also, the reason for having ...res.data[key] is to create a new array*/