// Holds the code relevant to building burger only

import React , { Component } from 'react';
import { connect } from 'react-redux';

import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import * as actionTypes from '../../store/actions/actionTypes'; now used the below one 

import * as actions from '../../store/actions/index'; // ../../store/actions if we point to the folder then it will
import thunk from 'redux-thunk';
// automatically pickup index.js due to our build workflow


// const INGREDIENT_PRICES = {
//     salad : 0.5 , 
//     cheese : 0.4 , 
//     meat  : 1.3 , 
//     bacon  : 1.7
// };

class BurgerBuilder extends Component {


    // Purchasing , loading and error are kind of local UI state. We use them to show the different things. We can also manage
    // that through redux and you can definitely manage everything through redux but there also not might be necessity to do 
    // so. So what's definately intresting to manage through redux is ingredients and totalPrice. We passed purchaseable to
    // our build coontrols an there to unlock the order button. So this is also more the UI state. We change something on
    // the UI , it might not be super important for us to manage that through redux

    //    checkout.js
    // we also there have ingredients and price state. And this is a strong case for using Redux bcz here(checkout.js) have
    // the issue of  passing the ingredients through query params

    //      orders.js
    // There we have the orders array in the state and they are actually fetched from server

    // These state properties are relevant to our UI state
    state = {
       // ingredients : null ,
        // totalPrice : 4 , 
        // purchaseable : false , // to enable or disable the order now button
        purchasing : false , // to show or hide the model
        //loading : false ,  //  to display a spinner
        //error : false // to rendered different errors
    };

    componentDidMount () {
        // axios.get('https://react-my-burger-264b5.firebaseio.com/ingredients.json')
        //     .then(response => {
        //         this.setState({ingredients : response.data});
        //     })
        //     .catch(error => {
        //         //console.log(error);
        //         this.setState({error : true});
        //     });
        this.props.onInitIngredients();
    }

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
        // this.setState({purchaseable : sum > 0});
        return sum > 0;
    };


    purchaseHandler = () => {
        this.setState({purchasing : true});
    }


    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount = oldCount + 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({
    //         totalPrice : newPrice ,
    //         ingredients : updatedIngredients
    //     });
    //     // console.log(this.state.ingredients); why not updating this at this point
    //     //console.log(updatedIngredients);
    //     this.updatePurchaseState(updatedIngredients);
    // };


    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount <= 0) {
    //         return; 
    //     }
    //     const updatedCount = oldCount - 1;
    //     const updatedIngredients = {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type] = updatedCount;
    //     const priceDeduction = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice - priceDeduction;
    //     this.setState({
    //         totalPrice : newPrice ,
    //         ingredients : updatedIngredients
    //     });
    //     this.updatePurchaseState(updatedIngredients);
    // };

    purchaseCancelHandler = () => {
       this.setState({purchasing : false});
    };

    purchaseContinueHandler = () => {
        // alert('You can continue');
        // this.setState({loading : true});
        // const order = {
        //     ingredients : this.state.ingredients , 
        //     price : this.state.totalPrice ,
        //     customer : {
        //         name : 'Sabtain Sarwar' , 
        //         address : {
        //             street : 'Green town # 2 , strret # 8' , 
        //             zipCode : '4321' , 
        //             country : 'Germany'
        //         } , 
        //         email : 'sabtain964@gmail.com'
        //     } ,
        //     deliveryMethod : 'fastest'
        // };

        // axios.post('/orders.json' , order)
        //     .then(response => { 
        //         // console.log(response)
        //         this.setState({loading : false ,  purchasing :false});
        //     })
        //     .catch(error => {
        //         // console.log(error)
        //         this.setState({loading : false , purchasing :false});
        //     });

         // Passing ingredients for query param but now we will get from redux store
        // const queryParams = [];
        // for ( let i in this.state.ingredients ) {
        //     // console.log(i); Burger
        //     // console.log(this.state.ingredients[i]); this is the ingredient value like 1 ,2,3
        //    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        //    //console.log(queryParams);
        //    console.log(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // // console.log(queryParams); ["bacon=0" , "cheese=0" , "meat=0" , "salad=0"]
        // queryParams.push('price=' + this.state.totalPrice);
        // const queryString = queryParams.join('&');

        // which basically allows us to basically switch the page and push a new page onto that stack of pages.
        // this.props.history.push({
        //     pathname : '/checkout' ,
        //     search : '?' + queryString
        // });

        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render () {
        // y this line runs 2 times
        // console.log(this.state.ingredients['salad']); 

        //const disabledInfo = {...this.state.ingredients};
        const disabledInfo = {
            ...this.props.ings
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0 
        }
        // disabledInfo will be look like => {salad : true , meat : false etc}

        let orderSummary = null;
        // let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;

        // if (this.state.ingredients) {
        if (this.props.ings) {
            burger = (
                <Auxiliary>
                    {/* <Burger ingredients={this.state.ingredients}/> */}
                    <Burger ingredients={this.props.ings}/>
                    <BuildControls 
                        // ingredientAdded={this.addIngredientHandler}
                        ingredientAdded={this.props.onIngredientAdded}
                        // ingredientRemoved={this.removeIngredientHandler}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        // purchaseable={this.state.purchaseable}
                        purchaseable={this.updatePurchaseState(this.props.ings)}
                        ordered={this.purchaseHandler}
                        // price={this.state.totalPrice}
                        price={this.props.price}
                    />
                </Auxiliary>
            );
            orderSummary = <OrderSummary
                // ingredients={this.state.ingredients} 
                ingredients={this.props.ings} 
                // price={this.state.totalPrice.toFixed(2)}
                price={this.props.price.toFixed(2)}
                purchaseCancelled={this.purchaseCancelHandler}
                purchasedContinued={this.purchaseContinueHandler} />
        }

        // if (this.state.loading) {
        //     orderSummary = <Spinner />
        // }

        return (
            // i want to return 2 adjacent elements at the end
            <Auxiliary>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Auxiliary>

        ); 
    };
}

const mapStateToProps = state => {
    return {
        ings : state.burgerBuilder.ingredients , 
        price : state.burgerBuilder.totalPrice , 
        error : state.burgerBuilder.error
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // onIngredientAdded : (ingName) => dispatch({type : actionTypes.ADD_INGREDIENT , ingredientName : ingName}) ,
        // onIngredientRemoved : (ingName) => dispatch({type : actionTypes.REMOVE_INGREDIENT , ingredientName : ingName}) 
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)) ,
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)) ,
        onInitIngredients : () => dispatch(actions.initIngredients()) ,
        onInitPurchase : () => dispatch(actions.purchaseInit())
    }
};

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(BurgerBuilder , axios));