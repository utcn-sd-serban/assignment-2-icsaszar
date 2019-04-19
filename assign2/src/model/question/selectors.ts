import {AppState} from "../Model";
import {QuestionFilter} from "../filter/types";

export const getFilteredQuestions = (state: AppState) => {
    const {questions} = state.questionState;
    const {currentFilter, searchedTitle, searchedTag} = state.filterState;

    switch (currentFilter) {
        case QuestionFilter.ALL_POSTS:
            return questions;
        case QuestionFilter.FILTER_BY_TITLE:
            return questions.filter(q => q.title.toLowerCase().includes(searchedTitle.toLowerCase()));
        case QuestionFilter.FILTER_BY_TAG:
            return questions.filter(q => q.tags.includes(searchedTag));
        default:
            return questions;
    }
};

export const getCurrentQuestion = (state: AppState, currentId: string) =>
    state.questionState.questions.find(q => q.id === Number(currentId));
