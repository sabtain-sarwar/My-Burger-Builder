import React , { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';

class BurgerBuilder extends Component {
    render () {
        return (
            // i want to return 2 adjacent elements at the end
            <Auxiliary>
                <div>Burger with all the ingredients</div>
                <div>Build controls.The area where i can add or remove ingredients</div>
            </Auxiliary>

        ); 
    };
}

export default BurgerBuilder;