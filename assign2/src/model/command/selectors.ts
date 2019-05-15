import {UndoableCommand} from "./types";
import {AppState} from "../Model";

export function getUndoCommand(state: AppState): UndoableCommand {
    let {history} = state.commandState;
    return history[history.length - 1].antiAction;
}

export function getRedoCommand(state: AppState): UndoableCommand {
    return state.commandState.future[0].antiAction;
}