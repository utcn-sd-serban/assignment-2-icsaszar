import {
    ADD_ANSWER_TO_QUESTION,
    ADD_TAG_TO_SELECTED_TAGS, CLEAR_NEW_POST_DATA,
    NEW_POST,
    QuestionActions,
    QuestionsState,
    SET_CURRENT_TAG, SET_NEW_POST_FIELD
} from "./types";
import Question from "../objects/Question";
import * as Data from '../SeedData'
import Tag from "../objects/Tag";
import {questions} from "../SeedData";

const initialState: QuestionsState = {
    questions: Data.questions,
    newText: "",
    newTitle: "",
    currentTag: Data.tags[0],
    selectedTags: []
};

export function questionReducer(state: QuestionsState = initialState, action: QuestionActions): QuestionsState{
    switch (action.type){
        case SET_CURRENT_TAG:
            return {
                ...state,
                currentTag: action.currentTag
            };
        case ADD_TAG_TO_SELECTED_TAGS:
            return {
                ...state,
                //TODO better validation
                selectedTags: state.selectedTags.includes(state.currentTag) ? state.selectedTags : [...state.selectedTags, state.currentTag]
            };
        case CLEAR_NEW_POST_DATA:
            return {
                ...initialState,
               questions: state.questions
            };
        case SET_NEW_POST_FIELD:
            switch (action.field) {
                case "title":
                    return {
                        ...state,
                        newTitle: action.value
                    };
                case "text":
                    return {
                        ...state,
                        newText: action.value
                    };
                default:
                    return state;
            }
        case NEW_POST:
            return {
                ...state,
                questions:
                    [
                        ...state.questions,
                        new Question(
                            state.newTitle,
                            state.newText,
                            action.postAuthor,
                            state.selectedTags
                        )
                    ]
            };
        case ADD_ANSWER_TO_QUESTION:
            return {
                ...state,
                questions: questions.map(
                    q => (q.id === action.targetQuestionId) ? {...q, answers: [...q.answers, action.newAnswer]} : q
                    )
            };
        default:
            return state;
    }
}