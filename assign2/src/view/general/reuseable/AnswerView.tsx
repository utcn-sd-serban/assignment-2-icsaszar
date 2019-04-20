import Answer from "../../../model/objects/Answer";
import React from "react";
import {EditField} from "./EditField";
import Question from "../../../model/objects/Question";

interface OptionalProps {
    onChangeInput: (newValue: string) => void;
    onSave: () => void;
}

interface Props {
    answer: Answer;
    editable?: OptionalProps
}

export function AnswerView({answer, editable}: Props){
    const {author, posted, text} = answer;
    return (
        <div className="container border border-info p-1 rounded my-1">
            {
                editable &&
                <EditField
                    onChangeInput={editable.onChangeInput}
                    onSave={editable.onSave}
                    tempText={answer.tempText}/>

            }
            <div className={"row"}>
                <div className={"col"}> {text} </div>
            </div>
            <div className={"row"}>
                <div className={"col"}> {author.name} </div>
                <div className={"col"}> {posted.toDateString()} </div>
            </div>
        </div>
    );
}