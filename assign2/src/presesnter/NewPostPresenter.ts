import {
    doAddTagToSelectedTags,
    doClearNewPostData,
    doNewPost,
    doSetCurrentTag,
    doSetNewField
} from "../model/question/actions";
import {Dispatch} from "redux";
import User from "../model/objects/User";
import Tag from "../model/objects/Tag";

export const newPostPresenter2 = (dispatch: Dispatch) =>
    ({
        handleInputChange: (field: "title" | "text", value: string) => {
            dispatch(doSetNewField(field, value));
        },

        handleResetState: () => {
            dispatch(doClearNewPostData());
        },

        handleCreatePost: (author?: User) => {
            //FIXME Where to handle this?
            if (author) {
                dispatch(doNewPost(author));
                dispatch(doClearNewPostData());
            }
        },

        handleNewTag: () => {

        },

        handleAddTag: () => {
            dispatch(doAddTagToSelectedTags());
        },

        handleTagChange: (newTag: string, tags: Tag[]) => {
            const currentTag = tags.find(tag => tag.name === newTag);
            if (currentTag)
                dispatch(doSetCurrentTag(currentTag));
        }
    });


class NewPostPresenter {

    handleInputChange = (dispatch: Dispatch) => (field: "title" | "text", value: string) => {
        dispatch(doSetNewField(field, value));
    };

    handleResetState = (dispatch: Dispatch) => () => {
        dispatch(doClearNewPostData());
    };

    handleCreatePost = (dispatch: Dispatch) => (author?: User) => {
        //Where to handle this?
        if (author) {
            dispatch(doNewPost(author));
            dispatch(doClearNewPostData());
        }
    };

    handleNewTag = () => {

    };

    handleAddTag = (dispatch: Dispatch) => () => {
        dispatch(doAddTagToSelectedTags());
    };

    handleTagChange = (dispatch: Dispatch) => (newTag: string, tags: Tag[]) => {
        const currentTag = tags.find(tag => tag.name === newTag);
        if (currentTag)
            dispatch(doSetCurrentTag(currentTag));
    };
}

export const newPostPresenter = new NewPostPresenter();