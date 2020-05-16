import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = ( props ) => {
    return (
        <Auxiliary>
            <Toolbar />
            <main className={classes.Content}>
                {props.children}
            </main>
        </Auxiliary>
    )
};

export default Layout;