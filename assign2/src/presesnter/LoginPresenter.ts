import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";
import {doSetCurrentUser, doSetLoginDetails, loginUser} from "../model/user/actions";
import {LoginField} from "../model/user/types";

export const loginPresenter = (dispatch: ThunkDispatch<AppState, undefined, Command>) => ({
   handleInputChange: (field: LoginField, value: string) => {
       dispatch(doSetLoginDetails(field, value))
   },

   handleLogin: (username: string, password: string) => {
       dispatch(loginUser(username, password))
   }
});