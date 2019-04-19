import User from "../objects/User";
import Question from "../objects/Question";
import Tag from "../objects/Tag";
import Answer from "../objects/Answer";

export const NEW_POST = "NEW_POST";
export const SET_NEW_POST_FIELD = "SET_NEW_POST_FIELD";
export const SET_CURRENT_TAG = "SET_CURRENT_TAG";
export const ADD_TAG_TO_SELECTED_TAGS = "ADD_TAG_TO_SELECTED_TAGS";
export const CLEAR_NEW_POST_DATA = "CLEAR_NEW_POST_DATA";
export const ADD_ANSWER_TO_QUESTION = "ADD_ANSWER_TO_QUESTION";

export interface QuestionsState{
    questions: Question[];
    newTitle: string;
    newText: string;
    currentTag: Tag;
    selectedTags: Tag[];
}

interface NewPostAction{
    type: typeof NEW_POST,
    postAuthor: User
}

export type NewPostField = "title" | "text";

interface SetNewPostFieldAction {
    type: typeof SET_NEW_POST_FIELD,
    field: NewPostField,
    value: string
}

interface SetCurrentTagAction {
    type: typeof SET_CURRENT_TAG
    currentTag: Tag
}

interface AddTagToSelectedTagsAction {
    type: typeof ADD_TAG_TO_SELECTED_TAGS
}

interface ClearNewPostDataAction {
    type: typeof CLEAR_NEW_POST_DATA
}

interface AddAnswerAction{
    type: typeof ADD_ANSWER_TO_QUESTION,
    targetQuestionId: number,
    newAnswer: Answer
}

export type QuestionActions = NewPostAction
                            | SetCurrentTagAction
                            | SetNewPostFieldAction
                            | AddTagToSelectedTagsAction
                            | ClearNewPostDataAction
                            | AddAnswerAction;