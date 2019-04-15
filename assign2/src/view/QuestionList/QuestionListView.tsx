import Question from '../../model/objects/Question'
import React from 'react';


function QuestionView({question}: { question: Question }) {
    const {title, text, author, posted, tags} = question;
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
                    {
                        tags.map(tag =>
                            <a className={"btn btn-outline-dark btn-sm mx-1"}> {tag.name} </a>
                        )
                    }
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