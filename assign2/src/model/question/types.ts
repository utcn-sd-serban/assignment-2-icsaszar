import User from "../User";
import Tag from "../Tag";
import Question from "../Question";

export const NEW_POST = 'NEW_POST';
export const FILTER_BY_TAG = 'FILTER_BY_TAG';
export const SEARCH_BY_TITLE = 'SEARCH_BY_TITLE';

export interface QuestionsState{
    questions: Question[],
    searchedTitle: string,
    selectedTag?: Tag
}

interface NewPostAction{
    type: typeof NEW_POST,
    newPost: {
        title: string,
        text: string,
        author: User
    }
}

interface FilterByTagAction{
    type: typeof FILTER_BY_TAG,
    tag: Tag
}

interface SearchByTitleAction{
    type: typeof SEARCH_BY_TITLE
    searchedText: string
}

export type QuestionActions = NewPostAction | FilterByTagAction | SearchByTitleAction;