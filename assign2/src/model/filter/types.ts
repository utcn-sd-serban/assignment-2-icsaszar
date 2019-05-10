import Tag from "../objects/Tag";


export enum QuestionFilter{
    ALL_POSTS = "ALL_POSTS",
    FILTER_BY_TITLE = "FILTER_BY_TITLE",
    FILTER_BY_TAG = "FILTER_BY_TAG",
}

export const SET_FILTER = "SET_FILTER";
export const SET_SEARCHED_TITLE = "SET_SEARCHED_TITLE";
export const SET_SEARCHED_TAG = "SET_SEARCHED_TAG";

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