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
export const EDIT_QUESTION = "EDIT_QUESTION";
export const EDIT_ANSWER = "EDIT_ANSWER";
export const DELETE_QUESTION = "DELETE_QUESTION";
export const DELETE_ANSWER = "DELETE_ANSWER";
export const UPDATE_QUESTION = "UPDATE_QUESTION";
export const UPDATE_ANSWER = "UPDATE_ANSWER";

export interface QuestionsState {
    questions: Question[];
    newTitle: string;
    newText: string;
    newAnswer: string;
    currentTag: Tag;
    selectedTags: Tag[];
}

interface NewPostAction {
    type: typeof NEW_POST
    postAuthor: User
}

export type NewPostField = "title" | "text" | "answer";

interface SetNewPostFieldAction {
    type: typeof SET_NEW_POST_FIELD
    field: NewPostField
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

interface AddAnswerAction {
    type: typeof ADD_ANSWER_TO_QUESTION
    targetQuestionId: number
    answerAuthor: User
}

interface EditQuestionAction {
    type: typeof EDIT_QUESTION
    questionId: number
    newText: string
}

interface EditAnswerAction {
    type: typeof EDIT_ANSWER
    answerId: number
    newText: string
}

interface UpdateQuestionAction {
    type: typeof UPDATE_QUESTION
    questionId: number
}

interface UpdateAnswerAction {
    type: typeof UPDATE_ANSWER
    answerId: number
}

interface DeleteQuestionAction {
    type: typeof DELETE_QUESTION
    questionId: number
}

interface DeleteAnswerAction {
    type: typeof DELETE_ANSWER
    answerId: number
}

export type QuestionActions = NewPostAction
                            | SetCurrentTagAction
                            | SetNewPostFieldAction
                            | AddTagToSelectedTagsAction
                            | ClearNewPostDataAction
                            | AddAnswerAction
                            | EditQuestionAction
                            | EditAnswerAction
                            | DeleteQuestionAction
                            | DeleteAnswerAction
                            | UpdateAnswerAction
                            | UpdateQuestionAction;