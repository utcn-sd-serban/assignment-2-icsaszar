import React from "react";
import User from "../../../model/objects/User";
import {AppState} from "../../../model/Model";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {getPostsByAuthorId, UserPosts} from "../../../model/question/postlist/selectors";
import {RouteComponentProps} from "react-router";
import UserAccountView from "./UserAccountView";
import {AnswerView} from "../../general/reuseable/AnswerView";
import {QuestionView} from "../../general/reuseable/QuestionView"
import {userAccountPresenter} from "../../../presesnter/UserAccountPresenter";

interface Props {
    posts: UserPosts;
    currentUser?: User;
    onQuestionInputChange: (questionId: number) => (value: string) => void;
    onAnswerInputChange: (answerId: number) => (value: string) => void;
    onUpdateQuestion: (questionId: number, newText: string) => () => void;
    onUpdateAnswer: (answerId: number, newText: string, questionId: number) => () => void;
    onDeleteQuestion: (questionId: number) => () => void;
    onDeleteAnswer: (answerId: number) => () => void;
}

class SmartUserAccountView extends React.Component<Props> {
    render() {
        return (
            this.props.currentUser &&
            <div>
                <UserAccountView user={this.props.currentUser}/>
                <div>
                    {
                        this.props.posts.questions.map(question => (
                            <QuestionView
                                key={question.id}
                                question={question}
                                editable={{
                                    onSave: this.props.onUpdateQuestion(question.id, question.tempText),
                                    onChangeInput: this.props.onQuestionInputChange(question.id)
                                }}
                                onDelete={this.props.onDeleteQuestion(question.id)}
                            />
                        ))
                    }
                </div>
                <div>
                    {
                        this.props.posts.answers.map(answer =>
                            (
                                <AnswerView
                                    key={answer.id}
                                    answer={answer}
                                    editable={{
                                        onSave: this.props.onUpdateAnswer(answer.id, answer.tempText, answer.responseTo),
                                        onChangeInput: this.props.onAnswerInputChange(answer.id)
                                    }}
                                    onDelete={this.props.onDeleteAnswer(answer.id)}
                                />
                            )
                        )
                    }
                </div>
                }
            </div>
        )
    }
}

function mapStateToProps(state: AppState, props: RouteComponentProps<{ id: string }>) {
    const currentUser = state.userState.currentUser;
    return {
        currentUser: currentUser,
        posts: currentUser ? getPostsByAuthorId(state, Number(props.match.params.id)) : {questions: [], answers: []}
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    const presenter = userAccountPresenter(dispatch);
    return {
        onQuestionInputChange: (questionId: number) => (value: string) =>
            presenter.handleQuestionInputChange(questionId, value),
        onAnswerInputChange: (answerId: number) => (value: string) =>
            presenter.handleAnswerInputChange(answerId, value),
        onUpdateQuestion: (questionId: number, newText: string) => () =>
            presenter.handleUpdateQuestion(questionId, newText),
        onUpdateAnswer: (answerId: number, newText: string, questionId: number) => () =>
            presenter.handleUpdateAnswer(answerId, newText, questionId),
        onDeleteQuestion: (questionId: number) => () =>
            presenter.handleDeleteQuestion(questionId),
        onDeleteAnswer: (answerId: number) => () =>
            presenter.handleDeleteAnswer(answerId)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartUserAccountView);