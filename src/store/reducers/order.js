import * as actionTypes from '../actions/actionTypes'

const initialState = {
    orders : [],
    loading: false,
    purchased: false //for redirecting method
}

const reducer = (state=initialState, action) => {
    switch (action.type){
        case actionTypes.PURCHASE_BURGER_START:
        return{
            ...state,
            loading: true
        }

        case (actionTypes.PURCHASE_INIT):
        return {
            ...state,
            purchase : false // for redirecting
        }

        case actionTypes.PURCHASE_BURGER_SUCCESS:
        const newOrder = {
            ...action.orderData,
            id: action.orderID
        }
        return {
            ...state,
            loading: false,
            purchased: true, //for redirecting method
            orders: state.orders.concat(newOrder)
        };
        case actionTypes.PURCHASE_BURGER_FAIL:
        return {
            ...state,
            loading: false
        }
        default:
        return state
    }
}

export default reducer;