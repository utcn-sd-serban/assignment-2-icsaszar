import React from 'react';
import User from "../../../model/objects/User";

export default function UserAccountView({user}: {user: User}) {
    return(
        <div className="container">
            <div className="row ">
                <div className="col">
                    <h3> {user.username} </h3>
                </div>
            </div>
        </div>
    );
}