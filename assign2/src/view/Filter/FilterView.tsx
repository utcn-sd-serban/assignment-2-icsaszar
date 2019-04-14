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
        <div>
            <button onClick={onShowAll}> All</button>
            <button onClick={onFilterByTag}> By tag</button>
            <button onClick={onFilterByTitle}> By title</button>
            <input placeholder={"Title"} value={title} onChange={onChangeSearchedTitle}/>
            <select onChange={onChangeSelectedTag}>
                {
                    tags.map(tag =>
                        <option> {tag.name} </option>
                    )
                }
            </select>
        </div>
    )
}