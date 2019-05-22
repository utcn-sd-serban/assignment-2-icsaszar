import React from 'react';
import Tag from "../../../model/objects/Tag";
import {QuestionFilter} from "../../../model/filter/types";

interface Props{
    currentFilter: QuestionFilter
    tags: Tag[];
    title: string;
    onShowAll: () => void;
    onFilterByTag: () => void;
    onFilterByTitle: () => void;
    onChangeSelectedTag: (newTag: string) => void;
    onChangeSearchedTitle: (newTitle: string) => void;
    onRefresh: () => void;
}

export function FilterView(
    {
        currentFilter,
        tags,
        title,
        onShowAll,
        onFilterByTag,
        onFilterByTitle,
        onChangeSelectedTag,
        onChangeSearchedTitle,
        onRefresh
    }: Props
) {
    return (
        <div className={"container"}>
            <button className={"btn m-1 " + ((currentFilter === QuestionFilter.ALL_POSTS) ? "btn-primary" : "btn-outline-primary")} onClick={onShowAll}> All </button>
            <input placeholder={"Title"} value={title} onChange={({target: {value}}) => onChangeSearchedTitle(value)}/>
            <button className={"btn m-1 " + ((currentFilter === QuestionFilter.FILTER_BY_TITLE) ? "btn-primary" : "btn-outline-primary")} onClick={onFilterByTitle}> By title</button>
            <select onChange={({target: {value}}) => onChangeSelectedTag(value)}>
                {
                    tags.map(tag =>
                        <option key={tag.id}> {tag.name} </option>
                    )
                }
            </select>
            <button className={"btn m-1 " + ((currentFilter === QuestionFilter.FILTER_BY_TAG) ? "btn-primary" : "btn-outline-primary")} onClick={onFilterByTag}> By tag</button>
            <button className="btn m-1 my-3 btn-info" onClick={onRefresh}> Refresh </button>
        </div>
    )
}