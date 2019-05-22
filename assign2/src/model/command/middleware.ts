import {
    Command,
    CommandActions,
    SAVE_ACTION,
    REDO_ACTION,
    UNDO_ACTION,
    UndoableCommand,
    DISPATCH_ACTION,
    DispatchCommandAction
} from "./types";
import {Dispatch, Middleware, MiddlewareAPI} from "redux";
import {AppState} from "../Model";
import {dispatchAction, saveAction, undoAction} from "./actions";
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
            dispatch(dispatchAction(antiAction));
            break;
        case REDO_ACTION:
            antiAction = getRedoCommand(initialState);
            dispatch(dispatchAction(antiAction));
            break;
        case DISPATCH_ACTION:
            let command = (action as DispatchCommandAction).action;
            // Hack to make the command an object so it's not seen as an UndoableCommand
            // (and added to the history twice)
            dispatch({...command})
    }

    let returnValue = next(action);
    if (isUndoableCommand(action)){ // Check if command is undoable
        //Add it to the command history.
        let antiAction = createAntiAction(action, initialState);
        dispatch(saveAction(action, antiAction));
        console.log(`Undoable command ${action.type} added`)
    }

    return returnValue;
};