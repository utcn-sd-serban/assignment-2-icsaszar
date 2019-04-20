import React from "react";
import User from "../../../model/objects/User";
import {AppState} from "../../../model/Model";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {getPostsByAuthorId} from "../../../model/question/selectors";
import {RouteComponentProps} from "react-router";
import {getUserById} from "../../../model/user/selectors";
import Answer from "../../../model/objects/Answer";
import Question from "../../../model/objects/Question";
import UserAccountView from "./UserAccountView";
import {AnswerView} from "../../general/reuseable/AnswerView";
import {QuestionView} from "../../general/reuseable/QuestionView"
import Post from "../../../model/objects/Post";
import {userAccountPresenter} from "../../../presesnter/UserAccountPresenter";

interface Props {
    posts: Post[];
    currentUser?: User;
    viewedProfile?: User;
    onQuestionInputChange: (questionId: number) => (value: string) => void;
    onAnswerInputChange: (answerId: number) => (value: string) => void;
    onUpdateQuestion: (questionId: number) => () => void;
    onUpdateAnswer: (answerId: number) => () => void;
}

class SmartUserAccountView extends React.Component<Props> {
    render() {
        return (
            this.props.viewedProfile &&
            <div>
                <UserAccountView user={this.props.viewedProfile}/>
                {
                    this.props.posts.map( post => {
                        if(post instanceof Question){
                                return (
                                    <QuestionView
                                        key={post.id}
                                        question={post}
                                        editable={{
                                            onSave: this.props.onUpdateQuestion(post.id),
                                            onChangeInput: this.props.onQuestionInputChange(post.id)}}/>
                                );
                        }
                        if(post instanceof Answer)
                                return (
                                    <AnswerView
                                        key={post.id}
                                        answer={post}
                                        editable={{
                                            onSave: this.props.onUpdateAnswer(post.id),
                                            onChangeInput: this.props.onAnswerInputChange(post.id)}}/>
                                );
                        }
                    )
                }
            </div>
        )
    }
}

function mapStateToProps(state: AppState, props: RouteComponentProps<{ id: string }>) {
    const currentUser = state.userState.currentUser;
    return {
        currentUser: currentUser,
        posts: currentUser ? getPostsByAuthorId(state, Number(props.match.params.id)) : [],
        viewedProfile: getUserById(state, Number(props.match.params.id))
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    const presenter = userAccountPresenter(dispatch);
    return {
        onQuestionInputChange: (questionId: number) => (value: string) =>
            presenter.handleQuestionInputChange(questionId, value),
        onAnswerInputChange: (answerId: number) => (value: string) =>
            presenter.handleAnswerInputChange(answerId, value),
        onUpdateQuestion: (questionId: number) => () =>
            presenter.handleUpdateQuestion(questionId),
        onUpdateAnswer: (answerId: number) => () =>
            presenter.handleUpdateAnswer(answerId)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartUserAccountView);