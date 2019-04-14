import Tag from "../objects/Tag";

export const ALL_POSTS = "ALL_POSTS";
export const FILTER_BY_TITLE = "FILTER_BY_TITLE";
export const FILTER_BY_TAG = "FILTER_BY_TAG";

export const SET_FILTER = "SET_FILTER";
export const SET_SEARCHED_TITLE = "SET_SEARCHED_TITLE";
export const SET_SEARCHED_TAG = "SET_SEARCHED_TAG";

export type QuestionFilter = typeof ALL_POSTS | typeof FILTER_BY_TAG | typeof FILTER_BY_TITLE;

export interface FilterState {
    searchedTitle: string;
    searchedTag: Tag;
    currentFilter: QuestionFilter;
}



interface SetFilterAction {
    type: typeof SET_FILTER;
    filter: QuestionFilter;
}

interface SetSearchedTitleAction {
    type: typeof SET_SEARCHED_TITLE;
    searchedTitle: string;
}

interface SetSearchedTagAction {
    type: typeof SET_SEARCHED_TAG;
    searchedTag: Tag;
}

export type FilterActions = SetFilterAction | SetSearchedTitleAction | SetSearchedTagAction;