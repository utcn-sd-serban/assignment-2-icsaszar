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


interface Props {
    tags: Tag[];
    currentUser?: User;
    newTitle: string;
    newText: string;
    currentTag: Tag;
    selectedTags: Tag[];

    onCreate: (postAuthor: User) => void;
    onSetNewField: (field: "title" | "text", newValue: string) => void;
    onAddTagToSelectedTags: () => void;
    onSetCurrentTag: (currentTag: Tag) => void;
    onClearNewPostData: () => void;

    onNewTag: (name: string) => void;
}

class SmartNewPostView extends Component<Props>{

    handleInputChange = (field: "title" | "text", value: string) => {
        this.props.onSetNewField(field, value);
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

    render(){
        const {newText, newTitle, tags, currentTag} = this.props;
        return (
            <NewPostView
                text={newText}
                title={newTitle}
                onChangeInput={this.handleInputChange}
                onSubmit={this.handleCreatePost}
                buttonDisabled={((newTitle.trim() === "") || (newText.trim() === ""))}
                tags={tags}
                onAddTag={this.handleAddTag}
                currentTag={currentTag.name}
                onChangeTag={this.handleTagChange}
            />
        );
    }
}

function mapDispatchToPros(dispatch: Dispatch) {
    //FIXME: Presenter as:
    // - singleton returning action creators, or
    // - class that takes as parameter in the constructor the dispatch, or
    // - a hybrid approach with one global instance that has setDispatch
    return {
        onCreate: (postAuthor: User) =>
            dispatch(doNewPost(postAuthor)),
        onSetNewField: (field: "title" | "text", newValue: string) =>
            dispatch(doSetNewField(field, newValue)),
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