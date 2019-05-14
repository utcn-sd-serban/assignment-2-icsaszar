import {
    CreateNewTagAction,
    EDIT_NEW_TAG_NAME,
    EditNewTagNameAction, RECEIVE_TAGS, ReceiveTagsAction, REQUEST_TAGS,
    RequestTagsAction
} from "./types";
import Tag from "../objects/Tag";
import {ThunkAction} from "redux-thunk";
import {AppState} from "../Model";
import {Command} from "../command/types";
import RestClient from "../../rest/RestClient";

export function doCreateNewTag(newTagName: string, id: number): CreateNewTagAction {
    return new CreateNewTagAction(newTagName, id)
}

export function doEditNewTagName(newName: string): EditNewTagNameAction {
    return {
        type: EDIT_NEW_TAG_NAME,
        newName: newName
    }
}

export function doRequestTags(): RequestTagsAction {
    return {
        type: REQUEST_TAGS
    }
}

export function doReceiveTags(data: Tag[]): ReceiveTagsAction {
    return {
        type: RECEIVE_TAGS,
        data: data
    }
}

type ThunkResult<R> = ThunkAction<R, AppState, undefined, Command>;

export function fetchTags(): ThunkResult<Promise<void>> {
    return async function (dispatch, getState) {
        let {userState: {currentUser}} = getState();
        if (currentUser) {
            dispatch(doRequestTags());
            let restClient = new RestClient(currentUser.name, currentUser.password);
            try {
                let response = await restClient.loadTags();
                if (response.status === 'succeeded'){
                    let data: Tag[] = await response.data.json();
                    dispatch(doReceiveTags(data))
                }
            }catch (err) {
                console.log(err)
            }
        }
    }
}

export function sendNewTag(): ThunkResult<Promise<void>> {
    return async function (dispatch, getState) {
        let {userState: {currentUser}, tagState: {newTagName}} = getState();
        if (currentUser) {
            let restClient = new RestClient(currentUser.name, currentUser.password);
            try {
                let response = await restClient.sendNewTag(newTagName);
                if (response.status === 'succeeded') {
                    let data: Tag = await response.data.json();
                    dispatch(doCreateNewTag(data.name, data.id));
                }
            } catch (err) {
                console.log(err)
            }
        }
    }
}