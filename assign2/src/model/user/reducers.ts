import {UserActions, UsersState} from "./types";
import User from "../User";
import * as Data from '../TestingData'

const initialState: UsersState = {
    currentUser: undefined,
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
