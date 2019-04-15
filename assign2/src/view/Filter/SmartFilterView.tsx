import {QuestionFilter} from "../../model/filter/types";
import {Dispatch} from "redux";
import * as React from "react";
import {Component} from "react";
import Tag from "../../model/objects/Tag";
import {AppState} from "../../model/Model";
import {doSetFilter, doSetSearchedTag, doSetSearchedTitle} from "../../model/filter/actions";
import {connect} from "react-redux";
import {FilterView} from "./FilterView";

interface Props {
    tags: Tag[];
    searchedTag: Tag;
    searchedTitle: string;
    onSetFilter: (filter: QuestionFilter) => void;
    onSetSearchedTag: (tag: Tag) => void;
    onSetSearchedTitle: (title: string) => void;
}


class SmartFilterView extends Component<Props>{
    onShowAll = () =>{
        this.props.onSetFilter(QuestionFilter.ALL_POSTS)
    };

    onFilterByTag = () =>{
        this.props.onSetFilter(QuestionFilter.FILTER_BY_TAG);
    };

    onFilterByTitle = () => {
        this.props.onSetFilter(QuestionFilter.FILTER_BY_TITLE);
    };

    onChangeSearchedTitle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.props.onSetSearchedTitle(e.target.value);
        e.preventDefault();
    };

    onChangeSearchedTag = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const searchedTag = this.props.tags.find(tag => tag.name === e.target.value);
        if(searchedTag)
            this.props.onSetSearchedTag(searchedTag)
    };

    render() {
        return (
          <FilterView
              tags={this.props.tags}
              title={this.props.searchedTitle}
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
        tags: state.tagState.tags,
        searchedTitle: state.filterState.searchedTitle,
        searchedTag: state.filterState.searchedTag
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