import React, {Component} from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.css'

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            zipCode: ''
        }
    }

    render(){
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact information</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="zip" placeholder="Zip Code" />
                </form>
            <Button btnType="Success">Order Now</Button>
            </div>
        )
    }
}

export default ContactData;