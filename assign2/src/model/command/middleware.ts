import {Command, UndoableCommand} from "./types";
import {Dispatch, Middleware, MiddlewareAPI} from "redux";
import {AppState} from "../Model";
import {doAction} from "./actions";

function createAntiAction(action: UndoableCommand, state: AppState): UndoableCommand {
    return action.makeAntiAction(state)
}

export const commandMiddleware: Middleware =
    ({dispatch, getState}: MiddlewareAPI<Dispatch, AppState>) =>
        (next: Dispatch) =>
            (action: Command) => {

    let prevState = getState();

    let returnValue = next(action);

    if ('makeAntiAction' in action){ // Check if command is undoable
        //Add it to the command history
        let antiAction = createAntiAction(action, prevState);
        dispatch(doAction(action, antiAction));
        console.log("Undoable command added")
    }

    return returnValue;
};