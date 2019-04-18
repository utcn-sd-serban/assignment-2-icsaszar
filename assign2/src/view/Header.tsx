import React from 'react';
import logo from "../resources/HeckOverflow.png";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const Header = () =>(
    <nav className="navbar navbar-light bg-light navbar-expand">
        <a className="navbar-brand" href="#">
            <img src={logo} style={{height:50, background: "transparent"}} className="d-inline-block align-top" alt=""/>
            <span style={{fontSize: 30}}> Heck<b>Overflow</b></span>
        </a>
        <ul className="navbar-nav">
            <li className={"nav-item"}>
                <Link to={"submit"} className={"nav-link"}> New Post </Link>
            </li>
            <li className="nav-item">
                <Link to="#" className="nav-link"> About</Link>
            </li>
        </ul>
    </nav>);

