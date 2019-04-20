import React from "react";

interface EditableProps {
    onChangeInput: (newValue: string) => void;
    onSave: () => void;
    tempText: string;
    onDelete?: () => void;
}

export function EditField({onChangeInput, onSave, tempText, onDelete}: EditableProps){
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
            {
                onDelete &&
                <div className="col">
                    <button
                        className="btn m-1 btn-danger"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            }
        </div>);
}