import {ADD_VOTE, LOGIN_USER, RECEIVE_DETAILS, REQUEST_DETAILS, UserActions, UsersState} from "./types";
import * as Data from '../SeedData'
import {Vote, VoteDirection} from "../objects/Vote";
import User from "../objects/User";

const initialState: UsersState = {
    currentUser: {
        ...Data.users[0],
        password: "dhas9d8hdq2de"
    },
    users: Data.users,
    userVotes: [],
    isFetching: false,
    lastFetched: new Date(0)
};

export function userReducer(state: UsersState = initialState, action: UserActions): UsersState {
    switch (action.type) {
        case REQUEST_DETAILS:
            return {
                  ...state,
                isFetching: true
            };
        case RECEIVE_DETAILS:
            return {
                ...state,
                isFetching: false,
                lastFetched: new Date(),
                currentUser: state.currentUser ? {
                    ...state.currentUser,
                    id: action.data.id
                } : state.currentUser,
                userVotes:
                    action.data.votes.map(v => new Vote(v.postId, v.direction))
            };
        case LOGIN_USER:
            let foundUser = state.users.find(u => u.name === action.userName);
            return {
                ...state,
                currentUser: foundUser ? {
                    ...foundUser,
                    password: action.password
                } : undefined
            };

        case ADD_VOTE:
            let oldVote = state.userVotes.find(v => v.postId === action.postId);

            function updateVote(votes: Vote[], id: number, newDirection: VoteDirection): Vote[] {
                return votes.map(v =>
                    v.postId === id ? Vote.fromObject({...v, direction: newDirection}) : v
                )
            }

            return {
                ...state,
                userVotes:
                    oldVote
                        ? updateVote(state.userVotes, action.postId, action.direction)
                        : [...state.userVotes, new Vote(action.postId, action.direction)]
            };

        default:
            return state;
    }
}
