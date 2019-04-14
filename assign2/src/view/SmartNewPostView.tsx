import React, {Component} from "react";
import User from "../model/objects/User";
import {doNewPost} from "../model/question/actions";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {NewPostView} from "./NewPostView";


interface Props {
    onCreate: (title: string, text: string) => void
}

interface State {
    title: string;
    text: string;
    canSubmit: boolean;
}

class SmartNewPostView extends Component<Props, State>{
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

    render(){
        return (
            <NewPostView
                text={this.state.text}
                title={this.state.title}
                onChange={this.handleOnChange}
                onClick={this.handleOnCreate}
                buttonDisabled={!this.state.canSubmit}/>
        );
    }
}

function mapDispatchToPros(dispatch: Dispatch) {
    return {
        onCreate: (title: string, text: string) =>
            dispatch(doNewPost(title, text, new User("TEST")))
    }
}

export default connect(null, mapDispatchToPros)(SmartNewPostView);