import {
    CommandActions,
    SAVE_ACTION,
    REDO_ACTION,
    UNDO_ACTION,
    UndoableCommand,
    DISPATCH_ACTION,
    Command,
    UndoCommandAction, RedoCommandAction, SaveCommandAction, DispatchCommandAction
} from "./types";

export function undoAction(): UndoCommandAction{
    return {
        type: UNDO_ACTION
    }
}

export function redoAction(): RedoCommandAction {
    return {
        type: REDO_ACTION
    }
}

export function saveAction(action: UndoableCommand, antiAction: UndoableCommand): SaveCommandAction {
    return{
        type: SAVE_ACTION,
        actionPair: {
            action,
            antiAction
        }
    }
}

export function dispatchIgnoredAction(action: Command): DispatchCommandAction {
    return {
        type: DISPATCH_ACTION,
        action: action
    }
}