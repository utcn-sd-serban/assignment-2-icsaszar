import {
    doAddTagToSelectedTags,
    doClearNewPostData,
    doNewPost,
    doSetCurrentTag,
    doSetNewField, sendNewPost
} from "../model/question/actions";
import {Dispatch} from "redux";
import User from "../model/objects/User";
import Tag from "../model/objects/Tag";
import {NewPostField} from "../model/question/types";
import {doCreateNewTag, doEditNewTagName, sendNewTag} from "../model/tag/actions";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";

export const newPostPresenter = (dispatch: ThunkDispatch<AppState, undefined, Command>) =>
    ({
        handleInputChange: (field: NewPostField, value: string) => {
            dispatch(doSetNewField(field, value));
        },

        handleResetState: () => {
            dispatch(doClearNewPostData());
        },

        handleCreatePost: (author?: User| undefined) => {
            if (author) {
                dispatch(sendNewPost());
                dispatch(doClearNewPostData());
            }
        },

        handleCreateNewTag: () =>
            dispatch(sendNewTag()),

        handleChangeNewTagName: (newName: string) =>
            dispatch(doEditNewTagName(newName)),

        handleAddTag: () => {
            dispatch(doAddTagToSelectedTags());
        },

        handleTagChange: (newTag: string, tags: Tag[]) => {
            const currentTag = tags.find(tag => tag.name === newTag);
            if (currentTag)
                dispatch(doSetCurrentTag(currentTag));
        }
    });