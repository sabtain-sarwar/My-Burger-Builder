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

export const fetchOrdersSuccess = (orders) => {
    return {
        type : actionTypes.FETCH_ORDERS_SUCCESS , 
        orders : orders
    };
};


export const fetchOrdersFail = (error) => {
    return {
        type : actionTypes.FETCH_ORDERS_FAIL ,
        error : error
    };
};


export const fetchOrdersStart = () => {
    return {
        type : actionTypes.FETCH_ORDERS_START
    };
};


export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        // the code copied from Orders.js
        axios.get("/orders.json")
        .then(res => {
            const fetchedOrders = [];
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key] , 
                    id : key
                });
            }
            dispatch(fetchOrdersSuccess(fetchedOrders));
        })
        .catch(err => {
           dispatch(fetchOrdersFail(err));
        });
    };
}