import {ALL_POSTS, FILTER_BY_TAG, FILTER_BY_TITLE, FilterState, QuestionFilter} from "../../model/filter/types";
import {Dispatch} from "redux";
import {Component} from "react";
import Tag from "../../model/objects/Tag";
import {AppState} from "../../model/Model";
import {doSetFilter, doSetSearchedTag, doSetSearchedTitle} from "../../model/filter/actions";
import {connect} from "react-redux";
import * as React from "react";
import {FilterView} from "./FilterView";

interface State {
    searchedTag: string;
    searchedTitle: string;
}

interface Props {
    tags: Tag[];
    onSetFilter: (filter: QuestionFilter) => void;
    onSetSearchedTag: (tag: Tag) => void;
    onSetSearchedTitle: (title: string) => void;
}


class SmartFilterView extends Component<Props, State>{
    state ={
        searchedTag: this.props.tags[0].name,
        searchedTitle: ""
    };

    onShowAll = () =>{
        this.props.onSetFilter(ALL_POSTS)
    };

    onFilterByTag = () =>{
        const searchedTag = this.props.tags.find(tag => tag.name === this.state.searchedTag);
        if(searchedTag)
        {
            this.props.onSetSearchedTag(searchedTag);
            this.props.onSetFilter(FILTER_BY_TAG);
        }
    };

    onFilterByTitle = () => {
        this.props.onSetSearchedTitle(this.state.searchedTitle);
        this.props.onSetFilter(FILTER_BY_TITLE);
    };

    onChangeSearchedTitle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            searchedTitle: e.target.value
        });
    };

    onChangeSearchedTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        this.setState({
            ...this.state,
            searchedTag: e.target.value
        });
    };

    render() {
        return (
          <FilterView
              tags={this.props.tags}
              title={this.state.searchedTitle}
              onShowAll={this.onShowAll}
              onFilterByTag={this.onFilterByTag}
              onFilterByTitle={this.onFilterByTitle}
              onChangeSearchedTitle={this.onChangeSearchedTitle}
              onChangeSelectedTag={this.onChangeSearchedTag}
          />
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        tags: state.tagState.tags
    }
}

function mapDispatchToProps(dispatch: Dispatch){
    return{
        onSetFilter: (filter: QuestionFilter) =>
            dispatch(doSetFilter(filter)),
        onSetSearchedTag: (tag: Tag) =>
            dispatch(doSetSearchedTag(tag)),
        onSetSearchedTitle: (title: string) =>
            dispatch(doSetSearchedTitle(title))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartFilterView);