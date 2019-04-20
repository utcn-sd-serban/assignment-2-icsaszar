import {AppState} from "../Model";
import {number} from "prop-types";

export const getUserById = (state: AppState, userId: number) =>
    state.userState.users.find(user => user.id === userId);