import {AppState} from "../Model";

export const SAVE_ACTION = "[COMMAND] SAVE ACTION";
export const UNDO_ACTION = "[COMMAND] UNDO ACTION";
export const REDO_ACTION = "[COMMAND] REDO ACTION";
export const DISPATCH_ACTION = "[COMMAND] DISPATCH ACTION";



export interface Command {
    readonly type: string
}

export interface UndoableCommand extends Command{
    makeAntiAction: (state: AppState) => UndoableCommand;
}

export interface ActionPair{
    action: UndoableCommand;
    antiAction: UndoableCommand
}

export interface CommandState {
    readonly history: ActionPair[];
    readonly future: ActionPair[];
}

export interface SaveCommandAction extends Command{
    type: typeof SAVE_ACTION;
    actionPair: ActionPair
}

export interface UndoCommandAction extends Command{
    type: typeof UNDO_ACTION;
}

export interface RedoCommandAction extends Command{
    type: typeof REDO_ACTION;
}

export interface DispatchCommandAction extends Command{
    type: typeof DISPATCH_ACTION;
    action: Command
}

export type CommandActions = UndoCommandAction | RedoCommandAction | SaveCommandAction | DispatchCommandAction;