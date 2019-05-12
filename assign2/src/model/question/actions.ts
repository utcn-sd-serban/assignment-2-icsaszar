import User from "../objects/User";
import {
    ADD_TAG_TO_SELECTED_TAGS,
    CLEAR_NEW_POST_DATA,
    EDIT_ANSWER,
    EDIT_QUESTION,
    NewPostField,
    SET_CURRENT_TAG,
    SET_NEW_POST_FIELD,
    SAVE_UPDATED_ANSWER,
    SAVE_UPDATED_QUESTION,
    NewPostAction,
    AddAnswerAction,
    DeleteAnswerAction,
    DeleteQuestionAction,
    SetNewPostFieldAction,
    SetCurrentTagAction,
    AddTagToSelectedTagsAction,
    ClearNewPostDataAction,
    EditAnswerAction,
    EditQuestionAction,
    UpdateAnswerAction,
    UpdateQuestionAction,
    RequestPostsAction, REQUEST_POSTS, ReceivePostsAction, RECEIVE_POSTS
} from "./types";
import Tag from "../objects/Tag";
import Question, {QuestionDTO} from "../objects/Question";
import RestClient from "../../rest/RestClient";
import {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";
import {AppState} from "../Model";
import {Command} from "../command/types";
import {number} from "prop-types";

export function doNewPost(data: Question, status: 'succeeded' | 'failed'): NewPostAction{
    return new NewPostAction(data, status);
}

export function doSetNewField(field: NewPostField, newValue: string): SetNewPostFieldAction{
    return {
        type: SET_NEW_POST_FIELD,
        field: field,
        value: newValue
    };
}

export function doSetCurrentTag(currentTag: Tag): SetCurrentTagAction {
    return {
        type: SET_CURRENT_TAG,
        currentTag: currentTag
    };
}

export function doAddTagToSelectedTags(): AddTagToSelectedTagsAction {
    return {
        type: ADD_TAG_TO_SELECTED_TAGS
    };
}

export function doClearNewPostData(): ClearNewPostDataAction {
    return {
        type: CLEAR_NEW_POST_DATA
    };
}

export function doAddAnswer(questionId: number, author: User): AddAnswerAction{
    return new AddAnswerAction(questionId, author);
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

export function doUpdateAnswer(answerId: number): UpdateAnswerAction{
    return {
        type: SAVE_UPDATED_ANSWER,
        answerId: answerId
    };
}

export function doUpdateQuestion(questionId: number): UpdateQuestionAction{
    return {
        type: SAVE_UPDATED_QUESTION,
        questionId: questionId
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

export function doReceivePosts(data: Question[], status: 'succeeded' | 'failed'): ReceivePostsAction {
    return {
        type: RECEIVE_POSTS,
        data: data,
        status: status
    };
}

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Command>;

export function fetchPosts(): ThunkResult<void>{
    return function(dispatch, getState){
        let {userState: {currentUser}} = getState();
        if(currentUser){
            dispatch(doRequestPosts());
            let restClient = new RestClient(currentUser.name, currentUser.password);
            return restClient.loadPosts().then(
                response => {
                    if (response.status === 'succeeded')
                        response.data.json().then(data =>
                            dispatch(doReceivePosts(data, response.status)))

                })
        }
    }
}

export function sendNewPost(): ThunkResult<void> {
    return function (dispatch, getState) {
        let {userState: {currentUser}} = getState();
        if(currentUser){
            let restClient = new RestClient(currentUser.name, currentUser.password);
            let {newText, newTitle, selectedTags} = getState().questionState.newQuestion;
            let qDTO: QuestionDTO = {
                author: currentUser,
                tags: selectedTags,
                text: newText,
                title: newTitle
            };
            return restClient.sendNewPost(qDTO).then(
                response => {
                    if (response.status === 'succeeded')
                        response.data.json().then(data =>
                            dispatch(doNewPost(data, response.status)))

                })
        }
    }

}