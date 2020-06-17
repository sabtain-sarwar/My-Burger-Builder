import React , { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {

    state = {
        orders : [] ,
        loading : true
    };

    componentDidMount () {
        axios.get("/orders.json")
            .then(res => {
                console.log(res.data);
                // {-MA10dHTDd4Gde6w4L3L: {…}, -MA10hNow81KZ7dDlRQe: {…}}
                //     -MA10dHTDd4Gde6w4L3L: {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "7.9"}
                //     -MA10hNow81KZ7dDlRQe: {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "13"}
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key] , 
                        id : key
                    });
                }
                this.setState({loading : false , orders :fetchedOrders});
                console.log(fetchedOrders);
                // (2) [{…}, {…}]
                //     0: {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "7.9", id: "-MA10dHTDd4Gde6w4L3L"}
                //     1: {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "13", id: "-MA10hNow81KZ7dDlRQe"}
            })
            .catch(err => {
                this.setState({loading : false});
            });
    }

    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} 
                    />
                ))}
            </div>
        );
    }
}

export default withErrorHandler( Orders , axios );