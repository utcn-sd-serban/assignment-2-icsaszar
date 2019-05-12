import {connect} from "react-redux";
import QuestionListView from "./QuestionListView";
import {AppState} from "../../../model/Model";
import {getFilteredQuestions} from "../../../model/question/selectors";
import {Component} from "react";
import {questionListPresenter} from "../../../presesnter/QuestionListPresenter";
import Question from "../../../model/objects/Question";
import * as React from "react";
import {Command} from "../../../model/command/types";
import {ThunkDispatch} from "redux-thunk";


interface Props {
    fetchPosts: () => void;
    fetchTags: () => void;
    fetchUserDetails: () => void;
    questions: Question[];
}

class SmartQuestionListView extends Component<Props>{
    render(){
        return (
            <QuestionListView questions={this.props.questions}/>
        )
    }

    componentDidMount(): void {
        this.props.fetchTags();
        this.props.fetchPosts();
        this.props.fetchUserDetails();
    }
}

function mapStateToProps(state: AppState) {
    return {
        questions: getFilteredQuestions(state)
    }
}

function mapDispatchToProps(dispatch: ThunkDispatch<AppState, undefined, Command>) {
    let presenter = questionListPresenter(dispatch);
    return {
        fetchPosts: () =>
            presenter.handleFetchPosts(),
        fetchTags: () =>
            presenter.handleFetchTags(),
        fetchUserDetails: () =>
            presenter.handleFetchUserDetails()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartQuestionListView);