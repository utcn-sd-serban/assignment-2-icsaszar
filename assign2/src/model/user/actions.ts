import {
    AddVoteAction,
    LOGIN_USER, LoginField, SetCurrentUserAction,
    RECEIVE_DETAILS,
    ReceiveUserDetailsAction,
    RemoveVoteAction, REQUEST_DETAILS, RequestUserDetailsAction, SET_LOGIN_DETAILS, SetLoginDetailsAction,
    UserActions
} from "./types";
import {Vote, VoteDirection} from "../objects/Vote";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../Model";
import {Command} from "../command/types";
import RestClient from "../../rest/RestClient";
import {isStale} from "../utility";
import {fetchPosts} from "../question/postlist/asyncActions";
import {async} from "q";
import {WebSocketClient} from "../../ws/WebSocketClient";
import {fetchTags} from "../tag/actions";

export function doSetLoginDetails(field: LoginField, value: string): SetLoginDetailsAction {
    return {
        type: SET_LOGIN_DETAILS,
        field: field,
        value: value
    }
}

export function doSetCurrentUser(username: string, password: string, id: number): SetCurrentUserAction {
    return {
        type: LOGIN_USER,
        payload: {
            password: password,
            id: id,
            username: username
        }
    }
}

export function doAddVote(postId: number, direction: VoteDirection): AddVoteAction {
    return new AddVoteAction(postId, direction)
}

export function doRemoveVote(postId: number): RemoveVoteAction {
    return new RemoveVoteAction(postId)
}

export function doRequestDetails(): RequestUserDetailsAction {
    return {
        type: REQUEST_DETAILS
    };
}

export function doReceiveDetails(data: { id: number, votes: Vote[] }): ReceiveUserDetailsAction {
    return {
        type: RECEIVE_DETAILS,
        data: data
    };
}

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Command>;

export function fetchUserDetails(): ThunkResult<Promise<void>> {
    return async function (dispatch, getState) {
        let {userState: {currentUser, lastFetched}} = getState();
        if (currentUser) {
            if (isStale(lastFetched)) {
                dispatch(doRequestDetails());
                let response = await RestClient.loadUserDetails();
                if (response.status === 'succeeded') {
                    let data = await response.data.json();
                    dispatch(doReceiveDetails(data))
                }
            }
        }
    }
}

export function sendVote(postId: number, direction: VoteDirection): ThunkResult<Promise<void>> {
    return async function (dispatch, getState) {
        let {userState: {currentUser}} = getState();
        if (currentUser) {
            let response = await RestClient.voteOnPost(new Vote(postId, direction));
            if (response.status === 'succeeded') {
                let data: Vote = await response.data.json();
                dispatch(doAddVote(data.postId, data.direction));
                dispatch(fetchPosts(true)) // Update scores
            }
        }
    }
}

export function loginUser(username: string, password: string): ThunkResult<Promise<void>> {
    return async function (dispatch, getState) {
        RestClient.initialize(username, password);
        WebSocketClient.initialize(username, password, dispatch);
        let response = await RestClient.loadUserDetails();
        if (response.status === "succeeded") {
            let data: { id: number, votes: Vote[] } = await response.data.json();
            dispatch(doSetCurrentUser(username, password, data.id));
            dispatch(doReceiveDetails(data));
            dispatch(fetchTags());
            dispatch(fetchPosts());
        }
    }
}