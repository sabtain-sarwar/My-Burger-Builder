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
                value : '' ,
                validation : {
                    required : true
                } , 
                valid : false
            } , 
            street : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Street'
                } ,
                value : '' ,
                validation : {
                    required : true
                }, 
                valid : false
            } ,  
            zipCode : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'ZIP Code'
                } ,
                value : '' ,
                validation : {
                    required : true ,
                    minLength : 5 ,
                    maxLength : 5
                }, 
                valid : false
            } , 
            country : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'text' ,
                    placeholder : 'Country'
                } ,
                value : '' ,
                validation : {
                    required : true
                }, 
                valid : false
            } ,  
            email : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'email' ,
                    placeholder : 'Your E-Mail'
                } ,
                value : '' ,
                validation : {
                    required : true
                }, 
                valid : false
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


    // return true or false determining whether this is valid or not
    checkValidity = (value , rules) => {
        let isValid = true;
        if (rules.required) {
            // i want to set isValid equal to the value comparison. So isValid should be equal if it is not equal to an
            // empty string.And we use trim there to remove any white spaces
            isValid = value.trim() !== '' && isValid;
            // Now isValid is equal to true/false dpending on the check if the trimmed value is unequal to empty string
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid ;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid ;
        }
        return isValid;
    }

    inputChangedHandler = (event , inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation);
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        console.log(updatedFormElement);
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
                        inValid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
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