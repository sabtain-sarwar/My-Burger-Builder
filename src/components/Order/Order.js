import React from 'react';
import classes from './Order.module.css';

const Order = (props) => {

    const ingredients = [];
     console.log(props.ingredients);
    // transforming ingredients obj into an array
    for (let ingredientName in props.ingredients ) {
        console.log(ingredientName);
        ingredients.push(
            {
                name : ingredientName , 
                amount : props.ingredients[ingredientName]
            }
        );
    }


    //console.log(ingredients);
    // (4) [{…}, {…}, {…}, {…}]
    //     0: {name: "bacon", amount: 1}
    //     1: {name: "cheese", amount: 1}
    //     2: {name: "meat", amount: 1}
    //     3: {name: "salad", amount: 1}
    //     length: 4

    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform : "capitalize" ,
                display : "inline-block" ,
                margin : '0 8px' ,
                border : '1px solid #ccc' ,
                padding : '5px'
            }}
            key={ig.name}> {ig.name} ({ig.amount}) </span>;
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients : {ingredientOutput}</p>
            <p>Price : <strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    );
};

export default Order;