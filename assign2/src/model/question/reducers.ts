import {combineReducers} from "redux";
import {postListReducer} from "./postlist/reducers";
import {newPostReducer} from "./newpost/reducers";

export const questionReducer = combineReducers({
    postListState: postListReducer,
    newPostState: newPostReducer
});

export type QuestionState = ReturnType<typeof questionReducer>;