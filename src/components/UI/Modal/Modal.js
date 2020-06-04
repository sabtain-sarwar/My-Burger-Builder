import React, { Component } from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import BackDrop from '../BackDrop/BackDrop';

class Modal extends Component {


    shouldComponentUpdate = (nextProps, nextState) => {
        return nextProps.show !== this.props.show ||  nextProps.children !== this.props.children
    };

    componentWillUpdate = () => {
        console.log("[Modal] willUpdate ");
    };


     render () {
         return (
            <Auxiliary>
                <BackDrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal} 
                    style={{
                        transform : this.props.show ? 'translateY(0)' : 'translateY(-100vh)' , 
                        opacity : this.props.show ? '1' : '0'
                    }}>
                    {/* children can be our own component , can be a text , a paragraph that's totally up to us. We can pass anything in there */}
                    {this.props.children}
                </div>
            </Auxiliary>
         );
     }
}


export default Modal;