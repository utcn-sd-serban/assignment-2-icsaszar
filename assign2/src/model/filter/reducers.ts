import {FilterActions, FilterState, QuestionFilter, SET_FILTER, SET_SEARCHED_TAG, SET_SEARCHED_TITLE} from "./types";
import Tag from "../objects/Tag";

const initialState: FilterState = {
    currentFilter: QuestionFilter.ALL_POSTS,
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
        case SET_SEARCHED_TITLE:
            return {
                ...state,
              searchedTitle: action.searchedTitle
            };
        case SET_SEARCHED_TAG:
            return {
              ...state,
              searchedTag: action.searchedTag
            };
        default:
            return  state;
    }
}