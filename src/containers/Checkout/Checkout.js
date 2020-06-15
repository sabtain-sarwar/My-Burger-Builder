import React , { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {

    state = {
        ingredients : {
            salad : 1 ,
            meat : 1 ,
            cheese : 1 , 
            bacon : 1
        }
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
            </div>
        );
    }
}

export default Checkout;