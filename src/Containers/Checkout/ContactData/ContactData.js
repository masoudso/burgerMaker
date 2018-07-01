import React, {Component} from 'react'
import Button from '../../../Components/UI/Button/Button'
import classes from './ContactData.css'
import axios from '../../../axios-orders'
import Spinner from '../../../Components/UI/Spinner/Spinner'
import Input from '../../../Components/UI/Input/Input'
import {connect} from 'react-redux'

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name Here'
                },
                value: '',
                validation : {
                    required : true,
                    minLength: 5,
                    maxLength: 20
                },
                valid : false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Address Here'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip Code'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched: false
            },
            Country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email Here'
                },
                value: '',
                validation : {
                    required : true
                },
                valid : false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: ''
            }
        },
            loading: false,
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData : formData
        }
        axios.post('/orders.json', order)
            //.then(response => console.log(response))
            .then(this.setState({ loading: false }), this.props.history.push('/'))
            //.catch(error => console.log(error));
            .catch(this.setState({ loading: false }))
    }

    checkValidity = (value, rules) => {
         let isValid = true
         if (rules.required){
             isValid = value.trim() !== '' && isValid
         }
         if (rules.minLength){
             isValid = value.length >= rules.minLength && isValid
         }
         if (rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid
        }

         return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value
        updatedFormElement.touched = true
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedForm[inputIdentifier] = updatedFormElement
        this.setState({
            orderForm : updatedForm
        })
    }

    render(){
        const formElementArray = []
        for (let key in this.state.orderForm){
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key]
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        touched={formElement.config.touched}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)}
                    />
                ))}
                <Button btnType="Success">Order Now</Button>
            </form>
        );
        if (this.state.loading){
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}>
                <h4>Please enter your contact information</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings : state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);