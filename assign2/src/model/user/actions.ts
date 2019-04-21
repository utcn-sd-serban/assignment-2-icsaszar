import {ADD_VOTE, LOGIN_USER, UserActions} from "./types";
import {VoteDirection} from "../objects/Vote";
import User from "../objects/User";


export function doFindUser(userName: string): UserActions{
    return {
        type: LOGIN_USER,
        userName
    }
}

export function doAddVote(postId: number, postAuthorId: number, direction: VoteDirection): UserActions{
    return{
        type: ADD_VOTE,
        direction: direction,
        postId: postId,
        postAuthorId: postAuthorId
    }
}