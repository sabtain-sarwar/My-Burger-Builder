import React from 'react';
import classes from './Modal.module.css';
import Auxiliary from '../../../hoc/Auxiliary';
import BackDrop from '../BackDrop/BackDrop';

const Modal = (props) => (
    <Auxiliary>
        <BackDrop show={props.show} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal} 
            style={{
                transform : props.show ? 'translateY(0)' : 'translateY(-100vh)' , 
                opacity : props.show ? '1' : '0'
            }}>
            {/* children can be our own component , can be a text , a paragraph that's totally up to us. We can pass anything in there */}
            {props.children}
        </div>
    </Auxiliary>
);

export default Modal;