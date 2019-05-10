import {Dispatch} from "redux";
import {VoteDirection} from "../model/objects/Vote";
import {doAddVote} from "../model/user/actions";
import User from "../model/objects/User";

export const postDetailsPresenter = (dispatch: Dispatch) => ({
    handleVoteOnPost: (postId: number, postAuthorId: number, direction: VoteDirection) =>
        dispatch(doAddVote(postId, postAuthorId, direction))
});