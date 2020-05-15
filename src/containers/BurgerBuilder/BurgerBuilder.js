import React , { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';


const INGREDIENT_PRICES = {
    salad : 0.5 , 
    cheese : 0.4 , 
    meat  : 1.3 , 
    bacon  : 1.7
};

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 0 , 
            bacon : 0 , 
            cheese : 0 , 
            meat : 0
        } ,
        totalPrice : 4 , 
        purchaseable : false
    };

    updatePurchaseState (ingredients) {
        // const ingredients = {
        //     ...this.state.ingredients getting outdated version of ingredients
        // };
        // console.log(ingredients);
        const sum = Object.keys(ingredients)
            .map(igKey => {
            return ingredients[igKey];
            })
            .reduce((sum , el) => {
                return sum + el;
            } , 0 );
        this.setState({purchaseable : sum > 0});
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({
            totalPrice : newPrice ,
            ingredients : updatedIngredients
        });
        // console.log(this.state.ingredients); why not updating this at this point
        //console.log(updatedIngredients);
        this.updatePurchaseState(updatedIngredients);
    };


    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return; 
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({
            totalPrice : newPrice ,
            ingredients : updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    };

    render () {
        // y this line runs 2 times
        // console.log(this.state.ingredients['salad']); 

        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        // disabledInfo will be look like => {salad : true , meat : false etc}

        return (
            // i want to return 2 adjacent elements at the end
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    price={this.state.totalPrice}
                />
            </Auxiliary>

        ); 
    };
}

export default BurgerBuilder;