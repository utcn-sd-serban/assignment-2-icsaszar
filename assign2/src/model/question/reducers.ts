import {
    ADD_ANSWER_TO_QUESTION,
    ADD_TAG_TO_SELECTED_TAGS, CLEAR_NEW_POST_DATA, DELETE_ANSWER, DELETE_QUESTION, EDIT_ANSWER, EDIT_QUESTION,
    NEW_POST,
    QuestionActions,
    QuestionsState,
    SET_CURRENT_TAG, SET_NEW_POST_FIELD, UPDATE_ANSWER, UPDATE_QUESTION
} from "./types";
import Question from "../objects/Question";
import * as Data from '../SeedData'
import Answer from "../objects/Answer";

const initialState: QuestionsState = {
    questions: Data.questions,
    newText: "",
    newTitle: "",
    newAnswer: "",
    currentTag: Data.tags[0],
    selectedTags: []
};

export function questionReducer(state: QuestionsState = initialState, action: QuestionActions): QuestionsState{
    switch (action.type){
        case UPDATE_ANSWER:
            return {
                ...state,
                questions: state.questions.map(q =>
                    Question.clone(
                    {
                        ...q,
                        answers: q.answers.map(a =>
                            a.id === action.answerId ? Answer.clone({...a, text: a.tempText}) : a
                        )
                    }
                ))
            };
        case UPDATE_QUESTION:
            return {
                ...state,
                questions: state.questions.map(q =>
                    q.id === action.questionId ? Question.clone({...q, text: q.tempText}) : q
                )
            };
        case EDIT_QUESTION:
            return {
                ...state,
                questions: state.questions.map(q =>
                    q.id === action.questionId ? Question.clone({...q, tempText: action.newText}) : q
                )
            };
        case EDIT_ANSWER:
            return {
                ...state,
                questions: state.questions.map(q =>
                    Question.clone({
                        ...q,
                        answers: q.answers.map(a =>
                            a.id === action.answerId ? Answer.clone({...a, tempText: action.newText}) : a
                        )
                    })
                )
            };
        case DELETE_QUESTION:
            return {
                ...state,
                questions: state.questions.filter(q => q.id !== action.questionId)
            };
        case DELETE_ANSWER:
            return {
                ...state,
                questions: state.questions.map(q => {
                    return {
                        ...q,
                        answers: q.answers.filter(a => a.id !== action.answerId)
                    }
                })
            };
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
                case "answer":
                    return {
                        ...state,
                        newAnswer: action.value
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
            const newAnswer = new Answer(state.newAnswer, action.answerAuthor);
            return {
                ...state,
                questions: state.questions.map(
                    q => {
                        if(q.id === action.targetQuestionId)
                            return Question.clone({...q, answers: [...q.answers, newAnswer]});
                        else
                            return q;
                        }
                    )
            };
        default:
            return state;
    }
}