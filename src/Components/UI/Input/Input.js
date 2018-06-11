import React from 'react'
import classes from './Input.css'

const input = (props) => {
    const inputClasses = [classes.inputElement]
    let inputElement = null;
    if (props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea
                className={inputClasses.join(' ')}
                {...props.elementConfig}
                value={props.value}
                onChange={props.changed} />
            break;
        case ('select'):
        inputElement = (
            <select
                className={inputClasses.join(' ')}
                value={props.value}>
                {props.elementConfig.options.map(option => (
                    <option
                        value={option.value}
                        onChange={props.changed}
                        key={option.value}>
                        {option.displayValue}
                    </option>
                ))}
            </select>
        )
        break;
        default:
        inputElement = <input className={inputClasses.join(' ')} 
        {...props.elementConfig}value={props.value}/>
    }

    let validationMessage = null
    if (props.invalid && props.touched){
        validationMessage = <p className={classes.validationError}>Please enter a valid {props.elementType}</p>
    }

    return (
    <div className={classes.Input}>
        <label className={classes.Label}>{props.label}</label>
        {validationMessage}
        {inputElement}
    </div>
    )
}

export default input;