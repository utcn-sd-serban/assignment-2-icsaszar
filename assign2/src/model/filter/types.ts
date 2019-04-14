import Tag from "../objects/Tag";

export const ALL_POSTS = "ALL_POSTS";
export const FILTER_BY_TITLE = "FILTER_BY_TITLE";
export const FILTER_BY_TAG = "FILTER_BY_TAG";
export const SET_FILTER = "SET_FILTER";

export type QuestionFilter = typeof ALL_POSTS | typeof FILTER_BY_TAG | typeof FILTER_BY_TITLE;

export interface FilterState {
    searchedTitle: string;
    searchedTag: Tag;
    currentFilter: QuestionFilter
}



interface SetFilterAction {
    type: typeof SET_FILTER;
    filter: QuestionFilter
}

export type FilterActions = SetFilterAction;