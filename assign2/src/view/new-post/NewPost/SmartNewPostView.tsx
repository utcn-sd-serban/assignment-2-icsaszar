import React, {Component} from "react";
import User from "../../../model/objects/User";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {NewPostView} from "./NewPostView";
import Tag from "../../../model/objects/Tag";
import {AppState} from "../../../model/Model";
import {newPostPresenter} from "../../../presesnter/NewPostPresenter";
import {NewPostField} from "../../../model/question/newpost/types";
import {isCurrentNewTagInTags} from "../../../model/tag/selectors";

interface Props {
    tags: Tag[];
    currentUser?: User;
    newTitle: string;
    newText: string;
    currentTag: Tag;
    selectedTags: Tag[];
    newTagName: string;
    existingTag: boolean;

    onSubmitNewPost: (postAuthor?: User) => () => void;
    onSetNewField: (field: NewPostField, newValue: string) => void;
    onAddTagToSelectedTags: () => void;
    onSetCurrentTag: (tags: Tag[]) => (currentTag: string) => void;

    onCreateNewTag: () => void;
    onEditNewTagName: (newName: string) => void;
}

class SmartNewPostView extends Component<Props>{

    render(){
        const {newText, newTitle, tags, currentTag, selectedTags} = this.props;
        return (
            <NewPostView
                text={newText}
                title={newTitle}
                tags={tags}
                selectedTags={selectedTags}
                currentTag={currentTag.name}
                newTagName={this.props.newTagName}

                onChangeNewTagName={this.props.onEditNewTagName}
                onCreateNewTag={this.props.onCreateNewTag}
                onChangeInput={this.props.onSetNewField}
                onSubmit={this.props.onSubmitNewPost(this.props.currentUser)}
                submitButtonDisabled={((newTitle.trim() === "") || (newText.trim() === ""))}
                newTagButtonDisabled={this.props.existingTag || (this.props.newTagName.trim() === "")}
                onAddTag={this.props.onAddTagToSelectedTags}
                onChangeTag={this.props.onSetCurrentTag(tags)}
            />
        );
    }
}

function mapDispatchToPros(dispatch: Dispatch) {
    const presenter = newPostPresenter(dispatch);
    return {
        onSubmitNewPost: (postAuthor?: User) => () =>
            presenter.handleCreatePost(postAuthor),
        onSetNewField: (field: NewPostField, newValue: string) =>
            presenter.handleInputChange(field, newValue),
        onAddTagToSelectedTags: () =>
            presenter.handleAddTag(),
        onSetCurrentTag: (tags: Tag[]) => (currentTag: string) =>
            presenter.handleTagChange(currentTag, tags),
        onCreateNewTag: () =>
            presenter.handleCreateNewTag(),
        onEditNewTagName: (newName: string) =>
            presenter.handleChangeNewTagName(newName)
    }
}

function mapStateToProps(state: AppState) {

    return {
        tags: state.tagState.tags,
        currentUser: state.userState.currentUser,
        ...state.questionState.newPostState,
        newTagName: state.tagState.newTagName,
        existingTag: isCurrentNewTagInTags(state)
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(SmartNewPostView);