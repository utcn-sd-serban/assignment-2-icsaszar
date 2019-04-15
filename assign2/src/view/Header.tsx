import React from 'react';
import logo from "../resources/HeckOverflow.png";

export const Header = () =>(
    <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="#">
            <img src={logo} style={{height:50, background: "transparent"}} className="d-inline-block align-top" alt=""/>
            <span style={{fontSize: 30}}> Heck<b>Overflow</b></span>
        </a>
    </nav>);

