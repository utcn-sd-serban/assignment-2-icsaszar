import {NEW_POST, QuestionActions, QuestionsState} from "./types";
import Question from "../objects/Question";
import * as Data from '../SeedData'

const initialState: QuestionsState = {
    questions: Data.questions
};

export function questionReducer(state: QuestionsState = initialState, action: QuestionActions): QuestionsState{
    switch (action.type){
        case NEW_POST:
            return {
                ...state,
                questions:
                    [
                        ...state.questions,
                        new Question(
                            action.newPost.title,
                            action.newPost.text,
                            action.newPost.author
                        )
                    ]
            };
        default:
            return state;
    }
}