import {CommandActions, DO_ACTION, REDO_ACTION, UNDO_ACTION, UndoableCommand} from "./types";

export function undoAction(): CommandActions{
    return {
        type: UNDO_ACTION
    }
}

export function redoAction(): CommandActions {
    return {
        type: REDO_ACTION
    }
}

export function doAction(action: UndoableCommand, antiAction: UndoableCommand): CommandActions {
    return{
        type: DO_ACTION,
        action: action,
        antiAction: antiAction
    }
}