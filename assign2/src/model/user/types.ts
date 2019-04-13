import User from "../User";

export const LOGIN_USER = 'LOGIN_USER';

export interface UsersState {
    currentUser?: User;
    users: User[];
}

interface LoginUserAction {
    type: typeof LOGIN_USER
    userName: string
}

export type UserActions = LoginUserAction