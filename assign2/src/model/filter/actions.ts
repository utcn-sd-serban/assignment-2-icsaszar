import {
    FilterActions,
    QuestionFilter,
    SET_FILTER,
    SET_SEARCHED_TAG,
    SET_SEARCHED_TITLE,
    SetFilterAction
} from "./types";
import Tag from "../objects/Tag";

export function doSetFilter(filter: QuestionFilter): FilterActions {
    return new SetFilterAction(filter)
}

export function doSetSearchedTag(tag: Tag): FilterActions {
    return {
        type: SET_SEARCHED_TAG,
        searchedTag: tag
    };
}

export function doSetSearchedTitle(title: string): FilterActions {
    return {
        type: SET_SEARCHED_TITLE,
        searchedTitle: title
    };
}