import Container from "react-bootstrap/Container";
import React, {ChangeEventHandler} from 'react';

export function NewPostView(
    {
        onClick,
        onChange,
        title,
        text,
        buttonDisabled
    } :
    {
        onClick: () => void,
        onChange: ChangeEventHandler,
        title: string,
        text: string,
        buttonDisabled: boolean
    })
{
    return (
        <Container>
            <input onChange={onChange} value={title} placeholder={"Title"} name={"title"}/>
            <input onChange={onChange} value={text} placeholder={"Text"} name={"text"}/>
            <button onClick={onClick} disabled={buttonDisabled}> Submit </button>
        </Container>
    );
}