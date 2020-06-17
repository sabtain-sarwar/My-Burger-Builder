import React , { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients : {
            salad : 1 ,
            meat : 1 ,
            cheese : 1 , 
            bacon : 1
        }
    }

    componentDidMount () {
        // console.log(this.props.location.search);
        const query = new URLSearchParams(this.props.location.search);
        // console.log(query.entries() );
        const ingredients = {};
        for (let param of query.entries()) {
            console.log(param);
            // console.log(param); ['salad' , 1]
            ingredients[param[0]] = +param[1];
        }
        // console.log(ingredients);
        this.setState({ingredients : ingredients});
    }

    checkoutCancelledHandler = () => {
        // simply goes back to the last page
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        // replacing the current route
        this.props.history.replace("/checkout/contact-data");
    };

    render() {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients} 
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
                    <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
            </div>
        );
    }
}

export default Checkout;