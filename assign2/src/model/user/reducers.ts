import {UserActions, UsersState} from "./types";
import * as Data from '../SeedData'

const initialState: UsersState = {
    currentUser: Data.users[0],
    users: Data.users
};

export function userReducer(state: UsersState = initialState, action: UserActions): UsersState {
    switch (action.type) {
        case "LOGIN_USER":
            return {
                ...state,
                currentUser: state.users.find(u => u.name === action.userName)
            };
        default:
            return state;
    }
}
