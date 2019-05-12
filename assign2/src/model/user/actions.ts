import {
    ADD_VOTE,
    AddVoteAction,
    LOGIN_USER,
    RECEIVE_DETAILS,
    ReceiveUserDetailsAction,
    RemoveVoteAction, REQUEST_DETAILS, RequestUserDetailsAction,
    UserActions
} from "./types";
import {Vote, VoteDirection} from "../objects/Vote";
import User from "../objects/User";
import {RequestPostsAction} from "../question/types";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../Model";
import {Command} from "../command/types";
import {doReceivePosts, doRequestPosts} from "../question/actions";
import RestClient from "../../rest/RestClient";


export function doLoginUser(userName: string, password: string): UserActions{
    return {
        type: LOGIN_USER,
        userName,
        password
    }
}

export function doAddVote(postId: number, postAuthorId: number, direction: VoteDirection): UserActions{
    return new AddVoteAction(postId, direction, postAuthorId)
}

export function doRemoveVote(postId: number) {
    return new RemoveVoteAction(postId)
}

export function doRequestDetails(): RequestUserDetailsAction {
    return {
        type: REQUEST_DETAILS
    };
}

export function doReceiveDetails(data: {id: number, votes: Vote[]}, status: 'succeeded' | 'failed'): ReceiveUserDetailsAction {
    return {
        type: RECEIVE_DETAILS,
        status: status,
        data: data
    };
}

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Command>;

export function fetchUserDetails(): ThunkResult<void>{
    return function (dispatch, getState) {
        let {userState: {currentUser}} = getState();
        if(currentUser) {
            dispatch(doRequestDetails());
            let restClient = new RestClient(currentUser.name, currentUser.password);
            return restClient.loadUserDetails().then(
                response => {
                    if (response.status === 'succeeded')
                        response.data.json().then(data =>
                            dispatch(doReceiveDetails(data, response.status)))

                })
        }
    }
}