import React from 'react';
import Tag from "../../model/objects/Tag";

interface Props{
    tags: Tag[];
    title: string;
    onShowAll: () => void;
    onFilterByTag: () => void;
    onFilterByTitle: () => void;
    onChangeSelectedTag: (newTag: string) => void;
    onChangeSearchedTitle: (newTitle: string) => void;
}

export function FilterView(
    {
        tags,
        title,
        onShowAll,
        onFilterByTag,
        onFilterByTitle,
        onChangeSelectedTag,
        onChangeSearchedTitle
    }: Props
) {
    return (
        <div className={"container"}>
            <button className={"btn m-1 " + "btn-primary"} onClick={onShowAll}> All</button>
            <input placeholder={"Title"} value={title} onChange={({target: {value}}) => onChangeSearchedTitle(value)}/>
            <button className={"btn m-1 " + "btn-primary"} onClick={onFilterByTitle}> By title</button>
            <select onChange={({target: {value}}) => onChangeSelectedTag(value)}>
                {
                    tags.map(tag =>
                        <option key={tag.id}> {tag.name} </option>
                    )
                }
            </select>
            <button className={"btn m-1 " + "btn-primary"} onClick={onFilterByTag}> By tag</button>
        </div>
    )
}