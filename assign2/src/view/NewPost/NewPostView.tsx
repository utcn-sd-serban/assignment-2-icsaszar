import React, {ChangeEventHandler} from 'react';
import Tag from "../../model/objects/Tag";

export function NewPostView(
    {
        onSubmit,
        onChangeInput,
        onAddTag,
        onChangeTag,
        currentTag,
        title,
        text,
        buttonDisabled,
        tags
    } :
    {
        onSubmit: () => void,
        onAddTag: () => void,
        onChangeInput: (field: string, value: string) => void,
        onChangeTag: (newTag: string) => void,
        currentTag: string,
        title: string,
        text: string,
        buttonDisabled: boolean,
        tags: Tag[]
    })
{
    return (
        <div className={"container"}>
            <input
                onChange={({target: {value, name}}) => onChangeInput(name, value)}
                value={title}
                placeholder={"Title"}
                name={"title"}
            />

            <input
                onChange={({target: {value, name}}) => onChangeInput(name, value)}
                value={text}
                placeholder={"Text"}
                name={"text"}
            />
            <button
                className={"btn m-1 " + "btn-primary"}
                onClick={onSubmit}
                disabled={buttonDisabled}
            >
                Submit
            </button>
            <select onChange={({target: {value}}) => onChangeTag(value)} value={currentTag}>
                {
                    tags.map(tag =>
                        <option> {tag.name} </option>
                    )
                }
            </select>
            <button
                className={"btn m-1 " + "btn-primary"}
                onClick={onAddTag}
            >
                Add
            </button>
        </div>
    );
}