import React , { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';


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
        purchaseable : false ,
        purchasing : false , 
        loading : false
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
    };


    purchaseHandler = () => {
        this.setState({purchasing : true});
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

    purchaseCancelHandler = () => {
       this.setState({purchasing : false});
    };

    purchaseContinueHandler = () => {
        // alert('You can continue');
        this.setState({loading : true});
        const order = {
            ingredients : this.state.ingredients , 
            price : this.state.totalPrice ,
            customer : {
                name : 'Sabtain Sarwar' , 
                address : {
                    street : 'Green town # 2 , strret # 8' , 
                    zipCode : '4321' , 
                    country : 'Germany'
                } , 
                email : 'sabtain964@gmail.com'
            } ,
            deliveryMethod : 'fastest'
        };

        axios.post('/orders.json' , order)
            .then(response => { 
                // console.log(response)
                this.setState({loading : false ,  purchasing :false});
            })
            .catch(error => {
                // console.log(error)
                this.setState({loading : false , purchasing :false});
            });
    };

    render () {
        // y this line runs 2 times
        // console.log(this.state.ingredients['salad']); 

        const disabledInfo = {...this.state.ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        // disabledInfo will be look like => {salad : true , meat : false etc}

        let orderSummary = <OrderSummary
            ingredients={this.state.ingredients} 
            price={this.state.totalPrice.toFixed(2)}
            purchaseCancelled={this.purchaseCancelHandler}
            purchasedContinued={this.purchaseContinueHandler} />

        if (this.state.loading) {
            orderSummary = <Spinner />
        }

        return (
            // i want to return 2 adjacent elements at the end
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    purchaseable={this.state.purchaseable}
                    ordered={this.purchaseHandler}
                    price={this.state.totalPrice}
                />
            </Auxiliary>

        ); 
    };
}

export default withErrorHandler(BurgerBuilder , axios);