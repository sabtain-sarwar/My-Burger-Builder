import React , { Component } from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 0 , 
            bacon : 0 , 
            cheese : 0 , 
            meat : 0
        }
    };

    render () {
        // y this line runs 2 times
        // console.log(this.state.ingredients['salad']); 
        return (
            // i want to return 2 adjacent elements at the end
            <Auxiliary>
                <Burger ingredients={this.state.ingredients}/>
                <div>Build controls.The area where i can add or remove ingredients</div>
            </Auxiliary>

        ); 
    };
}

export default BurgerBuilder;