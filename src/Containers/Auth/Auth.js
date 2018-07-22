import React, {Component} from 'react'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import classes from './Auth.css'

class Auth extends Component {
    state = {
        control : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                vaidation : {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation : {
                    required: true,
                    minLength: 6 
                },
                valid: false,
                touched: true
            }
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (!rules) {
            return true;
        }
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.control,
            [controlName] : {
                ...this.state.control[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.control[controlName].validation),
                touched: true
            }
        }
        this.setState({control: updatedControls})
    }

    render(){
        const formElementArray = []
        for (let key in this.state.control){
            formElementArray.push({
                id : key,
                config : this.state.control[key]
            })
        }

        const form = formElementArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        return(
            <div className={classes.Auth}>
                <form>
                    {form}
                <Button btnType="Success">Submit</Button>
                </form>
                </div>
        )
    }
}

export default Auth; 