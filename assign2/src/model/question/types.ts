import User from "../objects/User";
import Question from "../objects/Question";

export const NEW_POST = 'NEW_POST';
export const FILTER_BY_TAG = 'FILTER_BY_TAG';
export const SEARCH_BY_TITLE = 'SEARCH_BY_TITLE';

export interface QuestionsState{
    questions: Question[]
}

interface NewPostAction{
    type: typeof NEW_POST,
    newPost: {
        title: string,
        text: string,
        author: User
    }
}

export type QuestionActions = NewPostAction;