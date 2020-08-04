import React , { Component } from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    // we are now using redux that's why we have commneted it
    // state = {
    //     orders : [] ,
    //     loading : true
    // };

    componentDidMount () {
        // axios.get("/orders.json")
        //     .then(res => {
        //         console.log(res.data);
        //         // {-MA10dHTDd4Gde6w4L3L: {…}, -MA10hNow81KZ7dDlRQe: {…}}
        //         //     -MA10dHTDd4Gde6w4L3L: {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "7.9"}
        //         //     -MA10hNow81KZ7dDlRQe: {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "13"}
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key] , 
        //                 id : key
        //             });
        //         }
        //         this.setState({loading : false , orders :fetchedOrders});
        //         console.log(fetchedOrders);
        //         // (2) [{…}, {…}]
        //         //     0: {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "7.9", id: "-MA10dHTDd4Gde6w4L3L"}
        //         //     1: {customer: {…}, deliveryMethod: "fastest", ingredients: {…}, price: "13", id: "-MA10hNow81KZ7dDlRQe"}
        //     })
        //     .catch(err => {
        //         this.setState({loading : false});
        //     });
        this.props.onFetchOrders();
    }

    render () {
        let orders = <Spinner />;
        if(!this.props.loading) {
             /* {this.state.orders.map(order => ( */
            orders = this.props.orders.map(order => (
                        <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            price={order.price} 
                        />
                    ))
        }
        return (
            <div>
                {orders}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        orders : state.order.orders , 
        loading : state.order.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders : () => dispatch(actions.fetchOrders())
    };
}

export default connect( mapStateToProps , mapDispatchToProps)( withErrorHandler( Orders , axios ));