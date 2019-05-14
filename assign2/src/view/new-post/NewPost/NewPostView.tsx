import React from 'react';
import Tag from "../../../model/objects/Tag";
import TagListView from "../../general/reuseable/TagListView";
import {NewPostField} from "../../../model/question/newpost/types";

interface Params {
    onSubmit: () => void;
    onAddTag: () => void;
    onChangeInput: (field: NewPostField, value: string) => void;
    onChangeTag: (newTag: string) => void;
    onChangeNewTagName: (newName: string) => void;
    onCreateNewTag: () => void;

    newTagName: string;
    currentTag: string;
    title: string;
    text: string;
    submitButtonDisabled: boolean;
    newTagButtonDisabled: boolean;
    tags: Tag[];
    selectedTags: Tag[]
}

export function NewPostView(
    {
        onSubmit,
        onChangeInput,
        onAddTag,
        onChangeTag,
        onChangeNewTagName,
        onCreateNewTag,
        newTagName,
        currentTag,
        title,
        text,
        submitButtonDisabled,
        newTagButtonDisabled,
        tags,
        selectedTags
    } : Params)
{
    return (
        <div className={"container"}>
            <input
                onChange={({target: {value}}) => onChangeInput("title", value)}
                value={title}
                placeholder={"Title"}
                name={"title"}
            />
            <input
                onChange={({target: {value}}) => onChangeInput("text", value)}
                value={text}
                placeholder={"Text"}
                name={"text"}
            />
            <button
                className={"btn m-1 " + "btn-primary"}
                onClick={onSubmit}
                disabled={submitButtonDisabled}
            >
                Submit
            </button>
            <select onChange={({target: {value}}) => onChangeTag(value)} value={currentTag}>
                {
                    tags.map(tag =>
                        <option key={tag.id}> {tag.name} </option>
                    )
                }
            </select>
            <button
                className={"btn m-1 " + "btn-primary"}
                onClick={onAddTag}
            >
                Add
            </button>
            <input
                onChange={({target: {value}}) => onChangeNewTagName(value)}
                value={newTagName}
                placeholder={"Text"}
                name={"text"}
            />
            <button
                className={"btn m-1 " + "btn-primary"}
                onClick={onCreateNewTag}
                disabled={newTagButtonDisabled}
            >
                Create New Tag
            </button>
            <TagListView tags={selectedTags}>
                Current Tags:
            </TagListView>
        </div>
    );
}