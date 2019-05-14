import Question from "../../objects/Question";
import {Command, UndoableCommand} from "../../command/types";
import {AppState} from "../../Model";
import Tag from "../../objects/Tag";
import User from "../../objects/User";
import Answer from "../../objects/Answer";

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

export interface PostListState {
    questions: Question[];
    isFetching: boolean;
    lastFetch: Date|undefined; // Will be used to prevent unnecessary reloading
}

export class AddQuestionAction implements UndoableCommand{
    type: typeof NEW_POST = NEW_POST;

    readonly data: Question;

    constructor(data: Question) {
        this.data = data;
    }

    makeAntiAction(state: AppState): DeleteQuestionAction {
        return new DeleteQuestionAction(this.data.id)
    }
}

export class AddAnswerAction implements UndoableCommand{
    type: typeof ADD_ANSWER_TO_QUESTION = ADD_ANSWER_TO_QUESTION;

    data: Answer;
    targetQuestionId: number;

    constructor(data: Answer, targetQuestionId: number) {
        this.data = data;
        this.targetQuestionId = targetQuestionId
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

    makeAntiAction(state: AppState, ...args: any[]): AddQuestionAction{
        let {questionState: {postListState}} = state;
        let question = postListState.questions.find(q => q.id === this.questionId) as Question;
        return new AddQuestionAction(question)
    }
}

export class DeleteAnswerAction implements UndoableCommand {
    type: typeof DELETE_ANSWER = DELETE_ANSWER;

    answerId: number;

    constructor(answerId: number) {
        this.answerId = answerId;
    }

    makeAntiAction(state: AppState, ...args: any[]): AddAnswerAction {
        function findAnswer({questionState: {postListState}}: AppState, answerId: number): {answer: Answer, questionId: number} | undefined {
            for(let q of postListState.questions){
                let answer = q.answers.find(a => a.id === answerId);
                if(answer)
                    return {
                        answer: answer,
                        questionId: q.id
                    }
            }
        }
        // Simplest way to assert that the answer will always be found
        let {answer, questionId} = findAnswer(state, this.answerId) as {answer: Answer, questionId: number};
        return new AddAnswerAction(answer, questionId);
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

export type PostListActions = AddQuestionAction
                            | AddAnswerAction
                            | EditQuestionAction
                            | EditAnswerAction
                            | DeleteQuestionAction
                            | DeleteAnswerAction
                            | UpdateAnswerAction
                            | UpdateQuestionAction
                            | RequestPostsAction
                            | ReceivePostsAction;