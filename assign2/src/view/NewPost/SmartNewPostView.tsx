import React, {Component} from "react";
import User from "../../model/objects/User";
import {doNewPost} from "../../model/question/actions";
import {Dispatch} from "redux";
import {connect} from "react-redux";
import {NewPostView} from "./NewPostView";
import Tag from "../../model/objects/Tag";
import {AppState} from "../../model/Model";
import {doNewTag} from "../../model/tag/actions";


interface Props {
    onCreate: (title: string, text: string, tags: Tag[]) => void;
    onNewTag: (name: string) => void;
    tags: Tag[]
}

interface State {
    title: string;
    text: string;
    canSubmit: boolean;
    selectedTags: string[];
    currentTag: string;
}

class SmartNewPostView extends Component<Props, State>{
    state: State = {
        title: "",
        text: "",
        canSubmit: false,
        selectedTags: [],
        currentTag: this.props.tags[0].name
    };

    handleInputChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        let newState = {
            ...this.state,
            [e.target.name]: e.target.value
        };
        this.setState({
            ...newState,
            canSubmit: (newState.text.trim() !== "") && (newState.title.trim() !== "")
        });
    };

    resetState = () => {
      this.setState({
          ...this.state,
          selectedTags: [],
          title: "",
          text: "",
          currentTag: this.props.tags[0].name
      })
    };

    handleCreatePost = () => {
        let tags: Tag[] = [];
        this.state.selectedTags.forEach( selectedTagName =>{
            const foundTag = this.props.tags.find(tag => tag.name == selectedTagName);
            if(foundTag !== undefined)
                tags = [...tags, foundTag]
        });
        this.props.onCreate(this.state.title.trim(), this.state.text.trim(), tags);
        this.resetState();
    };

    handleNewTag = () => {

    };

    handleAddTag = () =>{
        if(this.state.currentTag !== undefined)
            if(!this.state.selectedTags.includes(this.state.currentTag))
                this.setState({
                    ...this.state,
                    selectedTags: [...this.state.selectedTags, this.state.currentTag]
                })
    };

    handleTagChange = (e: React.ChangeEvent<HTMLSelectElement>) =>{
        e.preventDefault();
        this.setState({
            ...this.state,
            currentTag: e.target.value
        })
    };

    render(){
        return (
            <NewPostView
                text={this.state.text}
                title={this.state.title}
                onChangeInput={this.handleInputChange}
                onSubmit={this.handleCreatePost}
                buttonDisabled={!this.state.canSubmit}
                tags={this.props.tags}
                onAddTag={this.handleAddTag}
                currentTag={this.state.currentTag}
                onChangeTag={this.handleTagChange}
            />
        );
    }
}

function mapDispatchToPros(dispatch: Dispatch) {
    return {
        onCreate: (title: string, text: string, tags: Tag[]) =>
            dispatch(doNewPost(title, text, new User("TEST"), tags)),
        onNewTag: (name: string) =>
            dispatch(doNewTag(name))
    }
}

function mapStateToProps(state: AppState) {
    return {
        tags: state.tagState.tags
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(SmartNewPostView);