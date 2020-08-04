import * as actionTypes from '../actions/actionTypes';


const initialState = {
    orders : [] ,
    loading : false , // set to true once we start loading or when we start fetching a burger
    purchased : false // set to true when we have placed an order
};

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes,actionTypes.PURCHASE_INIT:
            return {
                ...state , 
                purchased : false
            };
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state , 
                loading : true
            };
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder = {
                ...action.orderData ,
                id : action.orderId
            };
            return {
                ...state , 
                loading : false , 
                purchased : true ,
                orders : state.orders.concat(newOrder)
            };
        case actionTypes.PURCHASE_BURGER_FAIL:
            return {
                ...state , 
                loading : false
            };
        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state , 
                loading : true // same loading property we use in the checkout page but we're only on a checkout page or the orders page
                // so it is fine if we use the property on both pages.
            };
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state ,
                orders : action.orders , 
                loading : false
            };
        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state , 
                loading : false
            };
        default :
            return state;
    }
};

export default reducer;