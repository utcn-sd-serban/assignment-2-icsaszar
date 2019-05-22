import {LoginField} from "../../model/user/types";
import {Component, FunctionComponent} from "react";
import {LoginView} from "./LoginView";
import * as React from "react";
import {AppState} from "../../model/Model";
import {Dispatch} from "redux";
import {loginPresenter} from "../../presesnter/LoginPresenter";
import {connect} from "react-redux";

interface Props {
    username: string;
    password: string;
    onLogin: (username: string, password: string) => () => void;
    onChangeInput: (field: LoginField, value: string) => void;
}

class SmartLoginView extends Component<Props>{

    render(){
        let {onLogin, password, username, onChangeInput} = this.props;
        return (
            <LoginView
                username={username}
                password={password}
                onLogin={onLogin(username, password)}
                onChangeInput={onChangeInput}
            />
        )
    }
}

function mapStateToProps(state: AppState): Pick<Props, "password" | "username"> {
    return {
        username: state.userState.tempUsername,
        password: state.userState.tempPassword
    }
}

function mapDispatchToProps(dispatch: Dispatch): Pick<Props, "onChangeInput" | "onLogin" > {
    const presenter = loginPresenter(dispatch);
    return {
        onLogin: (username, password) => () =>
            presenter.handleLogin(username, password),
        onChangeInput: (field, value) =>
            presenter.handleInputChange(field, value)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartLoginView);
