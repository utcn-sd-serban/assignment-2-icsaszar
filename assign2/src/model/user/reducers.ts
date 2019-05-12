import {ADD_VOTE, LOGIN_USER, RECEIVE_DETAILS, REQUEST_DETAILS, UserActions, UsersState} from "./types";
import * as Data from '../SeedData'
import {Vote} from "../objects/Vote";
import User from "../objects/User";

const initialState: UsersState = {
    currentUser: {
        ...Data.users[0],
        password: "dhas9d8hdq2de"
    },
    users: Data.users,
    userVotes: [],
    isFetching: false
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
                currentUser: action.status === 'succeeded' && state.currentUser ? {
                    ...state.currentUser,
                    id: action.data.id
                } : state.currentUser,
                userVotes: action.status === 'succeeded' ?
                    action.data.votes.map(v => new Vote(v.postId, v.direction)) : state.userVotes
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
            if(state.currentUser && action.postAuthorId !== state.currentUser.id){
                return {
                    ...state,
                    userVotes:
                        state.userVotes.find(v => v.postId === action.postId)
                            ? state.userVotes.map(v =>
                                v.postId === action.postId ? Vote.clone({...v, direction: action.direction}) : v
                            )
                            : [...state.userVotes, new Vote(action.postId, action.direction)]
                };
            }
            else {
                return {
                    ...state
                };
            }

        default:
            return state;
    }
}
