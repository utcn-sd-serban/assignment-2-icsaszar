import {Dispatch} from "redux";
import {doAddAnswer, doSetNewField} from "../model/question/actions";
import User from "../model/objects/User";


export const newAnswerPresenter = (dispatch: Dispatch) => ({
    handleInputChange: (value: string) =>
        dispatch(doSetNewField("answer", value)),

    handleSubmitAnswer: (questionId: string, answerAuthor?: User) =>{
        if(answerAuthor)
            dispatch(doAddAnswer(Number(questionId), answerAuthor))
    }
});