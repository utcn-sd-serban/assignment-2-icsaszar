import {FILTER_BY_TAG, NEW_POST, QuestionActions, QuestionsState, SEARCH_BY_TITLE} from "./types";
import Question from "../Question";
import * as Data from '../TestingData'

const initialState: QuestionsState = {
    questions: Data.questions,
    searchedTitle: "",
    selectedTag: undefined
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
        case SEARCH_BY_TITLE:
            return {
                ...state,
                searchedTitle: action.searchedText
            };
        case FILTER_BY_TAG:
            return {
                ...state,
                selectedTag: action.tag
            };
        default:
            return state;
    }
}