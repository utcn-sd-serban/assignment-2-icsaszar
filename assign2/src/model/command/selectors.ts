import {UndoableCommand} from "./types";
import {AppState} from "../Model";

export function getUndoCommand(state: AppState): UndoableCommand {
    let {history} = state.commandState;
    if(history.length > 0)
        return history[history.length - 1].antiAction;
    else
        throw new RangeError()
}

export function getRedoCommand(state: AppState): UndoableCommand {
    let {future} = state.commandState;
    if(future.length > 0)
        return future[future.length - 1].antiAction;
    else
        throw new RangeError()
}

export function existsUndoCommand(state: AppState): boolean {
    return state.commandState.history.length > 0
}

export function existsRedoCommand(state: AppState): boolean {
    return state.commandState.future.length > 0
}