import Answer from "../../../model/objects/Answer";
import React from "react";

export function AnswerView({answer}: {answer: Answer}){
    const {author, posted, text} = answer;
    return (
        <div className={"container"}>
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