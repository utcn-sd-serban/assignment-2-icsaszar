import {Dispatch} from "redux";
import * as React from "react";
import {Component} from "react";
import Tag from "../../../model/objects/Tag";
import {AppState} from "../../../model/Model";
import {connect} from "react-redux";
import {FilterView} from "./FilterView";
import {filterPresenter} from "../../../presesnter/FilterPresenter";
import {QuestionFilter} from "../../../model/filter/types";

interface Props {
    tags: Tag[];
    searchedTag: Tag;
    searchedTitle: string;
    currentFilter: QuestionFilter;

    onShowAll: () => void,
    onFilterByTag: () => void,
    onFilterByTitle: () => void,

    onSetSearchedTag: (tags: Tag[]) => (tag: string) => void,
    onSetSearchedTitle: (title: string) => void,
    onRefresh: () => void;
}


class SmartFilterView extends Component<Props>{
        render() {
        return (
          <FilterView
              currentFilter={this.props.currentFilter}
              tags={this.props.tags}
              title={this.props.searchedTitle}
              onShowAll={this.props.onShowAll}
              onFilterByTag={this.props.onFilterByTag}
              onFilterByTitle={this.props.onFilterByTitle}
              onChangeSearchedTitle={this.props.onSetSearchedTitle}
              onChangeSelectedTag={this.props.onSetSearchedTag(this.props.tags)}
              onRefresh={this.props.onRefresh}
          />
        );
    }
}

function mapStateToProps(state: AppState) {
    return {
        tags: state.tagState.tags,
        searchedTitle: state.filterState.searchedTitle,
        searchedTag: state.filterState.searchedTag,
        currentFilter: state.filterState.currentFilter
    }
}

function mapDispatchToProps(dispatch: Dispatch){
    const presenter = filterPresenter(dispatch);
    return{
        onShowAll: () =>
            presenter.handleShowAll(),
        onFilterByTag: () =>
            presenter.handleFilterByTag(),
        onFilterByTitle: () =>
            presenter.handleFilterByTitle(),

        onSetSearchedTag: (tags: Tag[]) => (tag: string) =>
            presenter.handleChangeSearchedTag(tag, tags),
        onSetSearchedTitle: (title: string) =>
            presenter.handleChangeSearchedTitle(title),
        onRefresh: () =>
            presenter.handleRefresh()
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartFilterView);