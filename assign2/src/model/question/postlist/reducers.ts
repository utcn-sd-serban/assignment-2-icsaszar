import {
    ADD_ANSWER_TO_QUESTION,
    DELETE_ANSWER,
    DELETE_QUESTION,
    EDIT_ANSWER,
    EDIT_QUESTION,
    NEW_POST,
    PostListActions,
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



const initialState: PostListState = {
    questions: Data.questions,
    isFetching: false,
    lastFetched: new Date(0)
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
            return saveUpdatedQuestion(state, action);
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

function fetchPosts(state: PostListState): PostListState {
    return {
        ...state,
        isFetching: true
    };
}

function receivePosts(state: PostListState, action: ReceivePostsAction): PostListState {
    return {
        ...state,
        isFetching: false,
        lastFetched: new Date(),
        questions: action.data.map(Question.fromJSON)
    };
}

function saveUpdatedAnswer(state: PostListState, action: UpdateAnswerAction): PostListState {
    return {
        ...state,
        questions: state.questions.map(q =>
            Question.fromObject(
                {
                    ...q,
                    answers: q.answers.map(a =>
                        (a.id === action.answerId) ? Answer.fromObject({...a, text: a.tempText}) : a
                    )
                }
            ))
    };
}

function saveUpdatedQuestion(state: PostListState, action: UpdateQuestionAction): PostListState {
    return {
        ...state,
        questions: state.questions.map(q =>
            q.id === action.questionId ? Question.fromObject({...q, text: q.tempText}) : q
        )
    };
}

function editQuestion(state: PostListState, action: EditQuestionAction): PostListState {
    return {
        ...state,
        questions: state.questions.map(q =>
            q.id === action.questionId ? Question.fromObject({...q, tempText: action.newText}) : q
        )
    };
}

function editAnswer(state: PostListState, action: EditAnswerAction): PostListState {
    return {
        ...state,
        questions: state.questions.map(q =>
            Question.fromObject({
                ...q,
                answers: q.answers.map(a =>
                    a.id === action.answerId ? Answer.fromObject({...a, tempText: action.newText}) : a
                )
            })
        )
    };
}

function deleteQuestion(state: PostListState, action: DeleteQuestionAction): PostListState {
    return {
        ...state,
        questions: state.questions.filter(q => q.id !== action.questionId)
    };
}

function deleteAnswer(state: PostListState, action: DeleteAnswerAction): PostListState {
    return {
        ...state,
        questions: state.questions.map(q =>
            Question.fromObject({
                ...q,
                answers: q.answers.filter(a => a.id !== action.answerId)
            })
        )
    };
}

function createNewPost(state: PostListState, action: AddQuestionAction): PostListState{
    return {
        ...state,
        questions: [...state.questions, action.data]
    };
}

function addAnswer(state: PostListState, action: AddAnswerAction): PostListState{
    const newAnswer = action.data;
    return {
        ...state,
        questions: state.questions.map(
            q => {
                if(q.id === action.targetQuestionId)
                    return Question.fromObject({...q, answers: [...q.answers, newAnswer]});
                else
                    return q;
                }
            )
    };
}

