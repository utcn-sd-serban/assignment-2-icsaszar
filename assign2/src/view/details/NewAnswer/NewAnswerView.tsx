import React from 'react';

interface Params {
    onSubmit: () => void;
    onChangeInput: (newValue: string) => void;

    currentAnswerText: string;
}

export function NewAnswerView(
    {
        currentAnswerText,
        onChangeInput,
        onSubmit
    }: Params)
{
    return (
        <div className={"container"}>
            <input
                onChange={({target: {value}}) => onChangeInput(value)}
                value={currentAnswerText}
            />
            <button
                className={"btn m-1 btn-primary"}
                onClick={onSubmit}
            >
                Submit
            </button>
        </div>
    );
}