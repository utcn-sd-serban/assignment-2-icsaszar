import React from "react";

interface Props {
    onChangeInput: (newValue: string) => void;
    onSave: () => void;
    tempText: string;
}

export function EditField({onChangeInput, onSave, tempText}: Props){
    return (
        <div className="row">
            <div className="col">
                <input
                    onChange={({target: {value}}) => onChangeInput(value)}
                    value={tempText}
                />
            </div>
            <div className="col">
                <button
                    className={"btn m-1 btn-primary"}
                    onClick={onSave}
                >
                    Save changes
                </button>
            </div>
        </div>);
}