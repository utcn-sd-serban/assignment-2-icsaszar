import {
    ADD_TAG_TO_SELECTED_TAGS, AddTagToSelectedTagsAction,
    CLEAR_NEW_POST_DATA, ClearNewPostDataAction,
    NewPostField, SET_CURRENT_TAG,
    SET_NEW_POST_FIELD, SetCurrentTagAction,
    SetNewPostFieldAction
} from "./types";
import Tag from "../../objects/Tag";

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