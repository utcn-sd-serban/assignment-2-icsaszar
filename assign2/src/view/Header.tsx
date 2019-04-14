import React from 'react';
import logo from "../resources/HeckOverflow.png";

export const Header = () =>(
    <div style={{display: "inline", whiteSpace: "nowrap"}}>
        <img src={logo} style={{height: 100, whiteSpace: "nowrap"}}/>
        <h1>
            {/*https://i.redd.it/2k1ut81gpcl01.png*/}
            Heck<b>Overflow</b>
        </h1>
    </div>);

