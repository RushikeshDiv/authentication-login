import React from "react";

import classes from './MainHeader.module.css';
import Navigation from "./Navigation";

const Mainheader=(props)=>
{
    return(
        
        <header className={classes['main-header']}>
            <h1>My website</h1>
            <Navigation isLoggedIn={props.isAuthenticated}
           
            onLogout={props.onLogout}/>
           
           
        </header>
    );
};
export default Mainheader;