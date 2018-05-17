import React, {Component} from 'react'
import Aux from '../../../hoc/Aux/Aux'
import Button from '../../UI/Button/Button'

class OrderSummary extends Component {

    // For debugging purposes only. This class can be a component
    // to use the following:
    // componentWillUpdate(){
    //     console.log('[OrderSummary] WillUpdate');
    // }
    render(){
        const ingredients = Object.keys(this.props.ingredients).map(igKey => {
            return (<li key={igKey}>
                <span style={{ textTransform: 'Capitalize' }}>
                    {igKey}
                </span>: {this.props.ingredients[igKey]} </li>)
        })
        return(
            <Aux>
                <h3>Your Order</h3>
                <p>Your burger has the following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price: {this.props.price.toFixed(2)} $</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Danger" clicked={this.props.cancelClicked}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.continueClicked}>CONTINUE</Button>
            </Aux>
        )
    }
}
export default OrderSummary;