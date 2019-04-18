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
import {NewPostField} from "../model/question/types";

export const newPostPresenter = (dispatch: Dispatch) =>
    ({
        handleInputChange: (field: NewPostField, value: string) => {
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