import React, {ChangeEventHandler} from 'react';
import Tag from "../../model/objects/Tag";
import Container from "react-bootstrap/Container";


export function FilterView(
    {
        tags,
        title,
        onShowAll,
        onFilterByTag,
        onFilterByTitle,
        onChangeSelectedTag,
        onChangeSearchedTitle
    }:
    {
        tags: Tag[],
        title: string
        onShowAll: () => void,
        onFilterByTag: () => void,
        onFilterByTitle: () => void,
        onChangeSelectedTag: ChangeEventHandler
        onChangeSearchedTitle: ChangeEventHandler
    }
) {
    return (
        <div className={"container"}>
            <button className={"btn btn-primary m-1"} onClick={onShowAll}> All</button>
            <input placeholder={"Title"} value={title} onChange={onChangeSearchedTitle}/>
            <button className={"btn btn-primary m-1"} onClick={onFilterByTitle}> By title</button>
            <select onChange={onChangeSelectedTag}>
                {
                    tags.map(tag =>
                        <option> {tag.name} </option>
                    )
                }
            </select>
            <button className={"btn btn-primary m-1"} onClick={onFilterByTag}> By tag</button>
        </div>
    )
}