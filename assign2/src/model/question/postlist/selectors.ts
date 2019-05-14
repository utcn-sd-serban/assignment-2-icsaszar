import {AppState} from "../../Model";
import {QuestionFilter} from "../../filter/types";
import Answer from "../../objects/Answer";
import {VoteDirection} from "../../objects/Vote";
import Question from "../../objects/Question";
import Post from "../../objects/Post";

export const getFilteredQuestions = (state: AppState) => {
    const {questions} = state.questionState.postListState;
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
    state.questionState.postListState.questions.find(q => q.id === Number(currentId));

export type AnswerWithVotes = Answer & {voted?: VoteDirection};

export type QuestionWithVotes = Pick<Question, {
    [Key in keyof Question]: Question[Key] extends Answer[] ? never : Key
}[keyof Question]> & {voted?: VoteDirection, answers: AnswerWithVotes[]};


export function getQuestionAndAnswersWithVotes(state: AppState, questionId: string): QuestionWithVotes | undefined {
    const votes = state.userState.userVotes;
    const question = getCurrentQuestion(state, questionId);
    if (question) {
        const answers = question.answers.map( a => {
            const vote = votes.find(v => v.postId === a.id);
            if(vote)
                return {...a, voted: vote.direction};
            else
                return {...a}
        });

        const vote = votes.find(v => v.postId === question.id);
        if(vote)
            return {...question, answers: answers, voted: vote.direction};
        else
            return {...question, answers: answers}
    }
}


export function getPostsByAuthorId({questionState: {postListState}}: AppState, authorId: number): Post[] {
    const questions = postListState.questions.filter(q => q.author.id === authorId);
    const answers = postListState.questions.flatMap(q => q.answers).filter(a => a.author.id === authorId);
    return [...questions, ...answers]
}
