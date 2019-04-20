import Question from "../../../model/objects/Question";
import {Link} from "react-router-dom";
import TagListView from "./TagListView";
import React from "react";

export function QuestionView({question}: { question: Question }) {
    const {title, text, author, posted, tags, id} = question;
    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col"}>
                    <Link to={`/posts/${id}`}> {title}</Link>
                </div>
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
        </div>
    )
}