import {
    ADD_ANSWER_TO_QUESTION,
    ADD_TAG_TO_SELECTED_TAGS,
    CLEAR_NEW_POST_DATA,
    DELETE_ANSWER,
    DELETE_QUESTION,
    EDIT_ANSWER,
    EDIT_QUESTION,
    NEW_POST,
    PostListActions,
    SET_CURRENT_TAG,
    SET_NEW_POST_FIELD,
    SAVE_UPDATED_ANSWER,
    SAVE_UPDATED_QUESTION,
    UpdateAnswerAction,
    UpdateQuestionAction,
    EditQuestionAction,
    EditAnswerAction,
    DeleteQuestionAction,
    DeleteAnswerAction,
    AddQuestionAction,
    AddAnswerAction,
    REQUEST_POSTS,
    RECEIVE_POSTS, ReceivePostsAction, PostListState
} from "./types";
import Question from "../../objects/Question";
import * as Data from '../../SeedData'
import Answer from "../../objects/Answer";
import {AppState} from "../../Model";



const initialState: PostListState = {
    questions: Data.questions,
    isFetching: false,
    lastFetch: undefined
};

//Splitting this would be nice...
export function postListReducer(state: PostListState = initialState, action: PostListActions): PostListState{
    switch (action.type){
        case REQUEST_POSTS:
            return fetchPosts(state);
        case RECEIVE_POSTS:
            return receivePosts(state, action);
        case SAVE_UPDATED_ANSWER:
            return saveUpdatedAnswer(state, action);
        case SAVE_UPDATED_QUESTION:
            return saveUpdatedQuestions(state, action);
        case EDIT_QUESTION:
            return editQuestion(state, action);
        case EDIT_ANSWER:
            return editAnswer(state, action);
        case DELETE_QUESTION:
            return deleteQuestion(state, action);
        case DELETE_ANSWER:
            return deleteAnswer(state, action);
        case NEW_POST:
            return createNewPost(state, action);
        case ADD_ANSWER_TO_QUESTION:
            return addAnswer(state, action);
        default:
            return state;
    }
}

function fetchPosts(state: PostListState) {
    return {
        ...state,
        isFetching: true
    };
}

function receivePosts(state: PostListState, action: ReceivePostsAction) {
    return {
        ...state,
        isFetching: false,
        questions: action.status === 'succeeded' ?
            action.data.map(
            q => Question.clone({
                ...q,
                posted: new Date(q.posted),
                answers: q.answers.map(a =>
                    Answer.clone({
                        ...a,
                        posted: new Date(a.posted)
                    })
                )
            })
        ) : state.questions
    };
}

function saveUpdatedAnswer(state: PostListState, action: UpdateAnswerAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            Question.clone(
                {
                    ...q,
                    answers: q.answers.map(a =>
                        (a.id === action.answerId) ? Answer.clone({...a, text: a.tempText}) : a
                    )
                }
            ))
    };
}

function saveUpdatedQuestions(state: PostListState, action: UpdateQuestionAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            q.id === action.questionId ? Question.clone({...q, text: q.tempText}) : q
        )
    };
}

function editQuestion(state: PostListState, action: EditQuestionAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            q.id === action.questionId ? Question.clone({...q, tempText: action.newText}) : q
        )
    };
}

function editAnswer(state: PostListState, action: EditAnswerAction) {
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
}

function deleteQuestion(state: PostListState, action: DeleteQuestionAction) {
    return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.questionId)
    };
}

function deleteAnswer(state: PostListState, action: DeleteAnswerAction) {
    return {
        ...state,
        questions: state.questions.map(q =>
            Question.clone({
                ...q,
                answers: q.answers.filter(a => a.id !== action.answerId)
            })
        )
    };
}

function createNewPost(state: PostListState, action: AddQuestionAction){
    return {
        ...state,
        questions: [...state.questions, action.data]
    };
}

function addAnswer(state: PostListState, action: AddAnswerAction){
    const newAnswer = action.data;
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
}

