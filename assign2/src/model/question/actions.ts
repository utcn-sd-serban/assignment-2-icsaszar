import User from "../objects/User";
import {
    ADD_ANSWER_TO_QUESTION,
    ADD_TAG_TO_SELECTED_TAGS,
    CLEAR_NEW_POST_DATA, DELETE_ANSWER, DELETE_QUESTION, EDIT_ANSWER, EDIT_QUESTION,
    NEW_POST, NewPostField,
    QuestionActions,
    SET_CURRENT_TAG, SET_NEW_POST_FIELD
} from "./types";
import Tag from "../objects/Tag";
import Answer from "../objects/Answer";


export function doNewPost(author: User): QuestionActions{
    return {
        type: NEW_POST,
        postAuthor: author
    };
}

export function doSetNewField(field: NewPostField, newValue: string): QuestionActions{
    return {
        type: SET_NEW_POST_FIELD,
        field: field,
        value: newValue
    };
}

export function doSetCurrentTag(currentTag: Tag): QuestionActions {
    return {
        type: SET_CURRENT_TAG,
        currentTag: currentTag
    };
}

export function doAddTagToSelectedTags(): QuestionActions {
    return {
        type: ADD_TAG_TO_SELECTED_TAGS
    };
}

export function doClearNewPostData(): QuestionActions {
    return {
        type: CLEAR_NEW_POST_DATA
    };
}

export function doAddAnswer(questionId: number, author: User): QuestionActions{
    return {
        type: ADD_ANSWER_TO_QUESTION,
        answerAuthor: author,
        targetQuestionId: questionId
    };
}

export function doEditAnswer(answerId: number, newText: string): QuestionActions{
    return {
        type: EDIT_ANSWER,
        answerId: answerId,
        newText: newText
    };
}

export function doEditQuestion(questionId: number, newText: string): QuestionActions{
    return {
        type: EDIT_QUESTION,
        questionId: questionId,
        newText: newText
    };
}

export function doDeleteAnswer(answerId: number): QuestionActions{
    return {
        type: DELETE_ANSWER,
        answerId: answerId
    };
}

export function doDeleteQuestion(questionId: number): QuestionActions{
    return {
        type: DELETE_QUESTION,
        questionId: questionId
    };
}