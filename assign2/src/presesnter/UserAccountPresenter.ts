import {Dispatch} from "redux";
import {
    doDeleteAnswer,
    doDeleteQuestion,
    doEditAnswer,
    doEditQuestion,
} from "../model/question/postlist/actions";
import {sendEditedAnswer, sendEditedQuestion} from "../model/question/postlist/asyncActions";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";

export const userAccountPresenter = (dispatch: ThunkDispatch<AppState, undefined, Command>) => ({
    handleQuestionInputChange: (questionId: number, value: string) =>
        dispatch(doEditQuestion(questionId, value)),
    handleAnswerInputChange: (answerId: number, value: string) =>
        dispatch(doEditAnswer(answerId, value)),
    handleUpdateQuestion: (questionId: number, newText: string) =>
        dispatch(sendEditedQuestion(questionId, newText)),
    handleUpdateAnswer: (answerId: number, newText: string, questionId: number) =>
        dispatch(sendEditedAnswer(answerId, questionId, newText)),
    handleDeleteQuestion: (questionId: number) =>
        dispatch(doDeleteQuestion(questionId)),
    handleDeleteAnswer: (answerId: number) =>
        dispatch(doDeleteAnswer(answerId)),
});