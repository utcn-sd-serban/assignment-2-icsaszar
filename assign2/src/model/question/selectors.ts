import {AppState} from "../Model";

export const getFilteredQuestions = (state: AppState) => {
    switch (state.filterState.currentFilter) {
        case "ALL_POSTS":
            return state.questionState.questions;
        case "FILTER_BY_TITLE":
            return state.questionState.questions.filter(q => q.title.toLowerCase().includes(state.filterState.searchedTitle.toLowerCase()));
        case "FILTER_BY_TAG":
            return state.questionState.questions.filter(q => q.tags.includes(state.filterState.searchedTag));
        default:
            return state.questionState.questions;
    }
};