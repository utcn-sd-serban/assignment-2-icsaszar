import {Dispatch} from "redux";
import {doEditAnswer, doEditQuestion, doUpdateAnswer, doUpdateQuestion} from "../model/question/actions";

export const userAccountPresenter = (dispatch: Dispatch) => ({
    handleQuestionInputChange: (questionId: number, value: string) =>
        dispatch(doEditQuestion(questionId, value)),
    handleAnswerInputChange: (answerId: number, value: string) =>
        dispatch(doEditAnswer(answerId, value)),
    handleUpdateQuestion: (questionId: number) =>
        dispatch(doUpdateQuestion(questionId)),
    handleUpdateAnswer: (answerId: number) =>
        dispatch(doUpdateAnswer(answerId)),
});