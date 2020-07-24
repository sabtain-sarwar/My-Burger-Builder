import React , { Component } from 'react';
import { connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

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
                valid : false , 
                touched : false
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
                valid : false , 
                touched : false
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
                    maxLength : 5 , 
                    isNumeric : true
                }, 
                valid : false , 
                touched : false
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
                valid : false , 
                touched : false
            } ,  
            email : {
                elementType : 'input' ,
                elementConfig : {
                    type : 'email' ,
                    placeholder : 'Your E-Mail'
                } ,
                value : '' ,
                validation : {
                    required : true , 
                    isEmail : true
                }, 
                valid : false , 
                touched : false
            } , 
            deliveryMethod : {
                elementType : 'select' ,
                elementConfig : {
                   options : [
                       {value : "fastest" , displayValue : 'Fastest'} ,
                       {value : "cheapest" , displayValue : 'Cheapest'}
                   ]
                } ,
                value : 'cheapest' ,
                valid : true , 
                validation : {}
            } 
        } ,
        loading : false , 
        formIsValid : false
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loading : true});
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        // console.log(formData);
            // {name: "sab", street: "8", zipCode: "zip code 123", country: "pk", email: "sa@gmail.com", …}
        const order = {
            // ingredients : this.props.ingredients , 
            ingredients : this.props.ings , 
            price : this.props.price ,
            orderData : formData
        };

        
        this.props.onOrderBurger(order);
        // axios.post('/orders.json' , order)
        //     .then(response => { 
        //         // console.log(response)
        //         this.setState({loading : false });
        //         this.props.history.push("/");
        //     })
        //     .catch(error => {
        //         // console.log(error)
        //         this.setState({loading : false });
        //     });
    }


    // return true or false determining whether this is valid or not
    checkValidity = (value , rules) => {
        let isValid = true;

        // if we try to access something which doesn't exists then we get an error.1 way to fix is the below one
        // and 2nd way is to simpy add an empty validation obj to the dropdown in state.Now accessing validation and 
        // then the required property will not fail but simply return undefined. 
        if (!rules) {
            return true;
        }

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

        // if (rules.isEmail) {
        //     const pattern = 'pattern comes here';
        //     isValid = pattern.test(value) && isValid;
        // }

        if (rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid;
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
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        // console.log(updatedFormElement);
        let formIsValid = true;
        for ( let inputIdentifier in updatedOrderForm ) {
            // if we loop through all th elements and use that valid attribute , then that attribute is not trur/false for
            // dropdown it's undefined and undefined is always treated as false but is also never changes to true.And if we 
            // console lof formIsValid then it shpws us undefined.A way to fix this is to simply add a valid property to 
            // dropdown even though it doesn't have a validation rules
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm : updatedOrderForm , formIsValid : formIsValid});
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
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event , formElement.id)} /> // here in this anonymous fun we'll get an event
                        // object which is created by React automatically
                ))}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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

const mapStateToProps = state => {
    return {
        ings : state.ingredients ,
        price : state.totalPrice
    };
};


const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData) => dispatch(actions.purchaseBurgerStart(orderData))
    };
};

export default connect(mapStateToProps , mapDispatchToProps)(withErrorHandler(ContactData , axios));