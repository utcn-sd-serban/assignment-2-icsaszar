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
import Post from "../../objects/Post";


const initialState: PostListState = {
    questions: Data.questions,
    isFetching: false,
    lastFetched: new Date(0)
};


export function postListReducer(state: PostListState = initialState, action: PostListActions): PostListState {
    switch (action.type) {
        case REQUEST_POSTS:
            return fetchPosts(state);
        case RECEIVE_POSTS:
            return receivePosts(state, action);
        // Inspired by how the backend does inserts/updates,
        // this solves the problem of inserting the same question/answer twice
        // If a post exists, it will be replaced by the new post, else the new post will be inserted
        case SAVE_UPDATED_ANSWER:
        case ADD_ANSWER_TO_QUESTION:
            return saveAnswer(state, action);
        case NEW_POST:
        case SAVE_UPDATED_QUESTION:
            return saveQuestion(state, action);
        case EDIT_QUESTION:
            return editQuestion(state, action);
        case EDIT_ANSWER:
            return editAnswer(state, action);
        case DELETE_QUESTION:
            return deleteQuestion(state, action);
        case DELETE_ANSWER:
            return deleteAnswer(state, action);
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

function contains(posts: Post[], post: Post): boolean{
    return posts.map(q => q.id).includes(post.id)
}

function saveQuestion(state: PostListState, action: AddQuestionAction | UpdateQuestionAction): PostListState {
    let {questions} = state;
    let {data} = action;
    return {
        ...state,
        questions: contains(questions, data) ?
            questions.map(q => q.id === data.id ? data : q) :
            [...questions, data]
    }
}

function saveAnswer(state: PostListState, action: AddAnswerAction | UpdateAnswerAction): PostListState {
    let {questions} = state;
    let {data, questionId} = action;
    return {
        ...state,
        questions: questions.map(q => q.id === questionId ?
            Question.fromObject({
                ...q,
                answers: contains(q.answers, data) ?
                    q.answers.map(a => a.id === data.id ? data : a) :
                    [...q.answers, data]

            }) :
            q
        )
    }
}


