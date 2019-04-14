import Container from "react-bootstrap/Container";
import React, {ChangeEventHandler} from 'react';
import Tag from "../model/objects/Tag";

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
        onChangeInput: ChangeEventHandler,
        onChangeTag: ChangeEventHandler,
        currentTag: string,
        title: string,
        text: string,
        buttonDisabled: boolean,
        tags: Tag[]
    })
{
    return (
        <Container>
            <input onChange={onChangeInput} value={title} placeholder={"Title"} name={"title"}/>
            <input onChange={onChangeInput} value={text} placeholder={"Text"} name={"text"}/>
            <button onClick={onSubmit} disabled={buttonDisabled}> Submit </button>
            <select onChange={onChangeTag} value={currentTag}>
                {
                    tags.map(tag =>
                        <option> {tag.name} </option>
                    )
                }
            </select>
            <button onClick={onAddTag}>Add</button>
        </Container>
    );
}