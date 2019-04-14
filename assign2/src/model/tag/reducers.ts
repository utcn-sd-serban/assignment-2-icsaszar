import {NEW_TAG, TagAction, TagState} from "./types";
import * as Data from "../SeedData";
import Tag from "../objects/Tag";

const initialState: TagState = {
    tags: Data.tags
};

export function tagReducer(state: TagState = initialState, action: TagAction): TagState {
    switch (action.type) {
        case NEW_TAG:
            return {
                ...state,
                tags: [...state.tags, new Tag(action.tagName)]
            };
        default:
            return state;
    }
}