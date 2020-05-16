import React from 'react';
import classes from './Modal.module.css';

const Modal = (props) => (
    <div 
        className={classes.Modal} 
        style={{
            transform : props.show ? 'translateY(0)' : 'translayteY(-100vh)' , 
            opacity : props.show ? '1' : '0'
        }}>
        {/* children can be our own component , can be a text , a paragraph that's totally up to us. We can pass anything in there */}
        {props.children}
    </div>
);

export default Modal;