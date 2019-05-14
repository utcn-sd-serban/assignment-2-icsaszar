import React, {Component} from 'react';
import User from "../../../model/objects/User";
import {NewAnswerView} from "./NewAnswerView";
import {Dispatch} from "redux";
import {AppState} from "../../../model/Model";
import {newAnswerPresenter} from "../../../presesnter/NewAnswerPresenter";
import {connect} from "react-redux";

interface Props {
    currentUser?: User;
    currentQuestionId: string;
    currentText: string;

    onSubmitAnswer: (currentQuestionId: string, postAuthor?: User) => () => void;
    onChangeInput: (newValue: string) => void;
}

class SmartNewAnswerView extends React.Component<Props>{
    render(){
        const {currentText, currentUser, currentQuestionId} = this.props;
        return (
            <NewAnswerView
                currentAnswerText={currentText}
                onChangeInput={this.props.onChangeInput}
                onSubmit={this.props.onSubmitAnswer(currentQuestionId, currentUser)}
            />
        );
    }
}

function mapStateToProps(state: AppState, props: {currentQuestionId: string}) {
    return {
        currentUser: state.userState.currentUser,
        currentText: state.questionState.newPostState.newAnswerText,
        currentQuestionId: props.currentQuestionId
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    const presenter = newAnswerPresenter(dispatch);
    return {
        onSubmitAnswer: (currentQuestionId: string, postAuthor?: User) => () =>
            presenter.handleSubmitAnswer(currentQuestionId, postAuthor),
        onChangeInput: (newValue: string) =>
            presenter.handleInputChange(newValue)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartNewAnswerView);