import React, {Component} from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        },
        loading : false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Masoud Soltanveis',
                address: 'Orlando',
                Country: 'United States'
            },
            email: 'masoudso@vays.com',
            deliveryMethod: 'FastBurger'
        }
        axios.post('/orders.json', order)
            //.then(response => console.log(response))
            .then(this.setState({ loading: false }), this.props.history.push('/'))
            //.catch(error => console.log(error));
            .catch(this.setState({ loading: false }))
    }

    render(){
        let form = (
            <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="zip" placeholder="Zip Code" />
                </form>
        );
        if (this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact information</h4>
                {form}
            <Button btnType="Success" clicked={this.orderHandler}>Order Now</Button>
            </div>
        )
    }
}

export default ContactData;