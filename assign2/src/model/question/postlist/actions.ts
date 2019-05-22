import {
    EDIT_ANSWER,
    EDIT_QUESTION,
    SAVE_UPDATED_ANSWER,
    SAVE_UPDATED_QUESTION,
    AddQuestionAction,
    AddAnswerAction,
    DeleteAnswerAction,
    DeleteQuestionAction,
    EditAnswerAction,
    EditQuestionAction,
    UpdateAnswerAction,
    UpdateQuestionAction,
    RequestPostsAction, REQUEST_POSTS, ReceivePostsAction, RECEIVE_POSTS
} from "./types";
import RestClient, {ResponseData} from "../../../rest/RestClient";
import Answer from "../../objects/Answer";
import Question, {QuestionDTO} from "../../objects/Question";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../../Model";
import {Command} from "../../command/types";

export function doNewPost(data: Question): AddQuestionAction{
    return new AddQuestionAction(data);
}

export function doAddAnswer(data: Answer, questionId: number): AddAnswerAction{
    return new AddAnswerAction(data, questionId);
}

export function doEditAnswer(answerId: number, newText: string): EditAnswerAction{
    return {
        type: EDIT_ANSWER,
        answerId: answerId,
        newText: newText
    };
}

export function doEditQuestion(questionId: number, newText: string): EditQuestionAction{
    return {
        type: EDIT_QUESTION,
        questionId: questionId,
        newText: newText
    };
}


export function doMergeUpdatedAnswer(questionId: number, newData: Answer): UpdateAnswerAction{
    return {
        type: SAVE_UPDATED_ANSWER,
        questionId: questionId,
        data: newData
    };
}

export function doMergeUpdatedQuestion(newData: Question): UpdateQuestionAction{
    return {
        type: SAVE_UPDATED_QUESTION,
        data: newData
    };
}

export function doDeleteAnswer(answerId: number): DeleteAnswerAction{
    return new DeleteAnswerAction(answerId);
}

export function doDeleteQuestion(questionId: number): DeleteQuestionAction{
    return new DeleteQuestionAction(questionId);
}

export function doRequestPosts(): RequestPostsAction {
    return {
        type: REQUEST_POSTS
    };
}

export function doReceivePosts(data: Question[]): ReceivePostsAction {
    return {
        type: RECEIVE_POSTS,
        data: data
    };
}