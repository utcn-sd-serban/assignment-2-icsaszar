import {AppState} from "../Model";

export const getUserById = (state: AppState, userId: number) =>
    state.userState.users.find(user => user.id === userId);