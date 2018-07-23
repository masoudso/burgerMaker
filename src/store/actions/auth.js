import * as actionTypes from './actionTypes'
import axios from 'axios'

export const authStart = () => {
    return {
        type : actionTypes.AUTH_START
    }
}

export const authSuccess = (authData) => {
    return { 
        type : actionTypes.AUTH_SUCCESS,
        authData : authData
    }
}

export const authFail = (error) => {
    return { 
        type : actionTypes.AUTH_FAIL,
        error : error
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }

        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAHUa3x-f7vKv0c0hsbUJdS_LNC-X1B_hQ'
        if (!isSignUp){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAHUa3x-f7vKv0c0hsbUJdS_LNC-X1B_hQ'
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response)
            dispatch(authSuccess(response.data))
        })
        .catch(err => {
            console.log(err)
            dispatch(authFail(err))
        })
    }
}