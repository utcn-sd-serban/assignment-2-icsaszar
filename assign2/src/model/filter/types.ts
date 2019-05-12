import Tag from "../objects/Tag";
import {Command, UndoableCommand} from "../command/types";
import {AppState} from "../Model";


export enum QuestionFilter{
    ALL_POSTS = "ALL_POSTS",
    FILTER_BY_TITLE = "FILTER_BY_TITLE",
    FILTER_BY_TAG = "FILTER_BY_TAG",
}

export const SET_FILTER = "[FILTER] SET FILTER";
export const SET_SEARCHED_TITLE = "[FILTER] SET SEARCHED TITLE";
export const SET_SEARCHED_TAG = "[FILTER] SET SEARCHED TAG";

export interface FilterState {
    searchedTitle: string;
    searchedTag: Tag;
    currentFilter: QuestionFilter;
}



export class SetFilterAction implements UndoableCommand{
    type: typeof SET_FILTER = SET_FILTER;

    filter: QuestionFilter;

    constructor(filter: QuestionFilter) {
        this.filter = filter;
    }

    makeAntiAction(state: AppState, ...args: any[]): SetFilterAction{
        return new SetFilterAction(state.filterState.currentFilter)
    }
}

interface SetSearchedTitleAction extends Command{
    type: typeof SET_SEARCHED_TITLE;
    searchedTitle: string;
}

interface SetSearchedTagAction extends Command{
    type: typeof SET_SEARCHED_TAG;
    searchedTag: Tag;
}

export type FilterActions = SetFilterAction | SetSearchedTitleAction | SetSearchedTagAction;