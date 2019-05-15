import {CREATE_NEW_TAG, DELETE_TAG, EDIT_NEW_TAG_NAME, RECEIVE_TAGS, REQUEST_TAGS, TagAction, TagState} from "./types";
import * as Data from "../SeedData";
import Tag from "../objects/Tag";

const initialState: TagState = {
    tags: Data.tags,
    newTagName: "",
    isFetching: false,
    lastFetched: new Date(0)
};

export function tagReducer(state: TagState = initialState, action: TagAction): TagState {
    switch (action.type) {
        case DELETE_TAG:
            return {
                ...state,
                tags: state.tags.filter(t => t.id !== action.id)
            };
        case REQUEST_TAGS:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_TAGS:
            return {
                ...state,
                isFetching: false,
                lastFetched: new Date(),
                tags: action.data
            };
        case CREATE_NEW_TAG:
            return {
                ...state,
                tags: [...state.tags, new Tag(action.name, action.id)]
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