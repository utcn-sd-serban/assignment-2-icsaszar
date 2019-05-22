import {Dispatch} from "redux";
import {QuestionFilter} from "../model/filter/types";
import {doSetFilter, doSetSearchedTag, doSetSearchedTitle} from "../model/filter/actions";
import Tag from "../model/objects/Tag";
import {fetchPosts} from "../model/question/postlist/asyncActions";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";

export const filterPresenter = (dispatch: ThunkDispatch<AppState, undefined, Command>) =>
    ({
        handleShowAll: () =>{

            dispatch(doSetFilter(QuestionFilter.ALL_POSTS));
            dispatch(fetchPosts(false, true))
        },

        handleFilterByTag: () => {
            dispatch(doSetFilter(QuestionFilter.FILTER_BY_TAG));
            dispatch(fetchPosts(false, true))
        },

        handleFilterByTitle: () =>{
            dispatch(doSetFilter(QuestionFilter.FILTER_BY_TITLE));
            dispatch(fetchPosts(false, true))
        },

        handleChangeSearchedTitle: (newTitle: string) =>
            dispatch(doSetSearchedTitle(newTitle)),

        handleChangeSearchedTag: (newTag: string, tags: Tag[]) => {
            const currentTag = tags.find(tag => tag.name === newTag);
            if (currentTag)
                dispatch(doSetSearchedTag(currentTag));
        },

        handleRefresh: () => {
            dispatch(fetchPosts(false, true))
        }
    });