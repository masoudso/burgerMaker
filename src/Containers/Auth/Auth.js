import React, {Component} from 'react'
import Input from '../../Components/UI/Input/Input'
import Button from '../../Components/UI/Button/Button'
import classes from './Auth.css'
import * as actions from '../../store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../Components/UI/Spinner/Spinner'

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
                validation : {
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
                touched: false
            }
        },
        isSignUp : true
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

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.control.email.value, this.state.control.password.value, this.state.isSignUp)        
    }

    switchAuthMode = () => {
        this.setState(prevState => {
            return {isSignUp: !prevState.isSignUp}
        })
    }

    render(){
        const formElementArray = []
        for (let key in this.state.control){
            formElementArray.push({
                id : key,
                config : this.state.control[key]
            })
        }

        let form = formElementArray.map( formElement => (
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

        if (this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error){
            errorMessage = (
                <p>{this.props.error.message}</p>
            )
        }

        return(
            <div className={classes.Auth}>
            {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                <Button btnType="Success">Submit</Button>
                </form>
                <Button
                    clicked={this.switchAuthMode}
                    btnType="Danger">
                    Switch to {this.state.isSignUp ? "Login" : "Sign Up"}
                </Button>
                </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth); 