import {ADD_VOTE, LOGIN_USER, UserActions, UsersState} from "./types";
import * as Data from '../SeedData'
import {Vote} from "../objects/Vote";

const initialState: UsersState = {
    currentUser: Data.users[0],
    users: Data.users,
    userVotes: []
};

export function userReducer(state: UsersState = initialState, action: UserActions): UsersState {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                currentUser: state.users.find(u => u.name === action.userName)
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
