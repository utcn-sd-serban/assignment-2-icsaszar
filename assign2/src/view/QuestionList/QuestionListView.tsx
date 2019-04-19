import Question from '../../model/objects/Question'
import React from 'react';
import TagListView from "../general/TagListView";
import {Link} from "react-router-dom";


function QuestionView({question}: { question: Question }) {
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

export default function QuestionListView({questions}: { questions: Question[] }) {
    return (
        <div className={"container"}>
            {
                questions.map(question =>
                    <QuestionView question={question} key={question.id}/>)
            }
        </div>
    );
}