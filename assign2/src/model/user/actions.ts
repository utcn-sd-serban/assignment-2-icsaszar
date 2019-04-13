import {func} from "prop-types";
import {LOGIN_USER} from "./types";


function doFindUser(userName: string){
    return {
        type: LOGIN_USER,
        userName
    }
}