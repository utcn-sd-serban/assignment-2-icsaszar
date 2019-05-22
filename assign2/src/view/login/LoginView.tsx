import * as React from "react";
import {LoginField} from "../../model/user/types";

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
            <div className="row">
                <div className="col">
                    <button className="btn btn-primary" onClick={onLogin}>
                        Log in
                    </button>
                </div>
            </div>
        </div>
    )
}