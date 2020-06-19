import React , { Component } from 'react';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {


    state = {
        orderForm : {
            name : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Your name'
                } ,
                value : ''
            } , 
            street : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Street'
                } ,
                value : ''
            } ,  
            zipCode : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'ZIP Code'
                } ,
                value : ''
            } , 
            country : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Country'
                } ,
                value : ''
            } ,  
            email : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'email' ,
                    placeholder : 'Your E-Mail'
                } ,
                value : ''
            } , 
            deliveryMethod : {
                elementType : 'select' ,
                elementConfig : {
                   options : [
                       {value : "fastest" , displayValue : 'Fastest'} ,
                       {value : "cheapest" , displayValue : 'Cheapest'}
                   ]
                } ,
                value : ''
            } 
        } ,
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading : true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        // console.log(formData);
            // {name: "sab", street: "8", zipCode: "zip code 123", country: "pk", email: "sa@gmail.com", …}
        const order = {
            ingredients : this.props.ingredients , 
            price : this.props.price ,
            orderData : formData
        };

        axios.post('/orders.json' , order)
            .then(response => { 
                // console.log(response)
                this.setState({loading : false });
                this.props.history.push("/");
            })
            .catch(error => {
                // console.log(error)
                this.setState({loading : false });
            });
    }

    inputChangedHandler = (event , inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        this.setState({orderForm : updatedOrderForm});
    }

    render () {
        const formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id : key , 
                config : this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(formElement => (
                    <Input 
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value} 
                        changed={(event) => this.inputChangedHandler(event , formElement.id)} /> // here in this anonymous fun we'll get an event
                        // object which is created by React automatically
                ))}
                <Button btnType="Success">ORDER</Button>
            </form>
        );
        if( this.state.loading ) {
            form = <Spinner />
        }
        return (
            <div className={classes.ContactData}> 
                <h4>Enter your contact Data</h4>
                {form}
            </div>
        ); 
    }

} 

export default ContactData;