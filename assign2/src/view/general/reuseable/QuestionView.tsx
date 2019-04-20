import Question from "../../../model/objects/Question";
import {Link} from "react-router-dom";
import TagListView from "./TagListView";
import React from "react";
import {EditField} from "./EditField";

interface OptionalProps {
    onChangeInput: (newValue: string) => void;
    onSave: () => void;
}

interface Props {
    question: Question;
    titleIsLink?: boolean;
    editable?: OptionalProps
}

function QuestionTitle({title, id, isLink}: {title: string, id: number, isLink: boolean}) {
    return (
    <h4>
        {
            isLink ? <Link to={`/posts/${id}`}> {title} </Link> : title
        }
    </h4>);
}

export function QuestionView(
    {
        question,
        titleIsLink = true,
        editable
    }
        : Props) {
    const {title, text, author, posted, tags, id} = question;
    return (
        <div className="container border border-primary p-1 rounded my-1">
            <div className={"row"}>
                <div className={"col"}>
                    <QuestionTitle id={id} title={title} isLink={titleIsLink}/>
                </div>
            </div>
            {
                editable &&
                    <EditField
                        onChangeInput={editable.onChangeInput}
                        onSave={editable.onSave}
                        tempText={question.tempText}/>

            }
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