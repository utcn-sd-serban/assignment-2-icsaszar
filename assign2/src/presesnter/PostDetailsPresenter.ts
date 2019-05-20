import {Dispatch} from "redux";
import {VoteDirection} from "../model/objects/Vote";
import {doAddVote, fetchUserDetails, sendVote} from "../model/user/actions";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";

export const postDetailsPresenter = (dispatch: ThunkDispatch<AppState, undefined, Command>) => ({
    handleVoteOnPost: (postId: number, postAuthorId: number, direction: VoteDirection) =>
        dispatch(sendVote(postId, direction))
});