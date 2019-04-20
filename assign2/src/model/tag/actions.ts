import {CREATE_NEW_TAG, EDIT_NEW_TAG_NAME, TagAction} from "./types";

export function doCreateNewTag(): TagAction {
    return {
        type: CREATE_NEW_TAG
    }
}

export function doEditNewTagName(newName: string): TagAction {
    return {
        type: EDIT_NEW_TAG_NAME,
        newName: newName
    }
}