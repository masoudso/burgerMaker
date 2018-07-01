import * as actionTypes from './actions'

const initialState = {
    ingredients: {
    lettuce : 0,
    bacon: 0,
    meat: 0,
    cheese: 0
    },
        totalPrice: 1
}

const INGREDIENTS_PRICE = {
    lettuce: 1,
    meat: 1.7,
    bacon: 1.3,
    cheese: 0.7
}

const reducer = (state = initialState, action) => {
    switch (action.type){
        case actionTypes.ADD_INGREDIENT:
        return{
            ...state,
            ingredients : {
                ...state.ingredients, /*1 */
                [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            },
            totalPrice : state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
        }
        case actionTypes.REMOVE_INGREDIENT:
        return{
            ...state,
            ingredients : {
                ...state.ingredients,
                [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            },
            totalPrice : state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
        }
        default: return state;
    }

}

export default reducer;
/*
1) we created a new state object by the spread operator, and for a deep clone,
we also created another object (...state.ingredients), and then inside that object
we want to set something (lettuce, ...) to the state.ingredients[something] + 1
*/