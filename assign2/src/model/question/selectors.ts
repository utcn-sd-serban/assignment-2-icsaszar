import {AppState} from "../Model";

export const getFilteredQuestions = (state: AppState) => {
    const {questions} = state.questionState;
    const {currentFilter, searchedTitle, searchedTag} = state.filterState;

    switch (currentFilter) {
        case "ALL_POSTS":
            return questions;
        case "FILTER_BY_TITLE":
            return questions.filter(q => q.title.toLowerCase().includes(searchedTitle.toLowerCase()));
        case "FILTER_BY_TAG":
            return questions.filter(q => q.tags.includes(searchedTag));
        default:
            return questions;
    }
};

export const getCurrentQuestion = (state: AppState, currentId: string) =>
    state.questionState.questions.find(q => q.id === Number(currentId));
