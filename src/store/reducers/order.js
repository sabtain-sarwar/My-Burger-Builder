import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { act } from '@testing-library/react';


const initialState = {
    orders : [] ,
    loading : false , // set to true once we start loading or when we start fetching a burger
    purchased : false // set to true when we have placed an order
};

const purchaseInit = (state , action) => {
    return updateObject(state , { purchased : false } );
}

const purchaseBurgerStart = (state , action) => {
    return updateObject(state , { loading : true } );
}

const purchaseBurgerSuccess = (state , action) => {
    const newOrder = updateObject(action.orderData , {
        id : action.orderId
    });
    return updateObject( state , {
        loading : false , 
        purchased : true ,
        orders : state.orders.concat(newOrder)
    });
}

const purchaseBurgerFail = (state , action) => {
    return updateObject(state , { loading : false });
}

const fetchOrdersStart = (state , action ) => {
    return updateObject(state , { loading: true });
}

const fetchOrdersSuccess = (state , action ) => {
    return updateObject(state , {
        orders : action.orders , 
        loading : false
    });
}

const fetchOrdersFail = (state , action ) => {
    return updateObject(state , { loading: false });
}

const reducer = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes,actionTypes.PURCHASE_INIT:
            // return {
            //     ...state , 
            //     purchased : false
            // };
           return purchaseInit(state , action);
        case actionTypes.PURCHASE_BURGER_START:
            // return {
            //     ...state , 
            //     loading : true
            // };
          return purchaseBurgerStart(state, action);
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            // const newOrder = {
            //     ...action.orderData ,
            //     id : action.orderId
            // };
            // return {
            //     ...state , 
            //     loading : false , 
            //     purchased : true ,
            //     orders : state.orders.concat(newOrder)
            // };
            return purchaseBurgerSuccess(state , action);
        case actionTypes.PURCHASE_BURGER_FAIL:
            // return {
            //     ...state , 
            //     loading : false
            // };
            return purchaseBurgerFail(state , action);
        case actionTypes.FETCH_ORDERS_START:
            // return {
            //     ...state , 
            //     loading : true // same loading property we use in the checkout page but we're only on a checkout page or the orders page
            //     // so it is fine if we use the property on both pages.
            // };
            return fetchOrdersStart(state , action);
        case actionTypes.FETCH_ORDERS_SUCCESS:
            // return {
            //     ...state ,
            //     orders : action.orders , 
            //     loading : false
            // };
            return fetchOrdersSuccess(state , action );
        case actionTypes.FETCH_ORDERS_FAIL:
            // return {
            //     ...state , 
            //     loading : false
            // };
            return fetchOrdersFail(state , action );
        default :
            return state;
    }
};

export default reducer;