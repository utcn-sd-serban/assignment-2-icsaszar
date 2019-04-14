import {Dispatch} from "redux";
import {doNewPost} from "../model/question/actions";
import User from "../model/objects/User";
import {connect} from "react-redux";
import React from "react";

interface Props {
    onCreate: (title: string, text: string) => void
}

interface State {
    title: string;
    text: string;
    canSubmit: boolean;
}

class NewPostPresenter extends React.Component<Props, State>{
    state: State = {
        title: "",
        text: "",
        canSubmit: false
    };

    handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        let newState = {
            ...this.state,
            [e.target.name]: e.target.value
        };
        this.setState({
            ...newState,
            canSubmit: (newState.text.trim() !== "") && (newState.title.trim() !== "")
        });
    };

    handleOnCreate = () => {
        this.props.onCreate(this.state.title.trim(), this.state.text.trim())
    };
}

