import Question from '../model/Question'
import {QuestionsState} from "../model/question/types";
import React, { Component } from 'react';

function QuestionView({question}: { question: Question }) {
    return (
        <div>
            <span> {question.title} </span>
            <span> {question.text} </span>
            <span> {question.author.name} </span>
            <span> {question.posted.toDateString()} </span>
        </div>
    )
}

export default function QuestionListView({state}: {state: QuestionsState}) {
    const {questions, searchedTitle, selectedTag } = state;
    return (
        <div>
            {
                questions.map(question =>
                <QuestionView question={question} key={question.id}/>)
            }
        </div>
    );
}