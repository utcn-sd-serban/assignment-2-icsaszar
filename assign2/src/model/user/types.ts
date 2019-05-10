import User from "../objects/User";
import {Vote, VoteDirection} from "../objects/Vote";

export const LOGIN_USER = 'LOGIN_USER';
export const ADD_VOTE = 'ADD_VOTE';

export interface UsersState {
    currentUser?: User;
    users: User[];
    userVotes: Vote[];
}

interface LoginUserAction {
    type: typeof LOGIN_USER;
    userName: string;
}

interface AddVoteAction {
    type: typeof ADD_VOTE;
    postId: number;
    direction: VoteDirection;
    postAuthorId: number;
}

export type UserActions = LoginUserAction | AddVoteAction
