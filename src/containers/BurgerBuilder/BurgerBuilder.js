import React , { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {
    render () {
        return (
            // i want to return 2 adjacent elements at the end
            <Auxiliary>
                <Burger />
                <div>Build controls.The area where i can add or remove ingredients</div>
            </Auxiliary>

        ); 
    };
}

export default BurgerBuilder;