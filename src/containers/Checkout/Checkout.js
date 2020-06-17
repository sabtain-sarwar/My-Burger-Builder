import React , { Component } from 'react';
import { Route } from 'react-router-dom';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {

    state = {
        ingredients : null , 
        price : 0
    }

    // The initial ingredients are null and below in the render method if we pass ingredients to ContactData and we try to 
    // render the burger there then that doesn't work with ingredients that are null. Now to fix this what we can do is we
    // simply change componentDidMount to componentWillMount, so before we render the child component and so we cans et up
    // the state prior to render children.
    // componentDidMount () {
    componentWillMount () {
        // console.log(this.props.location.search);
        const query = new URLSearchParams(this.props.location.search);
        // console.log(query.entries() );
        const ingredients = {};
        let price = 0;
        for (let param of query.entries()) {
            console.log(param);
            // console.log(param); ['salad' , 1]
            if (param[0] === 'price') {
                price = param[1];
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        // console.log(ingredients);
        this.setState({ingredients : ingredients , price : price});
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
                    <Route 
                        path={this.props.match.path + '/contact-data'} 
                        render={(props) => <ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />} 
                    />
            </div>
        );
    }
}

export default Checkout;