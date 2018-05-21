import React, {Component} from 'react'
import classes from './Modal.css'
import Aux from '../../../hoc/Aux/Aux'
import BackDrop from '../BackDrop/BackDrop'

class Modal extends Component {
    /* 1 */
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }
    componentWillUpdate(){
        console.log('[Modal] WillUpdate');
    }

    render(){
        return(
            <Aux>
                <BackDrop show={this.props.show} clicked={this.props.closeModal} />
                <div className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>
        )
    }
}

export default Modal;
/*
1. Should component update checks to see if show is changed and then updates the component
*/