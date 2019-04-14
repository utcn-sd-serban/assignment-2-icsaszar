import {QuestionFilter, SET_FILTER} from "./types";

export function doSetFilter(filter: QuestionFilter) {
    return {
        type: SET_FILTER,
        filter: filter
    };
}