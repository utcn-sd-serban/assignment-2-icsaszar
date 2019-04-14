import {AppState} from "../Model";

export const getFilteredQuestions = (state: AppState) => {
    switch (state.filterState.currentFilter) {
        case "ALL_POSTS":
            return state.questionState.questions;
        case "FILTER_BY_TAG":
            return state.questionState.questions.filter(q => q.title === state.filterState.searchedTitle);
        case "FILTER_BY_TITLE":
            return state.questionState.questions.filter(q => q.tags.includes(state.filterState.searchedTag));

    }
};