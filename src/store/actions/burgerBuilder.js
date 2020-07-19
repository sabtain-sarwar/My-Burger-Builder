// Here i am gonna create the action creators for building a burger and i will have only Synchronous action creators for adding
// and removing ingredients

import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

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

// sync action creator.That is the action that i actually want to dispatch once the async code in initIngredient is done.
export const setIngredients = (ingredients) => {
    return {
        type : actionTypes.SET_INGREDIENTS , 
        ingredients : ingredients
    }
};


export const fetchIngredientsFailed = () => {
    return {
        type : actionTypes.FETCH_INGREDIENTS_FAILED
    };
};


// Fetch ingredients bcz we want to do this initially to load the ingredients we can use in the burger builder.
// we are returning a fun which receive dispatch fun as an args and that syntx is available due to redux-thunk and in there i can use 
// my async code
export const initIngredients = () => {
    return dispatch => {
        // here i'll put my async code
        axios.get('https://react-my-burger-264b5.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(setIngredients(response.data));
            })
            .catch(error => {
                dispatch(fetchIngredientsFailed());
            });
    };
};