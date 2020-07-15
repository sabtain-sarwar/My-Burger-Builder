// Here i am gonna create the action creators for building a burger and i will have only Synchronous action creators for adding
// and removing ingredients

import * as actionTypes from './actionTypes';

export const addIngredient = (name) => {
    return {
        type : actionTypes.ADD_INGREDIENT ,
        ingredientName : name
    };
};

export const removeIngredient = (name) => {
    return {
        type : actionTypes.REMOVE_INGREDIENT ,
        ingredientName : name
    };
};