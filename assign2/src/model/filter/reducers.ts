import {ALL_POSTS, FilterActions, FilterState, SET_FILTER} from "./types";
import Tag from "../objects/Tag";

const initialState: FilterState = {
    currentFilter: ALL_POSTS,
    searchedTag: new Tag(),
    searchedTitle: ""

};

export function filterReducer(state: FilterState = initialState, action: FilterActions): FilterState {
    switch (action.type) {
        case SET_FILTER:
            return {
                ...state,
                currentFilter: action.filter
            };
        default:
            return  state;
    }
}