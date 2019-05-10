import {AppState} from "../Model";

export function isCurrentNewTagInTags(state: AppState) {
    return !!state.tagState.tags.find(tag => tag.name === state.tagState.newTagName)
}