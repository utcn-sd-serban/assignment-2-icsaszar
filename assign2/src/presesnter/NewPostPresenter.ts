import React from "react";
import {Dispatch} from "redux";
import User from "../model/objects/User";
import {
    doAddTagToSelectedTags, doClearNewPostData,
    doNewPost,
    doSetCurrentTag,
    doSetNewText,
    doSetNewTitle
} from "../model/question/actions";
import Tag from "../model/objects/Tag";
import {doNewTag} from "../model/tag/actions";
import {connect} from "react-redux";
import {AppState} from "../model/Model";

interface Props {
    tags: Tag[];
    currentUser?: User;
    newTitle: string;
    newText: string;
    currentTag: Tag;
    selectedTags: Tag[];

    onCreate: (postAuthor: User) => void;
    onSetNewTitle: (newTitle: string) => void;
    onSetNewText: (newText: string) => void;
    onAddTagToSelectedTags: () => void;
    onSetCurrentTag: (currentTag: Tag) => void;
    onClearNewPostData: () => void;
}

class NewPostPresenter extends React.Component<Props>{

    handleInputChange = (field: string, value: string) => {
        switch (field) {
            case "title":
                this.props.onSetNewTitle(value);
                break;
            case "text":
                this.props.onSetNewText(value);
                break;
        }
    };

    resetState = () => {
        this.props.onClearNewPostData();
    };

    handleCreatePost = () => {
        if(this.props.currentUser){
            this.props.onCreate(this.props.currentUser);
            this.resetState();
        }
    };

    handleNewTag = () => {

    };

    handleAddTag = () => {
        this.props.onAddTagToSelectedTags();
    };

    handleTagChange = (newTag: string) =>{
        const currentTag = this.props.tags.find(tag => tag.name === newTag);
        if(currentTag)
            this.props.onSetCurrentTag(currentTag);
    };
}

function mapStateToProps(state: AppState) {
    return {
        tags: state.tagState.tags,
        currentUser: state.userState.currentUser,
        newTitle: state.questionState.newTitle,
        newText: state.questionState.newText,
        currentTag: state.questionState.currentTag,
        selectedTags: state.questionState.selectedTags
    }
}

function mapDispatchToPros(dispatch: Dispatch) {
    return {
        onCreate: (postAuthor: User) =>
            dispatch(doNewPost(postAuthor)),
        onSetNewTitle: (newTitle: string) =>
            dispatch(doSetNewTitle(newTitle)),
        onSetNewText: (newText: string) =>
            dispatch(doSetNewText(newText)),
        onAddTagToSelectedTags: () =>
            dispatch(doAddTagToSelectedTags()),
        onSetCurrentTag: (currentTag: Tag) =>
            dispatch(doSetCurrentTag(currentTag)),
        onClearNewPostData: () =>
            dispatch(doClearNewPostData()),

        onNewTag: (name: string) =>
            dispatch(doNewTag(name))
    }
}

export const newPostPresenter = connect(mapStateToProps, mapDispatchToPros);