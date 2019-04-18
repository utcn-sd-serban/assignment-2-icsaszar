import React, {Component} from "react";
import User from "../../model/objects/User";
import {
    doAddTagToSelectedTags, doClearNewPostData,
    doNewPost,
    doSetCurrentTag,
    doSetNewField
} from "../../model/question/actions";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {NewPostView} from "./NewPostView";
import Tag from "../../model/objects/Tag";
import {AppState} from "../../model/Model";
import {doNewTag} from "../../model/tag/actions";
import {newPostPresenter, newPostPresenter2} from "../../presesnter/NewPostPresenter";


interface Props {
    tags: Tag[];
    currentUser?: User;
    newTitle: string;
    newText: string;
    currentTag: Tag;
    selectedTags: Tag[];

    onSubmitNewPost: (postAuthor?: User) => () => void;
    onSetNewField: (field: "title" | "text", newValue: string) => void;
    onAddTagToSelectedTags: () => void;
    onSetCurrentTag: (tags: Tag[]) => (currentTag: string) => void;

    onNewTag: (name: string) => void;
}

class SmartNewPostView extends Component<Props>{

    render(){
        const {newText, newTitle, tags, currentTag} = this.props;
        return (
            <NewPostView
                text={newText}
                title={newTitle}
                onChangeInput={this.props.onSetNewField}
                onSubmit={this.props.onSubmitNewPost(this.props.currentUser)}
                buttonDisabled={((newTitle.trim() === "") || (newText.trim() === ""))}
                tags={tags}
                onAddTag={this.props.onAddTagToSelectedTags}
                currentTag={currentTag.name}
                onChangeTag={this.props.onSetCurrentTag(tags)}
            />
        );
    }
}

function mapDispatchToPros(dispatch: Dispatch) {
    //FIXME: Presenter as:
    // - singleton returning action creators, or
    // - class that takes as parameter in the constructor the dispatch, or
    // - a hybrid approach with one global instance that has setDispatch
    const presenter = newPostPresenter2(dispatch);
    return {
        onSubmitNewPost: (postAuthor?: User) => () =>
            newPostPresenter.handleCreatePost(dispatch)(postAuthor),
        onSetNewField: (field: "title" | "text", newValue: string) =>
            newPostPresenter.handleInputChange(dispatch)(field, newValue),
        onAddTagToSelectedTags: () =>
            newPostPresenter.handleAddTag(dispatch)(),
        onSetCurrentTag: (tags: Tag[]) => (currentTag: string) =>
            newPostPresenter.handleTagChange(dispatch)(currentTag, tags),

        onNewTag: (name: string) =>
            dispatch(doNewTag(name))
    }
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

export default connect(mapStateToProps, mapDispatchToPros)(SmartNewPostView);