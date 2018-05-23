import React, {Component} from 'react'
import Modal from '../../Components/UI/Modal/Modal'
import Aux from '../../hoc/Aux/Aux'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component{/* 1 */
        state = {
            error : null
        }

        componentWillMount(){ /* 2 & 3*/
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error : null})
                return req;
            })
            this.resInterceptor = axios.interceptors.response.use(res => res, error => {
                this.setState({error : error})
            })
        }

        componentWillUnmount(){ /* 4 */ 
            axios.interceptors.request.eject(this.reqInterceptor)
            axios.interceptors.request.eject(this.resInterceptor)
        }

        errorConfirmedHandler = () => {
            this.setState({error : null})
        }

        render () {
            return (
                <Aux>
                <Modal 
                show={this.state.error}
                closeModal = {this.errorConfirmedHandler}>
                    {this.state.error ? this.state.error.message : null }
                </Modal>
            <WrappedComponent {...this. props} />
            </Aux>
            )
        }
    } 
}

export default withErrorHandler;
/* 1) This class is named "class" because its only returned in here 
   2 & 3) reqInterceptor (RequestInterceptor) and resInterceptor could be any other names. 
    they are being used as references.
   4) to avoid error as the applications becomes larger, we need to have unmount.
    look for docs. It is to remove interceptors and to remove memory leaks.
*/