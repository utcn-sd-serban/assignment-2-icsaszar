import React, {ChangeEventHandler} from 'react';
import Tag from "../../model/objects/Tag";


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
            <button className={"btn m-1 " + "btn-primary"} onClick={onShowAll}> All</button>
            <input placeholder={"Title"} value={title} onChange={onChangeSearchedTitle}/>
            <button className={"btn m-1 " + "btn-primary"} onClick={onFilterByTitle}> By title</button>
            <select onChange={onChangeSelectedTag}>
                {
                    tags.map(tag =>
                        <option> {tag.name} </option>
                    )
                }
            </select>
            <button className={"btn m-1 " + "btn-primary"} onClick={onFilterByTag}> By tag</button>
        </div>
    )
}