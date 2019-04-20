import Question from '../../../model/objects/Question'
import React from 'react';
import {QuestionView} from "../../general/reuseable/QuestionView";



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