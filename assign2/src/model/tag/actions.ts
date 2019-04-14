import {NEW_TAG, TagAction} from "./types";

export function doNewTag(name: string): TagAction {
    return {
        type: NEW_TAG,
        tagName: name
    }
}