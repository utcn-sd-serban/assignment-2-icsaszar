import User from "../model/objects/User";
import {doSetNewField} from "../model/question/newpost/actions";
import {sendAnswer} from "../model/question/postlist/asyncActions";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";


export const newAnswerPresenter = (dispatch: ThunkDispatch<AppState, undefined, Command>) => ({
    handleInputChange: (value: string) =>
        dispatch(doSetNewField("answer", value)),

    handleSubmitAnswer: (questionId: string, answerAuthor?: User) =>{
        if(answerAuthor)
            //sendAnswer
            dispatch(sendAnswer(Number(questionId)))
    }
});