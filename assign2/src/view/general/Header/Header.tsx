import React from 'react';
import logo from "../../../resources/HeckOverflow.png";
import {Link} from "react-router-dom";

export const Header = ({currentUser}: {currentUser: string}) =>(
    <nav className="navbar navbar-light bg-light navbar-expand">
        <Link className="navbar-brand" to="/">
            <img src={logo} style={{height:50, background: "transparent"}} className="d-inline-block align-top" alt=""/>
            <span style={{fontSize: 30}}> Heck<b>Overflow</b></span>
        </Link>
        <ul className="navbar-nav">
            <li className={"nav-item"}>
                <Link to={"/submit"} className={"nav-link"}> New Post </Link>
            </li>
            <li className="nav-item">
                <Link to={`/users/${currentUser}`} className="nav-link"> Account</Link>
            </li>
        </ul>
    </nav>);

