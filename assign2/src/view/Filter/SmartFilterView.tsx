import {QuestionFilter} from "../../model/filter/types";
import {Dispatch} from "redux";
import * as React from "react";
import {Component} from "react";
import Tag from "../../model/objects/Tag";
import {AppState} from "../../model/Model";
import {doSetFilter, doSetSearchedTag, doSetSearchedTitle} from "../../model/filter/actions";
import {connect} from "react-redux";
import {FilterView} from "./FilterView";
import {filterPresenter} from "../../presesnter/FilterPresenter";

interface Props {
    tags: Tag[];
    searchedTag: Tag;
    searchedTitle: string;

    onShowAll: () => void,
    onFilterByTag: () => void,
    onFilterByTitle: () => void,

    onSetSearchedTag: (tags: Tag[]) => (tag: string) => void,
    onSetSearchedTitle: (title: string) => void
}


class SmartFilterView extends Component<Props>{
        render() {
        return (
          <FilterView
              tags={this.props.tags}
              title={this.props.searchedTitle}
              onShowAll={this.props.onShowAll}
              onFilterByTag={this.props.onFilterByTag}
              onFilterByTitle={this.props.onFilterByTitle}
              onChangeSearchedTitle={this.props.onSetSearchedTitle}
              onChangeSelectedTag={this.props.onSetSearchedTag(this.props.tags)}
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
            presenter.handleChangeSearchedTitle(title)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartFilterView);