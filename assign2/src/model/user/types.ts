import User from "../objects/User";
import {Vote, VoteDirection} from "../objects/Vote";
import {Command, UndoableCommand} from "../command/types";
import {AppState} from "../Model";

export const LOGIN_USER = '[USER] LOGIN USER';
export const ADD_VOTE = '[USER] ADD VOTE';
export const REMOVE_VOTE = '[USER] REMOVE VOTE';
export const REQUEST_DETAILS = '[USER] REQUEST DETAILS';
export const RECEIVE_DETAILS = '[USER] RECEIVE DETAILS';

export interface UsersState {
    currentUser: (User & {password: string})|undefined;
    users: User[];
    userVotes: Vote[];
    isFetching: boolean;
}

interface LoginUserAction extends Command{
    type: typeof LOGIN_USER;
    userName: string;
    password: string;
}

export class AddVoteAction implements UndoableCommand{
    type: typeof ADD_VOTE = ADD_VOTE;


    postId: number;
    direction: VoteDirection;
    postAuthorId: number;

    constructor(postId: number, direction: "up" | "down", postAuthorId: number) {
        this.postId = postId;
        this.direction = direction;
        this.postAuthorId = postAuthorId;
    }


    makeAntiAction(state: AppState, ...args: any[]): RemoveVoteAction{
        return new RemoveVoteAction(this.postId)
    }
}

export class RemoveVoteAction implements UndoableCommand{
    type: typeof REMOVE_VOTE = REMOVE_VOTE;

    postId: number;

    constructor(postId: number) {
        this.postId = postId;
    }


    makeAntiAction(state: AppState, ...args: any[]): AddVoteAction{
        function findVote(state: AppState, postId: number): Vote {
            return state.userState.userVotes.find(v => v.postId === postId) as Vote
        }

        function findPostAuthorId(state: AppState, postId: number){
            for(let q of state.questionState.questions){
                if(q.id === postId)
                    return q.author.id;
                for(let a of q.answers){
                    if(a.id === postId)
                        return a.author.id;
                }
            }
        }

        let previousVote = findVote(state, this.postId);
        let postAuthor = findPostAuthorId(state, this.postId) as number;
        return new AddVoteAction(
            this.postId,
            previousVote.direction,
            postAuthor
        )
    }
}

export interface RequestUserDetailsAction extends Command{
    type: typeof REQUEST_DETAILS;
}

export interface ReceiveUserDetailsAction extends Command{
    type: typeof RECEIVE_DETAILS;
    data: {
        id: number;
        votes: Vote[];
    }
    status: 'succeeded' | 'failed';
}

export type UserActions = LoginUserAction | AddVoteAction | RequestUserDetailsAction | ReceiveUserDetailsAction;
