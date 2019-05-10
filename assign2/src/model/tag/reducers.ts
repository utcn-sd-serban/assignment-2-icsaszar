import {CREATE_NEW_TAG, EDIT_NEW_TAG_NAME, TagAction, TagState} from "./types";
import * as Data from "../SeedData";
import Tag from "../objects/Tag";

const initialState: TagState = {
    tags: Data.tags,
    newTagName: ""
};

export function tagReducer(state: TagState = initialState, action: TagAction): TagState {
    switch (action.type) {
        case CREATE_NEW_TAG:
            return {
                ...state,
                tags: [...state.tags, new Tag(state.newTagName)]
            };
            case EDIT_NEW_TAG_NAME:
                return {
                    ...state,
                    newTagName: action.newName
                };
        default:
            return state;
    }
}