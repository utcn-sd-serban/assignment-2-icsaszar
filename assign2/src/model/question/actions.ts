import User from "../objects/User";
import {
    ADD_ANSWER_TO_QUESTION,
    ADD_TAG_TO_SELECTED_TAGS,
    CLEAR_NEW_POST_DATA,
    DELETE_ANSWER,
    DELETE_QUESTION,
    EDIT_ANSWER,
    EDIT_QUESTION,
    NEW_POST,
    NewPostField,
    QuestionActions,
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
    ClearNewPostDataAction, EditAnswerAction, EditQuestionAction, UpdateAnswerAction, UpdateQuestionAction
} from "./types";
import Tag from "../objects/Tag";


export function doNewPost(author: User): NewPostAction{
    return new NewPostAction(author);
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