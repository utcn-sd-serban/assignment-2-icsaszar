import React, {Component} from "react";
import User from "../../model/objects/User";
import {
    doAddTagToSelectedTags, doClearNewPostData,
    doNewPost,
    doSetCurrentTag,
    doSetNewText,
    doSetNewTitle
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
    onSetNewTitle: (newTitle: string) => void;
    onSetNewText: (newText: string) => void;
    onAddTagToSelectedTags: () => void;
    onSetCurrentTag: (currentTag: Tag) => void;
    onClearNewPostData: () => void;

    onNewTag: (name: string) => void;
}

class SmartNewPostView extends Component<Props>{

    handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        switch (e.target.name) {
            case "title":
                this.props.onSetNewTitle(e.target.value);
                break;
            case "text":
                this.props.onSetNewText(e.target.value);
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

    handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault();
        const currentTag = this.props.tags.find(tag => tag.name === e.target.value);
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