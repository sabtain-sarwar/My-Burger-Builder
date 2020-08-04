import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import { setIngredients } from '../actions/burgerBuilder';

const initialState = {
    // ingredients : {
    //     salad : 0 , 
    //     bacon : 0 ,
    //     cheese : 0 ,
    //     meat : 0
    // } ,
    ingredients : null , // bcz now we are fetching it from the web
    totalPrice : 4 ,
    error : false // i want to set it to true if our loading does fail
};


const INGREDIENT_PRICES = {
    salad : 0.5 , 
    cheese : 0.4 , 
    meat  : 1.3 , 
    bacon  : 1.7
};

const addIngredient = (state , action) => {
    // updatedIngredient has to be an object bcz this is what the utility function expects otherwise this won't works as expected
    const updatedIngredient = {  [action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients , updatedIngredient );
    const updateState = {
        ingredients : updatedIngredients , 
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state , updateState);
}

const removeIngredient = (state , action) => {
    const updatedIng = {  [action.ingredientName] : state.ingredients[action.ingredientName] - 1 };
    const updatedIngs = updateObject(state.ingredients , updatedIng );
    const updateSt = {
        ingredients : updatedIngs , 
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    };
    return updateObject(state , updateSt);
}


const setIngredient = (state , action) => {
    return updateObject(state , {
        ingredients : {
            salad : action.ingredients.salad , 
            bacon : action.ingredients.bacon ,
            cheese : action.ingredients.cheese , 
            meat : action.ingredients.meat
        } , 
        totalPrice : 4 , 
        error : false
    });
}

const fetchIngredientsFailed = (state , action) => {
    return updateObject(state , {error : true});
}

const reducer = ( state = initialState , action ) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return addIngredient(state , action);
            // refactoring reducer on above lines 
            // return {
            //     ...state , 
            //     ingredients : {
            //         ...state.ingredients , 
            //         [action.ingredientName] : state.ingredients[action.ingredientName] + 1
            //     } , 
            //     totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            // };
        case actionTypes.REMOVE_INGREDIENT:
           return removeIngredient(state , action);
            // return {
            //     ...state , 
            //     ingredients : {
            //         ...state.ingredients , 
            //         [action.ingredientName] : state.ingredients[action.ingredientName] - 1
            //     } , 
            //     totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            // };
        case actionTypes.SET_INGREDIENTS:
            // return {
            //     ...state , 
            //     ingredients : action.ingredients , 
            //     error : false
            // };
            // Now we hard code ingredients and don't set ingredients equal to the ingredients you get back from the server but to
            // a JS object where you then manually map ingredients. This will loss a bit of flexibility that you had before where 
            // you could simplay take advantage of setting up anything and then using it in your frontend app, though you never
            // had all that flexibility anyways because we have a limited amount of ingredients supported with our css code and 
            // the ingredient property where we also have a switch case statement.
            // return {
            //     ...state , 
            //     ingredients : {
            //         salad : action.ingredients.salad , 
            //         bacon : action.ingredients.bacon ,
            //         cheese : action.ingredients.cheese , 
            //         meat : action.ingredients.meat
            //     } , 
            //     totalPrice : 4 , 
            //     error : false
            // };
            return setIngredient(state , action);
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            // return {
            //     ...state , 
            //     error : true
            // };
           return fetchIngredientsFailed(state , action);
        default: return state;
    }
};

export default reducer;