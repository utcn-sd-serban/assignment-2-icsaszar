import {AppState} from "../Model";
import {QuestionFilter} from "../filter/types";
import Post from "../objects/Post";

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

export function getPostsByAuthorId(state: AppState, authorId: number): Post[] {
    const questions = state.questionState.questions.filter(q => q.author.id === authorId);
    const answers = state.questionState.questions.flatMap(q => q.answers).filter(a => a.author.id === authorId);
    return [...questions, ...answers]
}
