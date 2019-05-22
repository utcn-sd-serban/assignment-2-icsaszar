import {
    ADD_VOTE,
    LOGIN_USER,
    RECEIVE_DETAILS,
    REQUEST_DETAILS,
    SET_LOGIN_DETAILS,
    UserActions,
    UsersState
} from "./types";
import * as Data from '../SeedData'
import {Vote, VoteDirection} from "../objects/Vote";
import User from "../objects/User";

const initialState: UsersState = {
    currentUser: undefined,
    tempUsername: "",
    tempPassword: "",
    userVotes: [],
    isFetching: false,
    lastFetched: new Date(0)
};

export function userReducer(state: UsersState = initialState, action: UserActions): UsersState {
    switch (action.type) {
        case SET_LOGIN_DETAILS:
            if (action.field === "username")
                return {
                    ...state,
                    tempUsername: action.value
                };
            else
                return {
                    ...state,
                    tempPassword: action.value
                };
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
            return {
                ...state,
                currentUser: action.payload
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
