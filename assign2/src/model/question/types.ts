import User from "../objects/User";
import Question from "../objects/Question";
import Tag from "../objects/Tag";
import Answer from "../objects/Answer";
import {Command, UndoableCommand} from "../command/types";
import {AppState} from "../Model";

export const NEW_POST = "[QUESTION] NEW_POST";
export const SET_NEW_POST_FIELD = "[QUESTION] SET NEW POST FIELD";
export const SET_CURRENT_TAG = "[QUESTION] SET CURRENT TAG";
export const ADD_TAG_TO_SELECTED_TAGS = "[QUESTION] ADD TAG TO SELECTED TAGS";
export const CLEAR_NEW_POST_DATA = "[QUESTION] CLEAR NEW POST DATA";
export const ADD_ANSWER_TO_QUESTION = "[QUESTION] ADD ANSWER TO QUESTION";
export const EDIT_QUESTION = "[QUESTION] EDIT QUESTION";
export const EDIT_ANSWER = "[QUESTION] EDIT ANSWER";
export const DELETE_QUESTION = "[QUESTION] DELETE QUESTION";
export const DELETE_ANSWER = "[QUESTION] DELETE ANSWER";
export const SAVE_UPDATED_QUESTION = "[QUESTION] SAVE UPDATED QUESTION";
export const SAVE_UPDATED_ANSWER = "[QUESTION] SAVE UPDATED ANSWER";
export const REQUEST_POSTS = "[QUESTION] FETCH POSTS";
export const RECEIVE_POSTS = "[QUESTION] RECEIVE POSTS";

export interface NewQuestionState {
    newTitle: string;
    newText: string;
    currentTag: Tag;
    selectedTags: Tag[];
}

export interface QuestionsState {
    questions: Question[];
    newQuestion: NewQuestionState;
    newAnswerText: string;
    isFetching: boolean;
    lastFetch: Date|undefined; // Will be used to prevent unnecessary reloading
}

export class NewPostAction implements UndoableCommand{
    type: typeof NEW_POST = NEW_POST;

    readonly data: Question;
    readonly status: 'succeeded' | 'failed';

    constructor(data: Question, status: 'succeeded' | 'failed') {
        this.data = data;
        this.status = status;
    }

    makeAntiAction(state: AppState): DeleteQuestionAction {
        return new DeleteQuestionAction(this.data.id)
    }
}

export type NewPostField = "title" | "text" | "answer";

export interface SetNewPostFieldAction extends Command{
    type: typeof SET_NEW_POST_FIELD
    field: NewPostField
    value: string
}

export interface SetCurrentTagAction extends Command{
    type: typeof SET_CURRENT_TAG
    currentTag: Tag
}

export interface AddTagToSelectedTagsAction extends Command{
    type: typeof ADD_TAG_TO_SELECTED_TAGS
}

export interface ClearNewPostDataAction extends Command{
    type: typeof CLEAR_NEW_POST_DATA
}

export class AddAnswerAction implements UndoableCommand{
    type: typeof ADD_ANSWER_TO_QUESTION = ADD_ANSWER_TO_QUESTION;

    targetQuestionId: number;
    answerAuthor: User;

    constructor(targetQuestionId: number, answerAuthor: User) {
        this.targetQuestionId = targetQuestionId;
        this.answerAuthor = answerAuthor;
    }

    makeAntiAction(state: AppState, answerId: number): DeleteAnswerAction{
        return new DeleteAnswerAction(answerId)
    }
}

export interface EditQuestionAction extends Command{
    type: typeof EDIT_QUESTION
    questionId: number
    newText: string
}

export interface EditAnswerAction extends Command{
    type: typeof EDIT_ANSWER
    answerId: number
    newText: string
}

export interface UpdateQuestionAction extends Command{
    type: typeof SAVE_UPDATED_QUESTION
    questionId: number
}

export interface UpdateAnswerAction extends Command{
    type: typeof SAVE_UPDATED_ANSWER
    answerId: number
}

export class DeleteQuestionAction implements UndoableCommand{
    type: typeof DELETE_QUESTION = DELETE_QUESTION;

    questionId: number;

    constructor(questionId: number) {
        this.questionId = questionId;
    }

    makeAntiAction(state: AppState, ...args: any[]): NewPostAction{
        let question = state.questionState.questions.find(q => q.id === this.questionId) as Question;
        return new NewPostAction(question, "succeeded")
    }
}

export class DeleteAnswerAction implements UndoableCommand {
    type: typeof DELETE_ANSWER = DELETE_ANSWER;

    answerId: number;

    constructor(answerId: number) {
        this.answerId = answerId;
    }

    makeAntiAction(state: AppState, ...args: any[]): AddAnswerAction {
        function findAnswer(appState: AppState, answerId: number): {answer: Answer, questionId: number} | undefined {
            for(let q of appState.questionState.questions){
                let answer = q.answers.find(a => a.id === answerId);
                if(answer)
                    return {
                        answer: answer,
                        questionId: q.id
                    }
            }
        }
        // Simplest way to assert that the answer will always be found
        let {answer: {author}, questionId} = findAnswer(state, this.answerId) as {answer: Answer, questionId: number};
        return new AddAnswerAction(questionId, author)
    }
}

export interface RequestPostsAction extends Command{
    type: typeof REQUEST_POSTS;

}

export interface ReceivePostsAction extends Command{
    type: typeof RECEIVE_POSTS;
    data: Question[];
    status: 'succeeded' | 'failed'
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
                            | UpdateQuestionAction
                            | RequestPostsAction
                            | ReceivePostsAction;