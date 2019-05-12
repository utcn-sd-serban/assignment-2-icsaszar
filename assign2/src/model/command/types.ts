import {AppState} from "../Model";

export const DO_ACTION = "[COMMAND] DO ACTION";
export const UNDO_ACTION = "[COMMAND] UNDO ACTION";
export const REDO_ACTION = "[COMMAND] REDO ACTION";

export interface Command {
    readonly type: string
}

export interface UndoableCommand extends Command{
    makeAntiAction: (state: AppState, ...args: any[]) => UndoableCommand;
}

export interface CommandState {
    readonly history: [Command, Command][];
    readonly future: [Command, Command][];
}

interface DoCommandAction extends Command{
    type: typeof DO_ACTION;
    action: Command
    antiAction: Command
}

interface UndoCommandAction extends Command{
    type: typeof UNDO_ACTION;
}

interface RedoCommandAction extends Command{
    type: typeof REDO_ACTION;
}

export type CommandActions = UndoCommandAction | RedoCommandAction | DoCommandAction;