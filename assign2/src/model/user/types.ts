import User from "../objects/User";
import {Vote, VoteDirection} from "../objects/Vote";
import {Command, UndoableCommand} from "../command/types";
import {AppState} from "../Model";

export const LOGIN_USER = '[USER] LOGIN USER';
export const ADD_VOTE = '[USER] ADD VOTE';
export const REMOVE_VOTE = '[USER] REMOVE VOTE';
export const REQUEST_DETAILS = '[USER] REQUEST DETAILS';
export const RECEIVE_DETAILS = '[USER] RECEIVE DETAILS';
export const SET_LOGIN_DETAILS = '[USER] SET LOGIN DETAILS';

type UserWithPassword = User & { password: string }

export interface UsersState {
    currentUser: UserWithPassword | undefined;
    tempUsername: string;
    tempPassword: string;
    userVotes: Vote[];
    isFetching: boolean;
    lastFetched: Date;
}

export type LoginField = "username" | "password";

export interface SetLoginDetailsAction {
    type: typeof SET_LOGIN_DETAILS;
    field: LoginField;
    value: string;
}

export interface SetCurrentUserAction extends Command {
    type: typeof LOGIN_USER;
    payload: UserWithPassword
}

export class AddVoteAction implements UndoableCommand {
    type: typeof ADD_VOTE = ADD_VOTE;

    postId: number;
    direction: VoteDirection;

    constructor(postId: number, direction: "up" | "down") {
        this.postId = postId;
        this.direction = direction;
    }


    makeAntiAction(state: AppState): RemoveVoteAction {
        return new RemoveVoteAction(this.postId)
    }
}

export class RemoveVoteAction implements UndoableCommand {
    type: typeof REMOVE_VOTE = REMOVE_VOTE;

    postId: number;

    constructor(postId: number) {
        this.postId = postId;
    }


    makeAntiAction(state: AppState): AddVoteAction {
        function findVote(state: AppState, postId: number): Vote {
            return state.userState.userVotes.find(v => v.postId === postId) as Vote
        }

        function findPostAuthorId(state: AppState, postId: number) {
            for (let q of state.questionState.postListState.questions) {
                if (q.id === postId)
                    return q.author.id;
                for (let a of q.answers) {
                    if (a.id === postId)
                        return a.author.id;
                }
            }
        }

        let previousVote = findVote(state, this.postId);
        return new AddVoteAction(
            this.postId,
            previousVote.direction,
        )
    }
}

export interface RequestUserDetailsAction extends Command {
    type: typeof REQUEST_DETAILS;
}

export interface ReceiveUserDetailsAction extends Command {
    type: typeof RECEIVE_DETAILS;
    data: {
        id: number;
        votes: Vote[];
    }
}

export type UserActions = SetCurrentUserAction
                        | AddVoteAction
                        | RequestUserDetailsAction
                        | ReceiveUserDetailsAction
                        | SetCurrentUserAction
                        | SetLoginDetailsAction;
