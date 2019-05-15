import {Dispatch} from "redux";
import {redoAction, undoAction} from "../model/command/actions";

export const headerPresenter = (dispatch: Dispatch) => ({
   handleUndo: () => dispatch(undoAction()),
   handleRedo: () => dispatch(redoAction())
});