// Hold the action creators for submitting an order.

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// Synchronous action creator
export const purchaseBurgerSuccess = (id , orderData) => {
    return {
        type : actionTypes.purchaseBurgerSuccess ,
        orderId : id , 
        orderData : orderData
    };
};

// Synchronous action creator
export const purchaseBurgerFail = (error) => {
    return {
        type : actionTypes.purchaseBurgerFail , 
        error : error
    };
};

// ASynchronous action creator. This is the action we dispatched from the container once we click the orderButton.
export const purchaseBurgerStart = (orderData) => {
    return dispatch => {
        axios.post('/orders.json' , orderData)
        .then(response => { 
            console.log(response.data); // id of newly created element
            dispatch(purchaseBurgerSuccess(response.data , orderData))
        })
        .catch(error => {
            dispatch(purchaseBurgerFail(error))
        });
    };
};