import {Dispatch} from "redux";
import {fetchPosts} from "../model/question/actions";
import {Command} from "../model/command/types";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {fetchTags} from "../model/tag/actions";
import {fetchUserDetails} from "../model/user/actions";


export const questionListPresenter = (dispatch: ThunkDispatch<AppState, undefined, Command>) => ({
   handleFetchPosts: () => dispatch(fetchPosts()),
   handleFetchTags: () => dispatch(fetchTags()),
   handleFetchUserDetails: () => dispatch(fetchUserDetails())
});