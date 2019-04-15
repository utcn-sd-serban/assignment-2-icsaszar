import {NEW_POST, QuestionActions, QuestionsState, SET_NEW_POST_TEXT, SET_NEW_POST_TITLE} from "./types";
import Question from "../objects/Question";
import * as Data from '../SeedData'

const initialState: QuestionsState = {
    questions: Data.questions,
    newText: "",
    newTitle: ""
};

export function questionReducer(state: QuestionsState = initialState, action: QuestionActions): QuestionsState{
    switch (action.type){
        case SET_NEW_POST_TEXT:
            return {
                ...state,
                newText: action.newText
            };
        case SET_NEW_POST_TITLE:
            return {
                ...state,
                newTitle: action.newTitle
            };
        case NEW_POST:
            return {
                ...state,
                questions:
                    [
                        ...state.questions,
                        new Question(
                            action.newPost.title,
                            action.newPost.text,
                            action.newPost.author,
                            action.newPost.tags
                        )
                    ]
            };
        default:
            return state;
    }
}