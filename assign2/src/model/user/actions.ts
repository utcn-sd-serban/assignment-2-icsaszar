import {func} from "prop-types";
import {LOGIN_USER, UserActions} from "./types";


function doFindUser(userName: string): UserActions{
    return {
        type: LOGIN_USER,
        userName
    }
}