import {Dispatch} from "redux";
import {QuestionFilter} from "../model/filter/types";
import {doSetFilter, doSetSearchedTag, doSetSearchedTitle} from "../model/filter/actions";
import Tag from "../model/objects/Tag";
import {doSetCurrentTag} from "../model/question/actions";

export const filterPresenter = (dispatch: Dispatch) =>
    ({
        handleShowAll: () =>
            dispatch(doSetFilter(QuestionFilter.ALL_POSTS)),

        handleFilterByTag: () =>
            dispatch(doSetFilter(QuestionFilter.FILTER_BY_TAG)),

        handleFilterByTitle: () =>
            dispatch(doSetFilter(QuestionFilter.FILTER_BY_TITLE)),

        handleChangeSearchedTitle: (newTitle: string) =>
            dispatch(doSetSearchedTitle(newTitle)),

        handleChangeSearchedTag: (newTag: string, tags: Tag[]) => {
            const currentTag = tags.find(tag => tag.name === newTag);
            if (currentTag)
                dispatch(doSetSearchedTag(currentTag));
        }
    });