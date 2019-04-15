import User from "../objects/User";
import {
    ADD_TAG_TO_SELECTED_TAGS,
    CLEAR_NEW_POST_DATA,
    NEW_POST,
    QuestionActions,
    SET_CURRENT_TAG,
    SET_NEW_POST_TEXT,
    SET_NEW_POST_TITLE
} from "./types";
import Tag from "../objects/Tag";


export function doNewPost(author: User): QuestionActions{
    return {
        type: NEW_POST,
        postAuthor: author
    };
}

export function doSetNewTitle(newTitle: string): QuestionActions{
    return {
        type: SET_NEW_POST_TITLE,
        newTitle: newTitle
    };
}

export function doSetNewText(newText: string): QuestionActions{
    return {
        type: SET_NEW_POST_TEXT,
        newText: newText
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