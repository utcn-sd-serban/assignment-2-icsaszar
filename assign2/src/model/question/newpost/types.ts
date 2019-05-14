import Tag from "../../objects/Tag";
import {Command} from "../../command/types";


export const SET_NEW_POST_FIELD = "[NEW POST] SET NEW POST FIELD";
export const SET_CURRENT_TAG = "[NEW POST] SET CURRENT TAG";
export const ADD_TAG_TO_SELECTED_TAGS = "[NEW POST] ADD TAG TO SELECTED TAGS";
export const CLEAR_NEW_POST_DATA = "[NEW POST] CLEAR NEW POST DATA";

export interface NewPostState {
    newTitle: string;
    newText: string;
    currentTag: Tag;
    selectedTags: Tag[];
    newAnswerText: string;
}

export type NewPostField = "title" | "text" | "answer";

export interface SetNewPostFieldAction extends Command {
    type: typeof SET_NEW_POST_FIELD
    field: NewPostField
    value: string
}

export interface SetCurrentTagAction extends Command {
    type: typeof SET_CURRENT_TAG
    currentTag: Tag
}

export interface AddTagToSelectedTagsAction extends Command {
    type: typeof ADD_TAG_TO_SELECTED_TAGS
}

export interface ClearNewPostDataAction extends Command {
    type: typeof CLEAR_NEW_POST_DATA
}

export type NewPostActions = | SetCurrentTagAction
                             | SetNewPostFieldAction
                             | AddTagToSelectedTagsAction
                             | ClearNewPostDataAction;