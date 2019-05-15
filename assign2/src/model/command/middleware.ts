import {Command, CommandActions, DO_ACTION, REDO_ACTION, UNDO_ACTION, UndoableCommand} from "./types";
import {Dispatch, Middleware, MiddlewareAPI} from "redux";
import {AppState} from "../Model";
import {doAction, undoAction} from "./actions";
import {getRedoCommand, getUndoCommand} from "./selectors";

function createAntiAction(action: UndoableCommand, state: AppState): UndoableCommand {
    return action.makeAntiAction(state)
}

function isUndoableCommand(command: Command): command is UndoableCommand{
    return (<UndoableCommand>command).makeAntiAction !== undefined;
}

export const commandMiddleware: Middleware =
    ({dispatch, getState}: MiddlewareAPI<Dispatch, AppState>) =>
        (next: Dispatch) =>
            (action: Command) => {

    let antiAction;
    // If the command is undo or redo - execute the anti-action
    let initialState = getState();
    switch (action.type) {
        case UNDO_ACTION:
            antiAction = getUndoCommand(initialState);
            dispatch(antiAction);
            break;
        case REDO_ACTION:
            antiAction = getRedoCommand(initialState);
            dispatch(antiAction);
            break;
    }

    let returnValue = next(action);
    if (isUndoableCommand(action)){ // Check if command is undoable
        //Add it to the command history.
        let antiAction = createAntiAction(action, initialState);
        dispatch(doAction(action, antiAction));
        console.log(`Undoable command ${action.type} added`)
    }

    return returnValue;
};