import * as React from "react";
import {LoginField} from "../../model/user/types";
import {Redirect} from "react-router";
import {Link} from "react-router-dom";

interface Props {
    username: string;
    password: string;
    onLogin: () => void;
    onChangeInput: (field: LoginField, newValue: string) => void;
}

export function LoginView(
    {
        onLogin,
        password,
        username,
        onChangeInput
    }: Props) {

    return (
        <div className="container h-100 justify-content-center align-items-center mx-auto">
            <div className="row ">
                <div className="col">
                    Username
                </div>
                <div className="col">
                    <input
                        onChange={({target: {value}}) => onChangeInput("username", value)}
                        value={username}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    Password
                </div>
                <div className="col">
                    <input
                        onChange={({target: {value}}) => onChangeInput("password", value)}
                        value={password}
                    />
                </div>
            </div>
            < div className="row">
                <div className="col">
                    <Link to={"/posts"}>
                        <button className="btn btn-primary" onClick={onLogin}>
                            Log in
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    )
}