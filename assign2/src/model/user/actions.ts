import {
    AddVoteAction,
    LOGIN_USER,
    RECEIVE_DETAILS,
    ReceiveUserDetailsAction,
    RemoveVoteAction, REQUEST_DETAILS, RequestUserDetailsAction,
    UserActions
} from "./types";
import {Vote, VoteDirection} from "../objects/Vote";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../Model";
import {Command} from "../command/types";
import RestClient from "../../rest/RestClient";
import {isStale} from "../utility";
import {useState} from "react";


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

export function doReceiveDetails(data: {id: number, votes: Vote[]}): ReceiveUserDetailsAction {
    return {
        type: RECEIVE_DETAILS,
        data: data
    };
}

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Command>;

export function fetchUserDetails(): ThunkResult<Promise<void>>{
    return async function (dispatch, getState) {
        let {userState: {currentUser, lastFetched}} = getState();
        if(currentUser) {
            if(isStale(lastFetched)){
                dispatch(doRequestDetails());
                let restClient = new RestClient(currentUser.name, currentUser.password);
                let response = await restClient.loadUserDetails();
                if (response.status === 'succeeded'){
                    let data = await response.data.json();
                    dispatch(doReceiveDetails(data))
                }
            }
        }
    }
}