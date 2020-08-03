// Hold the action creators for submitting an order.

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// Synchronous action creator
export const purchaseBurgerSuccess = (id , orderData) => {
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS ,
        orderId : id , 
        orderData : orderData
    };
};

// Synchronous action creator
export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL , 
        error : error
    };
};


export const purchaseBurgerStart = () => {
    return {
        type : actionTypes.PURCHASE_BURGER_START
    };
};

// ASynchronous action creator. This is the action we dispatched from the container once we click the orderButton.
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json' , orderData)
        .then(response => { 
            console.log(response.data); // id of newly created element
            dispatch(purchaseBurgerSuccess(response.data.name , orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        });
    };
};

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    };
};