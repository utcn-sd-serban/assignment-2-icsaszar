import User from "../objects/User";
import Question from "../objects/Question";
import Tag from "../objects/Tag";

export const NEW_POST = "NEW_POST";
export const SET_NEW_POST_TITLE = "SET_NEW_POST_TITLE";
export const SET_NEW_POST_TEXT = "SET_NEW_POST_TEXT";

export interface QuestionsState{
    questions: Question[];
    newTitle: string;
    newText: string;
}

interface NewPostAction{
    type: typeof NEW_POST,
    newPost: {
        title: string,
        text: string,
        author: User,
        tags: Tag[]
    }
}

interface SetNewTitleAction {
    type: typeof SET_NEW_POST_TITLE,
    newTitle: string
}

interface SetNewTextAction {
    type: typeof SET_NEW_POST_TEXT,
    newText: string
}

export type QuestionActions = NewPostAction | SetNewTextAction | SetNewTitleAction;