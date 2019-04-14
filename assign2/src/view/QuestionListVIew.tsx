import Question from '../model/Question'
import {QuestionsState} from "../model/question/types";
import React from 'react';
import {Row, Col, Container} from 'react-bootstrap';


function QuestionView({question}: { question: Question }) {
    return (
            <Row>
                <Col> {question.title} </Col>
                <Col> {question.text} </Col>
                <Col> {question.author.name} </Col>
                <Col> {question.posted.toDateString()} </Col>
            </Row>
    )
}

export default function QuestionListView({state}: {state: QuestionsState}) {
    const {questions, searchedTitle, selectedTag } = state;
    return (
        <Container fluid={true}>
            {
                questions.map(question =>
                <QuestionView question={question} key={question.id}/>)
            }
        </Container>
    );
}