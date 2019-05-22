import {CommandActions, CommandState, SAVE_ACTION, REDO_ACTION, UNDO_ACTION, ActionPair} from "./types";

const initialState: CommandState = {
    future: [],
    history: []
};

function flip(pair: ActionPair): ActionPair{
    return {
        antiAction: pair.action,
        action: pair.antiAction
    }
}

export function commandReducer(state: CommandState = initialState, action: CommandActions): CommandState{
    let hWithoutLast = state.history.slice(0, state.history.length-1);
    let hLast = state.history[state.history.length-1];
    let fWithoutLast = state.future.slice(0, state.future.length-1);
    let fLast = state.future[state.future.length-1];

    switch (action.type) {
        case UNDO_ACTION:
            if(state.history.length > 0)
                return {
                    ...state,
                    history: hWithoutLast,
                    future: [...state.future, flip(hLast)]
                };
            else
                return state;
        case REDO_ACTION:
            if(state.future.length > 0){
                return {
                    ...state,
                    history: [...state.history, flip(fLast)],
                    future: fWithoutLast
                };
            }else
                return state;
        case SAVE_ACTION:
            return {
                ...state,
                history: [...state.history, action.actionPair],
                future: [] //Future becomes invalid
            };
        default:
            return state;
    }
}