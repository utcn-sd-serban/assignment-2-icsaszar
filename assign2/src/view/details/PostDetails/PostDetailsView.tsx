import React from 'react';
import Question from "../../../model/objects/Question";
import TagListView from "../../general/reuseable/TagListView";
import {AnswerView} from "../../general/reuseable/AnswerView";

export function PostDetailsView({question}: {question: Question}) {
    const {title, text, author, posted, tags, answers} = question;
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col"}> {title} </div>
            </div>
            <div className={"row"}>
                <div className={"col"}> {text} </div>
            </div>
            <div className={"row"}>
                <div className={"col"}> {author.name} </div>
                <div className={"col"}> {posted.toDateString()} </div>
            </div>
            <div className={"row"}>
                <div className={"col"}>
                    <TagListView tags={tags}/>
                </div>
            </div>
            {
                answers.map(answer =>
                    <AnswerView key={answer.id} answer={answer}/>
                )
            }
        </div>
    )
}