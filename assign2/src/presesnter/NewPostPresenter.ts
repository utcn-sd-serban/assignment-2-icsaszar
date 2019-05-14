import {Dispatch} from "redux";
import User from "../model/objects/User";
import Tag from "../model/objects/Tag";
import {doCreateNewTag, doEditNewTagName, sendNewTag} from "../model/tag/actions";
import {ThunkDispatch} from "redux-thunk";
import {AppState} from "../model/Model";
import {Command} from "../model/command/types";
import {NewPostField} from "../model/question/newpost/types";
import {
    doAddTagToSelectedTags,
    doClearNewPostData,
    doSetCurrentTag,
    doSetNewField
} from "../model/question/newpost/actions";
import {sendNewPost} from "../model/question/postlist/asyncActions";

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